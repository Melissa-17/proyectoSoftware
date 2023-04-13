import React, { useEffect } from "react";
import "#Styles/Student/InitialPart/Partial.css";
import DelivDetail from "../DetailPart/DelivDetailAdviser";
import Buttons from "./Buttons";
import Icon from "./Icon";
import InforPartial from "./InforPartial";
import Provider from "./Provider";
import moment from "moment";
import { GridLoader } from "react-spinners";
import { useState } from "react";
import { axiosGetPartialAssignmentListByUserId } from "#API/PartialAssignment.js";
import { getValorEstado } from "#Helpers/getValorEstado";
import { Paginacion } from "#Components/Pagination/Pagination.js";

export default function Partial(props) {
  const JWTtoken = sessionStorage.getItem("token");
  const {
    student,
    course,
    partialAssignList,
    count,
    isLoading,
    getAllPartialAssignList,
    setIsLoading,
    tipoSeleccionado,
    pagina,
    setPagina,
    porPagina,
    setPorPagina,
    maximo,
  } = props;

  // const num_id = option == 1 ? student.alumnos[0].USER.id? student.alumnos[0].USER.id: 1:
  // student.USER.id? student.USER.id: 1;

  //Paginación
  

  // console.log(count);

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
        ) : partialAssignList && count ? (
          partialAssignList.map((partialAssign, index) => {
            let limitCompleteDate = new Date(
              partialAssign.ASSIGNMENT.limitCompleteDate
            );

            let updateDate = new Date(partialAssign.updatedAt);

            limitCompleteDate = moment(limitCompleteDate).format("DD/MM/YYYY");
            updateDate = moment(updateDate).format("DD/MM/YYYY");

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
                  student={student}
                  course={course}
                />
              </div>
            );
          })
        ) : (
          <div className="contenedorNoAvanceAsignados">
            {tipoSeleccionado != "" ? (
              <p>No tiene Entregable parcial de tipo "{tipoSeleccionado}"</p>
            ) : (
              <p>No tiene Entregables parciales</p>
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
