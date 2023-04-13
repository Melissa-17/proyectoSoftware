import React from "react";
import "../../../assets/styles/Jury/Deliverable/HeaderJury.css";
import { useNavigate } from "react-router";

export default function HeaderJury(props) {

  const navigate = useNavigate();
  const retrocesoClic = () =>{
    navigate("/courses");
  }

  const funcionopcion = () =>{
    if(props.option==1){
      return <div className="contenedorBotonRetrocederHeaderJury">
        <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
          className="imagenRetrocesoDetalle"
        />
        </button>
      </div>;
    }
  }
  return (
    <div className="contenedorHeaderJury">
        <div className="contenedorInfoHeaderJury">
            <div className="contenedorTituloHeaderJury">
                <h1>{props.title}</h1>
            </div>
            <div>
              {funcionopcion()}
            </div>
        </div>
        <div>
            <hr color="black" className="lineaContenidoHeaderJury" />
        </div>
    </div>
  );
}
