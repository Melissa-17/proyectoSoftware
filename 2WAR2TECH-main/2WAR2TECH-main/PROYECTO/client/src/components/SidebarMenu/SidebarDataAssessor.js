import React from "react";

export const sidebarDataAssessor = [
  {
    title: "INICIO",
    path: "/welcome",
    icon: <i className="bi bi-house-door"></i>,
    cName: "nav-text",
  },
  {
    title: "TEMAS DE TESIS",
    path: "/asesor/contentPropose",
    icon: <i className="bi bi-pencil-square"></i>,
    cName: "nav-text",
  },
  {
    title: "PORTAFOLIO",
    path: "/revisor", //ACÁ FALTA PONER LA RUTA
    icon: <i className="bi bi-archive"></i>,
    cName: "nav-text",
  },
  {
    title: "EXPOSICIONES",
    path: `/asesor/presentation/${2}`, //ACÁ FALTA PONER LA RUTA
    icon: <i className="bi bi-calendar"></i>,
    cName: "nav-text",
  },
];
