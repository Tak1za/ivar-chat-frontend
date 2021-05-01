import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Message.css";

function Message({ text, sender }) {
  const { currentUser } = useAuth();

  return (
    <div
      className={`d-flex flex-column ${
        sender === currentUser.email ? "align-items-end" : "align-items-start"
      }`}
    >
      <div className={`flex-column message m-2 p-2`}>
        {sender !== currentUser.email ? (
          <div className="font-weight-bold mb-2" style={{ fontSize: "0.8em" }}>
            {sender}
          </div>
        ) : null}
        <div className="text-break">{text}</div>
      </div>
    </div>
  );
}

export default Message;
