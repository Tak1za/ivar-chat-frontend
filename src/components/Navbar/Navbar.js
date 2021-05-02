import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navigation() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar
      expand="lg"
      style={{
        borderStyle: "solid",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0",
        borderWidth: "1px",
      }}
    >
      <Navbar.Brand as={Link} to="/" style={{fontFamily: "Zen Dots"}}>
        IVAR
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/chatroom">
            ChatRooms
          </Nav.Link>
        </Nav>
        <Nav>
          {currentUser ? (
            <Nav.Link as={Button} variant={Link} onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login/Signup
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
