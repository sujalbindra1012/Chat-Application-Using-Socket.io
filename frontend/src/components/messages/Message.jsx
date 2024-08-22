import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import "./Message.scss"; // Import the SCSS file

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="avatar-img">
          <img alt="User avatar" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
        <span>{message.message}</span>
      </div>
      <div className="chat-footer">{formattedTime}</div>
    </div>
  );
};

export default Message;
