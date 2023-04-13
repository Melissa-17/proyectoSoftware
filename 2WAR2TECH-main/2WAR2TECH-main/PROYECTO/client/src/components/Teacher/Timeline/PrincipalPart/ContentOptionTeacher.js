import React, { useEffect, useState } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import HeaderJury from "../../../Jury/Deliverable/HeaderJury";
import "../../../../assets/styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css";
import { Routes, useNavigate, Route, useLocation } from "react-router";
import OptionDeliverable from "./OptionDeliverable";
import OptionPartial from "./OptionPartial";
import OptionPresentation from "./OptionPresentation";
import OptionAdvance from "./OptionAdvance";
import ModalsComplete from "../../../Modals/ModalsComplete";
import ModalsAlert from "../../../Modals/ModalsAlert";
import ModalsMessage from "../../../Modals/ModalsMessage";
import ContentRow from "./ContentRow";
import ModalsMessageConfirmated from "./ModalsMessageConfirmated";
import { axiosGetAssignmentByTypeByCourse } from "../../../../api/AssignmentStudent";
import IconEntregable from "./IconEntregable";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalsSelected from "./ModalsSelected";
import { GridLoader } from "react-spinners";
import ModalValidacion from "../../../Admin/Semester/ModalValidacion";
import ModalCargando from "../../../Contenido/Profesor/ModalCargando";

