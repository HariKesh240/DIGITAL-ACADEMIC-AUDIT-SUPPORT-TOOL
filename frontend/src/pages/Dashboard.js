import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import API from "../services/api";
export default function Dashboard() {
  const [stats, setStats] = useState({ facultyCount: 0, studentCount: 0, courseCount: 0, infraCount: 0 });

  useEffect(() => {
    API.get("/stats").then(res => setStats(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <Container className="mt-4">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold text-primary">Academic Audit Dashboard</h2>
        <p className="text-muted">Overview of institutional data</p>
      </div>
      
      <Row className="g-4">
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 h-100">
            <Card.Body>
              <h1 className="display-4 fw-bold text-primary">{stats.facultyCount}</h1>
              <Card.Text className="text-muted text-uppercase small ls-1">Faculty Members</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 h-100">
            <Card.Body>
              <h1 className="display-4 fw-bold text-success">{stats.studentCount}</h1>
              <Card.Text className="text-muted text-uppercase small ls-1">Students</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 h-100">
            <Card.Body>
              <h1 className="display-4 fw-bold text-warning">{stats.courseCount}</h1>
              <Card.Text className="text-muted text-uppercase small ls-1">Courses</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 h-100">
            <Card.Body>
              <h1 className="display-4 fw-bold text-info">{stats.infraCount}</h1>
              <Card.Text className="text-muted text-uppercase small ls-1">Labs / Infra</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}