import React from "react";
import { Nav, Accordion, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllChats.css";

function AllChats() {
  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-column justify-content-start align-items-center"
      style={{ maxHeight: "100vh", minWidth: "25vw", maxWidth: "25vw" }}
    >
      <Nav.Link
        as={Link}
        to="/"
        style={{ fontFamily: "Zen Dots", color: "black", fontSize: "2em",  textAlign: "center"}}
      >
        ivar
      </Nav.Link>
      <Accordion defaultActiveKey="0" className="w-100">
        <Card style={{ border: "none" }}>
          <Card.Header className="card-header">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="navbar-accordion"
            >
              Active Conversations
              <i className="fas fa-chevron-down p-2" />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="text-center navbar-card">
              Hello! I'm the body
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="text-center navbar-card">
              Hello! I'm the body
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="text-center navbar-card">
              Hello! I'm the body
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card style={{ border: "none" }}>
          <Card.Header className="card-header">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="1"
              className="navbar-accordion"
            >
              Archived Conversations
              <i className="fas fa-chevron-down p-2" />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className="text-center">
              Hello! I'm another body
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Nav>
  );
}

export default AllChats;
