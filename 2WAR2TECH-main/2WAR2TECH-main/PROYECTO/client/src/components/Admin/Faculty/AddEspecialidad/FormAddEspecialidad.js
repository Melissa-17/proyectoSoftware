import React from "react";
import CardEspecialidadFacultyPart from "./CardEspecialidadFacultyPart";
import "../../../../assets/styles/Admin/Faculty/Visual/VisualPart.css";

export default function FormAddEspecialidad(props) {
    const {setModalAlerta,setModalMensaje, facultyItem} = props;
    const handleCommentSubmit = (e) => {
        e.preventDefault();
    
        const commentNombre = document.querySelector(
          ".inputNombreFacultadVisualPart"
        ).value;
        const commentCodigo = document.querySelector(
          ".inputCodigoFacultadVisualPart"
        ).value;
    
        // La estructura de este formData la obtienes del
        // body que indica en el AXIOS
        // const commentFormData = {
        //   description: comment,
        //   name: commentNombre,
        // };
        // llamada al servicio
    
        // axiosEditCriteria(
        //   JWTtoken,
        // )
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      };
  return (
    <form
    id="editAddEspecialidadAdmin"
    className="editAddEspecialidadAdmin"
    method="post"
    onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="contendorInfoFacultadVisualPart">
        <div className="nombreFacultadVisualPart">
          <p className="titulo">Nombre*</p>
          <input
            type="text"
            placeholder="Coloque un nombre"
            className="inputNombreFacultadVisualPart"
          />
        </div>
        <div className="codigoFacultadVisualPart">
          <p className="titulo">Codigo*</p>
          <input
            type="text"
            placeholder="Coloque un código"
            className="inputCodigoFacultadVisualPart"
          />
        </div>
      </div>

      <div className="contenedorEspecialidad">
        <div className="primeraFilaContenedorCoordinador">
          <p>Coordinador responsable*</p>
          <button
          type="button"
          >Agregar Coordinador</button>
        </div>

        <div className="cardsEspecialidadFacultyPart">
          <CardEspecialidadFacultyPart />
        </div>
      </div>

      <div className="botonGuardarBorrar">
        <button
          className="botonCancelarEditPartFaculty"
          onClick={() => {
            setModalAlerta(true);
          }}
          type="button"
        >
          Cancelar
        </button>
        <button
          className="botonGuardarEditPartFaculty"
          onClick={() => {
            setModalMensaje(true);
          }}
          type="submit"
          form="editAddEspecialidadAdmin"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
