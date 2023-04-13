import React, { useState } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Coordinador/RegisterTheme/MainRegister.css";
import Form from "react-bootstrap/Form";
import ModalAsesor from "../DetailApproval/ModalAsesor";
import MainListAddTeammate from "../../Contenido/Alumno/ThesisThemes/ThesisList/MainListAddTeammate";
import MainListAddAsesor from "../../Contenido/Alumno/ThesisThemes/ThesisPropose/MainListAddAsesor";
import { axiosPostTeam } from "../../../api/User";
import { axiosPostProposeThesisStudent } from "../../../api/Thesis";
import { axiosaddThesisCoordinator } from "../../../api/Thesis";
import { useContext } from "react";
import { UserContext } from "#Context/userContext";
import UploadDocsThesis from "../../Contenido/Alumno/ThesisThemes/ThesisPropose/UploadDocsThesis";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ModalsMessage from "../../Contenido/Alumno/ThesisThemes/ThesisPropose/ModalsMessage";

function MainRegister() {
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/asesor-approval");
  };

  // const [modalAlertaAlumno, setModalAlertaAlumno] = useState(false);
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [selectedAsesor, setSelectedAsesor] = useState(null);
  const [selectedTeammateList, setSelectedTeammateList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [modalMensajeConfirmacion, setModalMensajeConfirmacion] =
    useState(false);
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  const JWTtoken = sessionStorage.getItem("token");

  const handleProposeSubmit = (e) => {
    e.preventDefault();
    const title = document.querySelector(".PDDTitleControl").value;
    const areaName = document.querySelector(".PDDAreaControl").value;
    const objective = document.querySelector(".PDDProposedThemeControl").value;
    const description = document.querySelector(".PDDObservationsControl").value;
    const asesorId = selectedAsesor.id;
    const idsGrupo = selectedTeammateList.map((mate) => mate.id);

    const proposeFormData = {
      title: title,
      areaName: areaName,
      objective: objective,
      description: description,
      asesorId: asesorId,
      studentIds: idsGrupo,
    };

    const formData = new FormData();
    for (const file in fileList) {
      formData.append("files", fileList[file]);
    }
    formData.append("title", title);
    formData.append("areaName", areaName);
    formData.append("objective", objective);
    formData.append("description", description);
    idsGrupo.map((e) => {
      formData.append("studentIds[]", e);
    });

    formData.append("asesorId", asesorId);

    axiosaddThesisCoordinator(JWTtoken, formData)
      .then((res) => {
        console.log(res);

        axiosPostTeam(JWTtoken, {
          studentIds: idsGrupo,
          thesisId: res.data.thesisId,
        }) // Grupo
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(`Error postTeam: ${err}`);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="registerMainContainer">
        <div className="registerHeader">
          <p>REGISTRAR TEMA</p>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
          <div className="contenedorLineaDetalle">
            <hr color="#CED4DA" className="linea" />
          </div>
        </div>
        <div className="registerContent">
          <div className="thesisTAO">
            <Form
              className="PDdescription propose-form"
              id="propose-form"
              method="post"
              encType="multipart/form-data"
              onSubmit={handleProposeSubmit}
            >
              <Form.Group className="mb-3 PDdTitle" controlId="formTittle">
                <Form.Label className="PDarea">
                  <strong>Título:</strong>
                </Form.Label>
                <Form.Control
                  className="PDDtitle PDDTitleControl"
                  type="text"
                  placeholder="Ingrese su título"
                />
              </Form.Group>

              <Form.Group className="mb-3 PDdArea" controlId="formArea">
                <Form.Label className="PDarea">
                  <strong>Área:</strong>
                </Form.Label>
                <Form.Control
                  className="PDDarea PDDAreaControl"
                  type="text"
                  placeholder="Ingrese el área"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 PDdProposedTheme"
                controlId="formTemaPropuesto"
              >
                <Form.Label>
                  <strong>Objetivo:</strong>
                </Form.Label>
                <Form.Control
                  className="PDDProposedThemeControl"
                  as="textarea"
                  rows={5}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 PDdObservations"
                controlId="formObservaciones"
              >
                <Form.Label>
                  <strong>Descripción:</strong>
                </Form.Label>
                <Form.Control
                  className="PDDObservationsControl"
                  as="textarea"
                  rows={9}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="mb-3 PDdDocs">
            <strong>Archivos:</strong>
            <div className="PDDDocsArea">
              <div className="botoneriaEncabezadoT">
                <UploadDocsThesis
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="assignAssesorStudent">
          <div className="addTeam">
            <MainListAddAsesor
              selectedAsesor={selectedAsesor}
              setSelectedAsesor={setSelectedAsesor}
            />
          </div>
          <div className="addTeam">
            <MainListAddTeammate
              selectedTeammate={selectedTeammate}
              setSelectedTeammate={setSelectedTeammate}
              selectedTeammateList={selectedTeammateList}
              setSelectedTeammateList={setSelectedTeammateList}
            />
          </div>
        </div>
        <div className="registerFooter">
          <button
            className="PDSolicitar"
            type="submit"
            form="propose-form"
            onClick={() => {
              setModalMensajeConfirmacion(true);
            }}
          >
            Registrar
          </button>
        </div>
      </div>
      <div>
        {modalMensajeConfirmacion && (
          <ModalsMessage
            closeMessage={setModalMensajeConfirmacion}
            message="Se creó el nuevo tema correctamente"
            opcion={1}
          />
        )}
      </div>
    </div>
  );
}

export default MainRegister;
