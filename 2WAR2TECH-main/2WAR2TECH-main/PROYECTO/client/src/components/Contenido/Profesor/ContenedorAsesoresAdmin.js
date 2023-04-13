import React, { useEffect } from "react";
import "#Styles/Teacher/Administration/listadoAlumno.css";
// import '../../../../assets/styles/Teacher/Administration/listadoAlumno.css';
import moment from "moment";
import { useState } from "react";
import { axiosGetSemestres } from "#API/Semestres.js";
import { axiosGetCursos } from "#API/Cursos.js";
import { getValorEstado } from "#Helpers/getValorEstado";
import { CajaAsesor } from "./cajaAsesor.js";

export function ContenedorAsesoresAdmin(props) {
  const { asesoresList } = props;
//   console.log(asesoresList);

  return (
    <div className="contenedordeAlumnos">
      {/* {console.log(asesoresList)} */}
      <div className="contenedorAlumno">
        {asesoresList && asesoresList.length > 0 ? (
          // console.log(asesoresList.length)
          asesoresList.map((asesor, index) => {
            return (
              <div key={index} className="espaciado">
                <CajaAsesor asesor={asesor} />
              </div>
            );
          })
        ) : (
          <p>No hay asesores matriculados</p>
        )}
      </div>
    </div>
  );
}
