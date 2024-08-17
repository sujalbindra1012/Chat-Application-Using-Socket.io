import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import "./Sidebar.scss"; // Import the SCSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SearchInput />
      <div className="divider"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
