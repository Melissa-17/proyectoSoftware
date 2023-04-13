import React, { useState } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import Header from "./Header";
import "../../../../assets/styles/Admin/UserRegistry/Edit/PrincipalEditUser.css";
import { useNavigate, useLocation } from "react-router";
import ModalsMessage from "./ModalsMessage";
import { axiosPatchCoordinator } from "../../../../api/Specialty";
import ModalValidacion from "../../Semester/ModalValidacion";

export default function PrincipalEditUser() {
  const JWTtoken = sessionStorage.getItem("token");
  const [modalMensaje, setModalMensaje] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userItem } = location.state;

  const [modalValidacionNombre, setModalValidacionNombre] = useState(false);
  const [modalValidacionApellidoPaterno, setModalApellidoPaterno] = useState(false);
  const [modalValidacionApellidoMaterno, setModalApellidoMaterno] = useState(false);
  const [modalValidacionCorreoPUCP, setModalValidacionCorreoPUCP] = useState(false);
  const [modalValidacionCodigoPUCP, setModalValidacionCodigoPUCP] = useState(false);
  const [validacionCorreoPUCP, setValidacionCorreoPUCP] = useState(false);
  const [modalValidacionCodigoLongitud, setModalValidacionCodigoLongitud] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentNombre = document.querySelector(
      ".inputNombreCambioPrincipalEdit"
    ).value;
    const commentApellidoPaterno = document.querySelector(
      ".inputApellidoPaternoCambioPrincipalEdit"
    ).value;
    const commentApellidoMaterno = document.querySelector(
      ".inputApellidoMaternoCambioPrincipalEdit"
    ).value;
    const commentCorreoPUCP = document.querySelector(
      ".inputEmailCambioPrincipalEdit"
    ).value;
    const commentCodigoPUCP = document.querySelector(
      ".inputCodigoPUCPCambioPrincipalEdit"
    ).value;

    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS

    const commentFormData = {
      idU: userItem.id,
      name: commentNombre,
      fLastName: commentApellidoPaterno,
      mLastName: commentApellidoMaterno,
      email: commentCorreoPUCP,
      idPUCP: commentCodigoPUCP,
      idS: null,
    };

    // llamada al servicio

    // console.log(coordinadorItem);

    if (commentNombre == "") setModalValidacionNombre(true);
    else if (commentApellidoPaterno == "") setModalApellidoPaterno(true);
    else if (commentApellidoMaterno == "") setModalApellidoMaterno(true);
    else if (commentCorreoPUCP == "") setModalValidacionCorreoPUCP(true);
    else if (commentCodigoPUCP == "") setModalValidacionCodigoPUCP(true);
    else if(commentCorreoPUCP.substr(commentCorreoPUCP.length-12)!="@pucp.edu.pe"
    && commentCorreoPUCP.substr(commentCorreoPUCP.length-10)!="@gmail.com") setValidacionCorreoPUCP(true);
    else if (commentCodigoPUCP.length != 8)
      setModalValidacionCodigoLongitud(true);
    else {
      axiosPatchCoordinator(JWTtoken, commentFormData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        setModalMensaje(true);
    }
  };

  const retroceder = () => {
    navigate("/users");
  };

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalEditUser">
        <div className="headerPrincipalEditUser">
          <Header />
        </div>
        <div className="contenedorLeyenda">
          <p className="leyenda">Leyenda: Los campos con * son obligatorios</p>
        </div>
        <div className="contenedorInfoUsuario">
          <form
            id="editUser"
            className="editUser"
            method="patch"
            onSubmit={(e) => handleCommentSubmit(e)}
          >
            <div className="nombreCambioPrincipalRegisterUsuario">
              <p>Nombres*</p>
              <input
                className="inputNombreCambioPrincipalEdit"
                type="text"
                defaultValue={userItem.name}
              />
            </div>

            <div className="primeraFilaInfoCambioPrincipalRegister">
              <div className="apellidoPCambioPrincipalRegister">
                <p>Apellido Paterno*</p>
                <input
                  className="inputApellidoPaternoCambioPrincipalEdit"
                  type="text"
                  defaultValue={userItem.fLastName}
                />
              </div>
              <div className="apellidoMCambioPrincipalRegister">
                <p>Apellido Materno*</p>
                <input
                  className="inputApellidoMaternoCambioPrincipalEdit"
                  type="text"
                  defaultValue={userItem.mLastName}
                />
              </div>
            </div>

            <div className="segundaFilaInfoCambioPrincipalRegister">
              <div className="correoPUCPCambioPrincipalRegister">
                <p>Correo PUCP*</p>
                <input
                  className="inputEmailCambioPrincipalEdit"
                  type="text"
                  defaultValue={userItem.email}
                />
              </div>
              <div className="codigoPUCPCambioPrincipalRegister">
                <p>Código PUCP*</p>
                <input
                  className="inputCodigoPUCPCambioPrincipalEdit"
                  type="text"
                  defaultValue={userItem.idPUCP}
                />
              </div>
            </div>

            <div className="contenedorBotoneriaPrincipalEditCoordinator"
            style={{marginRight:"50px"}}
            >
              <button className="cancelar" onClick={retroceder} type="button">
                Cancelar
              </button>
              <button
                className="guardar"
                type="submit"
                form="editUser"
              >
                Guardar
              </button>
            </div>
          </form>

          <div>
            {modalMensaje && (
              <ModalsMessage message="Se guardó el cambio correctamente" />
            )}
            {modalValidacionNombre && (
              <ModalValidacion
                closeMessage={setModalValidacionNombre}
                message="Debe completar un nombre."
              />
            )}
            {modalValidacionApellidoPaterno && (
              <ModalValidacion
                closeMessage={setModalApellidoPaterno}
                message="Debe completar un apellido paterno."
              />
            )}
            {modalValidacionApellidoMaterno && (
              <ModalValidacion
                closeMessage={setModalApellidoMaterno}
                message="Debe completar un apellido materno."
              />
            )}
            {modalValidacionCorreoPUCP && (
              <ModalValidacion
                closeMessage={setModalValidacionCorreoPUCP}
                message="Debe completar un correo PUCP."
              />
            )}
            {modalValidacionCodigoPUCP && (
              <ModalValidacion
                closeMessage={setModalValidacionCodigoPUCP}
                message="Debe completar un codigo PUCP."
              />
            )}
            {modalValidacionCodigoLongitud && (
              <ModalValidacion
                closeMessage={setModalValidacionCodigoLongitud}
                message="Debe tener un codigo PUCP de 8 caracteres."
              />
            )}
            {validacionCorreoPUCP && <ModalValidacion 
              closeMessage={setValidacionCorreoPUCP}
              message="El correo puede ser @pucp.edu.pe o @gmail.com"
            />}
          </div>
        </div>
      </div>
    </div>
  );
}
