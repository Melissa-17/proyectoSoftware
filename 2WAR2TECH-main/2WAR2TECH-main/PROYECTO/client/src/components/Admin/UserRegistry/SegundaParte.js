import React, { useState } from "react";
import "#Styles/Admin/UserRegistry/SegundaParte.css";
import CardUser from "./CardUser";
import ModalsAlert from "./ModalsAlert";
import ModalsMessage from "./ModalsMessageLevel";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import ModalValidacion from "../Semester/ModalValidacion";

export default function SegundaParte(props) {
  const { userList, rolSeleccionado2, isLoading,setIsLoadingUsuario,
     pagina, porPagina, maximo, setPagina, getUsuarioSearch, count,setInputName} =
    props;
  const [modalAlerta, setModalAlerta] = useState(false);
  // const [modalMensaje, setModalMensaje] = useState(false);
  const { modalMensaje, setModalMensaje } = props;
  const [deleteList, setDeleteList] = useState([]);
  const [validacionDelete, setValidacionDelete] = useState(false);
  const handleNameChange = (e) => {
    var x = document.getElementById("busqueda").value;
    setInputName(x); 
    setIsLoadingUsuario(true);
    if(!x){setIsLoadingUsuario(false)}
  };
  return (
    <div className="contenedorCardUsers">
      <div className="contenedorDesactivarCardUsers">
        <div className="buscar">
            <input
              type="text"
              id="busqueda"
              className="Busqueda"
              onChange={handleNameChange}
              placeholder="Ingrese un nombre..."
              ></input>
            <button className="boton">
              <i class="bi bi-search" />
            </button>
          </div>
          <div className="espaciadoDeBuscador"> </div>
        <button
          className="botonDesactivarCardUsers"
          onClick={() => {
            if(deleteList.length>0)setModalAlerta(true);
            else setValidacionDelete(true);
          }}
        >
          Desactivar
        </button>
      </div>
      <div className="contendorCardsUser">
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : userList &&
          userList.rows &&
          userList.rows[0] &&
          userList.rows.length > 0 ? (
          userList.rows  
            .map((userItem, index) => {
              return (
                <div key={index} className="espaciadoPartial">
                  <CardUser
                    userItem={userItem}
                    rolSeleccionado2={rolSeleccionado2}
                    deleteList={deleteList}
                    setDeleteList={setDeleteList}
                  />
                </div>
              );
            })
        ) : (
          <div className="contenedorUsuarioNoRegistrado">
            <p>Aún no hay usuarios registrados</p>  
          </div>
        )}
        {/* {console.log(userList)} */}
      </div>

      <div
        className="contenedorBotoneriaEntregable"
        style={{ width: "1000px" }}
      >
        {count>0?
        <Paginacion 
        pagina={pagina} 
        setPagina={setPagina} 
        maximo={maximo}
        setIsLoading={setIsLoadingUsuario}
        onClickHandler={getUsuarioSearch}
        />:""}
      </div>

      <div>
        {modalAlerta && (
          <ModalsAlert
            closeAlert={setModalAlerta}
            modalMessage={setModalMensaje}
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            alertText="¿Seguro que quiere desactivar el (los) usuario (s)?"
          />
        )}
        {modalMensaje && (
          <ModalsMessage
            closeMessage={setModalMensaje}
            closeOtroModal={setModalAlerta}
            update={getUsuarioSearch}
            message="Se desactivó correctamente el (los) usuario (s)"
          />
        )}
        {validacionDelete && <ModalValidacion 
        closeMessage={setValidacionDelete} message="Debe seleccionar algún usuario registrado"
        />}
      </div>
    </div>
  );
}
