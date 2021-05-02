import React, { createRef, useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { WEBSOCKET_BASEURL } from "../../const";
import { useAuth } from "../../contexts/AuthContext";
import Message from "../Message/Message";

function AlwaysScrollToBottom() {
  const elementRef = createRef();
  useEffect(() => {
    elementRef.current.scrollIntoView();
  }, [elementRef]);

  return <div ref={elementRef} />;
}

function ChatRoom() {
  const groupIdRef = createRef();
  const textRef = createRef();
  const { currentUser, getToken } = useAuth();
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (entry) => {
      let message = JSON.parse(entry.data);
      setMessages(messages.concat(message));
    };
  }, [ws, messages]);

  const handleJoinChat = async (e) => {
    e.preventDefault();

    let token = "";
    try {
      token = await getToken();
    } catch (error) {
      console.error(error);
    }

    if (groupIdRef.current.value !== "") {
      let ws = new WebSocket(
        WEBSOCKET_BASEURL +
          groupIdRef.current.value +
          "?email=" +
          currentUser.email +
          "&token=" +
          token
      );

      ws.onopen = () => {
        console.log("connection opened");
        setWs(ws);
        setInfo("Connected");
      };

      ws.onclose = () => {
        console.log("connection closed");
      };

      return () => {
        ws.close();
      };
    }
  };

  const handleSendText = (e) => {
    e.preventDefault();

    let message = {
      data: textRef.current.value,
      groupId: groupIdRef.current.value,
    };
    ws.send(JSON.stringify(message));
    textRef.current.value = "";
  };

  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ maxHeight: "100vh", minWidth: "90vw" }}
    >
      <Card className="mt-3" style={{ maxHeight: "fit-content" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Start/Join Chat</h2>
          {info && <Alert variant="success">{info}</Alert>}
          <Form onSubmit={handleJoinChat}>
            <Form.Group id="groupId">
              <Form.Label>Group ID</Form.Label>
              <Form.Control type="text" ref={groupIdRef} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Join
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mt-3" style={{ minHeight: "65vh" }}>
        <Card.Body className="d-flex flex-column justify-content-between w-100">
          <div>
            <h2 className="text-center mb-4">Your Chat</h2>
            <div
              style={{ maxHeight: "40vh", minWidth: "90vw" }}
              className="overflow-auto"
            >
              {messages.map((m, i) => {
                return <Message key={i} text={m.data} sender={m.sender} />;
              })}
              <AlwaysScrollToBottom />
            </div>
          </div>
          <Form onSubmit={handleSendText} className="mt-2">
            <Form.Group as={Row}>
              <Col sm="11" className="mt-4">
                <Form.Control
                  type="text"
                  ref={textRef}
                  placeholder="Enter message here"
                  required
                />
              </Col>
              <Col sm="1" className="mt-4">
                <Button type="submit" variant="primary" className="w-100">
                  Send
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ChatRoom;
