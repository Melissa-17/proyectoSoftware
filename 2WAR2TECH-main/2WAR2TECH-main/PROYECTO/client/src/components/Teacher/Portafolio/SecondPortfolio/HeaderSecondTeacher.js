import React from 'react'
import "#Styles/Adviser/SecondScreenPortfolio/HeaderPortfolio.css";
import { useNavigate } from "react-router";

export default function HeaderSecondTeacher(props) {
  const navigate = useNavigate();
  const HeaderPortfolioClic = () =>{
    if(props.num==2)navigate("/teacher/portafolio");
    else if(props.num==1) navigate("/jury/portafolio");
  }
  return (
    <div className="contenedorHeaderPortfolio">
      <div className="tituloHeaderPortfolio">
        <h1>Portafolio</h1>
        <div className="space"></div>
        <div className="retro">
          <button className="botonRetrocesoDetalle" onClick={HeaderPortfolioClic}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
      </div>
      <div className="contenedorLineaHeader">
        <hr color="#CED4DA" className="linea" />
      </div>
    </div>
  )
}
