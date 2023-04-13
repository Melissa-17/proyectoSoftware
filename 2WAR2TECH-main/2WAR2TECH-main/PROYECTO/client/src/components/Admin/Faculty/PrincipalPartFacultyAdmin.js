import React, { useState, useEffect } from "react";
import "../../../assets/styles/Admin/Faculty/PrincipalPartFacultyAdmin.css";
import Header from "./Header";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import Botoneria from "./Botoneria";
import Icon from "./Icon";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { axiosGetPaginationFaculties } from "#API/Faculty";
import { GridLoader } from "react-spinners";

export default function PrincipalPartFacultyAdmin() {
  const JWTtoken = sessionStorage.getItem("token");
  const [facultyList, setFacultyList] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteList, setDeleteList] = useState([]);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  const [modalNuevaFacultad, setModalNuevaFacultad] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(6);

  const maximo = Math.ceil(count / porPagina);

  const getFacultyList = (page) => {
    axiosGetPaginationFaculties(JWTtoken, page, porPagina)
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        setFacultyList(list.rows);
        setCount(list.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getFacultyList();
  },[modalNuevaFacultad, modalMensaje, modalConfirmacion]);

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalPartFacultyAdmin">
        <div className="contenedorHeaderFacultyAdmin">
          <Header />
        </div>
        <div className="contenedorBotoneriaFacultyAdmin">
          <Botoneria deleteList={deleteList} setDeleteList={setDeleteList} 
          modalNuevaFacultad={modalNuevaFacultad} setModalNuevaFacultad={setModalNuevaFacultad}
          modalMensaje={modalMensaje} setModalMensaje={setModalMensaje}
          />
        </div>
        <div className="contenedorCardsFacultyAdmin">
          {/* {console.log(isLoading)} */}
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={16}
            />
          ) : facultyList.length > 0 ? (
            facultyList.map((facultyItem, index) => {
                return (
                  <div key={index} className="espaciadoDeliverable">
                    <Icon
                      facultyItem={facultyItem}
                      deleteList={deleteList}
                      setDeleteList={setDeleteList}
                      setModalConfirmacion={setModalConfirmacion}
                      modalConfirmacion={modalConfirmacion}
                    />
                  </div>
                );
              })
          ) : (
            <p>
              Aún no hay facultades creadas. Presione el botón{" "}
              <strong>
                <i>Agregar Facultad </i>
              </strong>{" "}
              para crear una.
            </p>
          )}
        </div>
        <div className="contenedorBotoneriaEntregable">
          {facultyList.length>0?
          <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          setIsLoading={setIsLoading}
          onClickHandler={getFacultyList}
        />:""}
        </div>
      </div>
    </div>
  );
}
