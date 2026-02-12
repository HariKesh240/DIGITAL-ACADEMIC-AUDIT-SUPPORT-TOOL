import { Container, Form, Button, Card, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={5} lg={4}>
          <Card className="shadow border-0 rounded-3">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">Welcome Back</h3>
                <p className="text-muted">Sign in to your account</p>
              </div>
              <Form>
                <FloatingLabel controlId="email" label="Email Address" className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    onChange={e => setData({ ...data, email: e.target.value })} 
                  />
                </FloatingLabel>

                <FloatingLabel controlId="password" label="Password" className="mb-3">
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    onChange={e => setData({ ...data, password: e.target.value })} 
                  />
                </FloatingLabel>

                <Button variant="primary" size="lg" className="w-100 mt-3" onClick={login}>
                  Login
                </Button>
              </Form>
              <div className="mt-4 text-center">
                <small className="text-muted">
                  Don't have an account? <a href="/register" className="text-decoration-none fw-bold">Register</a>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}