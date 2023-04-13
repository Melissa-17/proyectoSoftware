import React, { useState, useEffect } from "react";
import Combobox from "react-widgets/Combobox";
import "#Styles/Coordinador/Approval/AdviserPart.css";
import AdviserRow from "./AdviserRow";
import { axiosGetThesisAsesorsList } from "#API/Thesis";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import StateLegend from "./StateLegend";

export default function AdviserPart({
  cambioEstado,
  nuevoEstado,
  setidtesis,
  setstatustesis,
  setOpenCommentModal,
}) {
  const [thesisList, setThesisList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [openLegend, setOpenLegend] = useState(false);

  const JWTtoken = sessionStorage.getItem("token");

  const getThesisList = (page) => {
    axiosGetThesisAsesorsList(JWTtoken, 1, 1000)
      .then((response) => {
        // console.log(response.data);
        const list = response.data || [];
        //  console.log(list);
        setThesisList(list.rows);
        setCount(list.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getThesisList();
  });

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(5);

  const maximo = Math.ceil(thesisList.length / porPagina);

  const funcion = (thesis) => {
    if (thesis.status == "EN OBSERVACIÓN") return 2;
    else if (thesis.status == "APROBADO") return 1;
    else if (thesis.status == "PENDIENTE") return 3;
    else if (thesis.status == "SUSTENTADA") return 4;
    else return 4; // por si acaso
  };

  const i = 0;

  return (
    <div className="contenedorAdviserPart">
      <div className="contenedorFilaAdviser">
        <div className="contenedorFilaTitulo">
          <div className="ATNro">
            <p>N°</p>
          </div>
          <div className="ATTheme">
            <p>Tema</p>
          </div>
          <div className="stateLegend">
            <p>Estado</p>
            <button>
              <i
                class="bi bi-question-circle-fill"
                onClick={() => {
                  setOpenLegend(true);
                }}
                // onMouseLeave={() => {
                //   setOpenLegend(false);
                // }}
              ></i>
            </button>
          </div>
          <div className="ATDetail">
            <p>Detalle</p>
          </div>
          <div className="ATAcc">
            <p>Acción</p>
          </div>
          {/* <p className="NContenedor">N°</p>
          <p className="NombreTemaContenedor">Nombre de tema:</p>
          <p className="EstadoContenedor">
            Estado:
          </p>
          <i class="bi bi-question-circle-fill" onMouseOver={() => {
                setOpenLegend(true);
              }}
              onMouseLeave={() => {
                setOpenLegend(false);
              }}
              >
            </i>
          <p className="DetalleContenedor">Detalle:</p>
          <p>Acción:</p> */}
        </div>
        <div className="contenedorFilacontenido">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
            />
          ) : thesisList.length ? (
            thesisList
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((thesis, index) => (
                <AdviserRow
                  triggerclick={cambioEstado}
                  nuevoEstado={nuevoEstado}
                  setidtesis={setidtesis}
                  setstatustesis={setstatustesis}
                  setOpenCommentModal={setOpenCommentModal}
                  key={index}
                  valor={funcion(thesis)}
                  thesis={thesis}
                  index={(pagina - 1) * porPagina + index + 1}
                />
              ))
          ) : (
            <div className="no-thesis"> No hay tesis para mostrar.</div>
          )}
        </div>
        <hr color="black" className="lineaContenidoAdviserRow" />
      </div>
      <div className="contenedorBotoneriaEntregable">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getThesisList}
          setIsLoading={setIsLoading}
        />
      </div>
      {openLegend && <StateLegend close={setOpenLegend} />}
    </div>
  );
}
