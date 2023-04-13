import React from "react";

export const sidebarDataStudent = [
  {
    title: "INICIO",
    path: "/welcome",
    icon: <i className="bi bi-house-door"></i>,
    cName: "nav-text",
  },
  {
    title: "TEMAS DE TESIS",
    icon: <i className="bi bi-book"></i>,
    iconClosed: <i className="bi bi-caret-down-fill"></i>,
    iconOpened: <i className="bi bi-caret-up-fill"></i>,
    subNav: [
      {
        title: "LISTA DE TEMAS",
        path: "/Thesis/list",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "PROPONER TEMA",
        path: "/Thesis/propose",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "MIS SOLICITUDES",
        path: "/Thesis/request",
        icon: <i className="bi bi-dot"></i>,
      },
    ],
    cName: "nav-text",
  },
  {
    title: "MIS CURSOS",
    path: "/mycourses",
    icon: <i class="bi bi-bookmarks"></i>,
    cName: "nav-text",
  },
  // {
  //   title: "SOLICITUDES",
  //   path: "/",
  //   icon: <i className="bi bi-file-earmark-text"></i>,
  //   cName: "nav-text",
  // },
];
