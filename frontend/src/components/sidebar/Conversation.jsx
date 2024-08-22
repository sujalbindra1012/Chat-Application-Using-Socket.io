import React from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import "./Conversation.scss";

const Conversation = ({
  conversation,
  lastIdx,
  emoji,
  onSelectConversation,
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  const handleSelect = () => {
    setSelectedConversation(conversation);
    onSelectConversation(conversation);
  };

  return (
    <>
      <div
        className={`conversation-item ${isSelected ? "selected" : ""}`}
        onClick={handleSelect}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="avatar-img">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="conversation-details">
          <div className="conversation-header">
            <p className="conversation-name">{conversation.fullName}</p>
            <span className="emoji">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider"></div>}
    </>
  );
};

export default Conversation;
