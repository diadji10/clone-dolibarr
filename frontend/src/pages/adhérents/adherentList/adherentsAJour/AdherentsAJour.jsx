import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../App.css";
import Header from "../../../../components/header/Header";
import Sidebar from "../../../../components/sidebar/Sidebar";

function AdherentsAJour() {
  const [data, setData] = useState([]);
  const [nombre, setNombre] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8081/statutadherentlist/2")
      .then((res) => {
        setData(res.data);
        const nbr = res.data.length;
        setNombre(nbr);
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
              Liste des Adhérents à jour ({nombre})
            </h1>
            <table>
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
                {nombre > 0
                  ? data.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Link to={`/adherents/card/${el.row_id}/index`}>
                              {el.row_id}
                            </Link>
                          </td>
                          <td>{el.prenom}</td>
                          <td>{el.nom}</td>
                          <td>{el.societe}</td>
                          <td>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "auto",
                                height: "20px",
                                backgroundColor: "#E4E4E4",
                                color: "#646F7A",
                                padding: "6px",
                                borderRadius: "100px",
                              }}
                            >
                              {el.nature}
                            </span>
                          </td>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "63px",
                            }}
                          >
                            <GroupIcon
                              style={{ color: "#8D7A5C", fontSize: "20px" }}
                            />
                            {el.type}
                          </td>
                          <td>{el.email}</td>
                          <td>Cotisation recue</td>
                          <td>
                            <span
                              style={{
                                border: "none",
                                color: "white",
                                backgroundColor: "#24a580",
                                fontWeight: "bolder",
                                padding: "5px",
                                borderRadius: "5px",
                              }}
                            >
                              À Jour
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdherentsAJour;
