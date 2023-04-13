import React from "react";
import { useNavigate } from "react-router";
import "../../../assets/styles/Coordinador/Mantenimiento/Row.css";

function CursoRow(props) {
  const { curso, deleteList, setDeleteList } = props;
  const navigate = useNavigate();

  const cambioVerDetalle = () => {
    navigate("/Coordinador/curso/detalle", {
      state:{
        cursoItem: curso,
      },
    });
  }


  const cambioEditPart = () => {
    navigate("/Coordinador/curso/editar", {
      state:{
        cursoItem: curso,
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

  return curso ? (
    <div className="contenedorMainRow">
      <div className="contenedorCursoRow">
        <div className="checkBoxContentRowCoordinado">
          <input
            type="checkbox"
            onChange={(e) => handleCheckDelete(e, curso.id)}
            defaultChecked={false}
            checked={deleteList.includes(curso.id)}
            className="checkboxContentRowItemCoordinador"
          />
        </div>
        <div className="contenidoInfoContentRowCoordinador">
          <p className="curso">{curso.name}</p>
        </div>
        <div className="botoneriaContentRowCoordinador">
          <button className="botonVerDetalleCoordinador"
          onClick={cambioVerDetalle}>
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

export default CursoRow;
