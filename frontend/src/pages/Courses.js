import { Container, Form, Button, Card, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import API from "../services/api";
import { useState, useEffect } from "react";

export default function Courses() {
  const [d, setD] = useState({});
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/courses");
    setList(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const save = async () => {
    await API.post("/courses", d);
    alert("Saved");
    fetchData();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 text-primary">Add Course</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <FloatingLabel label="Course Name" className="mb-3">
                  <Form.Control 
                    placeholder="Course Name" 
                    onChange={e => setD({ ...d, courseName: e.target.value })} 
                  />
                </FloatingLabel>

                <FloatingLabel label="Syllabus Details" className="mb-3">
                  <Form.Control 
                    as="textarea"
                    style={{ height: '100px' }}
                    placeholder="Syllabus" 
                    onChange={e => setD({ ...d, syllabus: e.target.value })} 
                  />
                </FloatingLabel>

                <Button variant="primary" className="w-100" onClick={save}>Save Course</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 text-secondary">Course List</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr><th>Course Name</th><th>Syllabus</th></tr>
                </thead>
                <tbody>
                  {list.map((item, i) => (
                    <tr key={i}>
                      <td>{item.courseName}</td>
                      <td>{item.syllabus}</td>
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