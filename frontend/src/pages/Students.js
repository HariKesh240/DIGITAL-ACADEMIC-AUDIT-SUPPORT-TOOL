import { Container, Form, Button, Card, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import API from "../services/api";
import { useState, useEffect } from "react";

export default function Students() {
  const [d, setD] = useState({});
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/students");
    setList(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const save = async () => {
    await API.post("/students", d);
    alert("Saved");
    fetchData();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 text-primary">Add Student</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <FloatingLabel label="Student Name" className="mb-3">
                  <Form.Control 
                    placeholder="Name" 
                    onChange={e => setD({ ...d, name: e.target.value })} 
                  />
                </FloatingLabel>

                <Row>
                  <Col md={6}>
                    <FloatingLabel label="Attendance %" className="mb-3">
                      <Form.Control 
                        type="number"
                        placeholder="Attendance" 
                        onChange={e => setD({ ...d, attendance: e.target.value })} 
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={6}>
                    <FloatingLabel label="Credits" className="mb-3">
                      <Form.Control 
                        type="number"
                        placeholder="Credits" 
                        onChange={e => setD({ ...d, credits: e.target.value })} 
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Button variant="primary" className="w-100" onClick={save}>Save Record</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="shadow-sm border-0">
             <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 text-secondary">Student Records</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr><th>Name</th><th>Attendance</th><th>Credits</th></tr>
                </thead>
                <tbody>
                  {list.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>
                        <span className={item.attendance < 75 ? "text-danger fw-bold" : "text-success"}>
                          {item.attendance}%
                        </span>
                      </td>
                      <td>{item.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}