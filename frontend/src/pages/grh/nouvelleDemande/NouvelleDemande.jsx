import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./nouvelleDemande.css";

function NouvelleDemande() {
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
              Créer demande de congés
            </h1>
            <form action="" className="conge-form">
              <div className="line">
                <div className="left-part">Utilisateur</div>
                <div className="right-part">
                  <Select
                    value={``}
                    onChange={``}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: "25px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <span
                    style={{
                      color: "#9E9C9A",
                      marginLeft: "50%",
                      border: "2px solid #9E9C9A",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    Solde des congés en jours : 0
                  </span>
                </div>
              </div>
              <div className="line">
                <div className="left-part">Type</div>
                <div className="right-part">
                  <Select
                    value={``}
                    onChange={``}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: "25px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="line">
                <div className="left-part">Date début</div>
                <div className="right-part">
                  <CalendarMonthIcon sx={{ color: "#B46D89" }} />
                  <input type="date" />
                  <button
                    style={{
                      color: "#7378A6",
                      background: "transparent",
                      border: "none",
                      fontWeight: "lighter",
                      cursor: "pointer",
                    }}
                  >
                    Maintenant
                  </button>
                  <Select
                    value={``}
                    onChange={``}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: "25px" }}
                  >
                    <MenuItem value={`matin`}>Matin</MenuItem>
                    <MenuItem value={`Après-midi`}>Après midi</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="line">
                <div className="left-part">Date fin</div>
                <div className="right-part">
                  <CalendarMonthIcon sx={{ color: "#B46D89" }} />
                  <input type="date" />
                  <button
                    style={{
                      color: "#7378A6",
                      background: "transparent",
                      border: "none",
                      fontWeight: "lighter",
                      cursor: "pointer",
                    }}
                  >
                    Maintenant
                  </button>
                  <Select
                    value={``}
                    onChange={``}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: "25px" }}
                  >
                    <MenuItem value={`matin`}>Matin</MenuItem>
                    <MenuItem value={`Après-midi`}>Après midi</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="line">
                <div className="left-part">Sera approuvé par : </div>
                <div className="right-part">
                  {" "}
                  <Select
                    value={``}
                    onChange={``}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: "25px" }}
                  >
                    <MenuItem value={`matin`}>Matin</MenuItem>
                    <MenuItem value={`Après-midi`}>Après midi</MenuItem>
                  </Select>
                </div>
              </div>
              <div
                className="line"
                style={{
                  borderBottom: "1px solid black",
                  paddingBottom: "10px",
                }}
              >
                <div className="left-part">Description</div>
                <div className="right-part">
                  <textarea name="" id="" cols={40} rows={5}></textarea>
                </div>
              </div>

              <div className="buttons">
                <button>CRÉER UNE DEMANDE DE CONGÉS</button>
                <button>ANNULER</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NouvelleDemande;
