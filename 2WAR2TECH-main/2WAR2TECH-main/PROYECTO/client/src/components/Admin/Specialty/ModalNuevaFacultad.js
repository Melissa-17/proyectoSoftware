import React from "react";
import "./ModalNuevaFacultad.css";
import { axiosPostSpecialty } from "../../../api/Specialty";

export default function ModalNuevaFacultad({ closeMessage, modalMessage, facultadSeleccionado }) {
  const JWTtoken = sessionStorage.getItem("token");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    const commentNombre = document.querySelector(
      ".nombreRegistroNuevaFacultad"
    ).value;

    // console.log(commentAnotaciones);
    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      name: commentNombre,
      idF: facultadSeleccionado
    };
    // console.log(commentNombre);
    // llamada al servicio
    axiosPostSpecialty(JWTtoken, commentFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      id="registroNuevaFacultad"
      className="registroNuevaFacultad"
      method="post"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="modalGlobalNuevaFacultad">
        <div className="modalCuerpoNuevaFacultad">
          <div className="headerNuevaFacultad">
            <p>REGISTRO ESPECIALIDAD</p>
            <button
              className="salirModalNuevaFacultad"
              type="button"
              onClick={() => {
                closeMessage(false);
              }}
            >
              <i class="bi bi-x-lg" />
            </button>
          </div>
          <hr color="black" className="lineaHorizontalNuevaFacultad" />
          <div className="contenedorNombreNuevaFacultad">
            <p>Nombre*</p>
            <input type="text" placeholder="Coloque un nombre" 
            className="nombreRegistroNuevaFacultad"
            />
          </div>
          <div className="botoneriaNuevaFacultad">
            <button
              className="cancelar"
              type="button"
              onClick={() => {
                closeMessage(false);
              }}
            >
              Cancelar
            </button>
            <button className="guardar"
            type="submit"
            form="registroNuevaFacultad"
            onClick={() => {
              modalMessage(true);
            }}
            >Guardar</button>
          </div>
        </div>
      </div>
    </form>
  );
}
