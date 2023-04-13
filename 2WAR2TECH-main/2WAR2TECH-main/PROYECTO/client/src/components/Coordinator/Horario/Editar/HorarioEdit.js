import React, { useState, useEffect } from "react";
import "../../../../assets/styles/Coordinador/Mantenimiento/HorarioDetalle.css";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router";
import { axiosEditSchedule } from "#API/horario";
import { axiosGetDetailCourse } from "#API/Cursos";
import ModalsAlert from "../../../Modals/ModalsAlert";
import Form from "react-bootstrap/Form";
import { GridLoader } from "react-spinners";
import { axiosGetSemesterDetail } from "#API/Semestres";

function HorarioEdit() {
  const location = useLocation();
  const { horarioItem, cursoSeleccionado, semestreSeleccionado } =
    location.state;

  const [cursoDetail, setCursoDetail] = useState();
  const JWTtoken = sessionStorage.getItem("token");

  const [openModalAceptar, setOpenModalAceptar] = useState(false);
  const [openModalCancelar, setOpenModalCancelar] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTwo, setIsLoadingTwo] = useState(true);
  
  const [semesterDetail, setSemesterDetail] = useState();
  const navigate = useNavigate();

  const handleHorarioSubmit = () => {
    const name = document.querySelector(".nombre").value;
    const abreviation = document.querySelector(".abrebiation").value;

    const body = {
      idHorario: horarioItem.id,
      name: name,
      abbreviation: abreviation,
    };

    axiosEditSchedule(JWTtoken, body)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    //regreso a la pantalla principal
    navigate("/Coordinador/horario");
  };

  const retrocesoClic = () => {
    navigate("/Coordinador/horario");
  };

  const getCursoDetail = () => {
    axiosGetDetailCourse(JWTtoken, cursoSeleccionado)
      .then((response) => {
        const data = response.data || "";
        // console.log(data);
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
                  size={10}
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
                  size={10}
                />
              ) : cursoDetail.name ? cursoDetail.name : null }
            </p>
          </div>
        </div>

        <div className="contenedorInfoHorarioDetalle">
          <Form id="curso-form" className="curso-form">
            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDtitle">
                <strong>Nombre*:</strong>
              </Form.Label>

              <Form.Control
                className="PDDProposedThemeControl nombre"
                type="text"
                defaultValue={
                  horarioItem
                    ? horarioItem.name
                      ? horarioItem.name
                      : "No hay nombre"
                    : "No hay horario"
                }
              />
            </Form.Group>

            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDAbreviacion">
                <strong>Abreviación*:</strong>
              </Form.Label>

              <Form.Control
                className="PDDProposedThemeControl abrebiation"
                type="text"
                defaultValue={
                  horarioItem
                    ? horarioItem.abbreviation
                      ? horarioItem.abbreviation
                      : "No hay abreviación"
                    : "No hay horario"
                }
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="RCbotoneria">
        <button
          className="RCCancelar"
          type="button"
          onClick={() => {
            setOpenModalCancelar(true);
          }}
        >
          Cancelar
        </button>
        <button
          className="RCGuardar"
          variant="primary"
          type="button"
          form="curso-form"
          onClick={() => {
            setOpenModalAceptar(true);
          }}
        >
          Guardar
        </button>
      </div>
      {openModalCancelar && (
        <ModalsAlert
          closeAlert={setOpenModalCancelar}
          alertText="¿Seguro que desea salir sin guardar los cambios?"
          action={retrocesoClic}
        />
      )}
      {openModalAceptar && (
        <ModalsAlert
          closeAlert={setOpenModalAceptar}
          alertText="¿Desea editar toda la información cambiada?"
          action={handleHorarioSubmit}
        />
      )}
    </div>
  );
}

export default HorarioEdit;
