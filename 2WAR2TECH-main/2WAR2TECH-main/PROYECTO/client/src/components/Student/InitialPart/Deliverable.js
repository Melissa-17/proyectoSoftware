import React, { useEffect } from "react";
import Buttons from "./Buttons";
import "#Styles/Student/InitialPart/Deliverable.css";
import Icon from "./Icon";
import InforDeliv from "./InforDeliv";

import moment from "moment";

import { useState } from "react";
import { getValorEstado } from "#Helpers/getValorEstado";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";

export default function Deliverable(props) {
  const {
    cxsid,
    courseName,
    count,
    setIsLoading,
    isLoading,
    getAllFinalAssignList,
    finalAssignList,
    tipoSeleccionado,
    pagina,
    setPagina,
    porPagina,
    setPorPagina
  } = props;
  // TODO: Get user id

  /* 
        State: Lista y Obtener lista 

        GetAll: Declaracion de la llamada de la funcion asincrona en axios (utiliza el state)

        UseEffect: Llamar la funcion asincrona y traer los datos
     */

  //Paginación
  

  const maximo = Math.ceil(count / porPagina);

  // const [value, setValue] = useState();
  // const refreshPage = () => {
  //     // const [value, setValue] = useState();
  //     setValue({})
  //     console.log('Holaaaa')
  // }

  // console.log(finalAssignList);
  return (
    <div className="contenedorDeliverable">
      {/* <div className='contenedorSubtitulos'>
            <InforDeliv />
        </div> */}
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
              let limitCompleteDate = finalAssign.ASSIGNMENT.limitCompleteDate
                ? new Date(finalAssign.ASSIGNMENT.limitCompleteDate)
                : null;

              let updateDate = finalAssign.updatedAt
                ? new Date(finalAssign.updatedAt)
                : null;

              limitCompleteDate = limitCompleteDate
                ? moment(limitCompleteDate).format("DD/MM/YYYY")
                : "-";
              updateDate = updateDate
                ? moment(updateDate).format("DD/MM/YYYY")
                : "-";

              const valorEstado = getValorEstado(finalAssign.status);

              return (
                <div key={index} className="espaciadoDeliverable">
                  <Icon
                    idEntregable={finalAssign.id}
                    numero={(pagina - 1) * porPagina + (index + 1)}
                    fecha={limitCompleteDate}
                    valor={valorEstado}
                    fechaCorregido={updateDate}
                    entregable={1}
                    cxsid={cxsid}
                    courseName={courseName}
                  />
                </div>
              );
            })
          ) : (
            <div className="contenedorNoAvanceAsignados">
              {tipoSeleccionado != "" ? (
                <p>No tiene Entregable final de tipo "{tipoSeleccionado}"</p>
              ) : (
                <p>No tiene Entregable final</p>
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
