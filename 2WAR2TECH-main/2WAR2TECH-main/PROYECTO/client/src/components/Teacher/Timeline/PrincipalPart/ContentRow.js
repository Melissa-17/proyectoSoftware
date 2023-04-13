import React, { useEffect } from "react";
import "../../../../assets/styles/Teacher/Timeline/PrincipalPart/ContentRow.css";
import { useNavigate } from "react-router";
import { formatDate } from "#Helpers/assignmentHelpers.js";

export default function ContentRow(props) {
  const navigate = useNavigate();
  const { entregable, deleteAssignList, setDeleteAssignList } = props;

  const cambioVisualPart = () => {
    navigate(`/timeline/detail/${props.num}`, {
      state: {
        cxsid: props.cxsid,
        id: entregable.id,
      },
    });
  };
  const cambioEditPart = () => {
    navigate(`/timeline/edit`, {
      state: {
        opcion: props.option,
        num: 0, //No es necesario porque viene de pantalla inicial
        numero: 1,
        cxsid: props.cxsid,
        id: entregable.id,
        entregable: entregable,
      },
    });
  };

  // useEffect(() => {

  // }, [deleteAssignList, setDeleteAssignList]);;

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      setDeleteAssignList([...deleteAssignList, newId]);
    } else {
      const newList = deleteAssignList.filter((assignId) => assignId !== newId);
      setDeleteAssignList(newList);
    }
  };

  return entregable ? (
    <div className="contenedorContentRowGlobal">
      <div className="contentRow">
        {/* {console.log(entregable)} */}
        <div className="checkBoxContentRow">
          <input
            type="checkbox"
            onChange={(e) => handleCheckDelete(e, entregable.id)}
            defaultChecked={false}
            checked={deleteAssignList.includes(entregable.id)}
          />
        </div>
        <div className="contenidoInfoContentRow">
          <p className="semana">{entregable.assignmentName}</p>
          <p className="entrega">{entregable.chapterName}</p>
          <div className="descripcionEntregableContentRow">
            <p>Entregable: </p>
            <p className="contenidoDescripcionContentRow">
              {entregable.ASSIGNMENT_TASKs.length > 0
                ? `${entregable.ASSIGNMENT_TASKs[0].name.substr(0, 23)}...`
                : "No tiene tareas."}
            </p>
          </div>
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
          <button className="botonEditarContentRow" onClick={cambioEditPart}>
            Editar
          </button>
          <button
            className="botonVerDetalleContentRow"
            onClick={cambioVisualPart}
          >
            Ver detalle
          </button>
        </div>
      </div>

      {/* <div className="contenedorLineaHorizontalContentRow">
      <hr color="#CED4DA" className="linea" />
      </div> */}
    </div>
  ) : null;
}
