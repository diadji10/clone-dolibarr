const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Création de la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clone_dolibarr",
});

// Vérification de la connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1); // Quitter le processus si la connexion échoue
  }
  console.log("Connecté à la base de données");
});

//Port de lancement du server
app.listen(8081, () => {
  console.log("Le server ecoute sur le port 8081");
});

// ---------------------------------------- MODULE FACTURE ---------------------------------------------------------------------------
//Api création de facture
app.post("/createfacture", (req, res) => {
  const sql =
    "INSERT INTO factures(`ref`,`client`, `type`,`condition_paiement`, `date`, `note_private`, `note_publique`, `mode_reglement`, `model_pdf`) VALUES (?)";
  const values = [
    req.body.ref,
    req.body.clientvalue,
    req.body.typeValue,
    req.body.condition,
    req.body.date,
    req.body.privateNote,
    req.body.publicNote,
    req.body.mode,
    req.body.modeleValue,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(201).json(data);
  });
});

//Récupération référence
app.get("/checkref/:ref", (req, res) => {
  const { ref } = req.params;
  const sql = "SELECT COUNT(*) AS count FROM factures WHERE ref = ?";

  db.query(sql, [ref], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const isAvailable = results[0].count === 0;
    res.json({ isAvailable });
  });
});

//Récupération des infos de la facture
app.get("/facturedata/:rowId", (req, res) => {
  const sql = "SELECT * FROM  factures WHERE row_id = ?";
  const rowId = req.params.rowId;
  db.query(sql, [rowId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Récupération des éléments de la facture
app.get("/factureelement/:factureid", (req, res) => {
  const sql = "SELECT * FROM facturedet WHERE facture_id = ?";
  const facture_id = req.params.factureid;
  db.query(sql, [facture_id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Soumission élément facture
app.post("/submitelement", (req, res) => {
  const sql =
    "INSERT INTO facturedet (`nom`, `type`, `tva`, `pu_ht`, `pu_ttc`, `quantite`, `reduction`, `facture_id`) VALUES (?);";
  const values = [
    req.body.nom,
    req.body.type,
    req.body.tva,
    req.body.puHT,
    req.body.puTTC,
    req.body.quantite,
    req.body.reduc,
    req.body.facture_id,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Suppression d'un élément
app.delete("/deleteelement/:idelement", (req, res) => {
  const sql = "DELETE FROM facturedet WHERE row_id = ?";
  const idelement = req.params.idelement;
  db.query(sql, [idelement], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Somme des éléments de la facture
app.get("/sommeelements/:idRef", (req, res) => {
  const idRef = req.params.idRef;
  const sql =
    "SELECT SUM((tva/100)*pu_ht*quantite) AS montant_tva, SUM(pu_ht*quantite) AS montant_ht, SUM(pu_ttc*quantite) AS montant_ttc FROM facturedet WHERE facture_id = ?;";
  db.query(sql, [idRef], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Mis a jour des montants des factures
app.put("/updatetotal/:idref", (req, res) => {
  const sql =
    "UPDATE factures AS f JOIN ( SELECT facturedet.facture_id, SUM(facturedet.pu_ht * facturedet.quantite) AS total_ht, SUM((facturedet.tva / 100) * facturedet.pu_ht * facturedet.quantite) AS total_tva, SUM(facturedet.pu_ttc * facturedet.quantite) AS total_ttc FROM facturedet GROUP BY facturedet.facture_id) AS fd ON f.row_id = fd.facture_id SET f.total_ht = fd.total_ht, f.total_tva = fd.total_tva, f.total_ttc = fd.total_ttc WHERE f.row_id = ?;";
  const idRef = req.params.idref;
  db.query(sql, [idRef], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Tableau des factures
app.get("/tableaufacture", (req, res) => {
  const sqlFactures = `SELECT * FROM factures;`;
  const sqlTotals = `SELECT SUM(total_ht) AS total_ht_sum, SUM(total_ttc) AS total_ttc_sum FROM factures;`;

  db.query(sqlFactures, (err, factures) => {
    if (err) return res.json(err);

    db.query(sqlTotals, (err, totals) => {
      if (err) return res.json(err);

      return res.json({
        factures,
        totals: totals[0], // Assuming totals[0] contains the result
      });
    });
  });
});

//Récupération des 3 dernières factures
app.get("/lastfactures", (req, res) => {
  const sql = "SELECT * FROM factures ORDER BY row_id DESC LIMIT 3";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// -----------------------------------------------------MODULE ADHÉRENT---------------------------------------------------

//Création de tupe d'adhérents
app.post("/createtype", (req, res) => {
  const sql =
    "INSERT INTO adherent_type(libelle,etat,nature,cotisation,montant,tout_montant,vote,duree,description,email) VALUES (?)";
  const values = [
    req.body.libelle,
    req.body.etat,
    req.body.nature,
    req.body.cotisation,
    req.body.montant,
    req.body.toutMontant,
    req.body.vote,
    req.body.duree,
    req.body.description,
    req.body.email,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Récupération des types d'adhérents
app.get("/type", (req, res) => {
  const sql = "SELECT * FROM adherent_type ORDER BY row_id";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Récupérations des données du type
app.get("/typedata/:ref", (req, res) => {
  const sql = "SELECT * FROM adherent_type WHERE row_id = ?";
  const ref = req.params.ref;
  db.query(sql, ref, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/edittype/:ref", (req, res) => {
  const sql =
    "UPDATE adherent_type SET libelle = ?, etat = ?, nature = ?, cotisation = ?, montant = ?, tout_montant = ?, vote = ?, duree = ?, description = ?, email = ? WHERE row_id = ?";
  const values = [
    req.body.libelle,
    req.body.etat,
    req.body.nature,
    req.body.cotisation,
    req.body.montant,
    req.body.toutMontant,
    req.body.vote,
    req.body.duree,
    req.body.description,
    req.body.email,
  ];
  const ref = req.params.ref;
  db.query(sql, [...values, ref], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/deletetype/:ref", (req, res) => {
  const sql = "DELETE FROM adherent_type WHERE row_id = ?";
  const ref = req.params.ref;
  db.query(sql, ref, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/gettypeadherent/:type", (req, res) => {
  const sql = "SELECT * FROM adherents WHERE type = ?";
  const type = req.params.type;
  db.query(sql, type, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/opentype", (req, res) => {
  const sql = "SELECT * FROM adherent_type WHERE etat = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Création adhérent
app.post("/createadherent", (req, res) => {
  const sql =
    "INSERT INTO adherents(`type`,`nature`,`societe`,`civilite`,`nom`,`prenom`,`genre`,`email`,`web`,`adresse`,`code_postal`,`ville`,`pays`,`departement`,`tel_pro`,`tel_perso`,`tel_portable`,`date_de_naissance`,`adhesion`,`tags`,`statut`) VALUES (?);";
  const values = [
    req.body.type,
    req.body.nature,
    req.body.societe,
    req.body.civilite,
    req.body.nom,
    req.body.prenom,
    req.body.genre,
    req.body.email,
    req.body.web,
    req.body.adresse,
    req.body.codePostal,
    req.body.ville,
    req.body.pays,
    req.body.departement,
    req.body.telPro,
    req.body.telPerso,
    req.body.telPortable,
    req.body.date,
    req.body.adhesion,
    req.body.tags,
    req.body.statut,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

//Liste des adhérents
app.get("/adherentlist", (req, res) => {
  const sql = "SELECT * FROM adherents ";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/numberofadherents", (req, res) => {
  const sql = "SELECT COUNT(*) AS number FROM adherents";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//données des adhérents en fonction de l'id
app.get("/adherentlist/:id", (req, res) => {
  const sql = "SELECT * FROM adherents WHERE row_id = ?";
  const { id } = req.params;
  db.query(sql, id, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put(`/updateadherentstatut/:toupdate/:id`, (req, res) => {
  const sql = "UPDATE adherents SET statut = ? WHERE row_id = ?";
  const toUpdate = req.params.toupdate;
  const id = req.params.id;
  db.query(sql, [toUpdate, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/getidoftype/:libelle", (req, res) => {
  const sql =
    "SELECT row_id FROM adherent_type WHERE REPLACE(libelle,' ','') = ?";
  const libelle = req.params.libelle;
  db.query(sql, libelle, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/getpricetype/:libelle", (req, res) => {
  const sql = "SELECT montant FROM adherent_type WHERE libelle = ?";
  const libelle = req.params.libelle;
  db.query(sql, libelle, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/statutadherentlist/:statut", (req, res) => {
  const sql = "SELECT *  FROM adherents where statut = ?";
  const statut = req.params.statut;
  db.query(sql, statut, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Supprimer un adhérent
app.delete("/deleteadherent/:id", (req, res) => {
  const sql = "DELETE FROM adherents WHERE row_id = ?";
  const id = req.params.id;
  db.query(sql, id, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/addcotisation", (req, res) => {
  const sql =
    "INSERT INTO adherent_cotisation(libelle,date_creation,type,date_debut,date_fin,adherent_id,montant) VALUES (?)";
  const values = [
    req.body.libelle,
    req.body.dateCreation,
    req.body.type,
    req.body.date,
    req.body.dateFin,
    req.body.id,
    req.body.cotisationPrice,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/getcotisationlist/:id", (req, res) => {
  const sql = "SELECT * FROM adherent_cotisation where adherent_id = ?";
  const id = req.params.id;
  db.query(sql, id, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/cotisationlist", (req, res) => {
  const sql = `
SELECT adherents.nom, adherents.prenom, adherent_cotisation.*  
FROM adherents,adherent_cotisation
WHERE adherents.row_id = adherent_cotisation.adherent_id `;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
