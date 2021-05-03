import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Message.css";

function Message({ text, sender }) {
  const { currentUser } = useAuth();

  if (currentUser.email === sender) {
    return <MyMessage text={text} />;
  } else {
    return <OtherMessage text={text} sender={sender} />;
  }
}

function MyMessage({ text }) {
  return (
    <div className="d-flex flex-column align-items-end">
      <div className="flex-column MyMessage m-2 p-2">
        <div className="text-break TextMessage">{text}</div>
      </div>
    </div>
  );
}

function OtherMessage({ sender, text }) {
  return (
    <div className="d-flex flex-column align-items-start">
      <div className="flex-column OtherMessage m-2 p-2">
        <div className="font-weight-bold mb-2 TextMessageSender" style={{ fontSize: "0.8em" }}>
          {sender}
        </div>
        <div className="text-break TextMessage">{text}</div>
      </div>
    </div>
  );
}

export default Message;
