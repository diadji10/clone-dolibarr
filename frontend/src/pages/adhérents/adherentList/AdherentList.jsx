import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";

function AdherentList() {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/adherentlist")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/numberofadherents")
      .then((res) => setNumber(res.data[0].number))
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
              <GroupIcon style={{ fontSize: "30px", color: "#8D7A5C" }} />
              Adherent List ({number})
            </h1>
            <table style={{ width: "95%" }}>
              <thead>
                <tr>
                  <th>Réf</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Société</th>
                  <th>Nature</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Date Fin</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            el.genre === "Homme"
                              ? "/assets/user_man.png"
                              : data.genre === "Femme"
                              ? "/assets/user_woman.png"
                              : "/assets/user_anonymous.png"
                          }
                          alt=""
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "100%",
                          }}
                        />
                        <Link to={`/adherents/card/${el.row_id}/index`}>
                          {" "}
                          {el.row_id}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/adherents/card/${el.row_id}/index`}>
                          {" "}
                          {el.prenom}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/adherents/card/${el.row_id}/index`}>
                          {" "}
                          {el.nom}
                        </Link>
                      </td>
                      <td>{el.societe}</td>
                      <td>{el.nature}</td>
                      <td>{el.type}</td>
                      <td>{el.email}</td>
                      <td>Cotisation non recue</td>
                      <td>
                        <span
                          style={
                            el.statut === 0
                              ? {
                                  border: "2px solid grey",
                                  color: "grey",
                                  borderRadius: "5px",
                                  padding: "3px",
                                }
                              : el.statut === 1
                              ? {
                                  border: "none",
                                  color: "white",
                                  backgroundColor: "#bc9526",
                                  fontWeight: "bolder",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }
                              : el.statut === 2
                              ? {
                                  border: "none",
                                  color: "white",
                                  backgroundColor: "#24a580",
                                  fontWeight: "bolder",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }
                              : ""
                          }
                        >
                          {el.statut === 0
                            ? "Brouillon"
                            : el.statut === 1
                            ? "En Attente"
                            : el.statut === 2
                            ? "À Jour"
                            : ""}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdherentList;
