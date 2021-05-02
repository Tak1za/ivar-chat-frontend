import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
  const { currentUser } = useAuth();

  return (
    <div>
      <Card>
        <Card.Body>
          <h2>Home</h2>
          <strong>Email: </strong>
          {currentUser.email}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
