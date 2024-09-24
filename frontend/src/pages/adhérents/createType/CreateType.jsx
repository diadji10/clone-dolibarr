import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./createType.css";

function CreateType() {
  const navigate = useNavigate();

  const [libelle, setLibelle] = useState("");
  const [etat, setEtat] = useState(false);
  const [nature, setNature] = useState("Personne physique et morale");
  const [cotisation, setCotisation] = useState(false);
  const [montant, setMontant] = useState(0);
  const [toutMontant, setToutMontant] = useState(false);
  const [vote, setVote] = useState(false);
  const [duree, setDuree] = useState(1);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (libelle === "") {
      alert('Veuillez remplir la champ "Libellé"');
    } else {
      axios
        .post("http://localhost:8081/createtype", {
          libelle,
          etat,
          nature,
          cotisation,
          montant,
          toutMontant,
          vote,
          duree,
          description,
          email,
        })
        .then(() => navigate("/adherents/type"))
        .catch((err) => console.log(err));
    }
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
            <div className="container">
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
                Nouveau type de membre
              </h1>
              <br />
              <form action="">
                <div className="label">
                  <label htmlFor="">Libellé: </label>
                  <input
                    type="text"
                    placeholder="libellé"
                    value={libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                  />
                </div>
                <div className="label">
                  <label htmlFor="">État: </label>
                  <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={etat}
                    onChange={(e) => setEtat(e.target.value)}
                    sx={{
                      height: "20px",
                      width: "auto",
                    }}
                  >
                    <MenuItem value={false}>Clos</MenuItem>
                    <MenuItem value={true}>Ouvert</MenuItem>
                  </Select>
                </div>
                <div className="label">
                  <label htmlFor="">Nature des adhérents : </label>
                  <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={nature}
                    onChange={(e) => setNature(e.target.value)}
                    sx={{
                      height: "20px",
                      width: "auto",
                    }}
                  >
                    <MenuItem value={`Personne physique et morale`}>
                      Personne physique et morale
                    </MenuItem>
                    <MenuItem value={`Physique`}>Physique</MenuItem>
                    <MenuItem value={`Morale`}>Morale</MenuItem>
                  </Select>
                </div>
                <div className="label">
                  <label htmlFor="">Soumis à cotisation : </label>
                  <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={cotisation}
                    onChange={(e) => setCotisation(e.target.value)}
                    sx={{
                      height: "20px",
                      width: "auto",
                    }}
                  >
                    <MenuItem value={true}>Oui</MenuItem>
                    <MenuItem value={false}>Non</MenuItem>
                  </Select>
                </div>
                <div className="label">
                  <label htmlFor="">Montant : </label>
                  <input
                    type="number"
                    name=""
                    min={0}
                    id=""
                    placeholder="0,00"
                    value={montant}
                    onChange={(e) => {
                      setMontant(e.target.value.replace(",", "."));
                    }}
                  />
                </div>
                <div className="label">
                  <label htmlFor="">Tout montant : </label>
                  <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={toutMontant}
                    onChange={(e) => setToutMontant(e.target.value)}
                    sx={{
                      height: "20px",
                      width: "auto",
                    }}
                  >
                    <MenuItem value={true} selected>
                      Oui
                    </MenuItem>
                    <MenuItem value={false}>Non</MenuItem>
                  </Select>
                </div>
                <div className="label">
                  <label htmlFor="">Vote autorisé : </label>
                  <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={vote}
                    onChange={(e) => setVote(e.target.value)}
                    sx={{
                      height: "20px",
                      width: "auto",
                    }}
                  >
                    <MenuItem value={true}>Oui</MenuItem>
                    <MenuItem value={false}>Non</MenuItem>
                  </Select>
                </div>
                <div className="label">
                  <label htmlFor="">Durée : </label>
                  <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={duree}
                    onChange={(e) => setDuree(e.target.value)}
                    sx={{
                      height: "20px",
                      width: "auto",
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  année(s)
                </div>
                <div className="label">
                  <label htmlFor="">Description</label>
                  <textarea
                    name=""
                    id=""
                    cols={40}
                    rows={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="label">
                  <label htmlFor="">Email de bienvenue</label>
                  <textarea
                    name=""
                    id=""
                    cols={40}
                    rows={10}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></textarea>
                </div>
                <hr />
                <div className="buttons">
                  <button type="submit" onClick={handleSubmit}>
                    ENREGISTRER
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      navigate("/adherents/type");
                    }}
                  >
                    ANNULER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateType;
