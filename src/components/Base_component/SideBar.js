//? To install fontawesome icons...
//? npm i --save @fortawesome/fontawesome-svg-core
//? npm install --save @fortawesome/free-solid-svg-icons
//? npm install --save @fortawesome/react-fontawesome
// ---------------------------------------------------------
import {
  faTachometerAlt,
  faList,
  faAdd,
  faUserGraduate,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function SideBar({ setAnimate_visible }) {
  const [boolean, setboolean] = useState();
  useEffect(() => {
    const visible = JSON.parse(window.localStorage.getItem("dashboard"));
    setboolean(visible);
  }, []);
  // -------------------------------------------------------------------------------------
  return (
    <>
      {/*Sidebar*/}
      <ul
        className="navbar-nav sidebar-color sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*Sidebar - Brand*/}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15 sb-admin-icon">
            {boolean ? (
              <FontAwesomeIcon icon={faUserGroup} />
            ) : (
              <FontAwesomeIcon icon={faUserGraduate} />
            )}
          </div>
          <div className="sidebar-brand-text ">
            {boolean ? "Student Database" : "Teacher Database"}
          </div>
        </Link>
        {/* ---------------------------*/}
        {/*Divider*/}
        <hr className="sidebar-divider my-0" />
        {/* ---------------------------*/}
        {/*Nav Item - Dashboard*/}
        <li className="nav-item active side-list-item">
          <Link
            className="nav-link"
            to="/dashboard"
            onClick={() => setAnimate_visible(true)}
          >
            <FontAwesomeIcon className="sidebar-icon" icon={faTachometerAlt} />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* ---------------------------*/}
        {/*Divider*/}
        <hr className="sidebar-divider" />
        {/* ---------------------------*/}

        {/*Heading*/}
        <div className="sidebar-heading">Addons</div>

        {/* -------------------------------------------------------------*/}
        {/*Nav Item - ADD DATA*/}
        <li className="nav-item side-list-item active">
          <Link
            className="nav-link"
            to={boolean ? "/dashboard/Add-Data" : "/dashboard/Add-Teacher-Data"}
            onClick={() => setAnimate_visible(false)}
          >
            <FontAwesomeIcon className="sidebar-icon" icon={faAdd} />
            <span style={{ letterSpacing: "0.5px" }}>Add Data</span>
          </Link>
        </li>
        {/* -------------------------------------------------------------*/}
        {/*Nav Item - EDIT DATA*/}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/dashboard/Edit-Data">
            <FontAwesomeIcon className="sidebar-icon" icon={faEdit} />
            <span>Edit Data</span>
          </Link>
        </li> */}
        {/* -------------------------------------------------------------*/}
        {/*Nav Item - STUDEN PROFILE*/}
        {/* <li className="nav-item">
          <Link className="nav-link" to={Dashboard_visible?"/dashboard/Student-Profile":"/dashboard/Teacher-Profile"}>
            <FontAwesomeIcon className="sidebar-icon" icon={faUserFriends} />
            <span>
              {Dashboard_visible ? "Student Profile" : "Teacher Profile"}
            </span>
          </Link>
        </li> */}
        {/* -------------------------------------------------------------*/}
        {/*Nav Item - STUDENT LISTS*/}
        <li className="nav-item side-list-item active">
          <Link
            className="nav-link"
            onClick={() => setAnimate_visible(false)}
            to={
              boolean ? "/dashboard/Student-Lists" : "/dashboard/Teacher-Lists"
            }
          >
            <FontAwesomeIcon className="sidebar-icon" icon={faList} />
            <span style={{ letterSpacing: "0.5px" }}>
              {boolean ? "Students List" : "Teachers List"}
            </span>
          </Link>
        </li>
        {/* -------------------------------------------------------------*/}
        {/* ---------------------------*/}
        {/*Divider*/}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* ---------------------------*/}
        {/*Sidebar Message*/}
      </ul>
      {/*End of Sidebar*/}
    </>
  );
}

export default SideBar;
