import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import "./Conversations.scss"; // Import the SCSS file

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="conversations">
       <SearchInput />
       <div className="divider"></div>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading && <span className="loading-spinner"></span>}
      <LogoutButton />
    </div>
  );
};

export default Conversations;
