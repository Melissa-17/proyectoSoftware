import React, { useState } from "react";
import "../../../assets/styles/Admin/Coordinator/CardCoordinador.css";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalsAsignar from "./ModalsAsignar";
import ModalsMessageFacultyAdmin from "./ModalsMessageLevel";
import { useNavigate } from "react-router";
import { Buffer } from "buffer"; 

export default function CardCoordinador(props) {
  const { deleteList, setDeleteList, coordinadorItem,
    modalConfirmacion, setModalConfirmacion} = props;
  const [modalEspecialidad, setModalEspecialidad] = useState(false);
  
  const navigate = useNavigate();

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      setDeleteList([...deleteList, newId]);
    } else {
      const newList = deleteList.filter((assignId) => assignId !== newId);
      setDeleteList(newList);
    }
  };

  const funcionEleccion = () =>{
    if(coordinadorItem && coordinadorItem.SPECIALTies && coordinadorItem.SPECIALTies.length > 0){
      return(<p>Asignar Especialidad</p>);
    }else{
      return(<button
        onClick={() => {
          setModalEspecialidad(true);
        }}
      >
        Asignar Especialidad
      </button>);
    }
  }

  return (
    <div className="contenedorCardCoordinador">
      <div className="contenedorCheckBoxCardCoordinador">
        <input
          type="checkbox"
          className="checkBoxCardCoordinador"
          onChange={(e) => handleCheckDelete(e, coordinadorItem.id)}
          defaultChecked={false}
          checked={deleteList.includes(coordinadorItem.id)}
        />
      </div>

      <div className="contenedorInfoCardCoordinador">
        <div className="primeraLineaInfoCardCoordinador">
          {coordinadorItem.photo ? (
            <img
              className="profile-img"
              src={`data:image/png;base64,${Buffer.from(
                coordinadorItem.photo.data
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
            {coordinadorItem && coordinadorItem.name
              ? coordinadorItem.name +
                " " +
                coordinadorItem.fLastName +
                " " +
                coordinadorItem.mLastName
              : "No tiene nombre"}
          </p>
        </div>
        <p>
          {coordinadorItem &&
          coordinadorItem.SPECIALTies &&
          coordinadorItem.SPECIALTies.length > 0
            ? coordinadorItem.SPECIALTies[0].name
            : "Sin especialidad asignada"}
        </p>
      </div>

      <div className="botonAsignarEspecialidad">
        {funcionEleccion()}
      </div>

      <div className="contenedorBotonEditarEspecialidad">
        <button className="botonVisualEspecialidad"
        onClick={()=>{
          navigate("/coordinator/visual",
          {
            state:{
              coordinadorItem:coordinadorItem
            }
          });
        }}
        >
          <i class="bi bi-eye"></i>
        </button>
        <button className="botonEditarEspecialidad"
        onClick={()=>{
          navigate("/coordinator/edit",{
            state:{
              coordinadorItem:coordinadorItem,
              option:1,
            }
          });
        }}
        >
          <i class="bi bi-pencil-square"></i>
        </button>
      </div>

      <div>
        {modalEspecialidad && (
          <ModalsAsignar
            closeMessage={setModalEspecialidad}
            modalMessage={setModalConfirmacion}
            coordinadorItem={coordinadorItem}
          />
        )}
        {modalConfirmacion && (
          <ModalsMessageFacultyAdmin
            closeMessage={setModalConfirmacion}
            closeOtroModal={setModalEspecialidad}
            message="Se ha asignado correctamente la especialidad"
          />
        )}
      </div>
    </div>
  );
}
