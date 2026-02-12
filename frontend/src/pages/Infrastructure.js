import { Container, Form, Button, Card, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import API from "../services/api";
import { useState, useEffect } from "react";

export default function Infrastructure() {
  const [d, setD] = useState({});
  const [list, setList] = useState([]);

  // Fetch data on load
  const fetchData = async () => {
    try {
      const res = await API.get("/infra");
      setList(res.data);
    } catch (e) {
      console.log("Error fetching infra:", e);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Save data
  const save = async () => {
    try {
      await API.post("/infra", d);
      alert("Infrastructure details saved!");
      fetchData(); // Refresh table
      setD({});    // clear form
    } catch (e) {
      alert("Error saving data");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Input Form */}
        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Add Infrastructure</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <FloatingLabel label="Lab / Room Name" className="mb-3">
                  <Form.Control 
                    placeholder="Lab Name" 
                    value={d.labName || ""}
                    onChange={e => setD({ ...d, labName: e.target.value })} 
                  />
                </FloatingLabel>

                <FloatingLabel label="Major Equipment List" className="mb-3">
                  <Form.Control 
                    as="textarea"
                    style={{ height: '100px' }}
                    placeholder="Equipment" 
                    value={d.equipment || ""}
                    onChange={e => setD({ ...d, equipment: e.target.value })} 
                  />
                </FloatingLabel>

                <Button variant="primary" className="w-100" onClick={save}>Save Details</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Display List */}
        <Col md={8}>
          <Card className="shadow-sm border-0">
             <Card.Header className="bg-light border-bottom">
              <h5 className="mb-0 text-secondary">Infrastructure Log</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive striped>
                <thead>
                  <tr><th>Lab Name</th><th>Equipment</th></tr>
                </thead>
                <tbody>
                  {list.map((item, i) => (
                    <tr key={i}>
                      <td className="fw-bold">{item.labName}</td>
                      <td>{item.equipment}</td>
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