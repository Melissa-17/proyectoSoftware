import React from "react";
import { useNavigate } from "react-router";
import "#Styles/Teacher/Timeline/PrincipalPart/ModalsMessageConfirmated.css";

export default function ModalsMessageConfirmated({closeMessage, closeOtroModal, message, option, num, numero, cxsid, id}) {
  const navigate = useNavigate();
  const retrocederOption = () =>{
    if (numero == 1) {
      navigate("/timeline", {
        state: {
          cxsid: cxsid,
        },
      });
    } else {
      if (numero == 2) {
        navigate(`/timeline/detail/${num}`, {
          state: {
            cxsid: cxsid,
            id: id,
          },
        });
      }
    }
  }
  
  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="MMbody">
          <div className="MMmessage">
            <i class="bi bi-check-circle"></i>
            <p className="MMdescripcionTexto">{message}</p>
          </div>
          <div className="MMfooter">
            <button
              className="MMacceptance"
              onClick={() => {
                if(option==1){
                  closeMessage(false);
                  closeOtroModal(false);
                }
                else{
                  if(option==2) retrocederOption();
                }
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
