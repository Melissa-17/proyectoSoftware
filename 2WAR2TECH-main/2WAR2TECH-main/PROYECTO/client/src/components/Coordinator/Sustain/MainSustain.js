import React, { useEffect, useState } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Coordinador/Sustain/MainSustain.css";
import ThesisRow from "./ThesisRow";
import { axiosgetListThesisByState } from "#API/Thesis";
import { GridLoader } from "react-spinners";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalsMessage from "../../Contenido/Profesor/ModalsMessage";
import ModalCargando from "../../Contenido/Profesor/ModalCargando";
import { useNavigate } from "react-router";

function MainSustain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [thesisList, setThesisList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);
  const [count, setCount] = useState(1);
  const [sustentado, setSustentado] = useState("");
  const [confirmSustentado, setConfirmSustentado] = useState(false);
  const [confirmNSustentado, setConfirmNSustentado] = useState(false);
  const [loadSustentado, setLoadSustentado] = useState(false);
  const [inputThesis, setInputThesis] = useState("");

  const maximo = Math.ceil(count / porPagina);

  const getThesisList = (page) => {
    setIsLoading(true);
    axiosgetListThesisByState(
      JWTtoken,
      sustentado,
      page,
      porPagina,
      inputThesis
    )
      .then((response) => {
        console.log(response.data);
        const data = response.data || [];
        setThesisList(data);
        setCount(data.thesis.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getThesisList();
  }, [sustentado, confirmSustentado, confirmNSustentado, inputThesis]);

  const handleFilter = (e) => {
    setSustentado(e.target.value);
  };

  // console.log(thesisList);

  const handleNameChange = (e) => {
    var x = document.getElementById("busqueda").value;
    // getThesisList(x);
  };
  const handleTitleChange = (e) => {
    var x = document.getElementById("busqueda").value;
    setInputThesis(x);
  };

  return (
    <div>
      <Navbar />
      <div className="mainSustainContainer">
        <div className="sustainHeader">
          <p>SUSTENTACIONES</p>
          <hr color="black" className="lineaContenidoApproval" />
        </div>
        <div className="sustainState">
          <p>Estado de tesis:</p>
          <select onChange={handleFilter}>
            <option value="">Todo</option>
            <option value="SUSTENTADA">Sustentada</option>{" "}
            <option value="APROBADO">No Sustentada</option>
          </select>
        </div>
        <div className="sustainSearchers">
          <div className="thesisSearch">
            <div className="contenedorBusquedaTesis">
              <label>Búsqueda por tesis: </label>
              <div className="search">
                <input
                  type="text"
                  id="busqueda"
                  className="Busqueda"
                  onChange={handleTitleChange}
                  placeholder="Ingrese un titulo..."
                ></input>
                <button className="boton">
                  <i class="bi bi-search" />
                </button>
              </div>
            </div>

            <div className="contenedorBotonGraficoTesisSustentadas">
              <button className="botonGraficoTesisSustentadas"
              onClick={()=>{navigate("/Sustentaciones/grafico");}}
              >Graficos de Tesis Sustentadas</button>
            </div>
          </div>
        </div>
        <div className="sustainSubHeader">
          <div className="SSHthesis">
            <p>Tesis</p>
          </div>
          <div className="SSHstudent">
            <p>Alumno(s)</p>
          </div>
          <div className="SSHstate">
            <p>Estado</p>
          </div>
          <div className="SSHaction">
            <p>Acción</p>
          </div>
        </div>
        <div className="sustainContent">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={16}
            />
          ) : thesisList && thesisList.thesis && thesisList.thesis.count > 0 ? (
            thesisList.thesis.rows.map((thesis, index) => {
              return (
                <div className="sustainedRows" key={index}>
                  <ThesisRow
                    thesis={thesis}
                    confirmSustentado={confirmSustentado}
                    setConfirmSustentado={setConfirmSustentado}
                    confirmNSustentado={confirmNSustentado}
                    setConfirmNSustentado={setConfirmNSustentado}
                    setLoadSustentado={setLoadSustentado}
                  />
                </div>
              );
            })
          ) : (
            <p>Aún no hay tesis</p>
          )}
        </div>
        {confirmSustentado && (
          <ModalsMessage
            closeMessage={setConfirmSustentado}
            // closeOtroModal={setModalAlerta}
            message="Se cambió la tesis a no sustentada"
          />
        )}
        {loadSustentado && (
          <ModalCargando
            estacargando={loadSustentado}
            message={"Se están cambiando el estado de su tesis..."}
          />
        )}
        {confirmNSustentado && (
          <ModalsMessage
            closeMessage={setConfirmNSustentado}
            // closeOtroModal={setModalAlerta}
            message="Se cambió la tesis a sustentada"
          />
        )}
        <div className="sustainFooter">
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getThesisList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default MainSustain;
