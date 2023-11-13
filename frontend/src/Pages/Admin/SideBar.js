import React, {useState} from "react";
import { List, GraphUpArrow, PersonCircle, BoxSeam, ChatSquareQuote, Envelope, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import "../../assets/css/dashboard.css";
import Dashboard from "./Dashboard/Dashboard";
import Users from "./Users/Users";
import Collection from "./Collection/Collection";
import Opinions from "./Opinions/Opinions";
import Reports from "./Reports/Reports";

const SideBar = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [activeCompo, setActiveCompo] = useState("dashboard");

  const toggleMenu = () => {
    setIsToggled(!isToggled);
  };
  
  const username = localStorage.getItem("userName");
  const handleSignOut = () => {
    localStorage.clear('token');
    localStorage.clear('userId');
    localStorage.clear('userName');
    navigate("/sign-in");
  }

  return (
    <div id="wrapper" className={`wrapper-content ${isToggled ? 'toggled' : ''}`}>
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <p className="h3 text-spyellow py-3">Classic Cars</p>
        </li>
        <li><a id="sidelink" className={`${activeCompo === "dashboard"? "active":""}`} onClick={()=>setActiveCompo("dashboard")}><GraphUpArrow/> Dashboard</a></li>
        <li><a id="sidelink" className={`${activeCompo === "users"? "active":""}`} onClick={()=>setActiveCompo("users")}><PersonCircle/> Users</a></li>
        <li><a id="sidelink" className={`${activeCompo === "collection"? "active":""}`} onClick={()=>setActiveCompo("collection")}><BoxSeam/> Collection</a></li>
        <li><a id="sidelink" className={`${activeCompo === "opinions"? "active":""}`} onClick={()=>setActiveCompo("opinions")}><ChatSquareQuote/> Opinions</a></li>
        <li><a id="sidelink" className={`${activeCompo === "reports"? "active":""}`} onClick={()=>setActiveCompo("reports")}><Envelope/> Reports</a></li>
        <li><a id="sidelink" onClick={handleSignOut}><BoxArrowRight/> Sign out</a></li>
      </ul>
    </div>

    <div id="page-content-wrapper" style={{background: '#E2E8F0'}}>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
            <a className="btn-list mx-2" onClick={toggleMenu}>
              <List width={30} height={30} color="#2A2C41"/>
            </a>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="ti-panel"></i>
                  <p>Stats</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ti-settings"></i>
                  <p>Settings</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 wholeMenuPage">
            {activeCompo === "dashboard" && <Dashboard />}
            {activeCompo === "users" && <Users />}
            {activeCompo === "collection" && <Collection />}
            {activeCompo === "opinions" && <Opinions />}
            {activeCompo === "reports" && <Reports />}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SideBar;
