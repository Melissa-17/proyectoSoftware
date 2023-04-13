import React, { useState } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import "#Styles/Admin/Coordinator/Register/PrincipalRegister.css";
import Header from "./Header";
import { useNavigate } from "react-router";
import ModalsMessage from "./ModalsMessage";
import { axiosPostCoordinator } from "#API/Specialty";
import ModalValidacion from "../../Semester/ModalValidacion";

export default function PrincipalRegister() {
  const navigate = useNavigate();
  const retroceder = () => {
    navigate("/coordinator");
  };
  const [modalMensaje, setModalMensaje] = useState(false);
  const JWTtoken = sessionStorage.getItem("token");


  // input.addEventListener('input', (e) => {
  //   const value = e.target.value;
  
  //   if (regex.test(value)) {
  //     input.value = value.slice(0, value.length - 1);
  //     error.textContent = 'A filename cannot contain any of the following characters: \/:*?"<>|';
  //   } else {
  //     error.textContent = '';
  //   }
  // });

  const [validacionNombre, setValidacionNombre] = useState(false);
  const [validacionApellidoPaterno, setValidacionApellidoPaterno] = useState(false);
  const [validacionApellidoMaterno, setValidacionApellidoMaterno] = useState(false);
  const [validacionCodigo, setValidacionCodigo] = useState(false);
  const [validacionCorreo, setValidacionCorreo] = useState(false);
  const [validacionCorreoPUCP, setValidacionCorreoPUCP] = useState(false);
  const [validacionCodigoLength, setValidacionCodigoLength] = useState(false);


  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentNombre = document.querySelector(
      ".nombreRegistroNuevoCoordinador"
    ).value;
    const commentApellidoPaterno = document.querySelector(
      ".apellidoPRegistroNuevoCoordinador"
    ).value;
    const commentApellidoMaterno = document.querySelector(
      ".apellidoMRegistroNuevoCoordinador"
    ).value;
    const commentCorreoPUCP = document.querySelector(
      ".correoPUCPRegistroNuevoCoordinador"
    ).value;
    const commentCodigoPUCP = document.querySelector(
      ".codigoPUCPRegistroNuevoCoordinador"
    ).value;

    // const emailRegex = 
    //   new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    // const valCorreo = emailRegex.test(commentCorreoPUCP);
    // if (!valCorreo) {

    //   return;
    // }


    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      name: commentNombre,
      fLastName: commentApellidoPaterno,
      mLastName: commentApellidoMaterno,
      email: commentCorreoPUCP,
      idPUCP: commentCodigoPUCP
    };
    // llamada al servicio

    // console.log(commentCorreoPUCP.substr(commentCorreoPUCP.length-12));

    if(commentNombre=="") setValidacionNombre(true);
    else if(commentApellidoPaterno=="") setValidacionApellidoPaterno(true);
    else if(commentApellidoMaterno=="") setValidacionApellidoMaterno(true);
    else if(commentCorreoPUCP=="") setValidacionCorreo(true);
    else if(commentCorreoPUCP.substr(commentCorreoPUCP.length-12)!="@pucp.edu.pe"
    && commentCorreoPUCP.substr(commentCorreoPUCP.length-10)!="@gmail.com" 
    && commentCorreoPUCP.substr(commentCorreoPUCP.length-8)!="@pucp.pe")  setValidacionCorreoPUCP(true);
    else if(commentCodigoPUCP=="") setValidacionCodigo(true);
    else if(commentCodigoPUCP.length!=8) setValidacionCodigoLength(true);
    else{
      axiosPostCoordinator( JWTtoken, commentFormData )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      setModalMensaje(true);
    }
  };

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalRegister">
        <form
          id="registroNuevoCoordinador"
          className="registroNuevoCoordinador"
          method="post"
          onSubmit={(e) => handleCommentSubmit(e)}
        >
          <div>
            <Header />
          </div>
          <div className="contenedorCambioPrincipalRegister">
            <p className="leyenda">
              Leyenda: los campos con * son obligatorios
            </p>
            <div className="nombreCambioPrincipalRegister">
              <p>Nombres *</p>
              <input type="text" placeholder="Coloque un nombre" 
                className="nombreRegistroNuevoCoordinador"
                />
            </div>

            <div className="primeraFilaInfoCambioPrincipalRegister">
              <div className="apellidoPCambioPrincipalRegister">
                <p>Apellido Paterno *</p>
                <input type="text" placeholder="Coloque un apellido paterno" 
                className="apellidoPRegistroNuevoCoordinador"
                />
              </div>
              <div className="apellidoMCambioPrincipalRegister">
                <p>Apellido Materno *</p>
                <input type="text" placeholder="Coloque un apellido materno" 
                className="apellidoMRegistroNuevoCoordinador"
                />
              </div>
            </div>

            <div className="segundaFilaInfoCambioPrincipalRegister">
              <div className="correoPUCPCambioPrincipalRegister">
                <p>Correo PUCP *</p>
                <input type="text" placeholder="Coloque un correo PUCP" 
                className="correoPUCPRegistroNuevoCoordinador"
                />
              </div>
              <div className="codigoPUCPCambioPrincipalRegister">
                <p>Código PUCP *</p>
                <input type="text" placeholder="Coloque un código PUCP" 
                className="codigoPUCPRegistroNuevoCoordinador"
                />
              </div>
            </div>

            <div className="contenedorBotoneriaCambioPrincipalRegister">
              <button className="cancelar" onClick={retroceder} type="button">
                Cancelar
              </button>
              <button
                className="guardar"
                type="submit"
                form="registroNuevoCoordinador"
              >
                Guardar
              </button>
            </div>

            <div>
              {modalMensaje && (
                <ModalsMessage message="Se guardó el cambio correctamente" />
              )}
              {validacionNombre && <ModalValidacion 
              closeMessage={setValidacionNombre}
              message="Debe completar un nombre."
              />}
              {validacionApellidoPaterno && <ModalValidacion 
              closeMessage={setValidacionApellidoPaterno}
              message="Debe completar un apellido paterno."
              />}
              {validacionApellidoMaterno && <ModalValidacion 
              closeMessage={setValidacionApellidoMaterno}
              message="Debe completar un apellido materno."
              />}
              {validacionCorreo && <ModalValidacion 
              closeMessage={setValidacionCorreo}
              message="Debe completar un correo PUCP."
              />}
              {validacionCodigo && <ModalValidacion 
              closeMessage={setValidacionCodigo}
              message="Debe completar un código PUCP."
              />}
              {validacionCorreoPUCP && <ModalValidacion 
              closeMessage={setValidacionCorreoPUCP}
              message="El correo puede ser @pucp.edu.pe, @pucp.pe o @gmail.com"
              />}
              {validacionCodigoLength && <ModalValidacion 
              closeMessage={setValidacionCodigoLength}
              message="El código PUCP debe tener 8 caracteres."
              />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
