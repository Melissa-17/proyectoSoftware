import React from 'react'
import '../../../assets/styles/Coordinador/DetailApproval/FifthPart.css'
import { capitalize } from "#Helpers/stringHelpers";
import fileDefault from "../../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../../assets/svg/file-earmark-word.svg";
import fileDocx from "../../../assets/svg/filetype-docx.svg";
import filePdf from "../../../assets/svg/filetype-pdf.svg";

const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

export default function FifthPart(props) {

    const downloadFile = (item) => {
        const key = `${item.id}-${item.filename}`;
        const url = `https://aws-s3-wartech-2022-2.s3.amazonaws.com/assignment/${key}`;
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
      };

    return (
        <div className='contenedorTituloQuintaParte'>
            <h2>Archivos:</h2>
      <div className='contenedorQuintaParte'>
        
        {props.thesis.FILEs.length > 0
                  ? props.thesis.FILEs.map((item, index) => (
                      <div key={index} className="contenedorArchivosFifthPart">
                        <img
                          src={
                            listImgConfig[item.filename.split(".")[1]] ||
                            listImgConfig["default"]
                          }
                          alt=""
                          onClick={() => downloadFile(item)}
                        />
                        <p>{item.filename.length<15 ? item.filename : `${item.filename.slice(0,15)}...`}</p>
                      </div>
                    ))
                  : null}
      </div>
      </div>
    )
  }