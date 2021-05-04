import "./AllChats.css";
import React, { useState } from "react";
import { Nav, Accordion, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";

function AllChats() {
  const [allChats] = useState(["id1", "id2", "id3"]);

  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-column flex-nowrap justify-content-start align-items-center w-25"
      style={{ maxHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <Nav.Link as={Link} to="/" className="NavbarHeader text-center">
          ivar
        </Nav.Link>
        <Menu />
      </div>
      <Accordion defaultActiveKey="0" className="w-100 text-center">
        <Card style={{ border: "none" }}>
          <Card.Header className="CardHeader">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="NavbarAccordion text-break"
            >
              Active Conversations
              <i className="fas fa-chevron-down p-2" />
            </Accordion.Toggle>
          </Card.Header>
          {allChats.map((groupId, i) => {
            return (
              <Accordion.Collapse eventKey="0" key={i}>
                <Card.Body className="text-center NavbarCard">
                  <Button variant="link" as={Link} to={`/?id=${groupId}`}>
                    {groupId}
                  </Button>
                </Card.Body>
              </Accordion.Collapse>
            );
          })}
        </Card>
      </Accordion>
    </Nav>
  );
}

export default AllChats;
