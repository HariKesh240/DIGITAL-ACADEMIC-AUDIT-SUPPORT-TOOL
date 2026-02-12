import { Container, Card, Table, Alert, Badge } from "react-bootstrap";
import API from "../services/api";
import { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/compliance")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-danger text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Compliance Defaulters</h5>
          <Badge bg="light" text="dark">Criteria: Attendance &lt; 75%</Badge>
        </Card.Header>
        <Card.Body>
          {data.length === 0 ? (
             <Alert variant="success" className="text-center">
               <strong>Excellent!</strong> All students are in compliance with attendance regulations.
             </Alert>
          ) : (
            <>
              <Alert variant="warning">
                <strong>Action Required:</strong> The following students have low attendance.
              </Alert>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Attendance %</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((s, index) => (
                    <tr key={s._id}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td className="fw-bold text-danger">{s.attendance}%</td>
                      <td><Badge bg="danger">Defaulter</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}