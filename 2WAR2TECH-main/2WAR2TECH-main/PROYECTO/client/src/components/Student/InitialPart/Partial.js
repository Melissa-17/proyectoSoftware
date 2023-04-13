import React, { useEffect } from "react";
import "../../../assets/styles/Student/InitialPart/Partial.css";
import DelivDetail from "../DetailPart/DelivDetail";
import Buttons from "./Buttons";
import Icon from "./Icon";
import InforPartial from "./InforPartial";
import Provider from "./Provider";
import moment from "moment";

import { useState } from "react";

import { getValorEstado } from "#Helpers/getValorEstado";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";

export default function Partial(props) {
  const {
    cxsid,
    courseName,
    count,
    isLoading,
    partialAssignList,
    getAllPartialAssignList,
    setIsLoading,
    tipoSeleccionado,
    pagina,
    porPagina,
    setPagina,
    setPorPagina
  } = props;

  //Paginación
  

  const maximo = Math.ceil(count / porPagina);

  const funcionEstado = (estado) => {
    if (estado == "Asignado") return 3;
    else if (estado == "Calificado") return 1;
    else if (estado == "Entregado") return 2;
    else if (estado == "Visto Bueno") return 4;
  };

  return (
    <div className="contenedorGeneralParcial">
      <div className="contenedorIconParcial">
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : partialAssignList && count > 0 ? (
          partialAssignList
            // .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
            .map((partialAssign, index) => {
              let limitCompleteDate = partialAssign.ASSIGNMENT.limitCompleteDate
                ? new Date(partialAssign.ASSIGNMENT.limitCompleteDate)
                : null;

              let updateDate = partialAssign.updatedAt
                ? new Date(partialAssign.updatedAt)
                : null;

              limitCompleteDate = limitCompleteDate
                ? moment(limitCompleteDate).format("DD/MM/YYYY")
                : "-";
              updateDate = updateDate
                ? moment(updateDate).format("DD/MM/YYYY")
                : "-";

              const valorEstado = getValorEstado(partialAssign.status);
              var nume = funcionEstado(partialAssign.status);

              return (
                <div key={index} className="espaciadoPartial">
                  <Icon
                    idEntregable={partialAssign.id}
                    numero={(pagina - 1) * porPagina + (index + 1)}
                    fecha={limitCompleteDate}
                    valor={nume}
                    fechaCorregido={updateDate}
                    entregable={0}
                    cxsid={cxsid}
                    courseName={courseName}
                  />
                  {/* {console.log(partialAssign)} */}
                </div>
              );
            })
        ) : (
          <div className="contenedorNoAvanceAsignados">
            {tipoSeleccionado != "" ? (
              <p>No tiene Entregable parcial de tipo "{tipoSeleccionado}"</p>
            ) : (
              <p>No tiene Entregable parcial</p>
            )}
          </div>
        )}
      </div>

      <div className="contenedorBotoneriaEntregable">
        {partialAssignList && count > 0 ? (
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getAllPartialAssignList}
            setIsLoading={setIsLoading}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
