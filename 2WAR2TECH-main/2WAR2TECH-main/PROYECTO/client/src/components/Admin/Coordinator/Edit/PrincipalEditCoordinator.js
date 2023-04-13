import React, { useState, useEffect } from "react";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import Header from "./Header";
import { useLocation } from "react-router";
import "../../../../assets/styles/Admin/Coordinator/Register/PrincipalRegister.css";
import CardEspecialidad from "./CardEspecialidad";
import ModalsMessage from "./ModalsMessage";
import { useNavigate } from "react-router";
import { axiosPatchCoordinator } from "../../../../api/Specialty";
import { axiosGetDetailCoordinator } from "../../../../api/Specialty";
import ModalValidacion from "../../Semester/ModalValidacion";
import { GridLoader } from "react-spinners";

export default function PrincipalEditCoordinator() {
  const { coordinadorItem, option } = useLocation().state;
  const navigate = useNavigate();
  const [modalMensaje, setModalMensaje] = useState(false);
  const [coordinadorDetail, setCoordinadorDetail] = useState(false);
  const JWTtoken = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const retroceder = () => {
    if (option == 1) navigate("/coordinator");
    else if (option == 2)
      navigate("/coordinator/visual", {
        state: {
          coordinadorItem: coordinadorItem,
        },
      });
  };

  const getDetailCoordinator = () => {
    axiosGetDetailCoordinator(JWTtoken, coordinadorItem.id)
      .then((response) => {
        // console.log(response.data)
        const data = response.data || data;
        setCoordinadorDetail(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getDetailCoordinator();
  }, []);

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
      ".inputNombreCambioPrincipalRegister"
    ).value;
    const commentApellidoPaterno = document.querySelector(
      ".inputApellidoPaternoCambioPrincipalRegister"
    ).value;
    const commentApellidoMaterno = document.querySelector(
      ".inputApellidoMaternoCambioPrincipalRegister"
    ).value;
    const commentCorreoPUCP = document.querySelector(
      ".inputEmailCambioPrincipalRegister"
    ).value;
    const commentCodigoPUCP = document.querySelector(
      ".inputCodigoPUCPCambioPrincipalRegister"
    ).value;

    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      idU: coordinadorItem.id,
      name: commentNombre,
      fLastName: commentApellidoPaterno,
      mLastName: commentApellidoMaterno,
      email: commentCorreoPUCP,
      idPUCP: commentCodigoPUCP,
      idS:null,
    };
    // llamada al servicio

    // console.log(commentCodigoPUCP.length);

    if(commentNombre=="") setModalValidacionNombre(true);
    else if(commentApellidoPaterno=="") setModalApellidoPaterno(true);
    else if(commentApellidoMaterno=="") setModalApellidoMaterno(true);
    else if(commentCorreoPUCP=="") setModalValidacionCorreoPUCP(true);
    else if(commentCodigoPUCP=="") setModalValidacionCodigoPUCP(true);
    else if(commentCorreoPUCP.substr(commentCorreoPUCP.length-12)!="@pucp.edu.pe"
    && commentCorreoPUCP.substr(commentCorreoPUCP.length-10)!="@gmail.com") setValidacionCorreoPUCP(true);
    else if(commentCodigoPUCP.length!=8) setModalValidacionCodigoLongitud(true);
    else{
      axiosPatchCoordinator( JWTtoken, commentFormData )
      .then((res) => {
        console.log(res);
        setModalMensaje(true);
      })
      .catch((err) => {
        console.log(err);
      });
      
    }
  };

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorPrincipalVisualCoordinator">
        <div className="headerPrincipalVisualCoordinator">
          <Header option={option} coordinadorItem={coordinadorItem} />
        </div>
        <p className="leyenda"
        style={{marginBottom:"30px"}}
        >Leyenda: Los campos con * son obligatorios</p>
        <div className="contenedorInfoCoordinador">
          
          {
            isLoading ?
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
            />
            :
            <form
            id="editCoordinator"
            className="editCoordinator"
            method="patch"
            onSubmit={(e) => handleCommentSubmit(e)}
          >
            <div className="nombreCambioPrincipalRegister">
              <p>Nombres*</p>
              <input
                className="inputNombreCambioPrincipalRegister"
                type="text"
                defaultValue={coordinadorItem.name}
              />
            </div>

            <div className="primeraFilaInfoCambioPrincipalRegister">
              <div className="apellidoPCambioPrincipalRegister">
                <p>Apellido Paterno*</p>
                <input
                  className="inputApellidoPaternoCambioPrincipalRegister"
                  type="text"
                  defaultValue={coordinadorItem.fLastName}
                />
              </div>
              <div className="apellidoMCambioPrincipalRegister">
                <p>Apellido Materno*</p>
                <input
                  className="inputApellidoMaternoCambioPrincipalRegister"
                  type="text"
                  defaultValue={coordinadorItem.mLastName}
                />
              </div>
            </div>

            <div className="segundaFilaInfoCambioPrincipalRegister">
              <div className="correoPUCPCambioPrincipalRegister">
                <p>Correo PUCP*</p>
                <input
                  className="inputEmailCambioPrincipalRegister"
                  type="text"
                  defaultValue={coordinadorItem.email}
                />
              </div>
              <div className="codigoPUCPCambioPrincipalRegister">
                <p>Código PUCP*</p>
                <input
                  className="inputCodigoPUCPCambioPrincipalRegister"
                  type="text"
                  defaultValue={coordinadorItem.idPUCP}
                />
              </div>
            </div>

            <div className="contenedorEspecialidaPrincipalVisualCoordinator">
              <p>ESPECIALIDADES</p>
              {coordinadorDetail && coordinadorDetail.SPECIALTies
                
                ? 
                coordinadorDetail.SPECIALTies.length ?

                coordinadorDetail.SPECIALTies.map((especialidadItem, index) => {
                    return (
                      <div key={index} className="espaciadoDeliverable">
                        <CardEspecialidad 
                        especialidadItem={especialidadItem} 
                        coordinadorItem={coordinadorItem}/>
                      </div>
                    );
                  
                  })
                :
                <div className="fs-4">No hay especialidades</div>
                  : 
                null}
            </div>

            <div className="contenedorBotoneriaPrincipalEditCoordinator">
              <button className="cancelar" onClick={retroceder} type="button">
                Cancelar
              </button>
              <button
                className="guardar"
                type="submit"
                form="editCoordinator"
              >
                Guardar
              </button>
            </div>
          </form>}

          <div>
            {modalMensaje && (
              <ModalsMessage
                message="Se guardó el cambio correctamente"
                option={option}
                coordinadorItem={coordinadorDetail}
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
      </div>
    </div>
  );
}
