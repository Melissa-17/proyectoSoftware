import React, { useState, useEffect } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import "../../../../assets/styles/Admin/Faculty/Visual/VisualPart.css";
import Header from "./Header";
import { useNavigate } from "react-router";
import CardEspecialidadFacultyPart from "./CardEspecialidadFacultyPart";
import { useLocation } from "react-router";
import { axiosGetDetailFaculty } from "../../../../api/Faculty";
import { Paginacion } from "#Components/Pagination/Pagination.js";

export default function VisualPartFacultyAdmin() {
  const navigate = useNavigate();
  const { facultyItem } = useLocation().state;
  const [facultyDetail, setFacultyDetail] = useState();
  const cambioEdit = () => {
    navigate("/faculty/edit", {
      state: {
        option: 1,
        facultyItem: facultyItem,
      },
    });
  };

  const JWTtoken = sessionStorage.getItem("token");

  const getFacultyDetail = () => {
    axiosGetDetailFaculty(JWTtoken, facultyItem.id)
      .then((response) => {
        // console.log(response.data);
        const data = response.data || "";
        setFacultyDetail(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getFacultyDetail();
  }, []);

  function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || "0") + nr;
  }

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  

  const maximo = facultyDetail && facultyDetail.SPECIALTies?
  Math.ceil(facultyDetail.SPECIALTies.length / porPagina):1;

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorVisualPart">
        <Header />
        <div className="contenedorPrimeraParte">
          {/* <p>Leyenda: Los campos con * son obligatorios</p> */}
          <button
            className="botonEditarFacultadVisualPart"
            onClick={cambioEdit}
          >
            Editar Facultad
          </button>
        </div>
        <div className="contendorInfoFacultadVisualPart">
          <div className="nombreFacultadVisualPart">
            <p className="titulo">Nombre</p>
            {/* <input 
                type="text"
                placeholder="Coloque un nombre"
                className="inputNombreFacultadVisualPart"
                /> */}
            <p className="rpta">{facultyDetail && facultyDetail.name?
            facultyDetail.name:"No tiene nombre"}</p>
          </div>
          <div className="codigoFacultadVisualPart">
            <p className="titulo">Codigo</p>
            {/* <input 
                type="text"
                placeholder="Coloque un código"
                className="inputCodigoFacultadVisualPart"
                /> */}
            <p className="rpta">{padLeft(facultyItem.id, 6)}</p>
          </div>
        </div>
        <div className="contenedorEspecialidad">
          <p>Especialidades</p>
          <div className="cardsEspecialidadFacultyPart">
            {facultyDetail && facultyDetail.SPECIALTies
            ? facultyDetail.SPECIALTies
                .slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina
                )
                .map((especialidad, index) => {
                  return (
                    <div key={index} className="espaciadoDeliverable">
                      <CardEspecialidadFacultyPart
                      especialidad={especialidad}
                      option={1}
                      />
                    </div>
                  );
                })
            : null}
          </div>
        </div>
        <div className="contenedorBotoneriaEntregable">
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
          />
        </div>
      </div>
    </div>
  );
}
