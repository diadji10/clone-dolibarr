import FemaleIcon from "@mui/icons-material/Female";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import GroupIcon from "@mui/icons-material/Group";
import MaleIcon from "@mui/icons-material/Male";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./adherentcard.css";

function AdherentCard() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/adherentlist/${id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

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
                  to="/adherents"
                >
                  <PersonIcon style={{ color: "#8D7A5C" }} />
                  <span> Adhérents</span>
                </Link>
                <Link className="link" to="/adherents/new">
                  Nouvel adhérent
                </Link>
                <Link className="link" to="/adherents/list">
                  Liste
                </Link>
                <ul style={{ marginLeft: "10px", listStyle: "none" }}>
                  <li>
                    <Link className="link" to="/adherents/list/brouillons">
                      Adhérents brouillons
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/adherents/list/valides">
                      Adhérents validés
                    </Link>
                    <ul style={{ marginLeft: "20px", listStyle: "none" }}>
                      <li>
                        <Link className="link" to="/adherents/list/en-attentes">
                          Adhésion en attente
                        </Link>
                      </li>
                      <li>
                        <Link className="link" to="/adherents/list/a-jours">
                          Adhésion à jour
                        </Link>
                      </li>
                      <li>
                        <Link className="link" to="/adherents/list/expires">
                          Adhésion expirée
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="link" to="/adherents/list/resilies">
                      Adhérents résiliés
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/adherents/list/exclus">
                      Adhérents exclus
                    </Link>
                  </li>
                </ul>
                <Link className="link" to="/adherents">
                  Statistiques
                </Link>
                <Link className="link" to="/adherents">
                  Génération de cartes
                </Link>
                <Link className="link" to="/adherents">
                  Tags/ Catégories
                </Link>
                <br />
                <hr />
                <Link
                  className="link"
                  style={{ fontWeight: "bolder" }}
                  to="/adherents"
                >
                  <RequestQuoteIcon style={{ color: "green" }} />
                  Adhésions/Cotisations
                </Link>
                <Link className="link" to="/adherents/list">
                  Nouvelle cotisation
                </Link>
                <Link className="link" to="/adherents/cotisation-list">
                  Liste
                </Link>
                <Link className="link" to="/adherents">
                  Statistiques
                </Link>
                <br />
                <hr />
                <Link
                  className="link"
                  style={{ fontWeight: "bolder" }}
                  to="/adherents/type"
                >
                  <GroupIcon style={{ color: "#8D7A5C" }} />
                  Type d&apos;adhérents
                </Link>
                <Link className="link" to="/adherents/createtype">
                  Nouveau
                </Link>
                <Link className="link" to="/adherents/type">
                  Liste
                </Link>
              </>
            }
          ></Sidebar>
          <div className="main adherent-card">
            <div className="head-links">
              <GroupIcon style={{ fontSize: "30px", color: "#8D7A5C" }} />
              <div className="links">
                <NavLink
                  to={`/adherents/card/${id}/index`}
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Adhérents
                </NavLink>
                <NavLink
                  to={`/adherents/card/${id}/cotisation`}
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Adhésions/Cotisations
                </NavLink>
                <NavLink
                  to={`/`}
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Notes
                </NavLink>
              </div>
            </div>
            <div className="head">
              <div className="head-left">
                <div className="image">
                  <img
                    src={
                      data.genre === "Homme"
                        ? "/assets/user_man.png"
                        : data.genre === "Femme"
                        ? "/assets/user_woman.png"
                        : "/assets/user_anonymous.png"
                    }
                    alt=""
                  />
                </div>
                <div className="info">
                  <p
                    style={{
                      color: "#22878C",
                      fontWeight: "bold",
                      fontSize: "23px",
                    }}
                  >
                    {data.row_id}
                  </p>
                  <p
                    style={{
                      color: "#22878C",
                      fontWeight: "bold",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {data.prenom} {data.nom}{" "}
                    {data.genre === "Homme" ? (
                      <MaleIcon />
                    ) : data.genre === "Femme" ? (
                      <FemaleIcon />
                    ) : (
                      ""
                    )}
                  </p>
                  <span
                    style={{
                      color: "#AAAAAA",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FmdGoodIcon />
                    {data.pays === "" ? "Sénégal" : data.pays}
                  </span>
                </div>
              </div>
              <div className="head-right">
                <Link to="/adherents">Retour Liste</Link>
                <span
                  className={
                    data.statut === 0
                      ? "brouillon"
                      : data.statut === 1
                      ? "en-attente"
                      : data.statut === 2
                      ? "a-jour"
                      : ""
                  }
                >
                  {data.statut === 0
                    ? "Brouillon à valider"
                    : data.statut === 1
                    ? "Adhésion en attente"
                    : data.statut === 2
                    ? "Adhésion à jour"
                    : ""}
                </span>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdherentCard;
