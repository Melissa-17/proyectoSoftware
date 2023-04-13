import React, { useEffect, useState } from "react";
import StuProposeCard from "./StuProposeCard";
import "#Styles/Adviser/ThesisThemes/StudentPropose.css";
import { axiosGetListProposalsStudents } from "#API/Thesis";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
//
function StudentPropose() {
  const JWTtoken = sessionStorage.getItem("token");
  const [stProposeList, setStProposeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const [inputName, setInputName] = useState("");

  const getStProposeList = (page) => {
    axiosGetListProposalsStudents(JWTtoken, inputName, page, porPagina)
      .then((response) => {
        console.log(response.data);
        const data = response.data.rows || [];
        setcount(response.data.count);
        setStProposeList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error getStProposeList: ${error}`);
      });
  };

  useEffect(() => {
    getStProposeList();
  },[inputName]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  return (
    <div className="StudentProposeContainer">
      <div className="Rsearch">
        <p className="RsearchTitle">
          <strong>Ingrese una palabra asociada: </strong>
        </p>
        <div className="searching">
          <input
            className="searchWord"
            type="text"
            placeholder="Search"
            onChange={(e) => setInputName(e.target.value)}
          />
          <button className="busquedaNombre">
            <i class="bi bi-search" />
          </button>
        </div>
      </div>
      <div className="AdviserStuProposeTitles">
        <p>
          <strong>Alumno asociado</strong>
        </p>
      </div>
      <div className="AdviserStuProposeContainer">
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : stProposeList ? (
          stProposeList
            // .slice(
            //   (pagina - 1) * porPagina,
            //   (pagina - 1) * porPagina + porPagina
            // )
            .map((stPropose, index) => {
              return (
                <StuProposeCard
                  stPropose={stPropose}
                  stList={stPropose.USER_X_THEses}
                  key={index}
                />
              );
            })
        ) : (
          "Aun no hay lista"
        )}
      </div>
      <div className="contenedorFinal">
        <div className="contenedorBotoneriaEntregable">
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getStProposeList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentPropose;
