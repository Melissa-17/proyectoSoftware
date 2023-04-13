import React, { useEffect } from "react";
import Buttons from "./Buttons";
import "#Styles/Student/InitialPart/Deliverable.css";
import Icon from "./Icon";
import InforDeliv from "./InforDeliv";

import moment from "moment";

import { useState } from "react";
import { axiosGetFinalAssignmentList } from "#API/FinalAssignment.js";
import { getValorEstado } from "#Helpers/getValorEstado";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { axiosGetFinalAssignmentListByUserId } from "#API/FinalAssignment";
import { GridLoader } from "react-spinners";

export default function Deliverable(props) {
  // TODO: Get user id

  /* 
        State: Lista y Obtener lista 

        GetAll: Declaracion de la llamada de la funcion asincrona en axios (utiliza el state)

        UseEffect: Llamar la funcion asincrona y traer los datos
     */

  const {
    student,
    course,
    finalAssignList,
    count,
    isLoading,
    setIsLoading,
    getAllFinalAssignList,
    tipoSeleccionado,
    pagina,
    setPagina,
    porPagina,
    setPorPagina,
    maximo,

  } = props;

  // const num_id = option == 1 ? student.alumnos[0].USER.id? student.alumnos[0].USER.id: 1:
  // student.USER.id? student.USER.id: 1;

  // console.log(student);

  //Paginación
  

  // console.log(count);

  const funcionEstado = (estado) => {
    if (estado == "Asignado") return 3;
    else if (estado == "Calificado") return 1;
    else if (estado == "Entregado") return 2;
    else if (estado == "Visto Bueno") return 4;
  };

  // console.log(finalAssignList);
  return (
    <div className="contenedorDeliverable">
      <div className="contenedorFilasEntregables">
        <div className="contenedorIconDeliverable">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
            />
          ) : finalAssignList && count > 0 ? (
            finalAssignList.map((finalAssign, index) => {
              // console.log(JSON.stringify(finalAssign));
              let limitCompleteDate = new Date(
                finalAssign.ASSIGNMENT.limitCompleteDate
              );

              let updateDate = new Date(finalAssign.updatedAt);

              limitCompleteDate =
                moment(limitCompleteDate).format("DD/MM/YYYY");
              updateDate = moment(updateDate).format("DD/MM/YYYY");

              const valorEstado = getValorEstado(finalAssign.status);
              var nume = funcionEstado(finalAssign.status);

              return (
                <div key={index} className="espaciadoDeliverable">
                  <Icon
                    idEntregable={finalAssign.id}
                    numero={(pagina - 1) * porPagina + (index + 1)}
                    fecha={limitCompleteDate}
                    valor={nume}
                    fechaCorregido={updateDate}
                    entregable={1}
                    student={student}
                    course={course}
                  />
                </div>
              );
            })
          ) : (
            <div className="contenedorNoAvanceAsignados">
              {tipoSeleccionado != "" ? (
                <p>No tiene Entregable final de tipo "{tipoSeleccionado}"</p>
              ) : (
                <p>No tiene Entregables finales</p>
              )}
            </div>
          )}
        </div>

        <div className="contenedorBotoneriaEntregable">
          {finalAssignList && count > 0 ? (
            <Paginacion
              pagina={pagina}
              setPagina={setPagina}
              maximo={maximo}
              onClickHandler={getAllFinalAssignList}
              setIsLoading={setIsLoading}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
