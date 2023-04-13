import React from "react";
import '../../../../assets/styles/Admin/Coordinator/Register/Header.css'
import { useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const retrocesoClic = () =>{
        navigate("/coordinator");
    }
  return (
    <div className="contenedorHeaderRegisterCoordinatorAdmin">
      <div className="primeraLineaHeaderRegisterCoordinatorAdmin">
        <div className="contenedoRegisterCoordinatorTituloFacultyAdmin">
          <p className="facultad"
          style={{marginRight:"-90px"}}
          >REGISTRO DE COORDINADOR</p>
        </div>
        <div className="retrocederHeaderRegisterCoordinator">
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
      </div>

      <div>
        <hr color="black" className="lineaRegisterCoordinatorHorizontalFacultyAdmin" />
      </div>
    </div>
  );
}
