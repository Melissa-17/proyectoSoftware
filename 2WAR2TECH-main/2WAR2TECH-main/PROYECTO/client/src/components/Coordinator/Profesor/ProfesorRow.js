import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../../../assets/styles/Admin/Coordinator/CardCoordinador.css";
import ModalsAsignarHorario from "./Modals/ModalsAsignarHorario";
import ModalsMessageHorario from "./Modals/ModalsMessageHorario";
import { Buffer } from "buffer";

function ProfesorRow(props) {
  const {
    profesor,
    deleteList,
    setDeleteList,
    modalConfirmacion,
    setModalConfirmacion,
  } = props;
  const navigate = useNavigate();
  const [modalHorario, setModalHorario] = useState(false);

  const [modalConfirmacion2, setModalConfirmacion2] = useState(false);

  // console.log(profesor);

  const cambioVerDetalle = () => {
    navigate("/Coordinador/profesores/detalle", {
      state: {
        profesorItem: profesor,
      },
    });
  };

  const cambioEditPart = () => {
    navigate("/Coordinador/profesores/editar", {
      state: {
        profesorItem: profesor,
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

  const funcionEleccion = () => {
    return (
      <button
        onClick={() => {
          setModalHorario(true);
        }}
      >
        Asignar Horario
      </button>
    );
  };

  return profesor ? (
    <div className="contenedorCardCoordinador">
      <div className="contenedorCheckBoxCardCoordinador">
        <input
          type="checkbox"
          onChange={(e) => handleCheckDelete(e, profesor.id)}
          defaultChecked={false}
          checked={deleteList.includes(profesor.id)}
          className="checkBoxCardCoordinador"
        />
      </div>

      <div className="contenedorInfoCardCoordinador">
        <div className="primeraLineaInfoCardCoordinador">
          {profesor.photo ? (
            <img
              className="profile-img"
              src={`data:image/png;base64,${Buffer.from(
                profesor.photo.data
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
            {profesor && profesor.name
              ? profesor.name +
                " " +
                profesor.fLastName +
                " " +
                profesor.mLastName
              : "No tiene nombre"}
          </p>
        </div>
      </div>

      <div className="botonAsignarEspecialidad">{funcionEleccion()}</div>

      <div className="contenedorBotonEditarEspecialidad">
        <button className="botonVisualEspecialidad" onClick={cambioVerDetalle}>
          <i class="bi bi-eye"></i>
        </button>
        <button className="botonEditarEspecialidad" onClick={cambioEditPart}>
          <i class="bi bi-pencil-square"></i>
        </button>
      </div>

      <div>
        {modalHorario && (
          <ModalsAsignarHorario
            closeMessage={setModalHorario}
            modalMessage={setModalConfirmacion}
            modalMessage2={setModalConfirmacion2}
            coordinadorItem={profesor}
          />
        )}
        {modalConfirmacion2 && (
          <ModalsMessageHorario
            closeMessage={setModalConfirmacion}
            closeOtroModal={setModalHorario}
            closeMessage2={setModalConfirmacion2}
            message="Se ha asignado correctamente el horario"
          />
        )}
      </div>
    </div>
  ) : null;
}

export default ProfesorRow;
