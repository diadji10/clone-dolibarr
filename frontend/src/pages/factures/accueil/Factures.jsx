import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./factures.css";

function Factures() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/lastfactures")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const correctDate = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
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
            Zone Facturation client
          </p>
          <br />
          <hr />
          <div className="last">
            <table>
              <thead>
                <tr>
                  <th colSpan={3}>Les dernières factures clients</th>
                  <th>Montant TTC</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/factures/new/2/${el.row_id}`}>
                          {el.ref}
                        </Link>
                      </td>
                      <td>{el.client}</td>
                      <td>{correctDate(el.date)}</td>
                      <td>{el.total_ttc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Factures;
