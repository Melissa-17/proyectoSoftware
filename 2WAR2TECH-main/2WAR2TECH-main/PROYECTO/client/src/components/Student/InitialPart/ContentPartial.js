import React from "react";
import { useState, useEffect } from "react";
import "#Styles/Student/InitialPart/Content.css";
import { useLocation, useNavigate } from "react-router-dom";
import Deliverable from "./Deliverable";
import Partial from "./Partial";
import CreateNewUserPageStudent from "#Pages/CreateNewUserPage/Student";
import { Navbar } from "react-bootstrap";
import Loading from "#Components/Loading/Loading";
import { UserContext } from "#Context/userContext";
import { axiosGetPartialAssignmentList } from "#API/PartialAssignment.js";

export default function ContentPartial() {
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(true);
  const [loading, setLoading] = useState(false);
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

  const JWTtoken = sessionStorage.getItem("token");
  const [partialAssignList, setPartialAssignList] = useState([]);
  const [count, setcount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const getAllPartialAssignList = (page) => {
    axiosGetPartialAssignmentList(JWTtoken, page, porPagina, tipoSeleccionado, cxsid)
      .then((response) => {
        // console.log(response.data)
        const list = response.data.rows || [];
        setPartialAssignList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllPartialAssignList();
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
    <div>
      <div className="todoContent">
        <CreateNewUserPageStudent />
        <div className="contenedorContenidoPartial">
          <div className="contenedorTituloContentPartial">
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
              <button className="botonesOpcionSeleccionado" onClick={hizoClic1}>
                Entregas Parciales
              </button>
            </ul>
            <ul>
              <button className="botonesOpcion" onClick={hizoClic2}>
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

          <hr color="black" className="lineaContenidPartial" />

          <div className="contenedorCambios">
            <Partial
              cxsid={cxsid}
              courseName={courseName}
              count={count}
              isLoading={isLoading}
              partialAssignList={partialAssignList}
              getAllPartialAssignList={getAllPartialAssignList}
              setIsLoading={setIsLoading}
              tipoSeleccionado={tipoSeleccionado}
              pagina={pagina}
              setPagina={setPagina}
              porPagina={porPagina}
              setPorPagina={setPorPagina}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
