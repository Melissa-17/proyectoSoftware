import React, {useState} from "react";
import "../../../assets/styles/Admin/Faculty/Icon.css";
import { useNavigate } from "react-router";
import ModalNuevaFacultad from "./Edit/ModalNuevaFacultad";
import ModalConfirmated from "./Edit/ModalConfirmated";

export default function Icon(props) {
  const { facultyItem, deleteList, setDeleteList, setModalConfirmacion,modalConfirmacion } = props;
  const [modalEditFacultad, setModalEditFacultad] = useState(false);
  const [modalConfirmacion2, setModalConfirmacion2] = useState(modalConfirmacion);
  const navigate = useNavigate();
  const cambioVerDetalle = () => {
    navigate("/faculty/visual", {
      state: {
        facultyItem: facultyItem,
      },
    });
  };
  function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || "0") + nr;
  }

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      setDeleteList([...deleteList, newId]);
    } else {
      const newList = deleteList.filter((assignId) => assignId !== newId);
      setDeleteList(newList);
    }
  };

  return (
    <div className="contenedorIconFacultyAdmin">
      <input type="checkbox" className="inputIconFacultyAdmin" 
      onChange={(e) => handleCheckDelete(e, facultyItem.id)}
      defaultChecked={false}
      checked={deleteList.includes(facultyItem.id)}
      />
      <div className="contenedorTituloSubtitulo">
        <p className="titulo">{(facultyItem.name).toUpperCase()}</p>
        <p className="codigo">{padLeft(facultyItem.id, 6)}</p>
      </div>
      <div className="contenedorVerDetalleFacultyDetalle">
        <button className="botonVerDetalle" onClick={cambioVerDetalle}>
          Ver detalle
        </button>
        <button
          className="botonEditar"
          onClick={() => {
            setModalEditFacultad(true);
          }}
        >
          <i class="bi bi-pencil-square"></i>
        </button>
      </div>
      <div>
        {modalEditFacultad && (
          <ModalNuevaFacultad
            closeMessage={setModalEditFacultad}
            modalMessage={setModalConfirmacion2}
            otroModalMessage={setModalConfirmacion}
            facultyItem={facultyItem}
          />
        )}
        {modalConfirmacion2 && (
          <ModalConfirmated
            closeMessage={setModalConfirmacion2}
            otroCloseMessage={setModalConfirmacion}
            message="Se guardaron los cambios correctamente"
            otroModal={setModalEditFacultad}
          />
        )}
      </div>
    </div>
  );
}
