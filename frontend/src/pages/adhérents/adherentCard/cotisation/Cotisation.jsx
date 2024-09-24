import FlashOnIcon from "@mui/icons-material/FlashOn";
import GroupIcon from "@mui/icons-material/Group";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./cotisation.css";

function Cotisation() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [cotisationVue, setCotisationVue] = useState(false);

  const [date, setDate] = useState("");
  const dateNow = (toAdd, toSet) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear() + toAdd;
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    toSet(formattedDate);
  };

  function formatDateToISO(date) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  function formatDate(date) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day} `;
  }
  //Les variables

  function supprimerEspaces(chaine) {
    return chaine.replace(/\s+/g, ""); // Remplace tous les espaces (y compris les espaces multiples) par une chaîne vide
  }

  const available = {
    fontWeight: "bold",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "80%",
    borderRadius: "3px",
    padding: "20px",
    height: "30px",
    backgroundColor: "#9b76a7",
    color: "white",
    cursor: "pointer",
  };

  const notAvailable = {
    fontWeight: "bold",
    border: "1px solid lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "3px",
    padding: "20px",
    marginLeft: "80%",
    fontSize: "15px",
    height: "30px",
    backgroundColor: "transparent",
    color: "#999999",
    cursor: "no-drop",
  };

  const [cotisationPrice, setCotisationPrice] = useState(0);

  const [cotisationList, setCotisationList] = useState([]);
  useEffect(() => {
    dateNow(0, setDate);
    dateNow(5, setDateFin);
    axios
      .get(`http://localhost:8081/adherentlist/${id}`)
      .then((res) => {
        setData(res.data[0]);
        axios
          .get(
            `http://localhost:8081/getidoftype/${supprimerEspaces(
              res.data[0].type
            ).toLowerCase()}`
          )
          .then((res2) => {
            setTypeId(res2.data[0].row_id);
          })
          .catch((err) => console.log(err));
        axios
          .get(`http://localhost:8081/getpricetype/${res.data[0].type}`)
          .then((res2) => {
            setCotisationPrice(res2.data[0].montant);
          })
          .catch((err) => console.log(err));
        axios
          .get(`http://localhost:8081/getcotisationlist/${id}`)
          .then((res2) => {
            setCotisationList(res2.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const [dateFin, setDateFin] = useState("");
  const dateCreation = new Date();
  const type = data.type;
  const [libelle, setLibelle] = useState("");

  const handleSubmit = () => {
    if (date === "" || cotisationPrice === "") {
      alert("Les champs montants et cotisations sont obligatoires");
    } else {
      axios
        .post("http://localhost:8081/addcotisation", {
          libelle,
          dateCreation,
          type,
          date,
          dateFin,
          id,
          cotisationPrice,
        })
        .then(() => {
          axios
            .put(`http://localhost:8081/updateadherentstatut/2/${id}`)
            .catch((err) => console.log(err));
          setCotisationVue(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="left">
          <div className="item">
            <span className="left-item">Type</span>
            <span className="right-item">
              <GroupIcon style={{ color: "#8D7A5C", fontSize: "20px" }} />
              <Link to={`/adherents/typecard/${typeId}`}> {data.type}</Link>
            </span>
          </div>
          <div className="item">
            <span className="left-item">Nature adhérent</span>
            <span className="right-item">
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
                {data.nature}
              </span>
            </span>
          </div>
          <div className="item">
            <span className="left-item">Société</span>
            <span className="right-item">{data.societe}</span>
          </div>
          <div className="item">
            <span className="left-item">Titre de civilité</span>
            <span className="right-item">{data.civilite}</span>
          </div>
          <div className="item">
            <span className="left-item">Date fin d&apos;adhésion</span>
            <span className="right-item">
              Cotisation non recue{" "}
              {data.statut === 0 || data.statut === 1 ? (
                <ReportProblemIcon style={{ color: "#bc9526" }} />
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
        <div className="right" style={{ paddingTop: "45px" }}>
          <div className="item">
            <span className="left-item">Tags/catégorie</span>
            <span className="right-item">{data.tags}</span>
          </div>
          <div className="item">
            <span className="left-item">Date de naissance</span>
            <span className="right-item">{data.date_de_naissance}</span>
          </div>
          <div
            style={{
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgb(211, 211, 211)",
              gap: "5px",
            }}
          >
            <span
              className="left-item"
              style={{ flex: 1, height: "100%", color: "#8e97a4" }}
            >
              L&apos;Entreprise peut publier mon adhésion dans le registre
              public
            </span>
            <span
              className="right-item"
              style={{ flex: 2, height: "100%", textAlign: "left" }}
            >
              {data.adhesion === 0 ? "Non" : "Oui"}
            </span>
          </div>
        </div>
      </div>
      {!cotisationVue ? (
        <button
          style={
            data.statut === 2 || data.statut === 1 ? available : notAvailable
          }
          title={
            data.statut === 2 || data.statut === 1
              ? "Créer une cotisation"
              : "L'utilisateur doit d'abord etre validé"
          }
          onClick={() => setCotisationVue(true)}
        >
          CRÉER COTISATION
        </button>
      ) : (
        <>
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
            <InsertDriveFileIcon
              style={{ fontSize: "30px", color: "#C8C8C8" }}
            />
            Nouvelle Adhésion
          </h1>
          <form action="" className="new-adhesion">
            <div className="line">
              <div className="left">Date Adhésion</div>
              <div className="right">
                <input
                  type="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <FlashOnIcon
                  style={{ color: "#7A80AB", cursor: "pointer" }}
                  titleAccess="Date d'aujourd'hui"
                  onClick={() => dateNow(0, setDate)}
                />
              </div>
            </div>
            <div className="line">
              <div className="left">Fin d&apos;adhésion</div>
              <div className="right">
                <input
                  type="Date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                />
                <FlashOnIcon
                  style={{ color: "#7A80AB", cursor: "pointer" }}
                  titleAccess="Date d'aujourd'hui"
                  onClick={() => dateNow(0, setDate)}
                />
              </div>
            </div>
            <div className="line">
              <div className="left"> Montant</div>
              <div className="right">
                <input
                  type="number"
                  min={0}
                  value={parseFloat(cotisationPrice).toFixed(2)}
                  onChange={(e) => setCotisationPrice(e.target.value)}
                />{" "}
                {"  "}Francs CFA BCEAO
              </div>
            </div>
            <div className="line">
              <div className="left"> Libellé</div>
              <div className="right">
                <input
                  type="text"
                  value={libelle}
                  onChange={(e) => setLibelle(e.target.value)}
                />
              </div>
            </div>
            <div className="line">
              <div className="left"> Envoi A.R. par email </div>
              <div className="right">Pas d&apos;email</div>
            </div>
          </form>
          <div className="buttons">
            <button
              style={{
                padding: "20px",
                fontSize: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleSubmit}
            >
              CRÉER COTISATION
            </button>
            <button
              style={{
                padding: "20px",
                fontSize: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setCotisationVue(false);
              }}
            >
              ANNULER
            </button>
          </div>
        </>
      )}
      <table>
        <thead>
          <tr style={{ color: " ", fontWeight: "lighter" }}>
            <th>Réf</th>
            <th>Date création</th>
            <th>Type</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {cotisationList.map((el, index) => {
            return (
              <tr key={index}>
                <td style={{ display: "flex", alignItems: "center" }}>
                  <MonetizationOnIcon style={{ color: "green" }} />
                  {el.row_id}
                </td>
                <td>{formatDateToISO(el.date_creation)}</td>
                <td>{el.type}</td>
                <td>{formatDate(el.date_debut)}</td>
                <td>{formatDate(el.date_fin)}</td>
                <td style={{ color: "#276B75" }}>
                  {parseFloat(el.montant).toFixed(2).replace(".", ",")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cotisation;
