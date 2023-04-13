import React, { useState, useEffect } from "react";
import "#Styles/Admin/Faculty/Visual/VisualPart.css";
// import { useNavigate } from "react-router";
import CardEspecialidadFacultyPart from "./CardEspecialidadFacultyPart";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";

export default function FormEdit(props) {
  const JWTtoken = sessionStorage.getItem("token");
  const {
    setModalAlerta,
    setModalMensaje,
    facultyItem,
    facultyDetail,
    isLoading,
  } = props;

  // console.log(facultyDetail);
  // const navigate = useNavigate();
  // const cambioAddEspecialidad = () => {
  //   navigate("/faculty/addEspecialidad", {
  //     state: {
  //       option: option,
  //       facultyItem: facultyItem,
  //     },
  //   });
  // };

  // const handleCommentSubmit = (e) => {
  //   e.preventDefault();

  //   const commentNombre = document.querySelector(
  //     ".inputNombreFacultadVisualPart"
  //   ).value;
  //   const commentCodigo = document.querySelector(
  //     ".inputCodigoFacultadVisualPart"
  //   ).value;

  //   // La estructura de este formData la obtienes del
  //   // body que indica en el AXIOS
  //   const commentFormData = {
  //     description: comment,
  //     name: commentNombre,
  //   };
  //   // llamada al servicio

  //   axiosEditCriteria(
  //     JWTtoken,
  //   )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || "0") + nr;
  }

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo =
    facultyDetail && facultyDetail.specialty.count
      ? Math.ceil(facultyDetail.specialty.count / porPagina)
      : "";

  return (
    // <form
    //   id="editAdmiFacultad"
    //   className="editAdmiFacultad"
    //   method="post"
    //   onSubmit={(e) => handleCommentSubmit(e)}
    // >
    <div>
      <div className="contendorInfoFacultadVisualPart">
        <div className="nombreFacultadVisualPart">
          <p className="titulo">Nombre *</p>
          {/* <input
            type="text"
            placeholder="Coloque un nombre"
            className="inputNombreFacultadVisualPart"
            defaultValue={
              facultyDetail && facultyDetail.name ? facultyDetail.name : ""
            }
          /> */}
          <p className="rpta">
            {(facultyDetail &&
            facultyDetail.faculty &&
            facultyDetail.faculty.name
              ? facultyDetail.faculty.name
              : "Error con el nombre"
            ).toUpperCase()}
          </p>
        </div>
        <div className="codigoFacultadVisualPart">
          <p className="titulo">Codigo *</p>
          <p className="rpta">{padLeft(facultyItem.id, 6)}</p>
        </div>
      </div>

      <div className="contenedorEspecialidad">
        <div className="cardsEspecialidadFacultyPart">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={16}
            />
          ) : facultyDetail && facultyDetail.specialty.rows && facultyDetail.specialty.count > 0 ? (
            facultyDetail.specialty.rows
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((especialidad, index) => {
                return (
                  <div key={index} className="espaciadoDeliverable">
                    <CardEspecialidadFacultyPart especialidad={especialidad} />
                  </div>
                );
              })
          ) : (
            <div className="notYetDiv">
              <p className="notYet">Aún no hay especialidades registradas</p>
            </div>
          )}
        </div>
      </div>
      <div
        className="contenedorBotoneriaEntregable"
        style={{ marginTop: "20px" }}
      >
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>
      {/* <div className="botonGuardarBorrar">
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
          form="editAdmiFacultad"
        >
          Guardar
        </button>
      </div> */}
    </div>
    // </form>
  );
}
