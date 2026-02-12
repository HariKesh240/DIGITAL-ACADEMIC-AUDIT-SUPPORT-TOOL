import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// IMPORT COMPONENTS FROM THE 'PAGES' FOLDER
import NavbarComp from "./components/NavbarComp"; // Assuming Navbar is still in src/
// If Navbar is also in pages, change to: import NavbarComp from "./pages/NavbarComp";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Infrastructure from "./pages/Infrastructure";
import Reports from "./pages/Reports";

// Protected Route Logic
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/*" element={
          <PrivateRoute>
            <NavbarComp />
            <div className="container-fluid py-3">
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="faculty" element={<Faculty />} />
                <Route path="students" element={<Students />} />
                <Route path="courses" element={<Courses />} />
                <Route path="infra" element={<Infrastructure />} />
                <Route path="reports" element={<Reports />} />
              </Routes>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;