import React, { useState, createRef, useEffect } from "react";
import { Col, Container, Form, Button } from "react-bootstrap";
import Message from "../Message/Message";
import { useAuth } from "../../contexts/AuthContext";
import { WEBSOCKET_BASEURL } from "../../const";
import "./Home.css";
import { useLocation } from "react-router";

function Home() {
  const textRef = createRef();
  const { currentUser, getToken } = useAuth();
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const groupId = query.get("id");

  useEffect(() => {
    const startWebSocketConnection = async () => {
      let token = await getToken().catch((err) => console.error(err));

      let conn = new WebSocket(
        WEBSOCKET_BASEURL +
          groupId +
          "?email=" +
          currentUser.email +
          "&token=" +
          token
      );

      conn.onopen = () => {
        console.log("connection opened");
        setWs(conn);
      };

      conn.onclose = () => {
        console.log("connection closed");
      };

      return () => {
        conn.close();
      };
    };

    if (groupId) {
      console.log("starting websocket for group: ", groupId);
      startWebSocketConnection();
    }
  }, [currentUser, getToken, groupId]);

  useEffect(() => {
    if (!ws) return;
    console.log("ws exists");
    ws.onmessage = (entry) => {
      console.log("entry: ", entry);
      let message = JSON.parse(entry.data);
      setMessages(messages.concat(message));
    };
    console.log("added on message listener");
  }, [ws, messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = {
      data: textRef.current.value,
      groupId: groupId,
    };
    ws.send(JSON.stringify(message));
    textRef.current.value = "";
  };

  return (
    <Container className="d-flex flex-column align-items-start justify-content-between ChatContainer">
      <div className="overflow-auto w-100">
        {messages.map((m, i) => {
          return <Message key={i} text={m.data} sender={m.sender} />;
        })}
        <AlwaysScrollToBottom />
      </div>
      <Form className="w-100 InputForm" onSubmit={handleSubmit}>
        <Form.Row>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Enter your message here"
              className="InputMessage"
              ref={textRef}
              required
            />
          </Col>
          <Col sm={2} className="p-2 text-center">
            <Button type="submit">Send</Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}

function AlwaysScrollToBottom() {
  const elementRef = createRef();
  useEffect(() => {
    elementRef.current.scrollIntoView();
  }, [elementRef]);

  return <div ref={elementRef} />;
}

export default Home;
