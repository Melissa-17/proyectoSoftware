import React, { useEffect } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import HeaderDetail from "./HeaderDetail";
import "../../../../assets/styles/Jury/Deliverable/DetailPart/DetailDeliverableJury.css";
import { useParams, useLocation } from "react-router";
import FirstPart from "./FirstPart";
import TituloDeliverableJury from "./TituloDeliverableJury";
import IconDeliverableJury from "./IconDeliverableJury";
import { useState } from "react";
import { axiosGetFinalAssignmentList } from "#API/FinalAssignment.js";
import { getValorEstado } from "#Helpers/getValorEstado";
import { Paginacion } from '#Components/Pagination/Pagination.js'

export default function DetailDeliverableJury() {
  const [selectOption, setSelectOption] = useState('');

  const params = useParams();
  const location = useLocation();
  const thesis = location.state.thesis;

  const [finalAssignList, setFinalAssignList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");

  const getAllFinalAssignList = () => {
    axiosGetFinalAssignmentList(JWTtoken)
      .then((response) => {
        const list = response.data.rows || [];
        setFinalAssignList(list);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllFinalAssignList();
  }, []);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(finalAssignList.length / porPagina);

  console.log(selectOption);
  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorDetailDeliverableJuryGlobal">
        <div className="contenedorHeaderDeliverableJury">
          <HeaderDetail numero={params.num} index={thesis.id} />
        </div>
        <div className="contenedorPrimeraParteDeliverableJury">
          <FirstPart setSelectOption = {setSelectOption}/>
        </div>
        <div>
          <hr color="black" className="lineaContenidoHeaderJury" />
        </div>
        <div className="contenedorFilaDeliverableJury">
          <TituloDeliverableJury />
        </div>
        <div className="IconDeliverableJury">
          {/*{finalAssignList
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((finalAssign, index) => {

              const valorEstado = getValorEstado(finalAssign.status);

              return (
                <div key={index} className="espaciadoDeliverable">
                  <IconDeliverableJury
                    assign = {finalAssign}
                    index = {index}
                  />
                </div>
              );
            })}
          */}
          <IconDeliverableJury index = {1} />
        </div>
        <div className='contenedorBotoneriaEntregable'>
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
        </div>
      </div>
    </div>
  );
}
