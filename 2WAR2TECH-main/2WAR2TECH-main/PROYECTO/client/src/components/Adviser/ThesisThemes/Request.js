import React, { useEffect, useState } from "react";
import RequestThesisCard from "./RequestThesisCard";
import "#Styles/Adviser/ThesisThemes/Request.css";
import { axiosGetRequestsByAsesor } from "#API/Thesis";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { formatDate } from "#Helpers/assignmentHelpers";
import { axiosGetPostulationPeriodByName } from "#API/PostulationPeriod";
import InitialPartApproval from "./InitialPartApproval";
import { GridLoader } from "react-spinners";
import { groupBy } from '#Helpers/assignmentHelpers.js';

function Request() {
  const JWTtoken = sessionStorage.getItem("token");
  const [thesisRequestList, setThesisRequestList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [inputText, setInputText] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);
  const [habilitado, setHabilitado] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfDaysLesft, setNumberOfDaysLesft] = useState(0);
  const [owner, setOwner] = useState(null);
  const [count, setcount] = useState(0);

  
  

  const getThesisRequestList = (page) => {
    axiosGetRequestsByAsesor(JWTtoken, page, porPagina, inputText)
      .then((response) => {
        // console.log("A")
        //console.log(response);
        const data = response.data || [];
        setThesisRequestList(data.students);

        let stuObj = data.students.map((e) => {
          // console.log(e);
          return [groupBy(e[1].map((f) => {
            // console.log(f);
            return f;

          }), "TEAMId")].filter(value =>{ 
            // console.log(value);
            return Object.keys(value).length !== 0;

          }).map(Object.values);
        })
        
        // console.log(stuObj);
        // const a = groupBy(stuObj, 'TEAMId');

        // console.log(a);
        setStudentList(stuObj);
        setcount(data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // useEffect(() => {
  //   getPeriodHab();
  // }, [isLoading]);

  useEffect(() => {
    getThesisRequestList();
  }, [inputText]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(3);

  const maximo = Math.ceil(count/ porPagina) ? Math.ceil(count/ porPagina) : 1;

  return (
    <div className="requestMainContainer">
      {/* <div className="RcomponenteAviso">
        <InitialPartApproval />
      </div> */}
      <div className="buscador" 
      style={{marginLeft:"70px", justifyContent:"flex-end"}}>
        <p className="RsearchTitle">
          <strong>Ingrese una palabra asociada: </strong>
        </p>
        <div className="searching">
          <input
            className="searchWord"
            type="text"
            placeholder="Search"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="busquedaNombre">
            <i class="bi bi-search" />
          </button>
        </div>
      </div>
      <div className="thesisContainer">
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : (thesisRequestList ? (
          thesisRequestList
            .map((requestedThesis, index) => { 
              let owner = null;
              let stListIndex = 0;
              studentList && studentList[index] && studentList[index][0] ? 
              studentList[index][0].map((team, index) => {
                // console.log(team);
                if (team 
                  && team[0] && team[0].USER_X_THESIS 
                  && team[0].USER_X_THESIS.type == "OWNER" && team[0].USER_X_THESIS.USER) {
                    owner = (team[0].USER_X_THESIS.USER)
                    stListIndex = index
                  }
                })
                : (()=>{})()

              // console.log("Owner : " + index + " " + JSON.stringify(owner, null, 2));

              return (
                <div key={index} className="TLRows">
                  <RequestThesisCard
                    thesis={requestedThesis[0]}
                    student={studentList[index][0]}
                    owner={owner}
                    index={stListIndex}
                  />
                </div>
              );
            })
        ) : (
          <p>Aún no hay solicitudes</p>
        ))}
      </div>
      <div className="contenedorFinal" style={{marginLeft:"150px"}}>
        <div className="contenedorBotoneriaEntregable">
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getThesisRequestList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Request;
