import React, { useContext, useEffect, useState } from "react";
import "#Styles/Coordinador/Semestres/BuscadorProfesores.css";
import { useNavigate } from "react-router-dom";
import TeammateResult from "./TeammateResult.js";
import { axiosSeekerBySpecialtyAndRole } from "#API/Seeker";
import { UserContext } from "#Context/userContext";

function TeammateSearch(props) {
  const {
    closeModal,
    selectedTeammate,
    setSelectedTeammate,
    selectedTeammateList,
    setSelectedTeammateList,
  } = props;
  const [listaAlumnos, setListaAlumnos] = useState([]);
  const JWTtoken = localStorage.getItem("token");
  const [inputTeammate, setInputTeammate] = useState("");
  let userInfo = useContext(UserContext);
  userInfo = userInfo ? userInfo : JSON.parse(localStorage.getItem('user'));

  const getAllTeammatesList = (tipo, texto) => {
    axiosSeekerBySpecialtyAndRole(JWTtoken, tipo, texto)
      .then((response) => {
        //console.log(response.data);
        const list = response.data || [];
        console.log(response.data);
        setListaAlumnos(list.rows.filter((e) => e.id != userInfo.id));
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const handleinputChange = (e) => {
    setInputTeammate(e.target.value);
  };

  useEffect(() => {
    getAllTeammatesList("Alumno", inputTeammate);
  });

  useEffect(() => {}, [selectedTeammate, selectedTeammateList]);

  return (
    <div className="bpmodalBackground">
      <div className="BuscadorProfesor">
        <div className="fila">
          <h4 className="tituloDescripcion"> Buscador de Alumnos</h4>
          <div className="espaciobuscador"></div>
          <button className="titleCloseBtn" onClick={() => closeModal(false)}>
            X{" "}
          </button>
        </div>

        <div className="inputBuscador">
          <div>
            <input
                type="text"
                id="busqueda"
                onChange={handleinputChange}
                placeholder="Ingrese un nombre..."
              ></input>
              <button className="busquedaNombre">
                <i class="bi bi-search" />
              </button>
          </div>
        </div>
        <div className="contenedorlistado">
          {listaAlumnos ? (
            listaAlumnos.map((teammate, index) => {
              return (
                <div key={index} className="espaciado">
                  <hr color="black" className="lineaContenido" />
                  <TeammateResult
                    teammate={teammate}
                    closeModal={closeModal}
                    selectedTeammate={selectedTeammate}
                    setSelectedTeammate={setSelectedTeammate}
                    selectedTeammateList={selectedTeammateList}
                    setSelectedTeammateList={setSelectedTeammateList}
                  />
                </div>
              );
            })
          ) : (
            <p> no resultados</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeammateSearch;
