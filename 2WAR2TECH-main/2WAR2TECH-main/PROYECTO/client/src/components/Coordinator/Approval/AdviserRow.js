import React, { useEffect, useState } from "react";
import "../../../assets/styles/Coordinador/Approval/AdviserRow.css";
import { capitalize } from "#Helpers/stringHelpers";
import { useNavigate } from "react-router";
import { axiosPatchThesis } from "#API/Thesis";

export default function AdviserRow(props) {
  const navigate = useNavigate();
  // const [openCommentModal, setOpenCommentModal] = useState(false);
  
  const { thesis,triggerclick,nuevoEstado,setidtesis,setstatustesis,setOpenCommentModal} = props;

  // const patchThesis = (accion) => {
  //   const body = {
  //     thesisId: thesis.id,
  //     status: accion,
  //     originalStatus: thesis.status,
  //   };

  //   axiosPatchThesis(JWTtoken, body)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  // console.log("Thesis:" + JSON.stringify(thesis, null, 2))

  const icono = () => {
    if (props.valor == 1) {
      return (
        <div className="iconoCheck">
          {" "}
          <i className="bi bi-check-circle-fill"></i>{" "}
        </div>
      );
    } else if (props.valor == 2) {
      return (
        <div className="iconoEye">
          {" "}
          <i className="bi bi-eye-fill"></i>{" "}
        </div>
      );
    } else if (props.valor == 3) {
      return (
        <div className="iconoClock">
          {" "}
          <i className="bi bi-clock-fill"></i>{" "}
        </div>
      );
    }else if (props.valor == 4) {
      return (
        <div className="iconoSustentado">
          {" "}
          <i className="bi bi-pass-fill"></i>{" "}
        </div>
      );
    } else if (props.valor == 5) {
      return (
        <div className="iconoVacio">
          {" "}
          <i className=""></i>{" "}
        </div>
      );
    }
  };
   
  const primerIcono = () => {
    if (props.valor == 2 || props.valor == 3) {
      return (
        <button
          className="IconoPrimerAdviserRow1"
          onClick={() => {
            triggerclick(true);
            nuevoEstado("APROBADO");
            setidtesis(thesis.id);
            setstatustesis(thesis.status);
          }}
          // onClick={() => patchThesis("APROBADO")}
        >
          <i class="bi bi-check-lg" />
          <p>Aceptar</p>
        </button>
      );
    } else if (props.valor == 1) {
      return (
        <button
          className="IconoPrimerAdviserRow2"
          onClick={() => {
            triggerclick(true);
            nuevoEstado("EN OBSERVACIÓN");
            setidtesis(thesis.id);
            setstatustesis(thesis.status);
            setOpenCommentModal(true); }}
          // onClick={() => patchThesis("EN OBSERVACIÓN")}
        >
          <i class="bi bi-eye" />
          <p>Observar</p>
        </button>
      );
    }
  };

  const segundoIcono = () => {
    if (props.valor == 1 || props.valor == 2) {
      return (
        <button
          className="IconoSegundoAdviserRow"
          onClick={() => {
            triggerclick(true);
            nuevoEstado("PENDIENTE");
            setidtesis(thesis.id);
            setstatustesis(thesis.status);
          }}
          // onClick={() => patchThesis("PENDIENTE")}
        >
          <i class="bi bi-dash-circle" />
          <p>Pendiente</p>
        </button>
      );
    } else if (props.valor == 3) {
      return (
        <button
          className="IconoSegundoAdviserRow"
          onClick={() => {
            triggerclick(true);
            nuevoEstado("EN OBSERVACIÓN");
            setidtesis(thesis.id);
            setstatustesis(thesis.status);
            setOpenCommentModal(true);}}
          // onClick={() => setOpenCommentModal(true)}
        >
          <i class="bi bi-eye" />
          <p>Observar</p>
        </button>
      );
    }
  };

  const usuario = thesis.USER_X_THEses.map((usuario) => { 
    return usuario.USER;
  })[0]; 

  const VerDetalleClic = () => {
    navigate("/asesor-approval/detail", {
      state: {
        thesisData: thesis,
      },
    });
  };

  return thesis ? (
    <div>
      <div className="AdviserRowGlobal">
        <div className="contenedorFilasAdviserRow">
          <p className="numeroAdviserRow">{props.index}</p>
          <div className="infoTemaAdviserRow">
            <p><strong>{thesis.title ? capitalize(thesis.title) : "No hay titulo"}</strong></p>
            <div className="AutorAdviserRow">
              <p className="autorEnunciadoAdviserRow">Asesor:</p>
              <p>
                {usuario
                  ? usuario.name +
                    " " +
                    usuario.fLastName +
                    " " +
                    usuario.mLastName
                  : "No hay un asesor asignado"}
              </p>
            </div>
          </div>
          <hr color="black" className="lineaVerticalAdviserRow" />
          <div className="contenedorEstadoAdviserRow">
            <div>{thesis.status ? icono() : "No hay estado"}</div>
          </div>
          <hr color="black" className="lineaVerticalAdviserRow" />
          <div className="contenedorDetalleAdviserRow">
            <button className="VerDetalleAdviserRow" onClick={VerDetalleClic}>
              Ver detalle
            </button>
          </div>
          <hr color="black" className="lineaVerticalAdviserRow" />
          <div className="botonesAdviserRow">
            <div className="primerBoton">
              {thesis.status == "SUSTENTADO"  ? "No hay acción" : primerIcono() 
              // : "No hay estado"
              }
            </div>
            <div className="segundoBoton">
              {thesis.status ? segundoIcono() : "No hay estado"}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  ) : null;
}
