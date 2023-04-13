import React from "react";
import "./ModalNuevaFacultad.css";
import { axiosPatchFaculty } from "../../../../api/Faculty";

export default function ModalNuevaFacultad({
  closeMessage,
  modalMessage,
  facultyItem,
  otroModalMessage
}) {

  const JWTtoken = sessionStorage.getItem("token");

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentNombre = document.querySelector(
      ".NombreEditNuevaFacultad"
    ).value;
    const idF = facultyItem.id;

    // console.log(commentAnotaciones);
    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      idF:idF,
      name: commentNombre,
    };
    // console.log(idF);
    // llamada al servicio
    axiosPatchFaculty(JWTtoken, commentFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      id="EditNuevaFacultad"
      className="EditNuevaFacultad"
      method="patch"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="modalGlobalNuevaFacultad">
        <div className="modalCuerpoNuevaFacultad">
          <div className="headerNuevaFacultad">
            <p>EDITAR FACULTAD</p>
            <button
              className="salirModalEditFacultad"
              type="button"
              onClick={() => {
                closeMessage(false);
              }}
              style={{marginLeft:"100px"}}
            >
              <i class="bi bi-x-lg" />
            </button>
          </div>
          <hr color="black" className="lineaHorizontalNuevaFacultad" />
          <div className="contenedorNombreNuevaFacultad">
            <p>Nombre*</p>
            <input
              type="text"
              placeholder="Coloque un nombre"
              defaultValue={facultyItem && facultyItem.name? facultyItem.name: ""}
              className="NombreEditNuevaFacultad"
            />
          </div>
          <div className="botoneriaNuevaFacultadEd">
            <button
              className="cancelar"
              type="button"
              onClick={() => {
                closeMessage(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="guardar"
              type="submit"
              form="EditNuevaFacultad"
              onClick={() => {
                modalMessage(true);
                otroModalMessage(true);
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
