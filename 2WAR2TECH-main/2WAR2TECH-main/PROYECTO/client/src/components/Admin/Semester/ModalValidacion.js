import React from "react";
import "../../Modals/ModalsMessage.css";

//Este modal es para los mensajes de confirmación o error
function ModalValidacion({ closeMessage, message }) {
  return (
    <div className="modalValidacionErrores"
    style={{backgroundColor:"rgba(38, 36, 36, 0.658)"}}
    >
      <div className="modalMessageValidacionErrores">
        <div className="MMbody">
          <div className="ContenidoModalValidacion">
            <i class="bi bi-exclamation-circle-fill" style={{color:"rgb(226, 226, 61)"}}></i>
            <p className="MMdescripcionTexto"
            style={{maxWidth:"350px", minWidth:"350px", marginLeft:"10px",marginTop:"20px"}}
            >{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {
                closeMessage(false);
              }}
              style={{width:"150px", backgroundColor:"#298288"}}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalValidacion;
