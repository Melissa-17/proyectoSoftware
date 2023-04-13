import React, { useState, useEffect } from "react";
import "#Styles/Admin/Coordinator/PrincipalCoordinator.css";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import Botoneria from "./Botoneria";
import Header from "./Header";
import CardCoordinador from "./CardCoordinador";
import { axiosListCoordinators } from "#API/Specialty";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";

export default function PrincipalCoordinator() {
  const JWTtoken = sessionStorage.getItem("token");
  const [deleteList, setDeleteList] = useState([]);
  const [coordinadorList, setCoordinadorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);

  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  const getCoordinadorList = (page) => {
    axiosListCoordinators(JWTtoken, page, porPagina)
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        setCoordinadorList(list.rows);
        setIsLoading(false);
        setCount(list.count);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCoordinadorList();
  },[modalMensaje, modalConfirmacion]);

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalCoordinator">
        <div className="contenedorHeaderPrincipalCoordinator">
          <Header />
        </div>
        <div className="contenedorBotoneriPrincipalCoordinator">
          <Botoneria deleteList={deleteList} setDeleteList={setDeleteList} 
          modalMensaje={modalMensaje} setModalMensaje={setModalMensaje}
          />
        </div>
        <div className="contenedorGlobalCardCoordinador">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={16}
            />
          ) : coordinadorList &&  coordinadorList.length >0 ? (
            coordinadorList.map((coordinadorItem, index) => {
              return (
                <div key={index} className="espaciadoDeliverable">
                  <CardCoordinador
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                    coordinadorItem={coordinadorItem}
                    modalConfirmacion={modalConfirmacion}
                    setModalConfirmacion={setModalConfirmacion}
                  />
                </div>
              );
            })
          ) : (
            <div className="contenedorUsuarioNoRegistrado">
              <p>Aún no hay coordinadores registrados</p> 
            </div>
          )}
        </div>
        <div
          className="contenedorBotoneriaEntregable"
          style={{ marginLeft: "-40px", marginTop: "10px" }}
        >
          {count>0?
          <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          setIsLoading={setIsLoading}
        />:""}
        </div>
      </div>
    </div>
  );
}
