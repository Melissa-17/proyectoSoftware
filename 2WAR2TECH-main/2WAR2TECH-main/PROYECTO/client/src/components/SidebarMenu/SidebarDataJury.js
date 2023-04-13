import React from "react";

export const sidebarDataJury = [
  {
    title: "INICIO",
    path: "/welcome",
    icon: <i className="bi bi-house-door"></i>,
    cName: "nav-text",
  },
  {
    title: "ENTREGABLES",
    path: "/revisor",
    icon: <i className="bi bi-pencil-square"></i>,
    cName: "nav-text",
  },
  {
    title: "EXPOSICIONES",
    path: `/jury/presentation/${1}`, //ACÁ FALTA PONER LA RUTA
    icon: <i className="bi bi-calendar"></i>,
    cName: "nav-text",
  },
];
