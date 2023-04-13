import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Buffer } from "buffer"; 

function JuradoRow(props) {
  const { jurado, deleteList, setDeleteList, setModalConfirmacion } = props;

  const navigate = useNavigate();

  const cambioVerDetalle = () => {
    navigate("/teacher/Jurados/detalle", {
      state: {
        juradoItem: jurado,
      },
    });
  };

  const cambioEditPart = () => {
    navigate("/teacher/Jurados/editar", {
      state: {
        juradoItem: jurado,
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

  return jurado ? (
    <div className="contenedorCardCoordinador">
      <div className="contenedorCheckBoxCardCoordinador">
        <input
          type="checkbox"
          onChange={(e) => handleCheckDelete(e, jurado.id)}
          defaultChecked={false}
          checked={deleteList.includes(jurado.id)}
          className="checkBoxCardCoordinador"
        />
      </div>
      <div className="contenedorInfoCardCoordinador">
        <div className="primeraLineaInfoCardCoordinador">
          {jurado.photo ? (
            <img
              className="profile-img"
              src={`data:image/png;base64,${Buffer.from(
                jurado.photo.data
              ).toString("base64")}`}
              alt="profile-pic"
            />
          ) : (
            <img
              className="profile-img"
              src="https://wallpapercave.com/uwp/uwp2417748.png"
              alt="foto asesor"
            />
          )}
          {/* <img
            className="profile-img"
            src="https://wallpapercave.com/uwp/uwp2417748.png"
            alt="foto asesor"
          /> */}
          <p>
            {jurado && jurado.name
              ? jurado.name + " " + jurado.fLastName + " " + jurado.mLastName
              : "No tiene nombre"}
          </p>
        </div>
      </div>
      <div className="contenedorBotonEditarEspecialidad">
        <button className="botonVisualEspecialidad" onClick={cambioVerDetalle}>
          <i class="bi bi-eye"></i>
        </button>
        <button className="botonEditarEspecialidad" onClick={cambioEditPart}>
          <i class="bi bi-pencil-square"></i>
        </button>
      </div>
    </div>
  ) : null;
}

export default JuradoRow;
