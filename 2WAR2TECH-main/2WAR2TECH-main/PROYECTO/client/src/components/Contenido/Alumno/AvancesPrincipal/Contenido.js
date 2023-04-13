import React, { useEffect, useState } from "react";
import { axiosGetAdvanceList } from "#API/Advance.js";
import Buttons from "../../../Student/InitialPart/Buttons";
import moment from "moment";
import { getValorEstado } from "#Helpers/getValorEstado";
// import Icon from '../../../Student/InitialPart/Icon';
import IconAvances from "./IconAvances";
// import '../../../assets/styles/Student/InitialPart/Deliverable.css';
// import InforDeliv from '../../../Student/InitialPart/InforDeliv';
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import "../../../../assets/styles/Alumno/AvancesPrincipal/Contenido.css";
import { Button } from "react-bootstrap";

import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { set } from "date-fns";
import { useLocation } from "react-router";

export default function AvancesPrincipal(props) {
  const { cxsid, courseName } = props;
  const [advanceList, setAdvanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(1);
  const JWTtoken = sessionStorage.getItem("token");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  const getAllAdvanceList = (page) => {
    // console.log(advanceList)
    axiosGetAdvanceList(JWTtoken, page, porPagina, tipoSeleccionado, cxsid)
      .then((response) => {
        // console.log(response.data);
        const list = response.data.studentAssignments.rows || [];
        setcount(response.data.studentAssignments.count);
        setAdvanceList(list);
        setIsLoading(false);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.error(`Error Advance: ${error}`);
      });
  };

  useEffect(() => {
    getAllAdvanceList();
  }, [tipoSeleccionado]);

  const funcionEstado = (estado) => {
    if (estado == "Asignado") return 3;
    else if (estado == "Calificado") return 1;
    else if (estado == "Entregado") return 2;
    else if (estado == "Visto Bueno") return 4;
  };

  const handleChange = (e) => {
    var a = document.getElementById("seleccionFiltroAvance").value;
    setTipoSeleccionado(a);
    // console.log(a);
  };

  return (
    <div className="todoAvancePrincipal">
      <div className="contenedorDeliverable">
        <hr color="black" className="lineaContenidoAvance" />

        <div className="contenedorBotonFiltroAvance">
          <button className="botonFiltroEntregableFinal">
            <i class="bi bi-funnel"></i>
            <select
              className="seleccionFiltroAvance"
              id="seleccionFiltroAvance"
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

        <div className="contenedorFilasAvance">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
            />
          ) : advanceList && count > 0 ? (
            advanceList.map((advance, index) => {
              let limitCompleteDate = advance.ASSIGNMENT.limitCompleteDate
                ? new Date(advance.ASSIGNMENT.limitCompleteDate)
                : null;

              let updateDate = advance.updatedAt
                ? new Date(advance.updatedAt)
                : null;

              limitCompleteDate = limitCompleteDate
                ? moment(limitCompleteDate).format("DD/MM/YYYY")
                : "-";
              updateDate = updateDate
                ? moment(updateDate).format("DD/MM/YYYY")
                : "-";

              const valorEstado = getValorEstado(advance.status);
              var nume = funcionEstado(advance.status);

              return (
                <div key={index} className="espaciadoAvance">
                  <IconAvances
                    idAvance={advance.id}
                    numero={(pagina - 1) * porPagina + (index + 1)}
                    fecha={limitCompleteDate}
                    valor={nume}
                    fechaCorregido={updateDate}
                    entregable={1}
                    cxsid={cxsid}
                    courseName={courseName}
                    numeroEnviar={3}
                  />
                </div>
              );
            })
          ) : (
            <div className="contenedorNoAvanceAsignados">
              {tipoSeleccionado != "" ? (
                <p>No tiene Avances de tipo "{tipoSeleccionado}"</p>
              ) : (
                <p>No tiene Avances</p>
              )}
            </div>
          )}

          <div className="contenedorBotoneriaEntregable" hidden={isLoading}>
            {advanceList && count > 0 ? (
              <Paginacion
                pagina={pagina}
                setPagina={setPagina}
                maximo={maximo}
                onClickHandler={getAllAdvanceList}
                setIsLoading={setIsLoading}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
