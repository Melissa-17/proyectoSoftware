import React from "react";
import { useNavigate } from "react-router";
import "../../../assets/styles/Coordinador/Mantenimiento/Row.css";

function HorarioRow(props) {
  const { horario, deleteList, setDeleteList, cursoSeleccionado,semestreSeleccionado } = props;
  const navigate = useNavigate();
  const cambioVerDetalle = () => {
    navigate("/Coordinador/horario/detalle", {
      state: {
        horarioItem: horario,
        cursoSeleccionado:cursoSeleccionado,
        semestreSeleccionado:semestreSeleccionado,
      },
    });
  };

  const cambioEditPart = () => {
    navigate("/Coordinador/horario/editar", {
      state: {
        horarioItem: horario,
        cursoSeleccionado:cursoSeleccionado,
        semestreSeleccionado:semestreSeleccionado,
      },
    });
  };

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      setDeleteList([...deleteList, newId]);
    } else {
      const newList = deleteList.filter((assignId) => assignId !== newId);
      setDeleteList(newList);
    }
  };
  
  return horario ? (
    <div className="contenedorMainRow">
      <div className="contenedorCursoRow">
        <div className="checkBoxContentRowCoordinado">
          <input
            type="checkbox"
            onChange={(e) => handleCheckDelete(e, horario.id)}
            defaultChecked={false}
            checked={deleteList.includes(horario.id)}
            className="checkboxContentRowItemCoordinador"
          />
        </div>

        <div className="contenidoInfoContentRowCoordinador">
          <p className="curso">
            {horario.abbreviation?horario.abbreviation:"No tiene abreviacion"}
          </p>
        </div>
        <div className="botoneriaContentRowCoordinador">
          <button
            className="botonVerDetalleCoordinador"
            onClick={cambioVerDetalle}
          >
            Ver detalle
          </button>

          <button
            className="botonEditarIconCoordinador"
            onClick={cambioEditPart}
          >
            <i class="bi bi-pencil-square"></i>
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default HorarioRow;
