import React from "react";
import fileDefault from "../../../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../../../assets/svg/file-earmark-word.svg";
import fileDocx from "../../../../assets/svg/filetype-docx.svg";
import filePdf from "../../../../assets/svg/filetype-pdf.svg";

const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

function Detailed(props) {
  const downloadFile = (item) => {
    const key = `${item.id}-${item.filename}`;
    const url = `https://aws-s3-wartech-2022-2.s3.amazonaws.com/assignment/${key}`;
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

const funcionStatus = () =>{
  if (props.thesis.status == "APROBADO") {
    return (
      <div className="iconoCheck" style={{marginTop:"10px", marginLeft:"20px"}}>
        {" "}
        <i className="bi bi-check-circle-fill" style={{fontSize:"30px"}}></i>{" "}
      </div>
    );
  } else if (props.thesis.status == "EN OBSERVACIÓN") {
    return (
      <div className="iconoEye" style={{marginTop:"10px", marginLeft:"20px"}}>
        {" "}
        <i className="bi bi-eye-fill" style={{fontSize:"30px"}}></i>{" "}
      </div>
    );
  } else if (props.thesis.status == "PENDIENTE") {
    return (
      <div className="iconoClock" style={{marginTop:"10px", marginLeft:"20px"}}>
        {" "}
        <i className="bi bi-clock-fill" style={{fontSize:"30px"}}></i>{" "}
      </div>
    );
  }else if (props.thesis.status == "SUSTENTADA") {
    return (
      <div className="iconoClock" style={{marginTop:"10px", marginLeft:"20px"}}>
        {" "}
        <i class="bi bi-hand-index-thumb" style={{color:"white", fontSize:"30px"}}></i>{" "}
      </div>
    );
  }else{
    return (
      <div className="iconoClock" style={{marginTop:"10px", marginLeft:"20px"}}>
        {" "}
        <i class="bi bi-dash-circle-fill" style={{color:"white", fontSize:"30px"}}></i>{" "}
      </div>
    );
  }
} 

  return (
    <div className="detailedContainer">
      {/* {console.log(JSON.stringify(props, null, 2))} */}
      <div className="RDdTitle">
        <p className="RD-title">
          <strong>Título:</strong>
        </p>
        <div className="RDDtitleDiv">
          <p className="RDDtitle">
            {props.titulo ? props.titulo : "No hay titulo"}
          </p>
        </div>
      </div>

      <div className="RDstatus">
        <p className="RD-titleStatus">
          <strong>Estado:</strong>
        </p>
        <div className="RDDtitleDivStatus">
          <p className="RDDtitleStatus">
            {props.thesis && props.thesis.status? funcionStatus():""}
          </p>
          <p className="descripcionStatus">
            {props.thesis && props.thesis.status? props.thesis.status:"No contiene un estados"}
          </p>
        </div>
      </div>

      <div className="RDdArea">
        {console.log(props.thesis)}
        <p className="RDarea">
          <strong>Área:</strong>
        </p>
        <div className="RDDareaDiv">
          <p className="RDDarea">{props.area ? props.area : "No hay area"}</p>
        </div>
      </div>

      <div className="RDdProposedTheme">
        <p className="RDproposedTheme">
          <strong>Objetivo:</strong>
        </p>
        <div className="RDDproposedThemeDiv">
          <p className="RDDproposedTheme">
            {props.objetivo ? props.objetivo : "No hay objetivo"}
          </p>
        </div>
      </div>

      <div className="RDdObservations">
        <p className="RDobservations">
          <strong>Descripción:</strong>
        </p>
        <div className="RDDobservationsDiv">
          <p className="RDDobservations">
            {props.descripcion ? props.descripcion : "No hay objetivo"}
          </p>
        </div>
      </div>
      
      <div className="RDdFilesA">
        <p className="RDFilesA">
          <strong>Archivos:</strong>
        </p>
        <div className="RDDFilesDivA">
          {props.FILEs.length > 0
            ? props.FILEs.map((item, index) => (
                <div key={index} className="contenedorUnArchivoThesisA">
                  <img
                    src={
                      listImgConfig[item.filename.split(".")[1]] ||
                      listImgConfig["default"]
                    }
                    alt=""
                    onClick={() => downloadFile(item)}
                  />
                  <p>
                    {item.filename.length < 15
                      ? item.filename
                      : `${item.filename.slice(0, 15)}...`}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Detailed;
