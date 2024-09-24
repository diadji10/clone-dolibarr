import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./typeCard.css";

function TypeCard() {
  const { ref } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [adherentData, setAdherentData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/typedata/${ref}`)
      .then((res) => {
        setData(res.data[0]);
        axios
          .get(`http://localhost:8081/gettypeadherent/${res.data[0].libelle}`)
          .then((res2) => {
            if (Array.isArray(res2.data)) {
              setAdherentData(res2.data);
            } else {
              console.error("Les données reçues ne sont pas un tableau.");
              setAdherentData([]);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8081/deletetype/${ref}`)
      .then(() => navigate("/adherents/type"))
      .catch((err) => console.log(err));
  };

  const handleAdherentDelete = (id) => {
    axios
      .delete(`http://localhost:8081/deleteadherent/${id}`)
      .then(() => {
        handleClose();
      })
      .catch((err) => console.log(err));
    ("");
    window.location.reload();
  };

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
              <GroupsIcon style={{ fontSize: "30px", color: "#8D7A5C" }} />
            </h1>
            <br />
            <div className="type-card">
              <div className="head">
                <div className="head-left">
                  <GroupIcon
                    style={{
                      color: "#8D7A5C",
                      fontSize: "60px",
                    }}
                  />
                  <p
                    style={{
                      color: "#358C8E",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {data.libelle}
                  </p>
                </div>
                <div className="head-right">
                  <Link
                    to="/adherents/type"
                    style={{ color: "#0A1464", fontWeight: "bold" }}
                  >
                    Retour liste
                  </Link>
                  {data.etat === 0 ? (
                    <span
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        backgroundColor: "#FD5461",
                        color: "white",
                      }}
                    >
                      Fermé
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        backgroundColor: "#24a580",
                        color: "white",
                      }}
                    >
                      Ouvert
                    </span>
                  )}
                </div>
              </div>
              <div className="list-container">
                <div className="list">
                  <span className="left-item">Nature des adhérents</span>
                  <span className="right-item">{data.nature}</span>
                </div>
                <div className="list">
                  <span className="left-item">Soumis à cotisation</span>
                  <span className="right-item">
                    {data.cotisation === 1 ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="list">
                  <span className="left-item">Nature des adhérents</span>
                  <span className="right-item">{data.nature}</span>
                </div>
                <div className="list">
                  <span className="left-item">Tout Montant</span>
                  <span className="right-item">
                    {data.tout_montant === 1 ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="list">
                  <span className="left-item">Vote autorisé</span>
                  <span className="right-item">
                    {data.vote === 1 ? "Oui" : "Non"}
                  </span>
                </div>
                <div className="list">
                  <span className="left-item">Durée</span>
                  <span className="right-item">{data.duree} année(s)</span>
                </div>
                <div className="list">
                  <span className="left-item">Durée</span>
                  <span className="right-item">{data.duree} année(s)</span>
                </div>
                <div className="list">
                  <span className="left-item">Description</span>
                  <span className="right-item">{data.description} </span>
                </div>
                <div className="list">
                  <span className="left-item">Email de bienvenue</span>
                  <span className="right-item">{data.email} </span>
                </div>
              </div>
            </div>
            <div className="buttons-block">
              <button>
                <Link
                  to={`/adherents/edittype/${ref}`}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  MODIFIER
                </Link>
              </button>
              <button>
                <Link
                  to="/adherents/createtype"
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  CRÉER ADHÉRENT
                </Link>
              </button>
              <Button
                onClick={handleOpen}
                style={{ backgroundColor: "#EAE4E1", color: "#935C44" }}
              >
                SUPPRIMER
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Voulez-vous vraiment supprimer ce type ?
                    </Typography>
                    <Typography
                      id="transition-modal-description"
                      sx={{
                        display: "flex",
                        gap: "10px",
                        width: "200px",
                        margin: "auto",
                      }}
                    >
                      <Button variant="outlined" onClick={handleClose}>
                        Annuler
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                      >
                        Oui
                      </Button>
                    </Typography>
                  </Box>
                </Fade>
              </Modal>
            </div>
            <div className="adherent-list">
              <table>
                <thead>
                  <tr>
                    <th>Réf</th>
                    <th>Nom/Société</th>
                    <th>Nature</th>
                    <th>Email</th>
                    <th>État</th>
                    <th>Fin d&apos;adhésion </th>
                    <th colSpan={2}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adherentData.map((el, index) => {
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
                          <Link
                            to={`/adherents/card/${el.row_id}/index`}
                            style={{ color: "#0A3384", textDecoration: "none" }}
                          >
                            {" "}
                            {el.row_id}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/adherents/card/${el.row_id}/index`}
                            style={{
                              color: "#0A3384",
                              textDecoration: "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <PersonIcon style={{ color: "#79633F" }} />
                            {el.prenom} {el.nom}/{el.societe}
                          </Link>
                        </td>
                        <td>{el.nature}</td>
                        <td>{el.email}</td>
                        <td>Brouillon à valider</td>
                        <td>Cotisation non recue</td>
                        <td>
                          <ModeEditIcon
                            style={{ cursor: "pointer", color: "#0A3384" }}
                            onClick={() => {
                              navigate(`/adherents/edit/${el.row_id}`);
                            }}
                          />
                        </td>
                        <td>
                          <Button onClick={() => handleOpen(el.row_id)}>
                            <DeleteForeverIcon
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </Button>
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                              backdrop: {
                                timeout: 500,
                              },
                            }}
                          >
                            <Fade in={open}>
                              <Box sx={style}>
                                <Typography
                                  id="transition-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Voulez-vous vraiment supprimer cet adhérent ?
                                </Typography>
                                <Typography
                                  id="transition-modal-description"
                                  sx={{
                                    display: "flex",
                                    gap: "10px",
                                    width: "200px",
                                    margin: "auto",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                  >
                                    Annuler
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                      handleAdherentDelete(selectedId)
                                    }
                                  >
                                    Oui
                                  </Button>
                                </Typography>
                              </Box>
                            </Fade>
                          </Modal>
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
    </div>
  );
}

export default TypeCard;
