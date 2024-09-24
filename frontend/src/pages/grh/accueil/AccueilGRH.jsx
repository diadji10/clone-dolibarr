import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Link } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";

function Accueil() {
  return (
    <div>
      <div className="app">
        <Header className="header" />
        <div className="bottom">
          <Sidebar
            className="sidebar"
            menu={
              <>
                <Link
                  className="link"
                  style={{ fontWeight: "bolder" }}
                  to="/grh"
                >
                  <BeachAccessIcon style={{ color: "#8D7A5C" }} />
                  <span> Demande de congés</span>
                </Link>
                <Link className="link" to="/grh">
                  Nouveau
                </Link>
                <Link className="link" to="/adherents">
                  Demande collective
                </Link>
                <Link className="link" to="/adherents">
                  Liste
                </Link>
                <ul style={{ marginLeft: "10px", listStyle: "none" }}>
                  <li>
                    <Link className="link" to="/grh">
                      Brouillon
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/grh">
                      En Approbation
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/adherents/list/resilies">
                      Approuvée
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/adherents/list/exclus">
                      Annulée
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/adherents/list/exclus">
                      Refusée
                    </Link>
                  </li>
                </ul>

                <Link className="link" to="/adherents">
                  Solde des congés
                </Link>
                <Link className="link" to="/adherents">
                  État Mensuel
                </Link>
                <Link className="link" to="/adherents">
                  Voir historique modif.
                </Link>
              </>
            }
          ></Sidebar>
          <div className="main">
            <h1
              style={{
                padding: "15px",
                width: "95%",
                color: "#358C8E",
                textAlign: "left",
                fontSize: "20px",
                display: "flex",
                margin: "auto",
                gap: "20px",
                alignItems: "center",
                borderBottom: "1px solid black",
              }}
            >
              <BeachAccessIcon style={{ fontSize: "30px", color: "#8D7A5C" }} />
              Liste des demandes congés
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
