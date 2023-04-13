import React from "react";
import CreateNewUserPageStudent from "../../../../../pages/CreateNewUserPage/Student";
import { useParams } from "react-router";
import "../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/EditCriteria.css";
import HeaderEditCriteria from "./HeaderEditCriteria";
import NivelRowProfesor from "../VisualPart/NivelRowProfesor";
import { useState, useEffect } from "react";
import ModalsAlertEditCriteria from "./ModalsAlert";
import ModalsMessageEditPart from "./ModalsMessage";
import ModalsNuevoNivel from "../VisualPart/ModalsNuevoNivel";
import ModalsVisualProfesor from "./ModalsVisualProfesor";

import ModalsAlert from "../../RubricaPart/ModalsAlert";
import ModalsMessage from "../../../../Modals/ModalsMessage";

import { useLocation } from "react-router";
import { axiosGetAllCriteriaLevel } from "../../../../../api/RubricCriteria";
import { axiosGetCriteria } from "../../../../../api/Rubric";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { axiosEditCriteria } from "../../../../../api/Rubric";
import SecondPartEditCriteria from "./SecondPartEditCriteria";
import ModalsMessageLevel from "./ModalsMessageLevel";

export default function EditCriteria() {
  const params = useParams();
  const { cxsid, id, rubricId, criterioId } = useLocation().state;

  const [modalBorrar, setModalBorrar] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalNuevoNivel, setModalNuevoNivel] = useState(false);
  const [modalVisualProfesor, setModalVisualProfesor] = useState(false);
  const [modalMessageLevel, setModalMessageLevel] = useState(false);
  const [deleteLevel, setDeletelevel] = useState([]);

  const cambioBorrar = () => {
    setModalBorrar(true);
  };
  const cambioNuevoNivel = () => {
    setModalNuevoNivel(true);
  };

  const JWTtoken = sessionStorage.getItem("token");
  const [levelList, setLevelList] = useState([]);

  // console.log(criterioId);

  // const getLevelList = () => {
  //   axiosGetAllCriteriaLevel(JWTtoken, criterioId,1,4)
  //     .then((response) => {
  //       // Si se necesita ver la estructura de los datos que quieres ver (SIEMPRE DEJARLO COMENTADO)
  //       // console.log(response.data);
  //       const data = response.data || "";
  //       setLevelList(data);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  const [criteriaDetail, setCriteriaDetail] = useState(null);

  const getDetailCriteria = () => {
    axiosGetCriteria(JWTtoken, rubricId, criterioId)
      .then((response) => {
        // Si se necesita ver la estructura de los datos que quieres ver (SIEMPRE DEJARLO COMENTADO)
        // console.log(response.data);
        const data = response.data || "";
        setCriteriaDetail(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // useEffect(() => {
  //   getLevelList();
  // });

  useEffect(() => {
    getDetailCriteria();
  }, []);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  const maximo = Math.ceil(levelList.length / porPagina);

  const handleCopyDelete = (e) => {
    if (e.target.checked) { // Selecciona todos
      setDeletelevel(levelList.map((e) => e.id));
    } else {
      setDeletelevel([]);
    }
  }

  return (
    <div className="contenedorEditCriteria">
      <CreateNewUserPageStudent />
      <div className="EditCriteria">
        {/* <div className="contenedorHeaderEditCriteria">
          <HeaderEditCriteria
            num={params.num}
            option={params.option}
            cxsid={cxsid}
            id={id}
            rubricId={rubricId}
            criterioId={criterioId}
            criteriaDetail={criteriaDetail}
          />
        </div> */}

        <div>
          <SecondPartEditCriteria 
          rubricId={rubricId} criterioId={criterioId} num={params.num} option={params.option} cxsid={cxsid} id={id}
          criteriaDetail={criteriaDetail}/>
        </div>

        {/* <div className="NivelParteEditCriteria">
          <p className="niveles">Niveles</p>
          <div className="SeleccionarParteEditCriteria">
            <div className="checkboxSeleccionar">
              <input type="checkbox" onChange={(e) => {handleCopyDelete(e);}}/>
            </div>
            <p className="seleccionar">Seleccionar todo</p>
          </div>
          <button className="borrar" onClick={cambioBorrar}>
            Borrar
          </button>
          <button className="NuevoNivel" onClick={cambioNuevoNivel}>
            Nuevo Nivel
          </button>
        </div> */}

        {/* <div>
          <hr color="black" className="lineaContenidoCriteriaProfesor" 
          style={{marginTop:"10px", marginBottom:"0px", border:"0.5px", width:"1160px", height:"1px"}}/>
        </div> */}

        {/* <div className="contenedorNivelesFila"> */}
          {/*levelList && levelList.length != 0 ? (
            levelList
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((level) => {
                return (
                  <div className="contenedorCriterio">
                    <NivelRowProfesor
                      criterioId={criterioId}
                      level={level}
                      deleteLevel={deleteLevel}
                      setDeletelevel={setDeletelevel}
                    />
                    {/* {cambioPantalla(level)} }
                  </div>
                );
              })
          ) : (
            <p className="fallo">
              Aún no hay ningún nivel. Agregue uno nuevo presionando el botón.
            </p>
          )}
        </div>

        <div
          className="contenedorBotoneriaEntregable"
          style={{ marginTop: "15px" }}
        >
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </div>
      <div>

        {modalBorrar && (
          <ModalsAlert
            alertText="¿Está seguro de eliminar el (los) nivel (es)?"
            closeAlert={setModalBorrar}
            closeMensaje={setModalConfirmacion}
            deleteAssignList={deleteLevel}
            setDeleteAssignList={setDeletelevel}
            source={"NIVEL"}
            criterioId={criterioId}
          />
        )}

        {modalConfirmacion && (
          <ModalsMessage
            closeMessage={setModalConfirmacion}
            message="Se borró correctamente"
          />
        )}

        {modalNuevoNivel && <ModalsNuevoNivel closeNuevoNivel={setModalNuevoNivel} modalMensaje={setModalMessageLevel}
        option={1} criterioId={criterioId} cambio={1}/>}
        
        {modalMessageLevel && <ModalsMessageLevel closeMessage={setModalMessageLevel} closeOtroModal={setModalNuevoNivel}
        message="Se guardó el cambio correctamente"/>}

          {/* {modalVisualProfesor && (
            <ModalsVisualProfesor closeVisual={setModalVisualProfesor} />
          )} */}
      </div>
    </div>
  );
}
