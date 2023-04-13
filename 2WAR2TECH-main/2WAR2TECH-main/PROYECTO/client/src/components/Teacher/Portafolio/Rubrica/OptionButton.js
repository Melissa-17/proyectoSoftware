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
import Navbar from "../../../SidebarMenu/Navbar";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";

export default function OpcionBotonTeacher() {
  const [assignRubric, setAssignRubric] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");
  const params = useParams();
  const location = useLocation();
  const { assignment, revisor, index, student, num, course } = location.state;
  const i = index;
  const [value,setValue] = useState();
  const originalAssignRubric = null;
  var numero_num=num;

  const getAssignmentRubric = () => {
    axiosGetAssignmentRubric(JWTtoken, params.id, params.idrevisor)
      .then((response) => {
        const list = response.data || [];
        setAssignRubric(list);
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
    const assignRubricCommentsOne = assignRubric[0]?assignRubric[0].ASSIGNMENT_SCOREs:'';
    console.log(assignRubricCommentsOne)
    const rubricas = {
      "rubricas" : assignRubricCommentsOne
    };
    axiosEditRubricScores(JWTtoken, 
      assignRubricCommentsOne[0].ASSIGNMENTXSTUDENTXREVISORId,
      assignRubricCommentsOne[0].ASSIGNMENTXSTUDENTId,
      rubricas).then(
        (res) => {console.log(res)}
        ).catch((error) => {console.error(error);})
  }

  const cancelBD = () => {
    getAssignmentRubric();
  }

  useEffect(() => {
    getAssignmentRubric();
  }, []);

  return (
    !isLoading && 
    <div className="contenedorOptionButton">
      {/* {console.log(assignRubric)} */}
      <Navbar/>
      <CreateNewUserPageStudent />
      <div className="contenedorRubrica">
        <div>
          <Header num={numero_num} opcion={1} idEntregable={params.id} cambio={params.option} index = {index} course={course} 
          student={student}
          funcionGuardar={SaveBD}
          funcionCancelar={cancelBD}
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
          {/* {originalAssignRubric = assignRubric} */}
          {assignRubric[0].ASSIGNMENT_SCOREs.map((criteria, index) => {
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
          })}
        </div>
      </div>
    </div>
  );
}
