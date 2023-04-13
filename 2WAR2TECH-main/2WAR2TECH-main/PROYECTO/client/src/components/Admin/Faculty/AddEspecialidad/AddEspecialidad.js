import React, { useState } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import "../../../../assets/styles/Admin/Faculty/Visual/VisualPart.css";
import Header from "./Header";
import { useLocation } from "react-router";
import ModalsAlertFacultyAdmin from "./ModalsAlert";
import ModalsMessageFacultyAdmin from "./ModalsMessageLevel";
import FormAddEspecialidad from "./FormAddEspecialidad";

export default function AddEspecialidadFacultyAdmin() {
  const { option, facultyItem } = useLocation().state;
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);
  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorVisualPart">
        <Header option={option} facultyItem={facultyItem}/>

        <div className="contenedorPrimeraParte">
          <p>Leyenda: Los campos con * son obligatorios</p>
        </div>

        <div>
          <FormAddEspecialidad
            setModalAlerta={setModalAlerta}
            setModalMensaje={setModalMensaje}
            facultyItem={facultyItem}
          />
        </div>
      </div>
      {modalAlerta && (
        <ModalsAlertFacultyAdmin
          closeAlert={setModalAlerta}
          alertText="¿Seguro que quiere cancelar los cambios?"
          option={option}
        />
      )}
      {modalMensaje && (
        <ModalsMessageFacultyAdmin
          closeMessage={setModalMensaje}
          message="Se guardó correctamente los cambios"
          option={option}
        />
      )}
    </div>
  );
}
