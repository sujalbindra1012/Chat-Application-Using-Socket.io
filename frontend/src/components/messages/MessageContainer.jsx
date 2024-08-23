import React, { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import "./MessageContainer.scss";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null); // Clear conversation on unmount
  }, [setSelectedConversation]);

  return (
    <div className="message-container">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="header">
            <img
              src={selectedConversation.profilePic}
              alt={selectedConversation.fullName}
              className="conversation-avatar"
            />
            <span className="conversation-name">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="no-chat-selected">
      <div className="message-info">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="icon" />
      </div>
    </div>
  );
};
