const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect("mongodb://127.0.0.1:27017/academic_audit")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// --- Schemas ---
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String
});

const FacultySchema = new mongoose.Schema({
  name: String,
  qualification: String,
  publications: Number
});

const StudentSchema = new mongoose.Schema({
  name: String,
  attendance: Number,
  credits: Number
});

const CourseSchema = new mongoose.Schema({
  courseName: String,
  syllabus: String
});

const InfraSchema = new mongoose.Schema({
  labName: String,
  equipment: String
});

const User = mongoose.model("User", UserSchema);
const Faculty = mongoose.model("Faculty", FacultySchema);
const Student = mongoose.model("Student", StudentSchema);
const Course = mongoose.model("Course", CourseSchema);
const Infra = mongoose.model("Infra", InfraSchema);

// --- Auth Routes ---
app.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({ ...req.body, password: hash });
    res.status(201).send("Registered");
  } catch (e) {
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found");
    
    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(401).send("Invalid credentials");
    
    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
    res.json({ token, role: user.role, name: user.name });
  } catch (e) {
    res.status(500).send("Login error");
  }
});

// --- CRUD Routes ---

// Faculty
app.post("/faculty", async (req, res) => {
  await Faculty.create(req.body);
  res.json({ message: "Saved" });
});
app.get("/faculty", async (req, res) => res.json(await Faculty.find()));

// Students
app.post("/students", async (req, res) => {
  await Student.create(req.body);
  res.json({ message: "Saved" });
});
app.get("/students", async (req, res) => res.json(await Student.find()));

// Courses
app.post("/courses", async (req, res) => {
  await Course.create(req.body);
  res.json({ message: "Saved" });
});
app.get("/courses", async (req, res) => res.json(await Course.find()));

// Infrastructure
app.post("/infra", async (req, res) => {
  await Infra.create(req.body);
  res.json({ message: "Saved" });
});
app.get("/infra", async (req, res) => res.json(await Infra.find()));

// Reports / Compliance
app.get("/compliance", async (req, res) => {
  const students = await Student.find();
  // Logic: Attendance < 75% is a defaulter
  const defaulters = students.filter(s => s.attendance < 75);
  res.json(defaulters);
});

// Dashboard Stats
app.get("/stats", async (req, res) => {
  const facultyCount = await Faculty.countDocuments();
  const studentCount = await Student.countDocuments();
  const courseCount = await Course.countDocuments();
  const infraCount = await Infra.countDocuments();
  res.json({ facultyCount, studentCount, courseCount, infraCount });
});

app.listen(5000, () => console.log("Server running on port 5000"));