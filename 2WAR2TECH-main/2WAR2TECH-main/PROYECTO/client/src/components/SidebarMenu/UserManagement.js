import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import { axiosEditEmail, axiosEditPhoto } from "#API/User";
import { axiosEditPassword } from "#API/User";
import ModalValidacion from "../Admin/Semester/ModalValidacion";
import ModalsMessage from "../Modals/ModalsMessage";
import "#Styles/Sidebar/UserManagement.css";

function UserManagement() {
  const { userItem } = useLocation().state;
  const navigate = useNavigate();
  const retroceder = () => {
    navigate("/welcome");
  };

  const JWTtoken = sessionStorage.getItem("token");

  const [modalValidacionCorreoPUCP, setModalValidacionCorreoPUCP] =
    useState(false);
  const [modalMensajeEmail, setModalMensajeEmail] = useState(false);
  const [modalMensajeContraseña, setModalMensajeContraseña] = useState(false);
  const [validacionCorreoPUCP, setValidacionCorreoPUCP] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [modalConfirmacionPhoto, setModalConfirmacionPhoto] = useState(false);
  const [validacionFoto, setValidacionFoto] = useState(false);
  // useEffect (() => {},[fileList])
  // let formData;
  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    // if (newFile) {
    //   const updatedList = [...fileList, newFile];
    //   setFileList(updatedList);
    // }
    // console.log(e.target.files[0])
    const formData = new FormData();
    // console.log(newFile);

    formData.append("files", newFile);

    axiosEditPhoto(JWTtoken, formData)
      .then((res) => {
        console.log(res);
        setModalConfirmacionPhoto(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.name == "AxiosError") setValidacionFoto(true);
      });
  };

  const handleCommentSubmitCorreo = (e) => {
    e.preventDefault();
    const commentCorreoPUCP = document.querySelector(
      ".inputEmailCambioPrincipalRegister"
    ).value;
    const commentFormData = {
      email: commentCorreoPUCP,
    };
    if (commentCorreoPUCP == "") {
      setModalValidacionCorreoPUCP(true);
    } else if (
      commentCorreoPUCP.substr(commentCorreoPUCP.length - 12) !=
        "@pucp.edu.pe" &&
      commentCorreoPUCP.substr(commentCorreoPUCP.length - 10) != "@gmail.com"
    ) {
      setValidacionCorreoPUCP(true);
    } else {
      axiosEditEmail(JWTtoken, commentFormData)
        .then((res) => {
          console.log(res);
          setModalMensajeEmail(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCommentSubmitContraseña = (e) => {
    e.preventDefault();
    const commentContraseña = document.querySelector(
      ".inputCodigoPUCPCambioPrincipalRegister"
    ).value;
    if (commentContraseña == "") {
      setModalValidacionCorreoPUCP(true);
    } else {
      const commentFormData = {
        password: commentContraseña,
      };

      axiosEditPassword(JWTtoken, commentFormData)
        .then((res) => {
          console.log(res);
          setModalMensajeContraseña(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const subirImagen = (e) => {

  //   axiosEditPhoto(JWTtoken, formData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <Navbar />
      <div className="contenedorPrincipalVisualCoordinator">
        {console.log(userItem)}
        <div className="headerPrincipalVisualCoordinator">
          <div className="contenedorHeaderRegisterCoordinatorAdmin">
            <div className="primeraLineaHeaderRegisterCoordinatorAdmin">
              <div
                className="contenedoRegisterCoordinatorTituloFacultyAdmin d-flex flex-column"
                style={{ marginRight: "620px" }}
              >
                <p className="facultad fs-1" style={{ marginTop: "10px" }}>
                  EDITAR USUARIO
                </p>
                <p className="fs-6 ">
                  Los cambios se mostrarán la próxima vez que inicie sesión
                </p>
              </div>

              <div className="retrocederHeaderRegisterCoordinator">
                <button onClick={retroceder} className="botonRetrocesoDetalle">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                    className="imagenRetrocesoDetalle"
                  />
                </button>
              </div>
            </div>

            <div className="fineline">
              <hr
                color="black"
                className="lineaRegisterCoordinatorHorizontalFacultyAdmin"
              />
            </div>

            <div className="contenedorInfoCoordinador">
              <form
                id="editCoordinatorCorreo"
                className="editCoordinatorCorreo"
                method="patch"
                onSubmit={(e) => handleCommentSubmitCorreo(e)}
              >
                <div className="segundaFilaInfoCambioPrincipalRegister">
                  <div className="correoPUCPCambioPrincipalRegister">
                    <p>Correo PUCP*</p>
                    <input
                      className="inputEmailCambioPrincipalRegister"
                      type="text"
                      placeholder={
                        userItem && userItem.email
                          ? userItem.email
                          : "No tiene correo PUCP"
                      }
                    />
                  </div>
                </div>

                <div
                  className="contenedorBotoneriaPrincipalEditCoordinator"
                  style={{ marginTop: "20px" }}
                >
                  <button
                    className="guardar"
                    type="submit"
                    form="editCoordinatorCorreo"
                  >
                    Guardar
                  </button>
                </div>
              </form>
              <form
                id="editCoordinatorContraseña"
                className="editCoordinatorContraseña"
                method="patch"
                onSubmit={(e) => handleCommentSubmitContraseña(e)}
              >
                <div className="segundaFilaInfoCambioPrincipalRegister">
                  <div className="codigoPUCPCambioPrincipalRegister">
                    <p>Contraseña*</p>
                    <Form.Control
                      className="inputCodigoPUCPCambioPrincipalRegister"
                      placeholder="Ingrese una contraseña"
                      type="password"
                      // defaultValue={
                      //   userItem && userItem.password ? userItem.password : ""
                      // }
                    />
                  </div>
                </div>

                <div
                  className="contenedorBotoneriaPrincipalEditCoordinator"
                  style={{ marginTop: "20px" }}
                >
                  <button
                    className="guardar"
                    type="submit"
                    form="editCoordinatorContraseña"
                  >
                    Guardar
                  </button>
                </div>
              </form>
              <div className="mb-3 PDdDocs">
                <strong>Subir Imagen:</strong>
                <div className="PDDDocsArea">
                  <div className="botoneriaEncabezadoT">
                    <div className="botonAnhadirUser">
                      <input
                        className="file-upload-inputUser"
                        type="file"
                        accept=".png,.jpg"
                        multiple
                        onChange={onFileChange}
                      />
                      <div className="text-informationUser">+ Añadir</div>
                    </div>
                    {/* <UploadDocsThesis
                      fileList={fileList}
                      setFileList={setFileList}
                    /> */}
                  </div>
                </div>
              </div>
              <div>
                {modalMensajeEmail && (
                  <ModalsMessage
                    message="Se guardó el email correctamente"
                    closeMessage={setModalMensajeEmail}
                  />
                )}
                {modalMensajeContraseña && (
                  <ModalsMessage
                    message="Se guardó la contraseña correctamente"
                    closeMessage={setModalMensajeContraseña}
                  />
                )}
                {modalValidacionCorreoPUCP && (
                  <ModalValidacion
                    closeMessage={setModalValidacionCorreoPUCP}
                    message="Debe ingresar los datos"
                  />
                )}
                {validacionCorreoPUCP && (
                  <ModalValidacion
                    closeMessage={setValidacionCorreoPUCP}
                    message="El correo puede ser @pucp.edu.pe o @gmail.com"
                  />
                )}
                {modalConfirmacionPhoto && <ModalsMessage 
                message="Se guardó la imagen, se podrá visualizar el cambio en el próximo ingreso de sesión."
                closeMessage={setModalConfirmacionPhoto}
                />}
                {validacionFoto && <ModalValidacion 
                closeMessage={setValidacionFoto}
                message="Debe ingresar una imagen con un peso menor de 2MB"
                />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
