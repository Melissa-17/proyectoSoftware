import React, { useEffect } from "react";
import SeeMore from "./SeeMore";
import { Routes, Route } from "react-router-dom";
import TitleHeader from "./TitleHeader";
import Header from "./Header";
import IconHeader from "./IconHeader";
import '#Styles/Student/Rubrica/OptionButton.css'
import { useState } from "react";
import { axiosGetAssignmentRubric } from "#API/Rubric.js";
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
  const { assignment, revisorName, revisorRol, index, student, course, cxsid, courseName } = location.state ? location.state : {assignment, revisorName, revisorRol, index, student, course};
  // const { assignment, revisorName, revisorRol, index, student, course, cxsid, courseName } = location.state;
  const i = index;
  const getAsesorList = () => {
    ;
  }
  // console.log(revisorName);
  // console.log(revisorRol);

  const getAssignmentRubric = () => {
    axiosGetAssignmentRubric(JWTtoken, params.id, params.idrevisor)
      .then((response) => {
        // console.log(params);
        const list = response.data || [];
        setAssignRubric(list);
        console.log(list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

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
          cambio={params.option} index = {index} 
          student={student} course={course}
          cxsid={cxsid} courseName={courseName}
          />
        </div>
        <div className="separadorRubric">
          <TitleHeader 
            assignment={assignment.ASSIGNMENT}
            revisorName={revisorName}
            revisorRol={revisorRol}
            index={index}
            opcion={params.option}
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
          assignRubric && assignRubric[0] && assignRubric[0].ASSIGNMENT_SCOREs && assignRubric[0].ASSIGNMENT_SCOREs.length 
          ?  assignRubric[0].ASSIGNMENT_SCOREs.map((criteria, index) => {
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
          }) : <div className="fs-4">No hay criterios para mostrar</div>}
        </div>
      </div>
    </div>
  );
}
