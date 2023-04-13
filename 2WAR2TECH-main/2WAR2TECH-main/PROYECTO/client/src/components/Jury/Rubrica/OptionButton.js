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

export default function OpcionBotonJury() {
  const [assignRubric, setAssignRubric] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");
  const params = useParams();
  const location = useLocation();
  const { assignment, revisor, index, student } = location.state;
  const i = index;

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
          <Header />
        </div>
        <div className="separadorRubric">
          <TitleHeader 
            assignment={assignment.ASSIGNMENT}
            revisor={revisor}
            index={index}
            opcion={params.option}
          />
        </div>
        <div className="separadorRubric">
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
