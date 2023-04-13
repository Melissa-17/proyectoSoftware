import React, { useEffect } from "react";
import CreateNewUserPageStudent from "../../../../../pages/CreateNewUserPage/Student";
import { Navigate, useParams } from "react-router";
import "../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/EditCriteria.css";
import HeaderVisualCriteria from "./HeaderVisualCriteria";
import NivelRowProfesor from "./NivelRowProfesor";
import { useState } from "react";
import ModalsAlertEditCriteria from "./ModalsAlert";
import ModalsMessageEditPart from "./ModalsMessage";
import ModalsAlert from "../../RubricaPart/ModalsAlert";
import ModalsMessage from "../../../../Modals/ModalsMessage";
import ModalsNuevoNivel from "./ModalsNuevoNivel";
import ModalsVisualProfesor from "./ModalsVisualProfesor";
import { useNavigate, useLocation } from "react-router";
import { axiosGetCriteria } from "../../../../../api/Rubric";
import { axiosGetAllCriteriaLevel } from "../../../../../api/RubricCriteria";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalsMessageLevel from "../EditPart/ModalsMessageLevel";
import { GridLoader } from "react-spinners";

export default function VisualCriteria() {
  const params = useParams();
  const navigate = useNavigate();
  var numero = parseInt(params.option);
  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const { cxsid, id, rubricId, criterioId } = useLocation().state;

  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalBorrar, setModalBorrar] = useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalNuevoNivel, setModalNuevoNivel] = useState(false);
  const [modalMessageLevel, setModalMessageLevel] = useState(false);
  const [deleteLevel, setDeletelevel] = useState([]);

  const [estadoDeleteLevel, setEstadoDeleteLevel] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const cambioAlerta = () => {
    setModalAlerta(true);
  };
  const cambioMensaje = () => {
    setModalMensaje(true);
  };
  const cambioBorrar = () => {
    setModalBorrar(true);
  };
  const cambioNuevoNivel = () => {
    setModalNuevoNivel(true);
  };

  const forceUpdate = useForceUpdate();

  const cambioEditar = () => {
    navigate(`/timeline/criteria/edit/${params.num}/${numero + 2}`, {
      state: {
        cxsid: cxsid,
        id: id,
        rubricId: rubricId,
        criterioId: criterioId,
      },
    });
  };

  const JWTtoken = sessionStorage.getItem("token");
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

  const [levelList, setLevelList] = useState([]);

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here
    // is better than directly setting `value + 1`
  }
  const getLevelList = (page) => {
    axiosGetAllCriteriaLevel(JWTtoken, criterioId, page, porPagina)
      .then((response) => {
        // Si se necesita ver la estructura de los datos que quieres ver (SIEMPRE DEJARLO COMENTADO)
        // console.log(response.data);
        const data = response.data || "";
        setLevelList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getDetailCriteria();
  }, []);

  useEffect(() => {
    getLevelList();
  }, [pagina, modalMensaje, modalConfirmacion, modalMessageLevel]);

  const maximo = Math.ceil(levelList.count / porPagina);

  const handleCopyDelete = (e) => {
    if (e.target.checked) {
      // Selecciona todos
      setDeletelevel(levelList.rows.map((e) => e.id));
      setEstadoDeleteLevel(true);
    } else {
      setDeletelevel([]);
      setEstadoDeleteLevel(false);
    }
  };

  // console.log(true);

  return (
    <div className="contenedorEditCriteria">
      <CreateNewUserPageStudent />
      <div className="EditCriteria">
        <div className="contenedorHeaderEditCriteria">
          <HeaderVisualCriteria
            num={params.num}
            option={params.option}
            cxsid={cxsid}
            id={id}
            rubricId={rubricId}
            criterioId={criterioId}
            criteriaDetail={criteriaDetail}
          />
        </div>
        <div className="PrimeraParteEditCriteria">
          <div className="lineaInformacionGeneralVisualCriteria">
            <p className="infoGeneral">Información general</p>
            <button onClick={cambioEditar}>Editar</button>
          </div>

          <div className="descripcionPrimeraParte">
            <p className="descripcion">Descripción opcional</p>
            {criteriaDetail &&
            criteriaDetail.criteria &&
            criteriaDetail.criteria.description != "" ? (
              <p>{criteriaDetail.criteria.description}</p>
            ) : (
              <p className="noHayDescripcion">No hay ninguna descripción</p>
            )}
          </div>
        </div>

        <div className="contenedorSegundaParteVisualCriteria">
          <div className="NivelParteEditCriteria">
            <p className="niveles">Niveles</p>
            <div className="SeleccionarParteEditCriteria">
              <div className="checkboxSeleccionar">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleCopyDelete(e);
                  }}
                  checked={estadoDeleteLevel}
                />
              </div>
              <p className="seleccionar">Seleccionar todo</p>
            </div>
            <button className="borrar" onClick={cambioBorrar} type="button">
              Borrar
            </button>
            <button
              className="NuevoNivel"
              onClick={cambioNuevoNivel}
              type="button"
            >
              Nuevo Nivel
            </button>
          </div>

          <div>
            <hr
              color="black"
              className="lineaContenidoCriteriaProfesor"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            />
          </div>

          <div className="contenedorNivelesFila">
            {isLoading ? (
              <GridLoader
                className="mx-auto"
                color="#042354"
                loading={isLoading}
                size={24}
              />
            ) : levelList && levelList.count != 0 && levelList.rows ? (
              levelList.rows
                // .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
                .map((level) => {
                  return (
                    <div className="contenedorCriterio">
                      <NivelRowProfesor
                        level={level}
                        criterioId={criterioId}
                        deleteLevel={deleteLevel}
                        setDeletelevel={setDeletelevel}
                      />
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
            <Paginacion
              pagina={pagina}
              setPagina={setPagina}
              maximo={maximo}
              onClickHandler={getLevelList}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>
      <div>
        {modalAlerta && (
          <ModalsAlertEditCriteria
            closeAlert={setModalAlerta}
            alertText="¿Está seguro de cancelar los cambios hechos?"
            num={params.num}
            cxsid={cxsid}
            option={params.option}
            id={id}
            rubricId={rubricId}
            criterioId={criterioId}
          />
        )}

        {modalMensaje && (
          <ModalsMessageEditPart
            closeAlert={setModalMensaje}
            message="Se guardó correctamente los cambios"
            num={params.num}
            cxsid={cxsid}
            option={params.option}
            id={id}
            rubricId={rubricId}
            criterioId={criterioId}
          />
        )}

        {modalBorrar && (
          <ModalsAlert
            alertText="¿Está seguro de eliminar el (los) nivel (es)?"
            closeAlert={setModalBorrar}
            closeMensaje={setModalConfirmacion}
            deleteAssignList={deleteLevel}
            setDeleteAssignList={setDeletelevel}
            source={"NIVEL"}
            criterioId={criterioId}
            setEstadoDeleteLevel={setEstadoDeleteLevel}
          />
        )}

        {modalConfirmacion && (
          <ModalsMessage
            closeMessage={setModalConfirmacion}
            message="Se borró correctamente"
          />
        )}

        {modalNuevoNivel && (
          <ModalsNuevoNivel
            closeNuevoNivel={setModalNuevoNivel}
            modalMensaje={setModalMessageLevel}
            option={1}
            criterioId={criterioId}
            cambio={1}
          />
        )}

        {modalMessageLevel && (
          <ModalsMessageLevel
            closeMessage={setModalMessageLevel}
            closeOtroModal={setModalNuevoNivel}
            message="Se guardó el cambio correctamente"
          />
        )}

        {/* {modalNuevoNivel && (
          <ModalsNuevoNivel closeNuevoNivel={setModalNuevoNivel} option={1} criterioId={criterioId}/>
        )}

        {modalVisualProfesor && (
          <ModalsVisualProfesor closeVisual={setModalVisualProfesor} level={level}/>
        )} */}
      </div>
    </div>
  );
}
