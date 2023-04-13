import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "#Styles/Alumno/ThesisThemes/ThesisPropose/UploadDocsThesis.css";
import fileDefault from "../../../../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../../../../assets/svg/file-earmark-word.svg";
import filePdf from "../../../../../assets/svg/filetype-pdf.svg";
import fileDocx from "../../../../../assets/svg/filetype-docx.svg";

const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

export default function UploadDocsThesis(props) {
  const { fileList, setFileList } = props;
  // const [fileList, setFileList] = useState([]);
  useEffect (() => {},[fileList])
  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    console.log(e.target.files[0])
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  return (
    <div>
      <div className="botonAnhadirT">
        <input
          className="file-upload-inputT"
          type="file"
          accept="pdf/word/txt/image/excel/*"
          multiple
          onChange={onFileChange}
        />
        <div className="text-informationT">+ Añadir</div>
      </div>
      <div className="contenedorArchivosT">
        {fileList.length > 0
          ? fileList.map((item, index) => (
              <div key={index} className="contenedorUnArchivoT">
                <img
                  src={
                    listImgConfig[item.name.split(".")[1]] ||
                    listImgConfig["default"]
                  }
                  alt=""
                />
                <p>{item.name.length<15 ? item.name : `${item.name.slice(0,15)}...`}</p>
                <span
                  className="contenedorDeleteT"
                  onClick={() => fileRemove(item)}
                >
                  <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                </span>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
