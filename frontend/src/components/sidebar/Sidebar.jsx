import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PropTypes from "prop-types";
import "./sidebar.css";

function Sidebar({ menu }) {
  return (
    <div className="sidebar">
      <div className="searchbar">
        <input type="search" placeholder="Rechercher..." />
        <ArrowDropDownIcon className="dropdown-icon" />
      </div>
      <div className="menu">{menu}</div>
    </div>
  );
}

Sidebar.propTypes = {
  menu: PropTypes.node.isRequired, // validation de la prop 'menu'
};

export default Sidebar;
