import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../SidebarMenu/Navbar";
import { axiosPatchGenericUser } from "#API/User"; 
import { axiosListAllSemesters } from "#API/Semestres";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";
import ModalsMessage from "../../Admin/Coordinator/Edit/ModalsMessage";
import CardHorarioEdit from "./Edit/CardHorarioEdit";
import Form from "react-bootstrap/Form";
import { axiosGetDetailGenericUser } from "../../../api/User";
import { GridLoader } from "react-spinners";

function ProfesorEditar() {
  const { profesorItem } = useLocation().state;
  const navigate = useNavigate();
  const [modalMensaje, setModalMensaje] = useState(false);
  const [semestreList, setSemestreList] = useState(null); 
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(-1);
  const retrocesoClic = () => {
    navigate("/Coordinador/profesores");
  };
  const JWTtoken = sessionStorage.getItem("token");
  const [modalValidacionNombre, setModalValidacionNombre] = useState(false);
  const [modalValidacionApellidoPaterno, setModalApellidoPaterno] =
    useState(false);
  const [modalValidacionApellidoMaterno, setModalApellidoMaterno] =
    useState(false);
  const [modalValidacionCorreoPUCP, setModalValidacionCorreoPUCP] =
    useState(false);
  const [modalValidacionCodigoPUCP, setModalValidacionCodigoPUCP] =
    useState(false);
  const [modalValidacionCodigoLongitud, setModalValidacionCodigoLongitud] =
    useState(false);
  const [validacionCorreoPUCP, setValidacionCorreoPUCP] = useState(false);

  const [profesorDetail, setProfesorDetail] = useState(false);
  const [modalMensaje2, setModalMensaje2] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  

  const getSemestreList = () => {
    axiosListAllSemesters(JWTtoken)
      .then((response) => {
        const listOne = response.data || [];
        setSemestreList(listOne);
        setSemestreSeleccionado(listOne.length ? listOne[0].id :  -1);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getSemestreList();
  }, []);


  const handleChangeTwo = (e) => {
    var a = document.getElementById("seleccionPrincipalSemestre").value;
    setSemestreSeleccionado(a);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentNombre = document.querySelector(
      ".inputNombreCambioPrincipalRegister"
    ).value;
    const commentApellidoPaterno = document.querySelector(
      ".inputApellidoPaternoCambioPrincipalRegister"
    ).value;
    const commentApellidoMaterno = document.querySelector(
      ".inputApellidoMaternoCambioPrincipalRegister"
    ).value;
    const commentCorreoPUCP = document.querySelector(
      ".inputEmailCambioPrincipalRegister"
    ).value;
    const commentCodigoPUCP = document.querySelector(
      ".inputCodigoPUCPCambioPrincipalRegister"
    ).value;

    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      idU: profesorItem.id,
      name: commentNombre,
      fLastName: commentApellidoPaterno,
      mLastName: commentApellidoMaterno,
      email: commentCorreoPUCP,
      idPUCP: commentCodigoPUCP,
      idS: null,
    };
    // llamada al servicio

    // console.log(commentCorreoPUCP.substr(commentCorreoPUCP.length-10));

    if (commentNombre == "") setModalValidacionNombre(true);
    else if (commentApellidoPaterno == "") setModalApellidoPaterno(true);
    else if (commentApellidoMaterno == "") setModalApellidoMaterno(true);
    else if (commentCorreoPUCP == "") setModalValidacionCorreoPUCP(true);
    else if (
      commentCorreoPUCP.substr(commentCorreoPUCP.length - 12) !=
        "@pucp.edu.pe" &&
      commentCorreoPUCP.substr(commentCorreoPUCP.length - 10) != "@gmail.com"
    )
      setValidacionCorreoPUCP(true);
    else if (commentCodigoPUCP == "") setModalValidacionCodigoPUCP(true);
    else if (commentCodigoPUCP.length != 8)
      setModalValidacionCodigoLongitud(true);
    else {
      axiosPatchGenericUser(JWTtoken, commentFormData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setModalMensaje(true);
    }
  };

  const getProfesorDetail = () => {
    axiosGetDetailGenericUser(JWTtoken, profesorItem.id,semestreSeleccionado)
      .then((response) => {
        const list = response.data || [];
        // console.log(response.data);
        setProfesorDetail(list);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => { 
    getProfesorDetail();
  }, [modalMensaje2,semestreSeleccionado]);

  return (
    <div>
      <Navbar />
      <div className="contenedorPrincipalVisualCoordinator">
        <div className="headerPrincipalVisualCoordinator">
          <div className="contenedorHeaderRegisterCoordinatorAdmin">
            <div className="primeraLineaHeaderRegisterCoordinatorAdmin">
              <div
                className="contenedoRegisterCoordinatorTituloFacultyAdmin"
                style={{ marginRight: "620px" }}
              >
                <p className="facultad" style={{ marginTop: "10px" }}>
                  EDITAR PROFESOR
                </p>
              </div>
              <div className="retrocederHeaderRegisterCoordinator">
                <button
                  onClick={retrocesoClic}
                  className="botonRetrocesoDetalle"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                    className="imagenRetrocesoDetalle"
                  />
                </button>
              </div>
            </div>

            <div>
              <hr
                color="black"
                className="lineaRegisterCoordinatorHorizontalFacultyAdmin"
              />
            </div>
          </div>
        </div>
        <p className="leyenda" style={{ marginBottom: "30px" }}>
          Leyenda: Los campos con * son obligatorios
        </p>
        <div className="contenedorInfoCoordinador">
          <form
            id="editCoordinator"
            className="editCoordinator"
            method="patch"
            onSubmit={(e) => handleCommentSubmit(e)}
          >
            <div className="nombreCambioPrincipalRegister">
              <p>Nombres*</p>
              <input
                className="inputNombreCambioPrincipalRegister"
                type="text"
                defaultValue={
                  profesorItem && profesorItem.name
                    ? profesorItem.name
                    : "No tiene un nombre"
                }
                // required
              />
            </div>

            <div className="primeraFilaInfoCambioPrincipalRegister">
              <div className="apellidoPCambioPrincipalRegister">
                <p>Apellido Paterno*</p>
                <input
                  className="inputApellidoPaternoCambioPrincipalRegister"
                  type="text"
                  defaultValue={
                    profesorItem && profesorItem.fLastName
                      ? profesorItem.fLastName
                      : "No tiene apellido paterno"
                  }
                />
              </div>
              <div className="apellidoMCambioPrincipalRegister">
                <p>Apellido Materno*</p>
                <input
                  className="inputApellidoMaternoCambioPrincipalRegister"
                  type="text"
                  defaultValue={
                    profesorItem && profesorItem.mLastName
                      ? profesorItem.mLastName
                      : "No tiene apellido materno"
                  }
                />
              </div>
            </div>

            <div className="segundaFilaInfoCambioPrincipalRegister">
              <div className="correoPUCPCambioPrincipalRegister">
                <p>Correo PUCP*</p>
                <input
                  className="inputEmailCambioPrincipalRegister"
                  type="text"
                  defaultValue={
                    profesorItem && profesorItem.email
                      ? profesorItem.email
                      : "No tiene correo PUCP"
                  }
                />
              </div>
              <div className="codigoPUCPCambioPrincipalRegister">
                <p>Código PUCP*</p>
                <Form.Control
                  className="inputCodigoPUCPCambioPrincipalRegister"
                  type="number"
                  placeholder="Ingrese un código PUCP"
                  defaultValue={
                    profesorItem && profesorItem.idPUCP
                      ? profesorItem.idPUCP
                      : ""
                  }
                />
              </div>
            </div>

            <div className="contenedorEspecialidaPrincipalVisualCoordinator">
              <p>HORARIOS</p>
              <div className="CoordMainHorario">
            <div className="contenedorSemestreSelected">
                <p>Semestres:</p>
                {semestreList ? (
                  <select
                    className="seleccionPrincipalSemestre"
                    id="seleccionPrincipalSemestre"
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
              </div>
            </div>
            </div>
              <div style={{ overflowY: "scroll", height: "120px" }}>
                  {isLoading ? (
                      <GridLoader
                        className="mx-auto"
                        color="#042354"
                        loading={isLoading}
                        size={24}
                      />
                    ) :profesorDetail && profesorDetail.COURSE_X_SEMESTERs
                    ? profesorDetail.COURSE_X_SEMESTERs.map(
                        (horarioItem, index) => {
                          return (
                            <div key={index} className="espaciadoDeliverable">
                              <CardHorarioEdit
                                horarioItem={horarioItem}
                                profesorItem={profesorDetail}
                                setModalMensaje2={setModalMensaje2}
                              />
                            </div>
                          );
                        }
                      )
                    : null}
                </div>
            <div
              className="contenedorBotoneriaPrincipalEditCoordinator"
              style={{ marginTop: "20px" }}
            >
              <button
                className="cancelar"
                onClick={retrocesoClic}
                type="button"
              >
                Cancelar
              </button>
              <button className="guardar" type="submit" form="editCoordinator">
                Guardar
              </button>
            </div>
          </form>

          <div>
            {modalMensaje && (
              <ModalsMessage
                message="Se guardó el cambio correctamente"
                option={3}
              />
            )}
            {modalValidacionNombre && (
              <ModalValidacion
                closeMessage={setModalValidacionNombre}
                message="Debe completar un nombre."
              />
            )}
            {modalValidacionApellidoPaterno && (
              <ModalValidacion
                closeMessage={setModalApellidoPaterno}
                message="Debe completar un apellido paterno."
              />
            )}
            {modalValidacionApellidoMaterno && (
              <ModalValidacion
                closeMessage={setModalApellidoMaterno}
                message="Debe completar un apellido materno."
              />
            )}
            {modalValidacionCorreoPUCP && (
              <ModalValidacion
                closeMessage={setModalValidacionCorreoPUCP}
                message="Debe completar un correo PUCP."
              />
            )}
            {modalValidacionCodigoPUCP && (
              <ModalValidacion
                closeMessage={setModalValidacionCodigoPUCP}
                message="Debe completar un codigo PUCP."
              />
            )}
            {modalValidacionCodigoLongitud && (
              <ModalValidacion
                closeMessage={setModalValidacionCodigoLongitud}
                message="Debe tener un codigo PUCP de 8 caracteres."
              />
            )}
            {validacionCorreoPUCP && (
              <ModalValidacion
                closeMessage={setValidacionCorreoPUCP}
                message="El correo puede ser @pucp.edu.pe o @gmail.com"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfesorEditar;
