import React from "react";
import "#Styles/Sidebar/Admin.css";

export default function SidebarAdministrador(props) {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* HEADER push button*/}
      <div className="brand-link ">
        
        <a className="pushmenu" data-widget="pushmenu" href="" role="button">
        <i className="fas fa-bars" />
        </a>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="" className="d-block">
              {props.name}
            </a>
            <p className="role">
              {props.role}
            </p>
          </div>
        </div>
        
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar "
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            
            <li className="nav-item">
              <a href="" className="nav-link">
                <img src="https://img.icons8.com/windows/512/home.png" className="imagenBar" />
                <p>
                  INICIO
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                <img src="https://cdn-icons-png.flaticon.com/512/2421/2421033.png" className="imagenBar"/>
                <p>
                  {props.theme1}
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                <img src="https://cdn-icons-png.flaticon.com/512/3313/3313480.png" className="imagenBar" />
                <p>
                  {props.theme2}
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="" className="nav-link">
                    <p>{props.theme2_1}</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href=""
                    className="nav-link"
                  >
                    <p>{props.theme2_2}</p>
                  </a>
                </li>
              </ul>
            </li>
            
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}