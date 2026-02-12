import { Container, Form, Button, Card, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ role: "Faculty" });
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/register", data);
      alert("Registration successful");
      navigate("/");
    } catch (e) {
      alert("Error registering");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow border-0 rounded-3">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h4 className="m-0">Create Account</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Form>
                <FloatingLabel label="Full Name" className="mb-3">
                  <Form.Control
                    placeholder="Name"
                    onChange={e => setData({ ...data, name: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel label="Email Address" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={e => setData({ ...data, email: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => setData({ ...data, password: e.target.value })}
                  />
                </FloatingLabel>

                <FloatingLabel label="Select Role" className="mb-3">
                  <Form.Select
                    onChange={e => setData({ ...data, role: e.target.value })}
                  >
                    <option>Faculty</option>
                    <option>Admin</option>
                    <option>HOD</option>
                    <option>Auditor</option>
                  </Form.Select>
                </FloatingLabel>

                <Button onClick={register} className="w-100 mt-2" size="lg" variant="primary">
                  Register
                </Button>
                <div className="mt-3 text-center">
                   <a href="/" className="text-decoration-none text-muted">Back to Login</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}