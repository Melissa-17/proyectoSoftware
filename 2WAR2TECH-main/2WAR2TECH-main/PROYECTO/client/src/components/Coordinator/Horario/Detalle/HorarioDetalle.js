import React, { useState, useEffect } from "react";
import "../../../../assets/styles/Coordinador/Mantenimiento/HorarioDetalle.css";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import Header from "./Header";
import { useLocation } from "react-router";
import { axiosGetDetailCourse } from "#API/Cursos";
import { axiosGetSemesterDetail } from "#API/Semestres";
import { GridLoader } from "react-spinners";

function HorarioDetalle() {
  const location = useLocation();
  const { horarioItem, cursoSeleccionado, semestreSeleccionado } =
    location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTwo, setIsLoadingTwo] = useState(true);
  const [cursoDetail, setCursoDetail] = useState();
  const [semesterDetail, setSemesterDetail] = useState();

  const JWTtoken = sessionStorage.getItem("token");

  const getSemesterDetail = () => {
    axiosGetSemesterDetail(JWTtoken, semestreSeleccionado)
    .then((response) => {
      const data = response.data || "";
      setSemesterDetail(data);
      setIsLoadingTwo(false);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
  };
  useEffect(() => {
    getSemesterDetail();
  }, []);

  const getCursoDetail = () => {
    axiosGetDetailCourse(JWTtoken, cursoSeleccionado)
      .then((response) => {
        const data = response.data || "";
        console.log(data);
        setCursoDetail(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCursoDetail();
  }, []);

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorHorarioDetalle">
        <div className="hederHorarioDetalle">
          <Header />
        </div>

        <div className="primeraLineaHorarioDetalle">
          <p className="semestre">Semestre</p>
          <div className="contenedorSemestreSeleccionadoHorarioDetalle">
            <p className="semestreSeleccionadoHorarioDetalle">
              {isLoadingTwo ? (
                <GridLoader
                  className="mx-auto"
                  color="#042354"
                  loading={isLoading}
                  size={24}
                />
              ) : semesterDetail.abbreviation ? semesterDetail.abbreviation  : null}
            </p>
          </div>
          <p className="curso">Curso</p>
          <div className="contenedorCursoSeleccionadoHorarioDetalle">
            <p className="cursoSeleccionadoHorarioDetalle">
              {isLoading ? (
                <GridLoader
                  className="mx-auto"
                  color="#042354"
                  loading={isLoading}
                  size={24}
                />
              ) : cursoDetail.name ? (
                cursoDetail.name
              ) : null}
            </p>
          </div>
        </div>

        <div className="contenedorInfoHorarioDetalle">
          <p className="nombreHorarioDetalle">Nombre*</p>
          <p className="infoNombreHorarioDetalle">
            {horarioItem && horarioItem.name
              ? horarioItem.name
              : "No tiene nombre"}
          </p>
          <p className="abreviacionHorarioDetalle">Abreviacion*</p>
          <p className="infoNombreHorarioDetalle">
            {horarioItem && horarioItem.abbreviation
              ? horarioItem.abbreviation
              : "No tiene abreviacion"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HorarioDetalle;
