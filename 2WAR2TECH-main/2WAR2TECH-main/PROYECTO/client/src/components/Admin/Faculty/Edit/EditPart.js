import React, { useState, useEffect } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import "#Styles/Admin/Faculty/Visual/VisualPart.css";
import Header from "./Header";
import { useLocation } from "react-router";
import ModalsAlertFacultyAdmin from "./ModalsAlert";
import ModalsMessageFacultyAdmin from "./ModalsMessageLevel";
import FormEdit from "./FormEdit";
import { axiosGetDetailFaculty } from "#API/Faculty";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalNuevaFacultad from "./ModalNuevaFacultad";
import ModalConfirmated from "./ModalConfirmated";

export default function EditPartFacultyPart() {
  const { facultyItem } = useLocation().state;

  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [facultyDetail, setFacultyDetail] = useState();

  const [modalEditFacultad, setModalEditFacultad] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const JWTtoken = sessionStorage.getItem("token");

  const getFacultyDetail = () => {
    axiosGetDetailFaculty(JWTtoken, facultyItem.id)
      .then((response) => {
        console.log(response.data);
        const data = response.data || "";
        setFacultyDetail(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getFacultyDetail();
  }, [modalConfirmacion, modalMensaje]);

  function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || "0") + nr;
  }

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  
// console.log(facultyDetail);
  const maximo = facultyDetail && facultyDetail.SPECIALTies?
  Math.ceil(facultyDetail.SPECIALTies.length / porPagina):"";

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorVisualPart">
        <Header facultyItem={facultyItem} />
        <div className="contenedorPrimeraParte">
          <p>Leyenda: Los campos con * son obligatorios</p>
          <button
            className="botonEditarFacultadVisualPart"
            onClick={()=>{setModalEditFacultad(true);}}
          >
            Editar Facultad
          </button>
        </div>
        <div>
          <FormEdit
            setModalAlerta={setModalAlerta}
            setModalMensaje={setModalMensaje}
            facultyItem={facultyItem}
            facultyDetail={facultyDetail}
            isLoading={isLoading}
          />
        </div>
      </div>
      {modalAlerta && (
        <ModalsAlertFacultyAdmin
          closeAlert={setModalAlerta}
          alertText="¿Seguro que quiere cancelar los cambios?"
        />
      )}
      {modalMensaje && (
        <ModalsMessageFacultyAdmin
          closeMessage={setModalMensaje}
          message="Se guardó correctamente los cambios"
        />
      )}
      {modalEditFacultad && <ModalNuevaFacultad 
      closeMessage={setModalEditFacultad}
      facultyItem={facultyItem}
      modalMessage={setModalConfirmacion}
      />}
      {modalConfirmacion && <ModalConfirmated 
      closeMessage={setModalConfirmacion}
      message="Se guardó los cambios correctamente"
      otroModal={setModalEditFacultad}
      />}
    </div>
  );
}
