import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AvancesPrincipal from "./Contenido";
import "../../../../assets/styles/Alumno/AvancesPrincipal/ScreenAvances.css";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import { useLocation } from "react-router-dom";

export default function ScreenAvances() {
  const navigate = useNavigate();
  const { cxsid, courseName } = useLocation().state;
  const retrocesoClic = () => {
    navigate("/mycourses/selection",{
      state:{
        cxsid:cxsid,
        courseName:courseName,
      }
    });
  };
  return (
    <div>
      <div className="contenedorPantallaTodo">
        <CreateNewUserPageStudent />
        <div className="contenedorTodo">
          <div className="contenedorContenido">
            <div className="contenedorTitulo">
              <h1 className="titulo">AVANCES</h1>
              <div className="contenedorBotonVisualPart">
                <button
                  onClick={retrocesoClic}
                  className="botonRetrocesoDetalle"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                    className="imagenRetrocesoDetalle"
                  />
                </button>
              </div>
            </div>
            <div className="contenedorOpcionesAvance">
              <AvancesPrincipal 
              cxsid={cxsid}
              courseName={courseName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
