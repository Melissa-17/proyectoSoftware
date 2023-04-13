import React, { useEffect, useState } from "react";
import moment from "moment";
import { getValorEstado } from "#Helpers/getValorEstado";
import IconAvances from "./IconAvances";
import "#Styles/Alumno/AvancesPrincipal/Contenido.css";

import { Paginacion } from "#Components/Pagination/Pagination.js";
import { axiosGetAdvanceListByUserId } from "#API/Advance";

export default function Contenido(props) {
  const [advanceList, setAdvanceList] = useState([]);
  const { student, course, index } = props;
  const locateIndex = index;

  const JWTtoken = sessionStorage.getItem("token");

  const getAllAdvanceList = () => {
    axiosGetAdvanceListByUserId(JWTtoken, student.id)
      .then((response) => {
        const list = response.data.rows || [];
        setAdvanceList(list);
      })
      .catch((error) => {
        console.error(`Error Advance: ${error}`);
      });
  };

  useEffect(() => {
    getAllAdvanceList();
  }, []);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(advanceList.length / porPagina);

  const funcionEstado = (estado) => {
    if (estado == "Asignado") return 3;
    else if (estado == "Calificado") return 1;
    else if (estado == "Entregado") return 2;
  };

  return (
    <div className="todoAvancePrincipal">
      <div className="contenedorDeliverable">
        {/* <div className='contenedorSubtitulos'>
                <InforDeliv />
            </div> */}
        <hr color="black" className="lineaContenidoAvance" />

        <div className="contenedorFilasAvance">
          {advanceList
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((advance, index) => {
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
                    student={student}
                    course={course}
                    index={locateIndex}
                    num={props.num}
                  />
                </div>
              );
            })}
          <div className="contenedorBotoneriaEntregable">
            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
          </div>
        </div>
      </div>
    </div>
  );
}
