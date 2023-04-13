import React from "react";
import '../ModalNuevaFacultad.css';
import { axiosPatchSpecialty } from "../../../../api/Specialty";

export default function ModalEditEspecialidad(props) {
  const closeMessage = props.closeMessage ? props.closeMessage : (()=>{})();
  // const modalMessage = props.modalMessage ? props.modalMessage : (()=>{})();
  const openModal = props.openModal ? props.openModal : (()=>{})();
  const { especialidad } = props;
  // const closeMessage = props.closeMessage ? props.closeMessage : (()=>{})();
  const JWTtoken = sessionStorage.getItem("token");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    
    const commentNombre = document.querySelector(
      ".nombreEditEspecialidad"
    ).value;

    // console.log(commentAnotaciones);
    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS

    const commentFormData = {
      idS: especialidad.id,
      name: commentNombre
    };
    // console.log(especialidad.id);
    // // llamada al servicio
    
    axiosPatchSpecialty(JWTtoken, commentFormData)
      .then((res) => {
        console.log(res);
        // closeMessage(false);
        openModal(true);
        closeMessage(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      id="editEspecialidadModal"
      className="editEspecialidadModal"
      method="patch"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="modalGlobalNuevaFacultad">
        <div className="modalCuerpoNuevaFacultad">
          <div className="headerNuevaFacultad">
            <p>EDITAR ESPECIALIDAD</p>
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
            className="nombreEditEspecialidad"
            defaultValue={especialidad.name}
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
            form="editEspecialidadModal"
            
            >Guardar</button>
          </div>
        </div>
      </div>
    </form>
  );
}
