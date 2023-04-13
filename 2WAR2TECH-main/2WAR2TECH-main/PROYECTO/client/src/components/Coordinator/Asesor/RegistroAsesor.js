import React, { useState } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import { useNavigate } from "react-router";
import { axiosPostGenericUser } from "#API/User";
import ModalsMessage from "../Profesor/ModalsMessage";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";
import Form from "react-bootstrap/Form";
import ModalCargando from "../../Contenido/Profesor/ModalCargando";

function RegistroAsesor() {
  const navigate = useNavigate();
  const retroceder = () => {
    navigate("/Coordinador/asesores");
  };

  const [modalMensaje, setModalMensaje] = useState(false);
  const JWTtoken = sessionStorage.getItem("token");

  const [modalValidacionNombre, setModalValidacionNombre] = useState(false);
  const [modalValidacionApellidoPaterno, setModalApellidoPaterno] = useState(false);
  const [modalValidacionApellidoMaterno, setModalApellidoMaterno] = useState(false);
  const [modalValidacionCorreoPUCP, setModalValidacionCorreoPUCP] = useState(false);
  const [modalValidacionCodigoPUCP, setModalValidacionCodigoPUCP] = useState(false);
  const [validacionCorreoPUCP, setValidacionCorreoPUCP] = useState(false);
  const [modalValidacionCodigoLongitud, setModalValidacionCodigoLongitud] = useState(false);
  const [loadChanges, setLoadChanges] = useState(false);
  const [modalError, setModalError] = useState(false);
  
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
      ".codigoPUCPRegistroNuevoProfesor"
    ).value;

    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      name: commentNombre,
      fLastName: commentApellidoPaterno,
      mLastName: commentApellidoMaterno,
      email: commentCorreoPUCP,
      idPUCP: commentCodigoPUCP,
      idR: 5,
    };
    // llamada al servicio


    if (commentNombre == "") setModalValidacionNombre(true);
    else if (commentApellidoPaterno == "") setModalApellidoPaterno(true);
    else if (commentApellidoMaterno == "") setModalApellidoMaterno(true);
    else if (commentCorreoPUCP == "") setModalValidacionCorreoPUCP(true);
    else if(commentCorreoPUCP.substr(commentCorreoPUCP.length-12)!="@pucp.edu.pe"
    && commentCorreoPUCP.substr(commentCorreoPUCP.length-10)!="@gmail.com") setValidacionCorreoPUCP(true);
    else if (commentCodigoPUCP == "") setModalValidacionCodigoPUCP(true);
    else if (commentCodigoPUCP.length != 8)
      setModalValidacionCodigoLongitud(true);
    else {
      setLoadChanges(true);
      axiosPostGenericUser(JWTtoken, commentFormData)
      .then((res) => {
        console.log(res);
        setLoadChanges(false);
        setModalMensaje(true);
      })
      .catch((err) => {
        console.log(err);
        setLoadChanges(false);
        setModalError(true);
      });
      // setModalMensaje(true);
    }
  };

  return (
    <div><Navbar />
    <div className="contenedorPrincipalRegister">
      <form
        id="registroNuevoCoordinador"
        className="registroNuevoCoordinador"
        method="post"
        onSubmit={(e) => handleCommentSubmit(e)}
      >
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>REGISTRO DE USUARIO</h1>
            <button className="RetrocesoDetalle" onClick={retroceder}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetroceso"
              />
            </button>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>

        <div className="contenedorCambioPrincipalRegister">
          <p className="leyenda">
            Leyenda: los campos con * son obligatorios
          </p>
          <div className="nombreCambioPrincipalRegister">
            <p>Nombres *</p>
            <input
              type="text"
              placeholder="Coloque un nombre"
              className="nombreRegistroNuevoCoordinador"
            />
          </div>

          <div className="primeraFilaInfoCambioPrincipalRegister">
            <div className="apellidoPCambioPrincipalRegister">
              <p>Apellido Paterno *</p>
              <input
                type="text"
                placeholder="Coloque un apellido paterno"
                className="apellidoPRegistroNuevoCoordinador"
              />
            </div>
            <div className="apellidoMCambioPrincipalRegister">
              <p>Apellido Materno *</p>
              <input
                type="text"
                placeholder="Coloque un apellido materno"
                className="apellidoMRegistroNuevoCoordinador"
              />
            </div>
          </div>

          <div className="segundaFilaInfoCambioPrincipalRegister">
            <div className="correoPUCPCambioPrincipalRegister">
              <p>Correo PUCP *</p>
              <input
                type="text"
                placeholder="Coloque un correo PUCP"
                className="correoPUCPRegistroNuevoCoordinador"
              />
            </div>
            <div className="codigoPUCPCambioPrincipalRegister">
              <p>Código PUCP *</p>
              <Form.Control
              className="codigoPUCPRegistroNuevoProfesor"
              type="number"
              placeholder="Coloque un código PUCP"
            />
            </div>
          </div>

          <div className="contenedorBotoneriaCambioPrincipalRegister"
          style={{marginTop:"10px"}}
          >
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
              <ModalsMessage message="Se guardó el cambio correctamente" option={1}/>
            )}
            {loadChanges && (
              <ModalCargando 
                estacargando={loadChanges} 
                message={"Se está registrando su asesor..."}
              />
            )}
            {modalError && (
              <ModalValidacion
                closeMessage={setModalError}
                message={"Ha ocurrido un error al registrar el asesor"}
              />
            )}
            {modalValidacionNombre && <ModalValidacion closeMessage={setModalValidacionNombre}
            message="Debe completar un nombre."/>}
            {modalValidacionApellidoPaterno && <ModalValidacion closeMessage={setModalApellidoPaterno}
            message="Debe completar un apellido paterno."/>}
            {modalValidacionApellidoMaterno && <ModalValidacion closeMessage={setModalApellidoMaterno}
            message="Debe completar un apellido materno."/>}
            {modalValidacionCorreoPUCP && <ModalValidacion closeMessage={setModalValidacionCorreoPUCP}
            message="Debe completar un correo PUCP."/>}
            {modalValidacionCodigoPUCP && <ModalValidacion closeMessage={setModalValidacionCodigoPUCP}
            message="Debe completar un codigo PUCP."/>}
            {modalValidacionCodigoLongitud && <ModalValidacion closeMessage={setModalValidacionCodigoLongitud}
            message="Debe tener un codigo PUCP de 8 caracteres."/>}
            {validacionCorreoPUCP && <ModalValidacion closeMessage={setValidacionCorreoPUCP} 
            message="El correo puede ser @pucp.edu.pe o @gmail.com"/>}
          </div>
        </div>
      </form>
    </div></div>
  );
}

export default RegistroAsesor