import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

function Logout() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout().catch((err) => console.error(err));
  };

  return (
    <div
      className="d-flex justify-content-end align-items-center w-100 pl-2"
      style={{ minHeight: "5vh" }}
    >
      <span>Signed in as {currentUser.email}</span>
      <Button variant="link" onClick={handleLogout} className="pl-2">
        Logout?
      </Button>
    </div>
  );
}

export default Logout;
