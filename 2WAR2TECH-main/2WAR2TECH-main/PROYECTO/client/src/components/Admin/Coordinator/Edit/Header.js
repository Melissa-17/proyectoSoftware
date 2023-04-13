import React from 'react'
import { useNavigate } from "react-router";

export default function Header(props) {
  const {option, coordinadorItem} = props;
    const navigate = useNavigate();
    const retrocesoClic = () =>{
      if(option==1) navigate("/coordinator");
      else if(option==2) navigate("/coordinator/visual",{
        state:{
          coordinadorItem:coordinadorItem
        }
      });
    }
  return (
    <div className="contenedorHeaderRegisterCoordinatorAdmin">
      <div className="primeraLineaHeaderRegisterCoordinatorAdmin">
        <div className="contenedoRegisterCoordinatorTituloFacultyAdmin"
        style={{marginRight:"550px"}}
        >
          <p className="facultad" style={{marginTop:"10px"}}>EDITAR COORDINADOR</p>
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
  )
}
