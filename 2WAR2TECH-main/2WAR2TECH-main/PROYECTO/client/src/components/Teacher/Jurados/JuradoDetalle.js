import React from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../SidebarMenu/Navbar";

function JuradoDetalle() {
  const { juradoItem } = useLocation().state;
  const navigate = useNavigate();
  const retroceder = () => {
    navigate("/teacher/jurados");
  };

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
                  DETALLE DE JURADO
                </p>
              </div>
              <div className="retrocederHeaderRegisterCoordinator">
                <button
                  onClick={retroceder}
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
              {juradoItem && juradoItem.name
                ? juradoItem.name
                : "No tiene un nombre"}
            </p>
          </div>

          <div className="primeraFilaInfoCambioPrincipalRegister">
            <div className="apellidoPCambioPrincipalRegister">
              <p>Apellido Paterno</p>
              <p className="apellidoPaterno">
                {juradoItem && juradoItem.fLastName
                  ? juradoItem.fLastName
                  : "No tiene apellido paterno"}
              </p>
            </div>
            <div className="apellidoMCambioPrincipalRegister">
              <p>Apellido Materno</p>
              <p className="apellidoMaterna">
                {juradoItem && juradoItem.mLastName
                  ? juradoItem.mLastName
                  : "No tiene apellido materno"}
              </p>
            </div>
          </div>

          <div className="segundaFilaInfoCambioPrincipalRegister">
            <div className="correoPUCPCambioPrincipalRegister">
              <p>Correo PUCP</p>
              <p className="correoPUCP">
                {juradoItem && juradoItem.email
                  ? juradoItem.email
                  : "No tiene correo PUCP"}
              </p>
            </div>
            <div className="codigoPUCPCambioPrincipalRegister">
              <p>Código PUCP</p>
              <p className="codigoPUCP">
                {juradoItem && juradoItem.idPUCP
                  ? juradoItem.idPUCP
                  : "No tiene código PUCP"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JuradoDetalle;
