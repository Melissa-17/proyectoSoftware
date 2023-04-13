import React from "react";
import { useState, useEffect } from "react";
import "../../../assets/styles/Student/InitialPart/Content.css";
import { useLocation, useNavigate } from "react-router-dom";
import Deliverable from "./Deliverable";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import { Navbar } from "react-bootstrap";
import { axiosGetFinalAssignmentListByUserId } from "#API/FinalAssignment";

export default function ContentDeliverableAdvisor() {
  const [isActive, setIsActive] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const navigate = useNavigate();
  const { student, course } = useLocation().state;
  const [loading, setLoading] = useState(false);

  const JWTtoken = sessionStorage.getItem("token");
  const [finalAssignList, setFinalAssignList] = useState([]);
  const [count, setcount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);
  

  const maximo = Math.ceil(count / porPagina);

  const hizoClic1 = () => {
    navigate("/revisor/alumno/partial", {
      state: {
        student: student,
        course: course,
      },
    });
    setIsActive(true);
    setIsActive2(false);
  };
  const hizoClic2 = () => {
    navigate("/revisor/alumno/deliverable", {
      state: {
        student: student,
        course: course,
      },
    });
    setIsActive(false);
    setIsActive2(true);
  };

  const HeaderPortfolioClic = () => {
    navigate(`/revisor/alumno`, {
      state: {
        student: student,
        course: course,
      },
    });
  };

  const getAllFinalAssignList = (page) => {
    axiosGetFinalAssignmentListByUserId(
      JWTtoken,
      student.id,
      page,
      porPagina,
      tipoSeleccionado,
      course.id
    )
      .then((response) => {
        // console.log(response.data);
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

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const a = await setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    fetchData();
  }, [setLoading]);
  

  const handleChange = (e) => {
    var a = document.getElementById("seleccionPartialAdvisor").value;
    setTipoSeleccionado(a);
    console.log(a);
  };

  return (
    <div className="todoContent">
      <CreateNewUserPageStudent />
      <div className="contenedorContenidoDeliverable">
        <div className="contenedorTitulo">
          <h1 className="titulo" style={{ marginRight: "720px" }}>
            ENTREGABLES
          </h1>
          <div className="retro">
            <button
              className="botonRetrocesoDetalle"
              onClick={HeaderPortfolioClic}
            >
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
                className="seleccionPartialAdvisor"
                id="seleccionPartialAdvisor"
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
            student={student}
            course={course}
            finalAssignList={finalAssignList}
            count={count}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            getAllFinalAssignList={getAllFinalAssignList}
            tipoSeleccionado={tipoSeleccionado}
            pagina={pagina}
            setPagina={setPagina}
            porPagina={porPagina}
            setPorPagina={setPorPagina}
            maximo={maximo}
          />
        </div>
      </div>
    </div>
  );
}
