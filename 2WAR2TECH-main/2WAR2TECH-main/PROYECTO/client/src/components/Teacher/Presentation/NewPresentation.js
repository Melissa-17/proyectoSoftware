import React, { useEffect, useState } from "react";
import "#Styles/Teacher/Presentation/NewPresentation.css";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import { useLocation, useNavigate } from "react-router";
import ThemeSelected from "./ThemeSelected.js";
import ModalsAlert from "../../Modals/ModalsAlert";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import esLocale from "date-fns/esm/locale/es";
import { AxiosPostProgrammedExposition } from "../../../api/ProgrammedExposition";
import { Buffer } from "buffer"; 

export default function NewPresentation() {
  const { cxsid, listaTemporal, tema, estudiantes } = useLocation().state;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialTime, setInitialTime] = useState(new Date());
  const [finalTime, setFinalTime] = useState(new Date());

  const JWTtoken = localStorage.getItem("token");
  console.log("tema: " + JSON.stringify(tema));

  // console.log(selectedDate);
  // console.log(initialTime);
  // console.log(finalTime);

  //lista de jurados añadidos para poder
  const [listJurados, setListJurados] = useState([]);
  const navigate = useNavigate();
  const backPage = () => {
    navigate("/teacher/presentation", {
      state: {
        cxsid: cxsid,
      },
    });
  };

  const goNewTheme = () => {
    navigate("/teacher/presentation/addPresentation/newTheme", {
      state: {
        cxsid: cxsid,
        listSelected: listJurados,
        tema: tema,
        estudiantes: estudiantes,
      },
    });
  };

  const goNewJury = () => {
    navigate("/teacher/presentation/addPresentation/newJury", {
      state: {
        cxsid: cxsid,
        listSelected: listJurados,
        tema: tema,
        estudiantes: estudiantes,
      },
    });
  };

  const nuevoEspacioJurado = () => {
    let newList = [...listJurados, 1];
    setListJurados(newList);
    // console.log(listJurados);
  };

  const NoFunction = (jury) => {
    // console.log(jury)
  };

  const saveNewPresentation = () => {
    //codigo para guardar en bd
    const idStudent = estudiantes[0].USERId;
    const body = {
      startDate: initialTime,
      endDate: finalTime,
      idAlumno: idStudent,
      idThesis: tema.id,
      idsJurados: listJurados.map((e) => e.id),
    };

    AxiosPostProgrammedExposition(JWTtoken, cxsid, body)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    //regreso a la pantalla principal
    navigate("/teacher/presentation", {
      state: {
        cxsid: cxsid,
      },
    });
  };

  useEffect(() => {
    setListJurados(listaTemporal);
  });

  const [openModalAceptar, setOpenModalAceptar] = useState(false);
  const [openModalCancelar, setOpenModalCancelar] = useState(false);

  // {console.log(estudiantes)}
  return (
    <div className="main-new-presentation">
      <div className="navBarTeacher">
        <CreateNewUserPageStudent />
      </div>
      <div className="general-content">
        <div className="header-add">
          <p className="titulo">EXPOSICIONES</p>
          <button
            className="back-but"
            onClick={() => {
              setOpenModalCancelar(true);
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
        <hr className="separador"></hr>
        <div className="add-content">
          <div className="subtitulo">
            <p>AGREGA UNA EXPOSICIÓN</p>
            <div className="espacio-blanco"> </div>
          </div>
          <div className="seccion-tiempo-p">
            <div className="hora-inicio">
              <p>Fecha y Hora de inicio</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils} local={esLocale}>
                <DateTimePicker
                  className="picker-inicio"
                  value={initialTime}
                  onChange={(e) => {
                    setInitialTime(e);
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="hora-fin">
              <p>Fecha y Hora de fin</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils} local={esLocale}>
                <DateTimePicker
                  className="picker-fin"
                  value={finalTime}
                  onChange={(e) => {
                    setFinalTime(e);
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            {/* <div className='hora-fin'>
                            <p>Hora de fin</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                <TimePicker value={finalTime} onChange={(e)=>{setFinalTime(e)}}/> 
                            </MuiPickersUtilsProvider>
                        </div> */}
            {/* <div className='espacio-sobrado'> </div> */}
            {/*<div className='boton-clean'>
                            <button className='limpiar-boton'>Limpiar</button>
                        </div> */}
          </div>
          <div className="seccion-alumno">
            <p className="header-sec-alumno">Alumno</p>
            <button className="cuadro-alumno" onClick={goNewTheme}>
              {tema == "" ? (
                <div className="text-referencia">
                  <i class="bi bi-book fa-2x"></i>
                  <p>Seleccione un tema de tesis de la lista</p>
                </div>
              ) : (
                <div className="info-tesis">
                  <ThemeSelected tema={tema} estudiantes={estudiantes} />
                </div>
              )}
            </button>
          </div>
          <div className="seccion-jurado">
            <p className="header-sec-jurado">Jurados</p>
            <div className="jurados-seleccionados">
              <div className="add-jurado">
                <button className="btn-add-jurado" onClick={goNewJury}>
                  <i class="bi bi-person-plus fa-2x"></i>
                  <p>Añadir jurados</p>
                </button>
              </div>
              <div className="jurados-agregados">
                {listJurados.length > 0
                  ? listJurados.map((jury, index) => {
                      const fullName =
                        jury.name + " " + jury.fLastName + " " + jury.mLastName;
                      return (
                        <div className="new-jurado">
                          <button className="btn-jurado-anhadido">
                            <img
                              className="foto-jurado-info-A"
                              src={
                                jury.photo
                                  ? `data:image/png;base64,${Buffer.from(
                                      jury.photo.data
                                    ).toString("base64")}`
                                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                              }
                            />
                            <p className="nombre-jurado-A">{fullName}</p>
                            <p className="carrera-jurado-A">
                              {jury.SPECIALTies ? jury.SPECIALTies[0].name : ""}
                            </p>
                            <p className="correo-jurado-A">
                              {jury.email
                                ? jury.email
                                : "sincorreo@pucp.edu.pe"}
                            </p>
                          </button>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          <div className="seccion-botones">
            <button
              className="btn-registrar"
              onClick={() => {
                setOpenModalAceptar(true);
              }}
            >
              Registrar
            </button>
            <button
              className="btn-cancelar"
              onClick={() => {
                setOpenModalCancelar(true);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      {openModalCancelar && (
        <ModalsAlert
          closeAlert={setOpenModalCancelar}
          alertText="¿Seguro que desea salir sin guardar los cambios?"
          action={backPage}
        />
      )}
      {openModalAceptar && (
        <ModalsAlert
          closeAlert={setOpenModalAceptar}
          alertText="¿Desea registrar toda la información seleccionada?"
          action={saveNewPresentation}
        />
      )}
    </div>
  );
}