export default function ContentOptionTeacher() {
  const { cxsid } = useLocation().state;
  const [deleteAssignList, setDeleteAssignList] = useState([]);
  const [count, setCount] = useState(0);

  const [modalComplete, setModalComplete] = useState({});
  const [modalSeleccionado, setModalSeleccionado] = useState(false);

  const [modalConfirmacion, setModalConfirmacion] = useState({});
  const [validacionDelete, setValidacionDelete] = useState(false);
  const [modalConfirmacionSeleccionado, setModalConfirmacionSeleccionado] =
    useState(false);

  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalMensajeConfirmacion, setModalMensajeConfirmacion] =
    useState(false);

  const cambioModalSeleccionado = () => {
    setModalSeleccionado(true);
  };

  const JWTtoken = sessionStorage.getItem("token");
  const [entregableList, setEntregableList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modoChecked, setModoChecked] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("TODOS");
  const [loadCreate, setLoadCreate] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);

  // var a;
  // console.log(isLoading)

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  const getEntregableList = (pagina) => {
    axiosGetAssignmentByTypeByCourse(JWTtoken, cxsid, tipoSeleccionado, pagina, porPagina)
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        setEntregableList(list.rows);
        setCount(list.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getEntregableList();
  },[tipoSeleccionado, modalMensajeConfirmacion, modalMensaje]);
  
  // useEffect(() => {
    // console.log(isLoading);
  // }, [isLoading, setIsLoading]);

  const handleCopyDelete = (e) => {
    if (e.target.checked) {
      // Selecciona todos
      setDeleteAssignList(entregableList.map((e) => e.id));
      setModoChecked(true);
    } else {
      setDeleteAssignList([]);
      setModoChecked(false);
    }
  };

  const handleChange = () => {
    var a = document.getElementById("seleccionAssignModalsSelected").value;
    setTipoSeleccionado(a);
    // console.log(a);
  };

  return (
    <div className="PrincipalPartGlobal">
      {/* {console.log("contentoption: " +cxsid)} */}
      <CreateNewUserPageStudent />
      <div className="PrincipalPart">
        <div className="tituloPrincipalPartTeacher">
          <HeaderJury title={"CRONOGRAMA"} option={1} />
        </div>
        <div className="botoneria1PrincipalPartTeacher">
          {/* <div className="contenedorCronogramaBusquedaBotonTodos">
            <button className="botonTodosCronogramaBusqueda">
              <i class="bi bi-funnel"></i>
              <p>TODOS</p>
            </button>
          </div> */}
          <div>
            <div className="botonFiltrarContentOptionTeacher">
              <i class="bi bi-funnel"></i>
              <select
                onChange={handleChange}
                className="seleccionAssignModalsSelected"
                id="seleccionAssignModalsSelected"
              >
                <option value={"TODOS"}>TODOS</option>
                <option value={"FINAL ASSIGN"}>ENTREGABLE</option>
                <option value={"PARTIAL ASSIGN"}>ENTREGABLE PARCIAL</option>
                <option value={"ADVANCE"}>AVANCE</option>
                <option value={"EXPOSITION"}>EXPOSICIÓN</option>
              </select>
            </div>
          </div>
          <div className="checkBoxContentOptionTeacher">
            <input
              type="checkbox"
              onChange={(e) => {
                handleCopyDelete(e);
              }}
              checked={modoChecked}
            />
            <p className="seleccionar">Seleccionar todo</p>
          </div>
          <button
            className="botonBorrarPrincipalPartTeacher"
            onClick={()=>{
              if(deleteAssignList.length>0) setModalConfirmacionSeleccionado(true);
              else setValidacionDelete(true);
            }}
            type="button"
          >
            Borrar
          </button>
          <button
            className="botonNuevoPrincipalPartTeacher"
            onClick={cambioModalSeleccionado}
            type="button"
          >
            Nuevo
          </button>
        </div>

        <div className="contenedorCronogramaBusqueda">
          <ContentRow />
        </div>

        {isLoading
          ? 
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
          :

          entregableList && entregableList.length > 0 ?

          entregableList
              .map((partialAssign, index) => {
                return (
                  <div key={index} className="espaciadoDeliverable">
                    <IconEntregable
                      entregable={partialAssign}
                      // option={1}
                      deleteAssignList={deleteAssignList}
                      setDeleteAssignList={setDeleteAssignList}
                      cxsid={cxsid}
                      num={index + 1}
                    />
                  </div>
                );
              })
          : (
            <div className="contenedorIfTheresNot">
              <p className="ifTheresNot">
                Aún no hay entregables. Agregue uno nuevo presionando el botón
              </p>
            </div>
          )}

        <div className="contenedorBotoneriaEntregable" style={{marginTop:"20px"}}>
          {entregableList.length>0?
          <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          setIsLoading={setIsLoading}
          onClickHandler={getEntregableList}
        />:""}
        </div>
      </div>

      <div className="">
        {modalSeleccionado && (
          <ModalsComplete
            content={setModalComplete}
            exit={setModalSeleccionado}
            modalConfirmacionMensaje={setModalMensajeConfirmacion}
            setLoadCreate={setLoadCreate}
          />
        )}
        
        {loadCreate && <ModalCargando estacargando={loadCreate} 
          message={"Se está creando su entregable..."}
          />}
        {modalConfirmacionSeleccionado && (
          <ModalsAlert
            alertText="¿Seguro que desea borrar el (los) cronograma (s)?"
            closeAlert={setModalConfirmacionSeleccionado}
            closeMensaje={setModalMensaje}
            deleteAssignList={deleteAssignList}
            setDeleteAssignList={setDeleteAssignList}
            source="CRONOGRAMA"
            setModoChecked={setModoChecked}
            setLoadDelete={setLoadDelete}
          />
        )}
        {loadDelete && <ModalCargando estacargando={loadDelete} 
          message={"Se están eliminando sus entregables..."}
          />}
        {modalMensaje && (
          <ModalsMessage
            closeMessage={setModalMensaje}
            otroModal={setModalConfirmacionSeleccionado}
            message="Se borró correctamente el (los) cronograma(s)"
          />
        )}
        {modalMensajeConfirmacion && (
          <ModalsMessageConfirmated
            closeMessage={setModalMensajeConfirmacion}
            closeOtroModal={setModalSeleccionado}
            message="Se creó un nuevo entregable correctamente"
            option={1}
          />
        )}
        {/* {modalFiltro && (
          <ModalsSelected
            setTipoSeleccionado={setTipoSeleccionado}
            setModalFiltro={setModalFiltro}
          />
        )} */}
        {validacionDelete && <ModalValidacion 
        closeMessage={setValidacionDelete}
        message="Debe seleccionar al menos un cronograma"
        />}
      </div>
    </div>
  );
}
