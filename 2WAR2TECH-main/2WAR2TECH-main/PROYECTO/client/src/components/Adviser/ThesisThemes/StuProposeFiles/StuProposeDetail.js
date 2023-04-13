import React, { useState, useEffect } from "react";
import Navbar from "../../../SidebarMenu/Navbar";
import { useParams, useLocation } from "react-router-dom";
import { axiosGetThesisDetails } from "#API/Thesis.js";
import "#Styles/Adviser/ThesisThemes/StuProposeFiles/StuProposeDetail.css";
import { useNavigate } from "react-router";
import RequestStudentCard from "../RequestStudentCard";
import fileDefault from "../../../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../../../assets/svg/file-earmark-word.svg";
import fileDocx from "../../../../assets/svg/filetype-docx.svg";
import filePdf from "../../../../assets/svg/filetype-pdf.svg";
import { axiosPatchThesis } from "#API/Thesis";

const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

function StuProposeDetail() {
  const location = useLocation();
  const { thesisId } = location.state;

  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/asesor/contentStudentPropose");
  };

  const JWTtoken = sessionStorage.getItem("token");
  const [thesis, setThesis] = useState(null);

  const getDetailThesis = () => {
    axiosGetThesisDetails(JWTtoken, thesisId)
      .then((response) => {
        console.log(response.data);
        const data = response.data || [];
        setThesis(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getDetailThesis();
  }, []);

  const downloadFile = (item) => {
    const key = `${item.id}-${item.filename}`;
    const url = `https://aws-s3-wartech-2022-2.s3.amazonaws.com/assignment/${key}`;
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  /******************/
  const patchThesis = (accion) => {
    const body = {
      thesisId: thesis.id,
      status: accion,
      originalStatus: thesis.status,
    };

    axiosPatchThesis(JWTtoken, body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  /******************/

  return (
    <div>
      <Navbar />
      <div className="adviserStuProposeDetailContainer">
        <div className="ARDheader">
          <h1 className="PDtitle">DETALLE PROPUESTA TESIS</h1>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
        <hr color="#CED4DA" className="linea" /> 
        <div className="ARDcontent">
          <div className="ARDleft-student">
            <div className="studentCards">
              <RequestStudentCard
                photo="https://wallpapercave.com/uwp/uwp2417748.png"
                name="Seleccione algún alumno de la lista"
              />
            </div>
            <div className="STPEstado">
              <p className="STPPestado">
                <strong>Estado</strong>
              </p>
              <div className="STPestadoDiv">
                <p className="STPestado">E</p>
              </div>
            </div>

            <div className="stpAcciones">
              <button
                className="MLRequestBtn"
                onClick={() => patchThesis("APROBADO")}
              >
                Aceptar
              </button>
              <button
                className="MLRequestBtn"
                onClick={() => patchThesis("EN OBSERVACIÓN")}
              >
                Rechazar
              </button>
            </div>
          </div>
          {thesis ? (
            <div className="ARDright-detail">
              <p className="ARDTitle">
                {thesis.title ? thesis.title : "No hay titulo"}
              </p>
              <div className="ARDdArea">
                <p className="ARDDarea">
                  <strong>Área:</strong>
                </p>
                <div className="ARDareaDiv">
                  <p className="ARDarea">
                    {thesis.areaName ? thesis.areaName : "No hay area"}
                  </p>
                </div>
              </div>
              <div className="ARDdObservations">
                <p className="TDobservations">
                  <strong>Descripción:</strong>
                </p>
                <div className="ARDobservationsDiv">
                  <p className="ARDobservations">
                    {thesis.description
                      ? thesis.description
                      : "No hay descripción"}
                  </p>
                </div>
              </div>
              <div className="ARDdProposedTheme">
                <p className="TDproposedTheme">
                  <strong>Objetivo:</strong>
                </p>
                <div className="ARDproposedThemeDiv">
                  <p className="ARDproposedTheme">
                    {thesis.objective ? thesis.objective : "No hay objectivo"}
                  </p>
                </div>
              </div>
              <div className="ARDdFiles">
                <p className="TDFiles">
                  <strong>Archivos:</strong>
                </p>
                <div className="ARDFilesDiv">
                  {thesis.FILEs.length > 0
                    ? thesis.FILEs.map((item, index) => (
                        <div
                          key={index}
                          className="contenedorUnArchivoThesisSTU"
                        >
                          <img
                            src={
                              listImgConfig[item.filename.split(".")[1]] ||
                              listImgConfig["default"]
                            }
                            alt=""
                            onClick={() => downloadFile(item)}
                          />
                          <p>{item.filename}</p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          ) : (
            "No hay detalle"
          )}
        </div>
      </div>
    </div>
  );
}

export default StuProposeDetail;
