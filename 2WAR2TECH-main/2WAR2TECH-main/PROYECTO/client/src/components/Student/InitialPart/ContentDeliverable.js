import React from "react";
import { useState, useEffect } from "react";
import "../../../assets/styles/Student/InitialPart/Content.css";
import { useLocation, useNavigate } from "react-router-dom";
import Deliverable from "./Deliverable";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import { axiosGetFinalAssignmentList } from "#API/FinalAssignment.js";

export default function ContentDeliverable() {
  const [isActive, setIsActive] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const navigate = useNavigate();
  const { cxsid, courseName } = useLocation().state;

  const hizoClic1 = () => {
    navigate("/entregable/partial", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      },
    });
    setIsActive(true);
    setIsActive2(false);
  };
  const hizoClic2 = () => {
    navigate("/entregable/deliverable", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      },
    });
    setIsActive(false);
    setIsActive2(true);
  };

  // console.log(s);

  const JWTtoken = sessionStorage.getItem("token");
  const [finalAssignList, setFinalAssignList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  const getAllFinalAssignList = (page) => {
    axiosGetFinalAssignmentList(JWTtoken, page, porPagina, tipoSeleccionado, cxsid)
      .then((response) => {
        console.log(response.data)
        const list = response.data.rows || [];
        setFinalAssignList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllFinalAssignList();
  }, [tipoSeleccionado]);

  const handleChange = (e) => {
    var a = document.getElementById("seleccionPartialStudent").value;
    setTipoSeleccionado(a);
    // console.log(a);
  };

  const retrocesoClic = () => {
    navigate("/mycourses/selection", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      },
    });
  };

  return (
    <div className="todoContent">
      <CreateNewUserPageStudent />
      <div className="contenedorContenidoDeliverable">
        <div className="contenedorTituloContentDeliverable">
          <h1 className="titulo">ENTREGABLES</h1>
          <div className="contenedorBotonVisualPart">
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
        </div>

        <div className="contenedorOpcionesEntregable">
          <ul>
            <button className="botonesOpcion" onClick={hizoClic1}>
              Entregas Parciales
            </button>
          </ul>
          <ul>
            <button className="botonesOpcionSeleccionado" onClick={hizoClic2}>
              Entregables
            </button>
          </ul>
          <div className="contenedorBotonFiltroEntregableParcial">
            <button className="botonFiltroEntregableFinal">
              <i class="bi bi-funnel"></i>
              <select
                className="seleccionPartialStudent"
                id="seleccionPartialStudent"
                onChange={handleChange}
              >
                <option value={""}>TODOS</option>
                <option value={"Calificado"}>Calificado</option>
                <option value={"Visto Bueno"}>Visto Bueno</option>
                <option value={"Entregado"}>Entregado</option>
                <option value={"Asignado"}>Asignado</option>
              </select>
            </button>
          </div>
        </div>

        <hr color="black" className="lineaContenidoDeliverable" />

        <div className="contenedorCambios">
          <Deliverable
            cxsid={cxsid}
            courseName={courseName}
            count={count}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            getAllFinalAssignList={getAllFinalAssignList}
            finalAssignList={finalAssignList}
            tipoSeleccionado={tipoSeleccionado}
            pagina={pagina}
            setPagina={setPagina}
            porPagina={porPagina}
            setPorPagina={setPorPagina}
          />
        </div>
      </div>
    </div>
  );
}
