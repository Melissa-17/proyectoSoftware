import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Submenu from "./SubMenu";
import "#Styles/Sidebar/Navbar.css";

import { axiosGetUser } from "#API/GetUser.js";
import { capitalize } from "#Helpers/stringHelpers";

// import { axiosGetUserAuth } from "#API/User.js";
import { useEffect } from "react";
import { getNavbarByRole, getNavbarColorByRole } from "#Helpers/navbarHelpers";
import { Buffer } from "buffer";
import logo from "./Logo/LogoPUCP.png";
import { UserContext } from "#Context/userContext";

function Navbar() {
  const [mainsidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!mainsidebar);

  // const [user, setUser] = useState([]);
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  const [navbarColor, setNavbarColor] = useState("#AAB8C6");
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  // const JWTtoken = sessionStorage.getItem("token");
  const profileStyle = (navColor) => {
    return { color: navColor };
  };

  const goManagement = () => {
    navigate("/login/management", {
      state: {
        userItem: user,
      },
    });
  };

  // const getUser = () => {
  //   axiosGetUser(JWTtoken)
  //     .then((response) => {
  //       const user = response.data;
  //       setUser(user);
  //       setLoading(false);
  //       setNavbarColor(getNavbarColorByRole(user.ROLEs[0].description));
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  const logoutSession = async () => {
    window.open("http://localhost:3001/test-user/logout", "_self");
  };

  return (
    <div>
      {/* <div className="navbar">
        <Link to="#" className="menu-bars">
          <i className="bi bi-list" onClick={showSidebar} />
        </Link>
      </div> */}
      <nav className={"nav-menu active"}>
        <ul className="nav-menu-items">
          {/* {console.log(user)} */}
          {/*<li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <i className="bi bi-list" onClick={showSidebar} />
            </Link>
          </li> */}
          (
          <div className="manage">
            <button onClick={goManagement}>
            <i class="bi bi-gear"></i>
            </button>
          </div>
          <div className="profile" style={profileStyle(navbarColor)}>
            <div className="spaceBar"></div>
            {/* {user.photo && (
                <img
                  className="profile-img"
                  src={`data:image/png;base64,${Buffer.from(
                    user.photo.data
                  ).toString("base64")}`}
                  alt="profile-pic"
                />
              )} */}
            {user.photo ? (
              <img
                className="profile-img"
                src={`data:image/png;base64,${Buffer.from(
                  user.photo.data
                ).toString("base64")}`}
                alt="profile-pic"
              />
            ) : (
              <img
                className="profile-img"
                // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                src="https://wallpapercave.com/uwp/uwp2417748.png"
                alt="foto asesor"
              />
            )}
            <p className="profile-name">
              {user.name} {user.fLastName} {user.mLastName}
            </p>
            <p className="profile-role">
              {capitalize(user.ROLEs[0].description)}
            </p>
            <hr className="navbar-divider"></hr>
            {getNavbarByRole(user.ROLEs[0].description, Submenu)}
          </div>
          )
          <div className="logout">
            <i className="bi bi-box-arrow-left" onClick={logoutSession}>
              Logout
            </i>
          </div>
          <div className="logoPUCP">
            <img src={logo} alt="pucp-logo"></img>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
