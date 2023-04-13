import React, { useEffect } from "react";
import SeeMore from "./SeeMore";
import { Routes, Route } from "react-router-dom";
import TitleHeader from "./TitleHeader";
import Header from "./Header";
import IconHeader from "./IconHeader";
import '#Styles/Adviser/Rubrica/OptionButton.css'
import { useState } from "react";
import { axiosGetAssignmentRubric } from "#API/Rubric.js";
import { axiosEditRubricScores } from "#API/AssignmentScore.js";
import { useParams, useLocation } from 'react-router-dom';
import Navbar from "../../SidebarMenu/Navbar";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import { GridLoader } from "react-spinners";

export default function OpcionBoton() {
  const [assignRubric, setAssignRubric] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");
  const params = useParams();
  const location = useLocation();
  const { assignment, revisor, index, student, course, numero, presentation } = location.state;
  const i = index;
  const [value,setValue] = useState();
  const originalAssignRubric = null;


  const getAssignmentRubric = () => {
    axiosGetAssignmentRubric(JWTtoken, params.id, params.idrevisor)
      .then((response) => {
        const list = response.data || [];
        setAssignRubric(list[0]);
        // console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  const uploadRubricScores = () =>{
    axiosEditRubricScores()
  }

  const SaveBD = () => {
    const assignRubricCommentsOne = assignRubric?assignRubric.ASSIGNMENT_SCOREs:'';
    // console.log(assignRubricCommentsOne);
    console.log(assignRubric)
    const rubricas = {
      "rubricas" : assignRubricCommentsOne
    };
    axiosEditRubricScores(JWTtoken, 
      assignRubricCommentsOne[0].ASSIGNMENTXSTUDENTXREVISORId,
      assignRubricCommentsOne[0].ASSIGNMENTXSTUDENTId,
      rubricas)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const cancelBD = () => {
    getAssignmentRubric();
  }

  useEffect(() => {
    getAssignmentRubric();
  }, []);

  return (
    
    <div className="contenedorOptionButton">
      {/* {console.log(assignRubric)} */}
      <Navbar/>
      <CreateNewUserPageStudent />
      <div className="contenedorRubrica">
        <div>
          <Header opcion={1} idEntregable={params.id} 
          cambio={params.option} 
          index = {index}
          funcionGuardar={SaveBD}
          funcionCancelar={cancelBD}
          curso={course}
          estudiante={student}
          assignRubric={assignRubric}
          assignment={assignment}
          numero = {numero}
          presentation={presentation}
          />
        </div>
        <div className="separadorRubric">
          <TitleHeader 
            assignment={assignment.ASSIGNMENT}
            revisor={revisor}
            index={index}
            opcion={params.id}
          />
        </div>

        <div className="separadorRubric">
          {
          isLoading ?
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
          :
          assignRubric && assignRubric.ASSIGNMENT_SCOREs && assignRubric.ASSIGNMENT_SCOREs.length > 0? 
          assignRubric.ASSIGNMENT_SCOREs.map((criteria, index) => {
            return(
              <IconHeader 
              key={index}
              id = {params.id}
              cambio = {params.option}
              idrevisor = {params.idrevisor}
              criteria={criteria}
              numero = {i}
              />
            )
          }):
          <div className="contenedorErrorRubrica">
            <p className="errorRubrica">No tiene rúbrica asignada</p>
          </div>
          }
        </div>
      </div>
    </div>
  );
}
