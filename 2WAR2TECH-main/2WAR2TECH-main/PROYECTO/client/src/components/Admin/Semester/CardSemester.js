import React, { useState } from "react";
import "../../../assets/styles/Admin/Semester/CardSemester.css";
import ModalEditSemestre from "./ModalEditSemestre";
import ModalsMessage from "./ModalsMessage";

export default function CardSemester(props) {
  const { semestreItem, deleteList, setDeleteList, modalConfirmacion2,
    setModalConfirmacion2 } = props;
  const [modalEditFacultad, setModalEditFacultad] = useState(false);

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      setDeleteList([...deleteList, newId]);
    } else {
      const newList = deleteList.filter((assignId) => assignId !== newId);
      setDeleteList(newList);
    }
  };

  return (
    <div className="contenedorCardSemester">
      <input
        type="checkbox"
        className="checkBoxCardSemester"
        onChange={(e) => handleCheckDelete(e, semestreItem.id)}
        defaultChecked={false}
        checked={deleteList.includes(semestreItem.id)}
      />
      <p>{semestreItem.abbreviation}</p>
      <button
        className="botonEditarCardSemester"
        onClick={() => {
          setModalEditFacultad(true);
        }}
      >
        <i class="bi bi-pencil-square"></i>
      </button>
      <div>
        {modalEditFacultad && (
          <ModalEditSemestre
            closeMessage={setModalEditFacultad}
            modalMessage={setModalConfirmacion2}
            semestreItem={semestreItem}
          />
        )}
        {modalConfirmacion2 && (
          <ModalsMessage
            closeMessage={setModalEditFacultad}
            message="Se cambió el semestre correctamente"
            otroModal={setModalConfirmacion2}
          />
        )}
      </div>
    </div>
  );
}
