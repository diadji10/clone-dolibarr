import GroupIcon from "@mui/icons-material/Group";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material"; // Pour le composant <Button>
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AccueilCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");

  const [data, setData] = useState([]);
  const [typeId, setTypeId] = useState("");

  function supprimerEspaces(chaine) {
    return chaine.replace(/\s+/g, ""); // Remplace tous les espaces (y compris les espaces multiples) par une chaîne vide
  }

  useEffect(() => {
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
      })
      .catch((err) => console.log(err));
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = (idToSelect) => {
    setOpen(true);
    setSelectedId(idToSelect);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = (idSelected) => {
    axios
      .delete(`http://localhost:8081/deleteadherent/${idSelected}`)
      .then(() => navigate("/adherents/list"))
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8081/updateadherentstatut/1/${id}`)
      .then((res) => {
        console.log(res.data);

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const boxStyle = {
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
        <div className="right">
          <div className="item">
            <span className="left-item">Tags/catégorie</span>
            <span className="right-item">{data.tags}</span>
          </div>
          <div className="item">
            <span className="left-item">Date de naissance</span>
            <span className="right-item">{data.date_de_naissance}</span>
          </div>
          <div className="item">
            <span className="left-item">Adhésion publique</span>
            <span className="right-item">
              {data.adhesion === 0 ? "Non" : "Oui"}
            </span>
          </div>
        </div>
      </div>
      <div className="bloc-buttons">
        {data.statut === 1 ? <button>ENVOYER EMAIL</button> : ""}

        <button>MODIFIER</button>
        {data.statut === 0 ? (
          <button onClick={handleUpdate}>VALIDER</button>
        ) : (
          ""
        )}
        {data.statut === 0 ? (
          <button
            style={{
              width: "300px",
              background: "none",
              color: "grey",
              border: "1px solid grey",
              padding: "2px",
              cursor: "no-drop",
            }}
            title="L'adhérent doit d'abord etre validés"
          >
            CRÉER UN COMPTE UTILISATEUR{" "}
          </button>
        ) : (
          <>
            <button>RÉSILIER </button>
            <button>EXCLURE </button>
          </>
        )}
        <Button
          onClick={() => handleOpen(id)}
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
            <Box sx={boxStyle}>
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
                <Button variant="outlined" onClick={handleClose}>
                  Annuler
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(selectedId)}
                >
                  Oui
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default AccueilCard;
