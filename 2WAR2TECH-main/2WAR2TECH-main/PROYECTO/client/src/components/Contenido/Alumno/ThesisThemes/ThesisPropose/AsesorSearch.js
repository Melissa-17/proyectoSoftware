import React, { useContext, useEffect, useState } from "react";
import "#Styles/Coordinador/Semestres/BuscadorProfesores.css";
import { useNavigate } from "react-router-dom";
import AsesorResult from "./AsesorResult.js";
import { axiosSeekerBySpecialtyAndRole } from "#API/Seeker";

function AsesorSearch(props) {
  const {
    closeModal,
    selectedUser,
    setSelectedUser,
  } = props;

  const [listUser, setListUsers] = useState([]);
  const JWTtoken = localStorage.getItem("token");
  const [inputTeammate, setInputTeammate] = useState("");

  const getAllTeammatesList = (tipo, texto) => {
    axiosSeekerBySpecialtyAndRole(JWTtoken, tipo, texto)
      .then((response) => {
        console.log(response.data);
        const list = response.data || [];
        setListUsers(list.rows);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const handleinputChange = (e) => {
    setInputTeammate(e.target.value);
  };

  useEffect(() => {
    getAllTeammatesList("Asesor", inputTeammate);
  });

  useEffect(() => {}, [selectedUser, setSelectedUser]);

  return (
    <div className="bpmodalBackground">
      <div className="BuscadorProfesor">
        <div className="fila">
          <h4 className="tituloDescripcion"> Buscador de Profesores</h4>
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
          {listUser ? (
            listUser.map((user, index) => {
              return (
                <div key={index} className="espaciado">
                  <hr color="black" className="lineaContenido" />
                  <AsesorResult
                    user={user}
                    closeModal={closeModal}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
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

export default AsesorSearch;
