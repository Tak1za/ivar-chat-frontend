import { Alert, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Home() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to logout");
    }
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <h2>Home</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="link" onClick={() => history.push("/chatroom")}>
          Chat Room
        </Button>
      </div>
    </div>
  );
}

export default Home;
