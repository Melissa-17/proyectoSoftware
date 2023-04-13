import React from "react";

export const sidebarDataProfessor = [
  {
    title: "INICIO",
    path: "/welcome",
    icon: <i className="bi bi-house-door"></i>,
    cName: "nav-text",
  },
  {
    title: "GESTIÓN DEL CURSO",
    path: "/courses",
    icon: <i className="bi bi-book"></i>,
    cName: "nav-text",
  },
  {
    title: "PORTAFOLIO",
    path: "/revisor", 
    icon: <i class="bi bi-file-zip"></i>,
    cName: "nav-text",
  },
  {
    title: "JURADOS",
    path: "/teacher/Jurados", 
    icon: <i class="bi bi-people"></i>,
    cName: "nav-text",
  },
  {
    title: "EXPOSICIONES",
    path: `/teacher/presentation/${3}`,
    icon: <i className="bi bi-calendar"></i>,
    cName: "nav-text",
  },
  {
    title: "REPORTES",
    icon: <i class="bi bi-file-bar-graph"></i>,
    iconClosed: <i className="bi bi-caret-down-fill"></i>,
    iconOpened: <i className="bi bi-caret-up-fill"></i>,
    subNav: [
      {
        title: "CALIF ALUMNOS",
        path: "/teacher/alumno/reporte",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "CALIF SEMESTRE",
        path: "/teacher/semestre/reporte",
        icon: <i className="bi bi-dot"></i>,
      },
    ],
    cName: "nav-text",
  },
];
