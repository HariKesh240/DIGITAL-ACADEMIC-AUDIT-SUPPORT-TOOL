import { Container, Form, Button, Card, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import API from "../services/api";
import { useState, useEffect } from "react";

export default function Faculty() {
  const [d, setD] = useState({});
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/faculty");
    setList(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const save = async () => {
    await API.post("/faculty", d);
    alert("Saved");
    fetchData(); // Refresh list
    setD({}); // Clear form (optional)
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 text-primary">Add Faculty</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <FloatingLabel label="Faculty Name" className="mb-3">
                  <Form.Control 
                    placeholder="Name" 
                    onChange={e => setD({ ...d, name: e.target.value })} 
                  />
                </FloatingLabel>
                
                <FloatingLabel label="Qualification" className="mb-3">
                  <Form.Control 
                    placeholder="Qualification" 
                    onChange={e => setD({ ...d, qualification: e.target.value })} 
                  />
                </FloatingLabel>

                <FloatingLabel label="Publications" className="mb-3">
                  <Form.Control 
                    type="number"
                    placeholder="Publications" 
                    onChange={e => setD({ ...d, publications: e.target.value })} 
                  />
                </FloatingLabel>

                <Button variant="primary" className="w-100" onClick={save}>Save Record</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0 text-secondary">Faculty List</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr><th>Name</th><th>Qualification</th><th>Publications</th></tr>
                </thead>
                <tbody>
                  {list.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.qualification}</td>
                      <td>{item.publications}</td>
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