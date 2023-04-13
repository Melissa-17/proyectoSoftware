import React , { useState, useEffect }from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../SidebarMenu/Navbar";
import CardHorario from "./Visual/CardHorario";
import { axiosListAllSemesters } from "#API/Semestres";
 import { axiosGetDetailGenericUser } from "../../../api/User";

function ProfesorDetalle() {
  const { profesorItem } = useLocation().state;
  const navigate = useNavigate();
  const JWTtoken = sessionStorage.getItem("token");
  const [profesorDetail, setProfesorDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMensaje2, setModalMensaje2] = useState(false);

  const [semestreList, setSemestreList] = useState(null); 
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(-1);
  const retrocesoClic = () => {
    navigate("/Coordinador/profesores");
  };
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

  const getProfesorDetail = () => {
    axiosGetDetailGenericUser(JWTtoken, profesorItem.id,semestreSeleccionado)
      .then((response) => {
        const list = response.data || [];
        console.log(response.data);
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
                style={{ marginRight: "540px" }}
              >
                <p className="facultad" style={{ marginTop: "10px" }}>
                  DETALLE DE PROFESOR
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
        <div className="contenedorInfoCoordinador">
          <div className="nombreCambioPrincipalRegister">
            <p>Nombres</p>
            <p className="nombre">
              {profesorItem && profesorItem.name
                ? profesorItem.name
                : "No tiene un nombre"}
            </p>
          </div>

          <div className="primeraFilaInfoCambioPrincipalRegister">
            <div className="apellidoPCambioPrincipalRegister">
              <p>Apellido Paterno</p>
              <p className="apellidoPaterno">
                {profesorItem && profesorItem.fLastName
                  ? profesorItem.fLastName
                  : "No tiene apellido paterno"}
              </p>
            </div>
            <div className="apellidoMCambioPrincipalRegister">
              <p>Apellido Materno</p>
              <p className="apellidoMaterna">
                {profesorItem && profesorItem.mLastName
                  ? profesorItem.mLastName
                  : "No tiene apellido materno"}
              </p>
            </div>
          </div>

          <div className="segundaFilaInfoCambioPrincipalRegister">
            <div className="correoPUCPCambioPrincipalRegister">
              <p>Correo PUCP</p>
              <p className="correoPUCP">
                {profesorItem && profesorItem.email
                  ? profesorItem.email
                  : "No tiene correo PUCP"}
              </p>
            </div>
            <div className="codigoPUCPCambioPrincipalRegister">
              <p>Código PUCP</p>
              <p className="codigoPUCP">
                {profesorItem && profesorItem.idPUCP
                  ? profesorItem.idPUCP
                  : "No tiene código PUCP"}
              </p>
            </div>
          </div>

          <div className="contenedorEspecialidaPrincipalVisualCoordinator">
            <p>HORARIOS</p>
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
            
            {profesorDetail && profesorDetail.COURSE_X_SEMESTERs
              ? profesorDetail.COURSE_X_SEMESTERs.map(
                  (horarioItem, index) => {
                    return (
                      <div key={index} className="espaciadoDeliverable">
                        <CardHorario horarioItem={horarioItem} />
                      </div>
                    );
                  }
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfesorDetalle;
