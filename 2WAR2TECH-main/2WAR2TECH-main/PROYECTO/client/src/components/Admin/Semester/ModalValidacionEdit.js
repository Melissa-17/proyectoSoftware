import React from "react";
import "../../Modals/ModalsMessage.css";

//Este modal es para los mensajes de confirmación o error
function ModalValidacionEdit({ closeMessage, message }) {
  return (
    <div className="modalValidacionErrores">
      <div className="modalMessageValidacionErrores">
        <div className="MMbody">
          <div className="ContenidoModalValidacion">
            <i class="bi bi-info-circle" style={{color:"rgb(226, 226, 61)", marginLeft:"600px"}}></i>
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

export default ModalValidacionEdit;
