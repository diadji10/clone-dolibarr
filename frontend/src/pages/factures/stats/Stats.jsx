import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../../../App.css";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./stats.css";

function Stats() {
  const data = [
    { name: "Jan", sales: 4000, revenue: 2400 },
    { name: "Feb", sales: 3000, revenue: 2210 },
    { name: "Mar", sales: 2000, revenue: 2290 },
    { name: "Apr", sales: 2780, revenue: 3908 },
  ];
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
              Statistiques Factures clients
            </p>
            <br />
            <hr />
            <br />
            <br />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
