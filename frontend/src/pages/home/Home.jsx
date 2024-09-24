import "../../App.css";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

function Home() {
  return (
    <div>
      <div className="app">
        <Header className="header" />
        <div className="bottom">
          <Sidebar
            className="sidebar"
            menu={<div style={{ color: "black" }}>Heyy</div>}
          ></Sidebar>
          <div className="main">HOME</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
