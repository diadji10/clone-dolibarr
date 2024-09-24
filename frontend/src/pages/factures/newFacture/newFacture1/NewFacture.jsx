import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../../components/header/Header";
import Sidebar from "../../../../components/sidebar/Sidebar";
import "./newFacture.css";

function NewFacture() {
  // Données des inputs
  const options = ["Option 1", "Option 2"];
  const modeleDeDocument = ["sponge"];
  const modesDeReglement = [
    "Carte Bancaire",
    "Chèque",
    "Espèce",
    "Ordre de prélèvement",
    "Virement Bancaire",
  ];

  const conditionsDeReglement = [
    "À Réception",
    "30 jours",
    "30 jours fin de mois",
    "60 jours",
    "60 jours fin de mois",
    "À Commande",
    "À Livraison",
    "50/50",
    "10 jours",
    "10 jours fin de mois",
    "14 jours",
    "14 jours fin de mois",
  ];

  // Variables Factures
  const [date, setDate] = React.useState("");
  const [typeValue, setTypeValue] = React.useState("");
  const [clientvalue, setClientValue] = React.useState(null);
  const [modeleValue, setModeleValue] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [publicNote, setPublicNote] = React.useState("");
  const [privateNote, setPrivateNote] = React.useState("");
  const [ref, setRef] = React.useState(""); // État pour la référence unique

  // Fonction pour obtenir la date du jour
  const dateNow = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Format de la date pour l'input type="date" (AAAA-MM-JJ)
    const formattedDate = `${year}-${month}-${day}`;

    // Mise à jour de l'état avec la date d'aujourd'hui
    setDate(formattedDate);
  };

  const navigate = useNavigate();

  function generateUniqueRef() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    const length = 10;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * (charactersLength + 1))
      );
    }
    return result;
  }

  function checkRefAvailability(ref) {
    return axios
      .get(`http://localhost:8081/checkref/${ref}`)
      .then((response) => response.data.isAvailable)
      .catch((error) => {
        console.error("Error checking reference availability:", error);
        return false;
      });
  }

  function useUniqueRef() {
    useEffect(() => {
      const fetchUniqueRef = async () => {
        let uniqueRef;
        let isAvailable = false;
        while (!isAvailable) {
          uniqueRef = generateUniqueRef();
          isAvailable = await checkRefAvailability(uniqueRef);
          console.log(uniqueRef);
        }
        setRef(uniqueRef);
      };

      fetchUniqueRef();
    }, []);
  }

  // Appel de useUniqueRef pour générer et définir la référence unique
  useUniqueRef();

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setClientValue(null);
    setInputValue("");
    setTypeValue("");
    setDate("");
    setCondition("");
    setMode("");
    setModeleValue("");
    setPublicNote("");
    setPrivateNote("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      clientvalue === "" ||
      date === "" ||
      condition === "" ||
      typeValue === ""
    ) {
      alert("Remplissez  les champs client, type, date et condition");
    } else {
      axios
        .post("http://localhost:8081/createfacture", {
          ref,
          clientvalue,
          typeValue,
          condition,
          date,
          privateNote,
          publicNote,
          mode,
          modeleValue,
        })
        .then((res) => {
          navigate(`/factures/new/2/${res.data.insertId}`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="app">
      <Header className="header" />
      <div className="bottom">
        <Sidebar
          menu={
            <>
              <Link
                className="link"
                style={{ fontWeight: "bolder" }}
                to="/factures/"
              >
                <RequestQuoteIcon className="icon-facture" />
                <span>Factures Clients</span>
              </Link>
              <Link className="link" to="/factures/new/1">
                Nouvelle Facture
              </Link>
              <Link className="link" to="/factures/listfacture">
                Liste
              </Link>
              <Link className="link" to="/factures/">
                Liste des modèles
              </Link>
              <Link className="link" to="/factures/">
                Règlements
              </Link>
              <Link className="link" to="/factures/stats">
                Statistiques
              </Link>
            </>
          }
        />
        <div className="main">
          <div className="container">
            <p style={{ color: "#358C8E", textAlign: "left" }}>
              <RequestQuoteIcon
                className="icon-facture"
                style={{ fontSize: "30px", color: "#7CA559" }}
              />
              Nouvelle Facture
            </p>
            <hr />
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="ques">
              <span>Client</span>
              <div className="input">
                <ApartmentIcon style={{ color: "#7E89C5" }} />
                <div>
                  <Autocomplete
                    value={clientvalue}
                    onChange={(event, newValue) => {
                      setClientValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{
                      width: 300,
                      // Ajout de margin pour l'espacement
                      margin: "20px auto",
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // Supprime le label et utilise un placeholder à la place
                        placeholder="Sélectionner Tiers"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            // Modification de la hauteur de l'input
                            height: 30, // Exemple de hauteur
                          },
                        }}
                      />
                    )}
                  />
                </div>
                <Link to="/" title="Ajouter un Tiers">
                  <AddCircleIcon
                    style={{ color: "#0A1464" }}
                    titleAccess="Créer un nouveau tiers"
                  />
                </Link>
              </div>
            </div>
            <div className="ques">
              <span>Type</span>
              <div className="radio">
                <input
                  type="radio"
                  id="facture-standard"
                  name="facture-type"
                  value="Facture standard"
                  checked={typeValue === "Facture standard"}
                  onChange={(e) => setTypeValue(e.target.value)}
                />
                <label htmlFor="facture-standard">Facture standard</label>
                <br />

                <input
                  type="radio"
                  id="facture-acompte"
                  name="facture-type"
                  value="Facture d'acompte"
                  checked={typeValue === "Facture d'acompte"}
                  onChange={(e) => setTypeValue(e.target.value)}
                />
                <label htmlFor="facture-acompte">Facture d&apos;acompte</label>
                <br />

                <input
                  type="radio"
                  id="facture-remplacement"
                  name="facture-type"
                  value="Facture de remplacement"
                  checked={typeValue === "Facture de remplacement"}
                  onChange={(e) => setTypeValue(e.target.value)}
                />
                <label htmlFor="facture-remplacement">
                  Facture de remplacement
                </label>
                <br />

                <input
                  type="radio"
                  id="facture-avoir"
                  name="facture-type"
                  value="Facture avoir"
                  checked={typeValue === "Facture avoir"}
                  onChange={(e) => setTypeValue(e.target.value)}
                />
                <label htmlFor="facture-avoir">Facture avoir</label>
                <br />

                <input
                  type="radio"
                  id="facture-modele"
                  name="facture-type"
                  value="Facture modèle"
                  checked={typeValue === "Facture modèle"}
                  onChange={(e) => setTypeValue(e.target.value)}
                />
                <label htmlFor="facture-modele">Facture modèle</label>
                <br />
              </div>
            </div>
            <div className="ques">
              <span>Date</span>
              <div className="input">
                <CalendarMonthIcon style={{ color: "#B06080" }} />
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
                <button id="date-now" onClick={dateNow} type="button">
                  <FlashOnIcon
                    style={{ color: "rgb(87, 87, 2)" }}
                    titleAccess="Aujourd'hui"
                  />
                </button>
              </div>
            </div>
            <div className="ques">
              <span>Conditions de règlement</span>
              <div className="input">
                <LocalAtmIcon style={{ color: "#B3BD3D" }} />
                <div>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={condition || ""}
                    onChange={(e) => setCondition(e.target.value)}
                    sx={{ width: "200px", height: "30px" }}
                  >
                    {conditionsDeReglement.map((el, index) => (
                      <MenuItem key={index} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="ques">
              <span>Mode de règlement</span>
              <div className="input">
                <AccountBalanceIcon />
                <div>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mode || ""}
                    onChange={(e) => setMode(e.target.value)}
                    sx={{ width: "200px", height: "30px" }}
                  >
                    {modesDeReglement.map((el, index) => (
                      <MenuItem key={index} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="ques">
              <span>Modèle de document</span>
              <div className="input">
                <DescriptionIcon />
                <div>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={modeleValue || ""}
                    onChange={(e) => setModeleValue(e.target.value)}
                    sx={{ width: "200px", height: "30px" }}
                  >
                    {modeleDeDocument.map((el, index) => (
                      <MenuItem key={index} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="ques">
              <span>Note (publique)</span>
              <div className="input">
                <textarea
                  cols={40}
                  rows={5}
                  value={publicNote}
                  onChange={(e) => setPublicNote(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="ques">
              <span>Note (privée)</span>
              <div className="input">
                <textarea
                  cols={40}
                  rows={5}
                  value={privateNote}
                  onChange={(e) => setPrivateNote(e.target.value)}
                ></textarea>
              </div>
            </div>
            <br />
            <hr />
            <div className="buttons">
              <button type="submit">CRÉER UN BROUILLON</button>
              <button type="reset" onClick={resetForm}>
                ANNULER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewFacture;
