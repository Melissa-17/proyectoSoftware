import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Buffer } from "buffer";


function AsesorRow(props) {
  const {
    asesor,
    deleteList,
    setDeleteList,
    modalConfirmacion,
    setModalConfirmacion,
  } = props;
  
  const navigate = useNavigate();

  const cambioVerDetalle = () => {
    navigate("/Coordinador/asesores/detalle", {
      state: {
        asesorItem: asesor,
      },
    });
  };

  const cambioEditPart = () => {
    navigate("/Coordinador/asesores/editar", {
      state: {
        asesorItem: asesor,
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

  return asesor ? (
    <div className="contenedorCardCoordinador">
      <div className="contenedorCheckBoxCardCoordinador">
        <input
          type="checkbox"
          onChange={(e) => handleCheckDelete(e, asesor.id)}
          defaultChecked={false}
          checked={deleteList.includes(asesor.id)}
          className="checkBoxCardCoordinador"
        />
      </div>

      <div className="contenedorInfoCardCoordinador">
        <div className="primeraLineaInfoCardCoordinador">
          {asesor.photo ? (
            <img
              className="profile-img"
              src={`data:image/png;base64,${Buffer.from(
                asesor.photo.data
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
            {asesor && asesor.name
              ? asesor.name +
                " " +
                asesor.fLastName +
                " " +
                asesor.mLastName
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

export default AsesorRow