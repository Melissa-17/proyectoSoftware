import React, {useEffect} from 'react'
import Icon from "./Icon";
import moment from "moment";

import { useState } from "react";
import { axiosGetPartialAssignmentListByUserId } from "#API/PartialAssignment.js";
import { getValorEstado } from "#Helpers/getValorEstado";
import { Paginacion } from "#Components/Pagination/Pagination.js";

export default function Partial(props) {
  const [partialAssignList, setPartialAssignList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const { student, course, num } = props;
  var numero_num = num;

  const getAllPartialAssignList = () => {
    axiosGetPartialAssignmentListByUserId(JWTtoken, student.id)
      .then((response) => {
        const list = response.data.rows || [];
        setPartialAssignList(list);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllPartialAssignList();
  }, []);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(partialAssignList.length / porPagina);

  const funcionEstado = (estado) =>{
    if(estado=="Asignado") return 3;
    else if(estado=="Calificado") return 1;
    else if(estado=="Entregado") return 2;
  }

  return (
    <div className="contenedorGeneralParcial">
      <div className="contenedorIconParcial">
        {partialAssignList
          .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
          .map((partialAssign, index) => {
            let limitCompleteDate = partialAssign.ASSIGNMENT.limitCompleteDate ? new Date(
              partialAssign.ASSIGNMENT.limitCompleteDate
            ) : null; 
            

            let updateDate = partialAssign.updatedAt ? new Date(partialAssign.updatedAt) : null;

            limitCompleteDate = limitCompleteDate ? moment(limitCompleteDate).format("DD/MM/YYYY") : "-";
            updateDate = updateDate ? moment(updateDate).format("DD/MM/YYYY") : "-";

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
                  student= {student}
                  course = {course}
                  num={numero_num}
                />
              </div>
            );
          })}
      </div>

      <div className="opciones">
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>
    </div>
  )
}
