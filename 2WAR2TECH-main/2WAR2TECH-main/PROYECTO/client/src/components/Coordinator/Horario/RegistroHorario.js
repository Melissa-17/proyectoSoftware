import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Coordinador/Mantenimiento/Container.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ModalsAlert from "../../Modals/ModalsAlert";
import { axiosAddSchedule } from "#API/horario";
import { axiosCopySchedule } from "#API/horario";

import { axiosGetDetailCourse } from "#API/Cursos";
import { axiosGetSemesterDetail } from "#API/Semestres";
import { GridLoader } from "react-spinners";

import { axiosGetCoursesBySpecialty } from "#API/Cursos";
import { axiosListAllSemesters } from "#API/Semestres";
import { axiosGetCursosBySemesterId } from "#API/Cursos";

import ModalCargando from "../../Contenido/Profesor/ModalCargando";
import ModalsMessage from "../../Contenido/Profesor/ModalsMessage";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";

function RegistroHorario() {
  const { cursoSeleccionado, semestreSeleccionado } = useLocation().state;
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/Coordinador/horario");
  };

  const JWTtoken = sessionStorage.getItem("token");
  const [openModalAceptar, setOpenModalAceptar] = useState(false);

  const [estaCopiando, setEstaCopiando] = useState(false);
  const [conFecha, setConfecha] = useState(false);

  const [openModalCancelar, setOpenModalCancelar] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTwo, setIsLoadingTwo] = useState(true);
  const [cursoDetail, setCursoDetail] = useState();
  const [semesterDetail, setSemesterDetail] = useState();

  const [semestreList, setSemestreList] = useState(null);
  const [cursoList, setCursoList] = useState(null);
  const [cursoCopiaSeleccionado, setCursoCopiaSeleccionado] = useState(1);
  const [semestreCopiaSeleccionado, setSemestreCopiaSeleccionado] = useState(1);

  const [openLoading, setOpenLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const getAllCourseList = () => {
    axiosGetCursosBySemesterId(JWTtoken, semestreSeleccionado)
      .then((response) => {
        console.log(response);
        const list = response.data.length ?  response.data : [{ COURSEId: 999999, name: "No hay cursos", COURSE: {name: "No hay cursos"}, abbreviation: "" }];
        console.log(list[0] )
        setCursoList(list);
        // setSelectedCourse(list[0]);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // const getCursoList = () => {
  //   axiosGetCoursesBySpecialty(JWTtoken)
  //     .then((response) => {
  //       const list = response.data || [];
  //       setCursoList(list);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  useEffect(() => {
    getAllCourseList();
  }, [semestreSeleccionado]);

  const getSemestreList = () => {
    axiosListAllSemesters(JWTtoken)
      .then((response) => {
        const listOne = response.data || [];
        setSemestreList(listOne);
        getAllCourseList(listOne[listOne.length - 1].id);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getSemestreList();
  }, []);

  const handleChangeTwo = (e) => {
    var a = document.getElementById("seleccionSemestreEnunciadoCuadro").value;
    setSemestreCopiaSeleccionado(a);
  };

  const handleChangeOne = (e) => {
    var a = document.getElementById("seleccionCursoEnunciadoCuadro").value;
    setCursoCopiaSeleccionado(a);
  };

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

  const [validacionNombre, setValidacionNombre] = useState(false);
  const [validacionAbreviacion, setValidacionAbreviacion] = useState(false);

  const handleHorarioSubmit = () => {
    const name = document.querySelector(".nombre").value;
    const abreviacion = document.querySelector(".abreviacion").value;
    if (estaCopiando) {
      setOpenLoading(true);

      const body = {
        idSem: semestreSeleccionado,
        idCurso: cursoSeleccionado,
        name: name,
        abbreviation: abreviacion,
        idSemCopia: semestreCopiaSeleccionado,
        idCxSCopia: cursoCopiaSeleccionado,
        copiarFechas: conFecha ? 1 : 0,
      };
      axiosCopySchedule(JWTtoken, body)
        .then((res) => {
          console.log(res);
          setOpenLoading(false);
          setOpenConfirm(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const body = {
        idSem: semestreSeleccionado,
        idCurso: cursoSeleccionado,
        name: name,
        abbreviation: abreviacion,
      };

      axiosAddSchedule(JWTtoken, body)
        .then((res) => {
          console.log(res);
          setOpenConfirm(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>REGISTRO DE HORARIO</h1>
            <button className="RetrocesoDetalle" onClick={retrocesoClic}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetroceso"
              />
            </button>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
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
              ) : semesterDetail.abbreviation ? (
                semesterDetail.abbreviation
              ) : null}
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
              ) : cursoDetail.name ? (
                cursoDetail.name
              ) : null}
            </p>
          </div>
        </div>

        <div className="CoordIngresoD">
          <Form
            id="curso-form"
            className="curso-form"
            // method="post"
          >
            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDtitle">
                <strong>Nombre*:</strong>
              </Form.Label>
              <Form.Control
                className="PDDProposedThemeControl nombre"
                placeholder="Ingrese el nombre del horario"
                id="nombre"
                name="nombre"
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
                className="PDDProposedThemeControl abreviacion"
                placeholder="Ingrese la abreviación del horario"
                id="abreviacion"
                name="abreviacion"
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="segundoBody">
        <div className="cuadroCopiaHorarioDetalle" style={{ width: "1000px" }}>
          <div className="enunciadoCuadroCopiaHorarioDetalle">
            <i class="bi bi-clock"></i>
            <p>
              Si desea copiar la programación de otro HORARIO ya programado
              anteriormente elija curso y semestre.
            </p>
          </div>

          <div className="seleccionEnunciadoCuadro">
            <p className="semestre">Semestre:</p>
            {semestreList ? (
              <select
                className="seleccionSemestreEnunciadoCuadro"
                id="seleccionSemestreEnunciadoCuadro"
                onChange={handleChangeTwo}
              >
                {semestreList.map((semestreItem, index) => {
                  return (
                    <option value={semestreItem.id}>
                      {semestreItem.abbreviation}
                    </option>
                  );
                })}
              </select>
            ) : (
              <p>No hay semestres</p>
            )}

            <p className="curso">Horario:</p>

            {cursoList ? (
              <select
                className="seleccionCursoEnunciadoCuadro"
                id="seleccionCursoEnunciadoCuadro"
                onChange={handleChangeOne}
              >
                {cursoList.map((cursoItem, index) => {
                  return <option value={cursoItem.id}>{cursoItem.name}</option>;
                })}
              </select>
            ) : (
              <div>No hay cursos</div>
            )}

            <button
              className="copiar"
              onClick={() => {
                setEstaCopiando(!estaCopiando);
              }}
            >
              {!estaCopiando ? "Copiar" : "Cancelar"}
            </button>

            <button
              className="copiar"
              onClick={() => {
                setConfecha(!conFecha);
              }}
              style={{ width: "180px" }}
            >
              {!conFecha ? "ConFecha" : "SinFecha"}
            </button>
          </div>
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
            const name = document.querySelector(".nombre").value;
            const abreviacion = document.querySelector(".abreviacion").value;
            if (name == "") setValidacionNombre(true);
            else if (abreviacion == "") setValidacionAbreviacion(true);
            else setOpenModalAceptar(true);
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
          alertText="¿Desea registrar toda la información seleccionada?"
          action={handleHorarioSubmit}
        />
      )}
      {openLoading && (
        <ModalCargando
          closeMessage={setOpenLoading}
          estaCargando={openLoading}
          message={"El horario se está creando, esto tardará unos segundos"}
        />
      )}
      {openConfirm && (
        <ModalsMessage
          closeMessage={setOpenConfirm}
          message={"Se ha guardado con éxito el horario"}
          retroceso={retrocesoClic}
          from={"RegistroHorario"}
        />
      )}
      {validacionNombre && (
        <ModalValidacion
          closeMessage={setValidacionNombre}
          message="Debe completar un nombre para el horario"
        />
      )}
      {validacionAbreviacion && (
        <ModalValidacion
          closeMessage={setValidacionAbreviacion}
          message="Debe completar una abreviación para el horario"
        />
      )}
    </div>
  );
}

export default RegistroHorario;
