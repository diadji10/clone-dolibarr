import GroupIcon from "@mui/icons-material/Group";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./type.css";

function Type() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/type")
      .then((res) => {
        setData(res.data);
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
              }}
            >
              <GroupIcon style={{ fontSize: "30px", color: "#8D7A5C" }} />
              Types d&apos; adhérents
            </h1>
            <br />
            <table className="table-list">
              <thead>
                <tr>
                  <th>Réf</th>
                  <th>Libellé</th>
                  <th>Nature des adhérents</th>
                  <th>Durée</th>
                  <th>Soumis à cotisation</th>
                  <th>Montant</th>
                  <th>Tout Montant</th>
                  <th>Vote autorisé</th>
                  <th>État</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <GroupIcon
                          style={{ fontSize: "20px", color: "#8D7A5C" }}
                        />
                        <Link
                          to={`/adherents/typecard/${el.row_id}`}
                          style={{ color: "black" }}
                        >
                          {el.row_id}
                        </Link>
                      </td>
                      <td>{el.libelle}</td>
                      <td>{el.nature}</td>
                      <td>{el.duree} année(s)</td>
                      <td>{el.cotisation === 1 ? "Oui" : "Non"}</td>
                      <td style={{ color: "#3C6D78", fontWeight: "bold" }}>
                        {el.montant}
                      </td>
                      <td>{el.tout_montant === 1 ? "Oui" : "Non"}</td>
                      <td>{el.vote === 1 ? "Oui" : "Non"}</td>
                      <td>
                        {el.etat === 1 ? (
                          <span
                            style={{
                              padding: "3px",
                              borderRadius: "3px",
                              fontWeight: "bold",
                              backgroundColor: "#24A580",
                              color: "white",
                            }}
                          >
                            Ouvert
                          </span>
                        ) : (
                          <span
                            style={{
                              padding: "3px",
                              borderRadius: "3px",
                              fontWeight: "bold",
                              backgroundColor: "#FD5461",
                              color: "white",
                            }}
                          >
                            Fermé
                          </span>
                        )}
                      </td>
                      <td className="edit-button">
                        <Link
                          to={`/adherents/edittype/${el.row_id}`}
                          style={{ color: "#33286B" }}
                        >
                          <ModeEditOutlineIcon
                            sx={{ cursor: "pointer" }}
                            titleAccess="Modifier"
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Type;
