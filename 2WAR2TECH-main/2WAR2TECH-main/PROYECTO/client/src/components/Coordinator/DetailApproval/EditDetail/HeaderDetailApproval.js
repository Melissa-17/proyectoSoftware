import React, { useState } from "react";
import "#Styles/Coordinador/DetailApproval/EditDetail/HeaderDetailApproval.css";
import { useNavigate } from "react-router";
import ModalTrazability from "../ModalTrazability/ModalTrazability";

export default function HeaderDetailApproval(props) {
  const {thesisId} = props;
  const [openTrazability, setOpenTrazability] = useState(false);
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/asesor-approval");
  };


  return (
    <div className="contenedorGlobalHeaderDetailApproval">
      <div className="contenedorHeaderDetailApproval">
        <div className="contenedorTituloHeaderDetailApproval">
          <h1 className="tituloHeaderDetailApproval">
            DETALLE DE TEMA DE TESIS
          </h1>
        </div>
        <button className='boton-guardar-detalle' onClick={()=>{props.save(true)}}>
          Guardar
        </button>
        <button className='boton-cancelar-detalle' onClick={()=>{props.cancel(true)}}>
          Cancelar
        </button>
        {/* <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
            className="imagenRetrocesoDetalle"
          />
        </button> */}
      </div>
      <div className="contenedorLineaHeaderDetailApproval">
        <hr color="black" className="lineaHeaderDetailApproval" />
      </div>
      {/* <div className="containerHistorialBox">
        <div className="historialBox">
          <i class="bi bi-info-circle fa-2x"></i>
          <p>
            Al presionar el botón{" "}
            <strong>
              <i>Historial</i>
            </strong>
            , usted podrá ver el registro de cambios realizados en este tema de
            tesis.
          </p>
          <button
            onClick={() => {
              setOpenTrazability(true);
            }}
          >
            Historial
          </button>
        </div>
      </div> */}
      {openTrazability && <ModalTrazability closeMessage={setOpenTrazability} thesisId={thesisId}/>}
    </div>
  );
}
