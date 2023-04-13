import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Teacher/Administration/PantallaAdministracion.css";
import "#Styles/Teacher/Administration/MenuSuperior.css";
import "#Styles/Teacher/Administration/filtro.css";
import { Combobox } from "react-widgets";
import ContenedorAlumnosAdmin from "./ContenedorAlumnosAdmin.js";
import RowAlumno from "./filaAlumno";
import { UserContext } from "#Context/userContext";
import { axiosGetRegisteredStudent } from "#API/User.js";
import ModalsAlertEditCriteria from "./ModalsAlert";
import ModalsMessage from "./ModalsMessage";
import ModalCargarArchivo from "./ModalCargarArchivo.js";
import ModalConfirmarArchivo from "./ModalConfirmarArchivo.js";
import ModalCargando from "./ModalCargando.js";
import { axiosListStudentWithThesisAndAsesor, axiosSetAssignmentsToStudents } from "../../../api/User";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";
import ModalError from "./ModalErrorArchivo.js"
// import {BuscadorAlumnos} from "./BuscadorAlumnos.js";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import ModalsAlert from "../../Modals/ModalsAlert";

export default function PantallaAdministracion() {
  const JWTtoken = localStorage.getItem("token");
  const [alumnosList, setAlumnosList] = useState();
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [deleteStudentAdviser, setStudentAdviser] = useState([]);
  const [abrirModal, setabrirModal] = useState(false);
  const [subioArchivo, setsubioArchivo] = useState(false);
  const [confirmacion, setConfirmar] = useState(false);
  const [cambio, setCambio] = useState(0);
  const navigate = useNavigate();

  const { cxsid } = useLocation().state;

  const [file, setFile] = useState(null);
  const [isloadingfile, setisloadingfile] = useState(false);
  const [inputName, setInputName] = useState("");
  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(3);
  const [count, setCount] = useState(1);

  const maximo = count ? Math.ceil(count / porPagina) : 1;

  //cambios de axios
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const [validacionBorrar, setValidacionBorrar] = useState(false);

  const [modalCrono, setModalCrono] = useState(false);
  const [loadCrono, setLoadCrono] = useState(false);
  const [confirmCrono, setConfirmCrono] = useState(false);
  const [errorCrono, setErrorCrono] = useState(false);



  const handleinputChange = (e) => {
    // console.log(e);
    setInputName(e.target.value);
  };
  const fileRemove = (file) => {
    setFile(null);
  };

  const retrocesoClic = () => {
    navigate("/courses");
  };
  const NavtoAsesores = () => {
    navigate("/Asesores", { state: { cxsid: cxsid } });
  };

  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  //    const getAllStudentList = (page) => {

  //      axiosGetRegisteredStudent(JWTtoken, cxsid, inputName, page, porPagina)
  //        .then(
  //            (response) => {
  //                 console.log(response.data);
  //                //const list1 = response.data.Registeredstudents.studentsConAsesor || [];
  //                //const list2 =response.data.Registeredstudents.studentsSinThesis.rows || [];
  //                //const list = list1.concat(list2);
  //               //  console.log("listado de alumnos");
  //             //  console.log(list);
  //                //setAlumnosList(list);
  //                //setCount(response.data.count);
  //            }
  //        ).catch(error => {
  //            console.error(`Error: ${error}`);
  //        });
  //    };

  //Axios Seteo de cronograma en los alumos subidos
  const handleSetAssignments = (e) => {
    e.preventDefault();
    const idCXS = cxsid;
    const proposeFormData = {
      idCXS: idCXS,
    };

    // console.log("Antes del axios:" + JSON.stringify(proposeFormData, null, 2));

    axiosSetAssignmentsToStudents(JWTtoken, proposeFormData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //nuevo axios
  const getFullStudentList = (page) => {
    setIsloading(true);
    axiosListStudentWithThesisAndAsesor(
      JWTtoken,
      cxsid,
      inputName,
      page,
      porPagina
    )
      .then((response) => {
        console.log(response);
        const list = response.data.rows || [];
        setStudentList(list);
        //console.log(studentList);
        setCount(response.data.count);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(`Error ${error}`);
      });
  };

  useEffect(() => {
    getFullStudentList();
  }, [confirmacion, modalMensaje, inputName]);

  // useEffect(() => {
  //      getAllStudentList();
  //   },[]);

  const handleCopyDelete = () => {
    if (cambio == 1) {
      setStudentAdviser([]);
      setCambio(0);
    } else if (cambio == 0) {
      setStudentAdviser(
        alumnosList.map((e) => {
          console.log(e);
          return e.USERId;
        })
      );
      setCambio(1);
    }
  };

  // console.log(cxsid)
  const funcionBorrar = () => {
    if (deleteStudentAdviser.length>0) setModalAlerta(true);
    else setValidacionBorrar(true);
  };

  const postAssxStud = () => {
    setLoadCrono(true);
    axiosSetAssignmentsToStudents(JWTtoken, {idCXS: cxsid})
    .then((res) => {
      console.log(res);
      setLoadCrono(false);
      if (res.data.errors.length )
        {
          // setErrorCrono(true);
          setConfirmCrono(true);
        }
      else 
        {
          setConfirmCrono(true);
        }
    })
    .catch((err) => {
      setErrorCrono(true);
      console.error(`Error: ${err}`)
    }) 
  }

  //   console.log(deleteStudentAdviser);
  return (
    <div className="Estructura">
      <Navbar />
      <div className="ContenedorContenido">
        <div className="filacontenido">
          <div className="TituloAdministracion">
            <h1>GESTION DE PERSONAS</h1>
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
          <div>
            <hr className="linea" color="#DEE2E6" /> 
          </div>
        </div>
        <div className="ContenedorOpciones">
          <ul>
            <button className="botonesOpcionSeleccionado">Alumnos</button>
          </ul>
          <ul>
            <button className="botonesOpcion" onClick={NavtoAsesores}>
              Asesores
            </button>
          </ul>
        </div>
        <div className="filacontenido">
          <p className="subtitulo">LISTA DE ALUMNOS MATRICULADOS</p>
        </div>
        <div className="Segundafilacontenido">
          <div>
            {/* <input
              type="text"
              id="busqueda"
              className="Busqueda"
              onChange={handleinputChange}
              placeholder="Ingrese un nombre..."
            ></input>

            <button className="boton">
              <i class="bi bi-search" />
            </button> */}
          </div>
        </div>
        <div className="Tercerafilacontenido">
          <button
            className="botonSeleccionar"
            type="button"
            onClick={handleCopyDelete}
          >
            Seleccionar todos
          </button>
          <button className="botonBorrar" type="button" onClick={funcionBorrar}>
            Eliminar Seleccionados{" "}
          </button>
          <button
            className="botonAnhadir"
            type="button"
            onClick={() => {
              setabrirModal(true);
            }}
          >
            Añadir Excel
          </button>
          <button
            className="botonAsignar"
            type="button"
            onClick={() => {
              setModalCrono(true);
            }}
          >
            Asignar cronograma
          </button>
          {/* {file ? 
                <div>
                <p>{file.name.length<15 ? file.name : `${file.name.slice(0,15)}...`}</p>
                <span
                  className="contenedorDelete"
                  onClick={() => {fileRemove(file)}}
                >
                  <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                </span>
                </div>
                : null
                } */}
        </div>
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : (
          <>
            <div className="Cuartafilacontenido">
              <p className="alumno">Alumno</p>
              <p className="asesorCuartaFilacontenido">Asesor</p>
            </div>
            <div>
              {/* aqui esta el contenedor de filas */}
              {/* {console.log(studentList)} */}
              <div className="contenedordeAlumnos">
                {/* {console.log(alumnosList)} */}
                <div className="contenedorAlumno">
                  {studentList && studentList.length ? (
                    studentList.map((alumno, index) => {
                      return (
                        <div key={index} className="espaciado">
                          <RowAlumno
                            alumno={alumno}
                            deleteStudentAdviser={deleteStudentAdviser}
                            setStudentAdviser={setStudentAdviser}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p className="fs-5 my-3">No hay alumnos matriculados</p>
                  )}
                </div>
              </div>
            </div>

           

            <div className="paginacion-contenedor-alumnos">
              <Paginacion
                pagina={pagina}
                setPagina={setPagina}
                maximo={maximo}
                onClickHandler={getFullStudentList}
                setIsLoading={setIsloading}
              />

            </div>
          </>
        )}

        <div>
          {modalAlerta && (
            <ModalsAlertEditCriteria
              closeAlert={setModalAlerta}
              alertText="¿Desea eliminar el(los) alumno(s) seleccionado(s)?"
              modalMessage={setModalMensaje}
              deleteStudentAdviser={deleteStudentAdviser}
              setStudentAdviser={setStudentAdviser}
              cxsid={cxsid}
            />
          )}
          {modalMensaje && (
            <ModalsMessage
              closeMessage={setModalMensaje}
              closeOtroModal={setModalAlerta}
              message="Se eliminó correctamente"
            />
          )}
          {abrirModal && (
            <ModalCargarArchivo
              closeAlert={setabrirModal}
              alertText="¿Desea subir el archivo .csv del listado de alumnos? Debe descargarlo de intranet y seleccionarlo"
              setFile={setFile}
              subioArchivo={setsubioArchivo}
            />
          )}
          {subioArchivo && file && (
            <ModalConfirmarArchivo
              closeAlert={setsubioArchivo}
              alertText="¿Desea confirmar?"
              file={file}
              cxsid={cxsid}
              confirmar={setConfirmar}
              setisloadingfile={setisloadingfile}
            />
          )}
          {isloadingfile && <ModalCargando estacargando={isloadingfile} />}
          {confirmacion && (
            <ModalsMessage
              closeMessage={setConfirmar}
              closeOtroModal={setisloadingfile}
              closeunmodalmas={setsubioArchivo}
              message="¡Se logro subir el archivo con éxito!"
            />
          )}

          {modalCrono && (
            <ModalsAlert
              closeAlert={setModalCrono}
              alertText="¿Está seguro de generar los entregables de cada estudiante? Este proceso puede tomar unos minutos..."
              // setFile={setFile}
              // subioArchivo={setsubioArchivo}
              action={postAssxStud}
            />
          )}
          {loadCrono && <ModalCargando estacargando={loadCrono} 
          message={"Se están generando los entregables de cada estudiante..."}
          />}
          {confirmCrono && (
            <ModalsMessage
              closeMessage={setConfirmCrono}
              closeOtroModal={setLoadCrono}
              // closeunmodalmas={setsubioArchivo}
              message="¡Se crearon los entregables de cada estudiante con éxito!"
            />
          )}
          {errorCrono && (
            <ModalValidacion
              closeMessage={setErrorCrono}
              message="Hubo un error al generar los entregables de los estudiantes"
            />
          )}


          {validacionBorrar && (
            <ModalValidacion
              closeMessage={setValidacionBorrar}
              message="Debe seleccionar al menos un alumno"
            />
          )}
        </div>
      </div>
    </div>
  );
}
