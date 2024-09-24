import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <Link className="item" to="/">
        <HomeIcon />
        <span>Accueil</span>
      </Link>
      <Link className="item" to="/factures">
        <RequestQuoteIcon />
        <span>Factures|Paiements</span>
      </Link>
      <Link className="item" to="/adherents">
        <PersonIcon />
        <span>Adhérents</span>
      </Link>
      <Link className="item" to="/grh">
        <PeopleAltIcon />
        <span>GRH</span>
      </Link>
    </div>
  );
}

export default Header;
