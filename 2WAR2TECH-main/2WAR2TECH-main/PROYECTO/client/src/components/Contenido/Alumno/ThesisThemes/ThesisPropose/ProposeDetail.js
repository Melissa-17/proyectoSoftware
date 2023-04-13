import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../../../SidebarMenu/Navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MainListAddPDperson from "./MainListAddPDperson";
import "#Styles/Alumno/ThesisThemes/ThesisPropose/ProposeDetail.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  axiosPostProposeThesisStudent,
  axiosPostProposeThesisStudentFiles,
} from "#API/Thesis";
import UploadDocsThesis from "./UploadDocsThesis";
import MainListAddTeammate from "../ThesisList/MainListAddTeammate";
import MainListAddAsesor from "./MainListAddAsesor";
import ModalsMessage from "./ModalsMessage";
import { axiosPostTeam } from "#API/User";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import { removeAccents } from "#Helpers/assignmentHelpers";

function ProposeDetail() {
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/Thesis/propose");
  };
  const [fileList, setFileList] = useState([]);
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [selectedAsesor, setSelectedAsesor] = useState(null);
  const [selectedTeammateList, setSelectedTeammateList] = useState([]);
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
    // const retroalimentacion = "";
    const idsGrupo = selectedTeammateList.map((mate) => mate.id);
    const idProfesor = selectedAsesor.id;

    

    const proposeFormData = {
      title: title,
      areaName: areaName,
      objective: objective,
      description: description,
      // retroalimentacion: retroalimentacion,
      idsGrupo: idsGrupo,
      idProfesor: idProfesor,
    };

   const formData = new FormData();
    const fileListWOAccents = fileList.map((file, index) => {
      const fileWOAccents = new File([file], removeAccents(file.name));
      
      return fileWOAccents;
    });

    for (const file in fileListWOAccents) {
      formData.append("files", fileListWOAccents[file]);
    }
    formData.append("title", title);
    formData.append("areaName", areaName);
    formData.append("objective", objective);
    formData.append("description", description);
    // formData.append("retroalimentacion", retroalimentacion);
    idsGrupo.map((e) => {
      formData.append("idsGrupo[]", e);
    });
    formData.append("idProfesor", idProfesor);

    // console.log(fileList)
    // console.log("Antes del axios:" + JSON.stringify(proposeFormData, null, 2));

    axiosPostProposeThesisStudent(JWTtoken, formData)
      .then((res) => {
        console.log(res);

        axiosPostTeam(JWTtoken, {
          studentIds: [...idsGrupo, user.id],
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
      <div className="proposeDetailContainer">
        <div className="PDheader">
          <h1 className="PDtitle">PROPONER TESIS</h1>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
        <div className="contenedorDetailContainer">
          <hr color="#FFFFFF" className="linea" />
        </div>
        <p className="PDsubtitulo">Detalle de tema de tesis</p>
        <Form
          className="PDdescription propose-form"
          id="propose-form"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleProposeSubmit}
        >
          <Form.Group className="mb-3 PDdTitle" controlId="formTittle">
            <Form.Label className="PDtitle">
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
              rows={7}
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
              rows={7}
            />
          </Form.Group>
        </Form>
        <div className="mb-3 PDdDocs">
          <strong>Archivos:</strong>
          <div className="PDDDocsArea">
            <div className="botoneriaEncabezadoT">
              <UploadDocsThesis fileList={fileList} setFileList={setFileList} />
            </div>
          </div>
        </div>

        {/* <div className="addTeamAndAsesor">
          <MainListAddPDperson />
        </div> */}
        <div className="addTeamAndAsesor">
          <div className="addTeam">
            <MainListAddTeammate
              selectedTeammate={selectedTeammate}
              setSelectedTeammate={setSelectedTeammate}
              selectedTeammateList={selectedTeammateList}
              setSelectedTeammateList={setSelectedTeammateList}
            />
          </div>

          <div className="addTeam">
            <MainListAddAsesor
              selectedAsesor={selectedAsesor}
              setSelectedAsesor={setSelectedAsesor}
            />
          </div>
        </div>

        <div className="PDbotoneria">
          <button
            className="PDSolicitar"
            type="submit"
            form="propose-form"
            onClick={() => {
              setModalMensajeConfirmacion(true);
            }}
          >
            Solicitar
          </button>
          {/* <button className="PDLimpiar" type="button">Limpiar</button>     */}
        </div>
      </div>
      <div>
        {modalMensajeConfirmacion && (
          <ModalsMessage
            closeMessage={setModalMensajeConfirmacion}
            message="Se creó la nueva propuesta correctamente"
          />
        )}
      </div>
    </div>
  );
}

export default ProposeDetail;
