import React from "react";
import "../../../../assets/styles/Teacher/Timeline/PrincipalPart/ContentRow.css";
import { formatDate } from "#Helpers/assignmentHelpers.js";
import { useNavigate } from "react-router";

export default function IconEntregable(props) {
    const navigate = useNavigate();
  const { entregable, deleteAssignList, setDeleteAssignList, cxsid, num } = props;

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      setDeleteAssignList([...deleteAssignList, newId]);
    } else {
      const newList = deleteAssignList.filter((assignId) => assignId !== newId);
      setDeleteAssignList(newList);
    }
  };

  const funcionNombreTipo = () =>{
    if(entregable.type == "PARTIAL ASSIGN") return "Entregable Parcial";
    else if(entregable.type == "FINAL ASSIGN") return "Entregable";
    else if(entregable.type == "PROGRAMMED_EXPOSITION" 
    || entregable.type == "EXPOSITION") return "Exposición";
    else if(entregable.type == "ADVANCE") return "Avance";
    else return "SIN TIPO";
  }

  const cambioVisualPart = () => {
    navigate(`/timeline/detail/${num}`, {
      state: {
        cxsid: cxsid,
        id: entregable.id,
        entregable:entregable
      },
    });
  };
  const cambioEditPart = () => {
    navigate(`/timeline/edit`, {
      state: {
        num: 0, //No es necesario porque viene de pantalla inicial
        numero: 1,
        cxsid: props.cxsid,
        id: entregable.id,
        entregable: entregable,
      },
    });
  };

  return entregable ? (
    <div className="contenedorIconEntregableGlobal">
      <div className="contentRow">
        {/* {console.log(entregable)} */}
        <div className="checkBoxContentRow">
          <input
            type="checkbox"
            onChange={(e) => handleCheckDelete(e, entregable.id)}
            defaultChecked={false}
            checked={deleteAssignList.includes(entregable.id)}
            className="checkboxContentRowItem"
          />
        </div>
        <div className="contenidoInfoContentRow">
          <p className="semana">{entregable.assignmentName}</p>
          <p className="entrega">{entregable.chapterName}</p>
          {/* <div className="descripcionEntregableContentRow">
                <p>Entregable: </p>
                <p className="contenidoDescripcionContentRow">
                  {entregable.ASSIGNMENT_TASKs.length > 0
                    ? `${entregable.ASSIGNMENT_TASKs[0].name.substr(0, 23)}...`
                    : "No tiene tareas."}
                </p>
              </div> */}
        </div>
        <div className="lineaVertical">
          <hr color="black" className="lineaVerticalContentRow" />
        </div>
        <div className="contenidoFechaContentRow">
          <div className="fechaLimiteEnvioContentRow">
            <p className="fecha">Fecha límite envío</p>
            <p>{formatDate(entregable.limitCompleteDate)}</p>
          </div>
          <div className="fechaLimiteCalificacionContentRow">
            <p className="fecha">Fecha límite calificación</p>
            <p>{formatDate(entregable.limitCalificationDate)}</p>
          </div>
        </div>
        <div className="lineaVertical">
          <hr color="black" className="lineaVerticalContentRow" />
        </div>
        <div className="botoneriaContentRow">
          <div
            className="nombreTipoIconEntregable"
          >
            {funcionNombreTipo()}
          </div>
          {/* {console.log(entregable)} */}
          <button
            className="botonEditarIconEntregable"
            onClick={cambioEditPart}
          >
            <i class="bi bi-pencil-square"></i>
          </button>
          <button
            className="botonVerDetalleIconEntregable"
            onClick={cambioVisualPart}
          >
            <i class="bi bi-eye"></i>
          </button>
        </div>
      </div>

      {/* <div className="contenedorLineaHorizontalContentRow">
          <hr color="#CED4DA" className="linea" />
          </div> */}
    </div>
  ) : null;
}
