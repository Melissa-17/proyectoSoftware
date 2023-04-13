import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../../SidebarMenu/Navbar";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "#Styles/Adviser/ThesisThemes/NewPropose.css";
import { axiosPostProposeThesisAsesor } from "#API/Thesis";
import UploadDocsThesis from "../../../Contenido/Alumno/ThesisThemes/ThesisPropose/UploadDocsThesis.js";
import ModalsMessage from "./ModalsMessage";
import { removeAccents } from "#Helpers/assignmentHelpers";

function NewPropose() {
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/asesor/contentPropose");
  };
  const [fileList, setFileList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const [modalMensajeConfirmacion, setModalMensajeConfirmacion] = useState(false);

  const handleProposeSubmit = (e) => {
    e.preventDefault();
    const title = document.querySelector(".PDDTitleControl").value;
    const areaName = document.querySelector(".PDDAreaControl").value;
    const objective = document.querySelector(".PDDProposedThemeControl").value;
    const description = document.querySelector(".PDDObservationsControl").value;

    const proposeFormData = {
      title: title,
      areaName: areaName,
      objective: objective,
      description: description,
    
  }

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

    console.log(fileList);

    axiosPostProposeThesisAsesor(JWTtoken, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="NewProposeContainer">
        <div className="NPheader">
          <h1 className="NPtitle">PROPONER TESIS</h1>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
          </button>
        </div>
        <div className="contenedorLineaDetalle">
          <hr color="#CED4DA" className="linea" />
        </div>
        <Form
          className="PDdescription propose-form"
          id="propose-form"
          method="post"
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
        <div className="PDbotoneria">
          <button 
          onClick={()=>{setModalMensajeConfirmacion(true);}}
          className="PDSolicitar" 
          type="submit" 
          form="propose-form"
          >
            Aceptar
          </button>
          {/* <button className="PDLimpiar" type="button">
            Limpiar
          </button> */}
        </div>
      </div>
      
      <div>
        {modalMensajeConfirmacion && <ModalsMessage closeMessage={setModalMensajeConfirmacion} 
        message="Se creó la nueva propuesta correctamente"/>}
      </div>
    </div>
  );
}

export default NewPropose;
