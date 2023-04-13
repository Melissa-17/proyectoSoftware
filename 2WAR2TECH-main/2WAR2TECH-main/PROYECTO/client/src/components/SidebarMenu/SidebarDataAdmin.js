import React from "react";

export const sidebarDataAdmin = [
  {
    title: "INICIO",
    path: "/welcome",
    icon: <i className="bi bi-house-door"></i>,
    cName: "nav-text",
  },
  {
    title: "GESTIONAR",
    icon: <i class="bi bi-columns-gap"></i>,
    iconClosed: <i className="bi bi-caret-down-fill"></i>,
    iconOpened: <i className="bi bi-caret-up-fill"></i>,
    subNav: [
      {
        title: "FACULTADES",
        path: "/faculty",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "ESPECIALIDADES",
        path: "/specialty",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "COORDINADORES",
        path: "/coordinator",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "SEMESTRES",
        path: "/semester",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "USUARIOS",
        path: "/users",
        icon: <i className="bi bi-dot"></i>,
      },
    ],
    cName: "nav-text",
  },
];
