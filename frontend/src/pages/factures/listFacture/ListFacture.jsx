import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./listFacture.css";

function ListFacture() {
  const [factures, setFactures] = useState([]);
  const [totals, setTotals] = useState({ total_ht_sum: 0, total_ttc_sum: 0 });

  useEffect(() => {
    axios
      .get("http://localhost:8081/tableaufacture")
      .then((res) => {
        setFactures(res.data.factures);
        setTotals(res.data.totals);
      })
      .catch((err) => console.log(err));
  }, []);

  const correctDate = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
          ></Sidebar>
          <div className="main">
            <p
              style={{
                color: "#358C8E",
                textAlign: "left",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RequestQuoteIcon
                className="icon-facture"
                style={{ fontSize: "30px", color: "#7CA559" }}
              />
              Factures Clients ({factures.length})
            </p>
            <br />
            <hr />
            <div className="list">
              <table>
                <thead>
                  <tr>
                    <th>Réf</th>
                    <th>Date Facturation</th>
                    <th>Date Échéance</th>
                    <th>Tiers</th>
                    <th>Montant HT</th>
                    <th>Montant TTC</th>
                  </tr>
                </thead>
                <tbody>
                  {factures.map((el, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/factures/new/2/${el.row_id}`}>
                          {el.ref}
                        </Link>
                      </td>
                      <td>{correctDate(el.date)}</td>
                      <td>{el.condition_paiement}</td>
                      <td>{el.client}</td>
                      <td>
                        {formatNumber(parseFloat(el.total_ht).toFixed(2))} XOF
                      </td>
                      <td>
                        {formatNumber(parseFloat(el.total_ttc).toFixed(2))} XOF
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ color: "rgb(173, 173, 173)" }}>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      {formatNumber(parseFloat(totals.total_ht_sum).toFixed(2))}
                    </td>
                    <td>
                      {formatNumber(
                        parseFloat(totals.total_ttc_sum).toFixed(2)
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFacture;
