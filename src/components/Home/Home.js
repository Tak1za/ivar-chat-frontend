import React from "react";
import { Card, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
  const { currentUser } = useAuth();

  return (
    <Container
      className="d-flex align-items-start justify-content-center"
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        minWidth: "70vw",
        maxWidth: "70vw",
        margin: "10px 10px",
        padding: "0"
      }}
    >
      <Card style={{ minWidth: "70vw", maxWidth: "70vw", padding: "0" }}>
        <Card.Body>
          <h2>Home</h2>
          <strong>Email: </strong>
          {currentUser.email}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
