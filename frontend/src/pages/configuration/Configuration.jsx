import "../../App.css";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

function Configuration() {
  return (
    <div className="app">
      <Header className="header" />
      <div className="bottom">
        <Sidebar className="sidebar" />
        <div className="main">MAIN</div>
      </div>
    </div>
  );
}

export default Configuration;
