import React from "react";

export const sidebarDataCoordinator = [
  {
    title: "INICIO",
    path: "/welcome",
    icon: <i className="bi bi-house-door"></i>,
    cName: "nav-text",
  },
  // {
  //   title: "SEMESTRE",
  //   path: "/Semestre/pantalla",
  //   icon: <i className="bi bi-calendar-check"></i>,
  //   cName: "nav-text",
  // },
  // {
  //   title: "SOLICITUDES",
  //   path: "/asesor-approval", //ACÁ FALTA PONER LA RUTA
  //   icon: <i className="bi bi-pencil-square"></i>,
  //   cName: "nav-text",
  // },
  {
    title: "CURSOS",
    path: "/Coordinador/curso",
    icon: <i class="bi bi-journals"></i>,
    cName: "nav-text",
  },
  {
    title: "HORARIOS",
    path: "/Coordinador/horario",
    icon: <i className="bi bi-calendar-check"></i>,
    cName: "nav-text",
  },
  {
    title: "USUARIOS",
    icon: <i class="bi bi-people"></i>,
    iconClosed: <i className="bi bi-caret-down-fill"></i>,
    iconOpened: <i className="bi bi-caret-up-fill"></i>,
    subNav: [
      {
        title: "PROFESORES",
        path: "/Coordinador/profesores",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "ASESORES",
        path: "/Coordinador/asesores",
        icon: <i className="bi bi-dot"></i>,
      },
      
    ],
    cName: "nav-text",
  },
  // {
  //   title: "PROFESORES",
  //   path: "/Coordinador/profesores",
  //   icon: <i class="bi bi-people"></i>,
  //   cName: "nav-text",
  // },
  // {
  //   title: "ASESORES",
  //   path: "/Coordinador/asesores", //ACÁ FALTA PONER LA RUTA
  //   icon: <i class="bi bi-people"></i>,
  //   cName: "nav-text",
  // },
  {
    title: "TESIS",
    icon: <i class="bi bi-journal-plus"></i>,
    iconClosed: <i className="bi bi-caret-down-fill"></i>,
    iconOpened: <i className="bi bi-caret-up-fill"></i>,
    subNav: [
      {
        title: "TEMAS DE TESIS",
        path: "/asesor-approval",
        icon: <i className="bi bi-dot"></i>,
      },
      {
        title: "SUSTENTACIONES",
        path: "/Sustentaciones",
        icon: <i className="bi bi-dot"></i>,
      },
      
    ],
    cName: "nav-text",
  },
  // {
  //   title: "APROBAR TEMAS",
  //   path: "/asesor-approval", 
  //   icon: <i class="bi bi-journal-plus"></i>,
  //   cName: "nav-text",
  // },
  // {
  //   title: "SUSTENTACIONES",
  //   path: "/Sustentaciones",
  //   icon: <i class="bi bi-person-check"></i>,
  //   cName: "nav-text",
  // },
  
];
