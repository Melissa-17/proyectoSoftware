import React, {useState, useEffect} from "react";
import "../../../assets/styles/Admin/Faculty/Visual/VisualPart.css"
import { useNavigate } from "react-router";
import { Paginacion } from "#Components/Pagination/Pagination.js";

export default function FormEdit(props) {
  const JWTtoken = sessionStorage.getItem("token");
  const {
    facultyItem,
    facultyDetail,
  } = props;

  const [modalNuevoEspecialidad, setModalNuevoEspecialidad] = useState(false);

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

  function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || "0") + nr;
  }

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  

  const maximo = facultyDetail && facultyDetail.SPECIALTies?
  Math.ceil(facultyDetail.SPECIALTies.length / porPagina):1;

  return (
    <form
      id="editAdmiFacultad"
      className="editAdmiFacultad"
      method="post"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="contendorInfoFacultadVisualPart">
        <div className="nombreFacultadVisualPart">
          <p className="titulo">Nombre*</p>
          {/* <input
            type="text"
            placeholder="Coloque un nombre"
            className="inputNombreFacultadVisualPart"
            defaultValue={
              facultyDetail && facultyDetail.name ? facultyDetail.name : ""
            }
          /> */}
          <p className="rpta">{facultyDetail && facultyDetail.name?
            facultyDetail.name:"No tiene nombre"}</p>
        </div>
        <div className="codigoFacultadVisualPart">
          <p className="titulo">Codigo*</p>
          <p className="rpta">{padLeft(facultyItem.id, 6)}</p>
        </div>
      </div>

      <div className="contenedorEspecialidad">
        <div className="primeraFilaContenedorEspecialidad">
          <p>Especialidades*</p>
          <button onClick={()=>{setModalNuevoEspecialidad(true);}}>Agregar Especialidad</button>
        </div>

        {/* <div className="cardsEspecialidadFacultyPart">
          {facultyDetail && facultyDetail.SPECIALTies
            ? facultyDetail.SPECIALTies.slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              ).map((especialidad, index) => {
                return (
                  <div key={index} className="espaciadoDeliverable">
                    <CardEspecialidadFacultyPart especialidad={especialidad} />
                  </div>
                );
              })
            : null}
        </div> */}
      </div>
      <div className="contenedorBotoneriaEntregable" style={{marginTop:"20px"}}>
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
          />
        </div>
      
      <div>
        {modalNuevoEspecialidad}
      </div>
    </form>
  );
}
