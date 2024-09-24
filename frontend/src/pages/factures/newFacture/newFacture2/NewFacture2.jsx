import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../../../components/header/Header";
import Sidebar from "../../../../components/sidebar/Sidebar";
import "./newFacture2.css";

function NewFacture2() {
  const { idRef } = useParams();

  //fonction pour formatter les nombres
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Récupération données facture
  //Format Date
  const correctDate = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [data, setData] = useState("");

  const [montants, setMontants] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/facturedata/${idRef}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8081/factureelement/${idRef}`)
      .then((res) => {
        setFactureElements(res.data);
      })
      .catch((err) => console.log(err));

    //Récupération des montants
    axios
      .get(`http://localhost:8081/sommeelements/${idRef}`)
      .then((res) => {
        setMontants(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [idRef]);

  //Récupération des éléments de la facture
  const [factureElements, setFactureElements] = useState([]);

  //données facture
  const [type, setType] = useState("");
  const [nom, setNom] = useState("");
  const [tva, setTva] = useState(18);
  const [puHT, setPuHT] = useState(0);
  const [puTTC, setPuTTC] = useState(0);
  const [reduc, setReduc] = useState(0);
  const [quantite, setQuantite] = useState(0);

  //Soumission des éléments de la facture
  const handleElementSubmit = () => {
    if (nom === "" || type === "") {
      alert("Veuillez remplir le nom et le type");
    } else if (quantite == 0) {
      alert("Veuillez mettre une quantité valable");
    } else {
      axios
        .post("http://localhost:8081/submitelement", {
          nom,
          type,
          tva,
          puHT,
          puTTC,
          quantite,
          reduc,
          facture_id: idRef,
        })
        .then(() => {})
        .catch((err) => console.log(err));

      axios
        .put(`http://localhost:8081/updatetotal/${idRef}`)
        .then(() => {
          alert("succes");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteElement = (idElement) => {
    axios
      .delete(`http://localhost:8081/deleteelement/${idElement}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
          <div className="head">
            <RequestQuoteIcon
              className="icon-facture"
              style={{ fontSize: "30px", color: "#7CA559" }}
            />
            <ul>
              <li>
                <Link className="head-link">Facture Client</Link>
              </li>
              <li>
                <Link className="head-link">Contacts/Adresses</Link>
              </li>
              <li>
                <Link className="head-link">Notes</Link>
              </li>
              <li>
                <Link className="head-link">Fichiers Joints</Link>
              </li>
              <li>
                <Link className="head-link">Événements</Link>
              </li>
            </ul>
          </div>
          <br />
          <hr />
          <br />
          <div className="container">
            <div className="client">
              <div className="left">
                <div className="image">
                  <RequestQuoteIcon className="icon-facture" />
                </div>
                <div className="info-client">
                  <h2>PROV{idRef}:</h2>
                  <p>Réf facture : {data.ref}</p>
                </div>
              </div>
              <div className="right">
                <div className="retour-liste"></div>
                <div className="brouillon">Brouillon </div>
              </div>
            </div>

            <div className="info">
              <div className="left">
                <div className="left-item">
                  <span className="label">Type </span>
                  <span className="valeur">{data.type}</span>
                </div>
                <div className="left-item">
                  <span className="label">
                    Réduction ou crédits disponibles{" "}
                  </span>
                  <span className="valeur">
                    Ce client n&apos;a pas de remise relative par défaut. Ce
                    client n&apos;a pas ou plus de crédit disponible. (Editer
                    remises fixes)
                  </span>
                </div>
                <div className="left-item">
                  <span className="label">Date Facturation </span>
                  <span className="valeur">{correctDate(data.date)}</span>
                </div>
                <div className="left-item">
                  <span className="label">Conditions de règlement </span>
                  <span className="valeur">{data.condition_paiement}</span>
                </div>
                <div className="left-item">
                  <span className="label">Date limite règlement</span>
                  <span className="valeur">03/10/2024</span>
                </div>
                <div className="left-item">
                  <span className="label">Mode de règlement </span>
                  <span className="valeur">{data.mode_reglement}</span>
                </div>
              </div>
              <div className="right">
                <div className="right-item">
                  <span>Montant HT </span>
                  <span>
                    {formatNumber(parseFloat(montants.montant_ht).toFixed(2))}{" "}
                    XOF
                  </span>
                </div>
                <div className="right-item">
                  <span>Montant TVA </span>
                  <span>
                    {formatNumber(parseFloat(montants.montant_tva).toFixed(2))}{" "}
                    XOF
                  </span>
                </div>
                <div className="right-item">
                  <span>Montant TTC </span>
                  <span>
                    {formatNumber(parseFloat(montants.montant_ttc).toFixed(2))}{" "}
                    XOF
                  </span>
                </div>
                <table className="reglement">
                  <thead>
                    <tr>
                      <th>Règlements</th>
                      <th>Date</th>
                      <th>Type </th>
                      <th style={{ width: "150px" }}>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          textAlign: "center",
                          color: "#A2A2A2",
                          fontWeight: "lighter",
                        }}
                      >
                        Déjà réglé (hors avoirs et acomptes)
                      </td>
                      <td>0,0</td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          textAlign: "right",
                          color: "#A2A2A2",
                          fontWeight: "lighter",
                        }}
                      >
                        Facturé
                      </td>
                      <td>
                        {formatNumber(
                          parseFloat(montants.montant_ttc).toFixed(2)
                        )}{" "}
                        XOF
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          textAlign: "right",
                          color: "#A2A2A2",
                          fontWeight: "lighter",
                        }}
                      >
                        Reste à payé
                      </td>
                      <td
                        style={{
                          fontSize: "20px",
                          fontWeight: "bolder",
                          color: "rgb(102, 48, 25)",
                        }}
                      >
                        {formatNumber(
                          parseFloat(montants.montant_ttc).toFixed(2)
                        )}{" "}
                        XOF
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br />
            <br />
            <div className="facture">
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", width: "500px" }}>
                      Description
                    </th>
                    <th>TVA</th>
                    <th>P.U H.T</th>
                    <th>P.U TTC</th>
                    <th>Qté</th>
                    <th style={{ width: "95px" }}>Réduc.</th>
                  </tr>
                </thead>
                <tbody>
                  {factureElements.map((el, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid lightgrey" }}
                      >
                        <td>{el.nom}</td>
                        <td>{el.tva}%</td>
                        <td>{formatNumber(el.pu_ht)}</td>
                        <td>{formatNumber(el.pu_ttc)}</td>
                        <td>{formatNumber(el.quantite)}</td>
                        <td>{el.reduction > 0 ? `${el.reduction}%` : "-"}</td>
                        <td>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleOpen}
                            className="delete-button"
                            sx={{
                              border: "none",
                              background: "transparent",
                            }}
                          >
                            <DeleteIcon
                              style={{ color: "red", cursor: "pointer" }}
                            />
                          </Button>
                          <Modal
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                          >
                            <Box sx={boxStyle}>
                              <Typography
                                id="keep-mounted-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                Voulez-vous vraiment supprimer cet élément
                                <div
                                  className="buttons"
                                  style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    flexDirection: "space beetwen",
                                    margin: "auto",
                                    padding: "10px",
                                    width: "150px",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleClose}
                                    endIcon={``}
                                    sx={{
                                      padding: "8px 16px",
                                      minWidth: "auto",
                                      border: "1px solid",
                                      marginRight: "10px",
                                    }}
                                  >
                                    Annuler
                                  </Button>
                                  <Button
                                    endIcon={<DeleteForeverIcon />}
                                    size="medium"
                                    sx={{
                                      padding: "8px 16px",
                                      minWidth: "auto",
                                      border: "1px solid",
                                    }}
                                    onClick={() => {
                                      const id = el.row_id;
                                      handleDeleteElement(id);
                                    }}
                                  >
                                    Oui
                                  </Button>
                                </div>
                              </Typography>
                            </Box>
                          </Modal>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>
                      <li style={{ listStyle: "circle" }}>
                        Ligne libre de type:
                        <select
                          name=""
                          id=""
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="">-</option>
                          <option value="produit">Produit</option>
                          <option value="service">Service</option>
                        </select>
                      </li>
                    </td>
                  </tr>
                  <tr style={{ marginTop: "10px" }}>
                    <td>
                      <li style={{ listStyle: "circle" }}>
                        Nom :
                        <input
                          type="text"
                          style={{ height: "40px" }}
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                        ></input>
                      </li>
                    </td>
                    <td>
                      <select
                        name=""
                        id=""
                        value={tva || 0} //
                        onChange={(e) => {
                          const newTva = parseFloat(e.target.value) || 0;
                          setTva(newTva);
                          setPuTTC((puHT * (1 + newTva / 100)).toFixed(2));
                        }}
                      >
                        <option value="0">0%</option>
                        <option value="10">10%</option>
                        <option value="18">18%</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        style={{ width: "100px" }}
                        min={0}
                        value={puHT || 0} // Utilisation de nombre pour la valeur de l'input
                        onChange={(e) => {
                          const newPuHT = parseFloat(e.target.value) || 0;
                          setPuHT(newPuHT); // Mettre à jour l'état avec le nombre
                          setPuTTC((newPuHT * (1 + tva / 100)).toFixed(2)); // Formatage pour affichage
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        style={{ width: "100px" }}
                        min={0}
                        value={puTTC || 0}
                        onChange={(e) => {
                          const newPuTTC = parseFloat(e.target.value) || 0;
                          setPuTTC(newPuTTC);
                          setPuHT((newPuTTC * (1 - tva / 100)).toFixed(2));
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        style={{ width: "50px" }}
                        min={0}
                        value={quantite}
                        onChange={(e) => {
                          setQuantite(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        style={{ width: "50px" }}
                        min={0}
                        value={reduc}
                        onChange={(e) => setReduc(e.target.value)}
                      />
                      %
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "right" }}>
                      <button className="button" onClick={handleElementSubmit}>
                        AJOUTER
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFacture2;
