import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SubmitFileData, axiosGetRoles, SubmitFileDataAdeviser } from "../../api/UploadDocAPI";
import { axiosGetDocs } from "../../api/ShowDocs";
import { axiosDownloadDocs } from "../../api/DownloadDocs";
import { axiosDeleteDoc } from "../../api/DeleteDocs";
import fileDefault from "../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../assets/svg/file-earmark-word.svg";
import filePdf from "../../assets/svg/filetype-pdf.svg";
import fileDocx from "../../assets/svg/filetype-docx.svg";
import "../UploadDoc/UploadDoc.css";
import { formatDate } from "#Helpers/assignmentHelpers.js";
import moment from "moment";
import ModalsAlert from "../Modals/ModalsAlert";
import { removeAccents } from "#Helpers/assignmentHelpers";
import ContenedorCursosfilas from "../Contenido/Coordinador/Semestres/ContenedorCursosfilas";
import { FadeLoader } from "react-spinners";

import ModalsMessage from "../Contenido/Profesor/ModalsMessage";
import ModalCargando from "../Contenido/Profesor/ModalCargando";

const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

export default function UploadDoc(props) {
  const JWTtoken = sessionStorage.getItem("item");
  const [fileToDelete, setFileToDelete] = useState(null);
  const [formData, setFormData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [estado, setEstado] = useState(false);
  let [docs, setDocs] = useState([]);
  props.docs ?  { docs, setDocs } = props : (()=>{})();
  const { isLoadingDocs, setIsLoadingDocs, openConfirm, setOpenConfirm } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [esAsesor, setEsAsesor] = useState(false);
  const params = useParams();
  const studAssignment = props.assign ? props.assign : null;
  const limitDate = new Date(studAssignment.ASSIGNMENT.limitCompleteDate);
  const today = new Date(moment().format("YYYY/MM/DD"));
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  
  const getAssignDetail = props.getAssignDetail ? props.getAssignDetail : '';

  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
  };
  const showDocs = () => {
    axiosGetDocs(JWTtoken, params.id)
      .then((response) => {
        const data = response.data || "";
        // console.log("FILES: " + JSON.stringify(data, null, 2));
        // console.log("FILES: " + JSON.stringify(data, null, 2));
        setDocs(data.filesS);
        setIsLoadingDocs(false);
        
      })
      .catch((error) => {
        console.error(`Error Files: ${error}`);
      });
  };
  useEffect(() => {
    showDocs();
    // console.log(fileList);
  }, [openConfirm, confirmDelete]);

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const uploadFile = () => {
    setOpenLoading(true);
    const fileListWOAccents = fileList.map((file, index) => {
      const fileWOAccents = new File([file], removeAccents(file.name));
      
      return fileWOAccents;
    });

    // console.log("INITIAL: ");
    // console.log(fileList);
    // console.log("WOAccents: ");
    // console.log(fileListWOAccents);  
    SubmitFileData(fileListWOAccents, JWTtoken, params.id)
      .then((response) => {
        console.log("File Upload");
        setOpenLoading(false);
        setOpenConfirm(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRoles = () => {
    axiosGetRoles(JWTtoken)
      .then((response) => {
        if((response.data.ROLEs[0].description) == 'Asesor' || (response.data.ROLEs[0].description) == 'Jurado' || (response.data.ROLEs[0].description) == 'Profesor'){
          setEsAsesor(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getRoles();
  }, []); 

  // const downloadFile = (item) => {
  //   axiosDownloadDocs(JWTtoken, item)
  //     .then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", item.filename); //change "file.pdf" according to saved name you want, give extension according to filetype
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // console.log(isLoadingDocs)
  const downloadFile = (item) => {
    const key = `${item.id}-${item.filename}`;
    const url = `https://aws-s3-wartech-2022-2.s3.amazonaws.com/assignment/${key}`;
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const deleteFile = (item) => {
    axiosDeleteDoc(JWTtoken, item)
      .then((response) => {
        // console.log(item);
        console.log("File deleted");
        setConfirmDelete(true);
      })
      .catch((error) => {
        console.error(`Error Delete: ${error}`);
      });
  };

  // useEffect (() => {
  //   if (studAssignment.status == "Calificado" || limitDate < today) {
  //     setEstado(false);
  //   } else if (studAssignment.status == "Asignado" && limitDate > today)  {
  //     setEstado(true);
  //   } else {
  //     setEstado(false);
  //   }
  // }, [])
  
  console.log(limitDate);

  //ESTADO CALIFICADO O NO PUEDE ENTREGAR PORQUE SE PASO LA FECHA LIMITE
  return studAssignment.status == "Calificado" || limitDate < today ? (
    <div>
      {/* {
        console.log("HOLA")
      } */}
      <div className = {esAsesor ? "botonAnhadirHidden" : estado == false ? "botonNoAnhadir":"botonAnhadir" }>
        <input
          className="file-upload-input"
          type="file"
          accept="pdf/word/txt/image/excel/*"
          multiple
          disabled
        />
        <div className="text-information">+ Añadir</div>
      </div>

      <div className="contenedorArchivos" >
        {isLoadingDocs ?
        <FadeLoader
          className="mx-auto"
          color="#4b70ac"
          loading={isLoadingDocs}
          // height={24}
          // width={24}
          LengthType={24}
          number={2}
        />
        :
        docs.map((item, index) => (
          <div key={index} className="contenedorUnArchivo">
            <img
              src={
                listImgConfig[item.filename.split(".")[1]] ||
                listImgConfig["default"]
              }
              alt=""
              onClick={() => downloadFile(item)}
            />
            <p>{item.filename.length<15 ? item.filename : `${item.filename.slice(0,15)}...`}</p>
            <span className="contenedorDelete" hidden onClick={() => {deleteFile(item);}}>
              <i className="bi bi-x drop-file-preview__item__del-icon"></i>
            </span>
          </div>
        ))}

        {fileList.length > 0 && estado 
          ? fileList.map((item, index) => 1(
              <div key={index} className="contenedorUnArchivo">
                <img
                  src={
                    listImgConfig[item.name.split(".")[1]] ||
                    listImgConfig["default"]
                  }
                  alt=""
                />
                <p>{item.name.length<15 ? item.name : `${item.name.slice(0,15)}...`}</p>
                <span
                  className="contenedorDelete"
                  onClick={() => {fileRemove(item); showDocs();}}
                >
                  <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                </span>
              </div>
            ))
          : null}
      </div>
      <div className="noEntregar" hidden={esAsesor}>
        <div className="text-information-no-entregar">Guardar Entrega</div>
      </div>
    </div>
  ) : //FINAL DEL IF
  //ESTADO ASIGNADO Y PUEDE ENTREGAR
  studAssignment.status == "Asignado" && limitDate > today ? (
    //INICIO DEL ELSE
    
    <div>
      {/* {
        console.log("ADIOS")
      } */}
      {/* {setEstado(true)} */}
      <div className = {esAsesor ? "botonAnhadirHidden" : "botonAnhadir" }>
        <input
          className="file-upload-input"
          type="file"
          accept="pdf/word/txt/image/excel/*"
          multiple
          onChange={onFileChange}
        />
        <div className="text-information">+ Añadir</div>
      </div>

      <div className="contenedorArchivos">
        {
        isLoadingDocs ?
        <FadeLoader
          className="mx-auto"
          color="#4b70ac"
          loading={isLoadingDocs}
          // height={24}
          // width={24}
          LengthType={24}
          number={2}
        />
        :
        docs.map((item, index) => {
          // console.log(item);
          return (
          <div key={index} className="contenedorUnArchivo">
            
            <img
              src={
                listImgConfig[item.filename.split(".")[1]] ||
                listImgConfig["default"]
              }
              alt=""
              onClick={() => downloadFile(item)}
            />
            <p>{item.filename.length<15 ? item.filename : `${item.filename.slice(0,15)}...`}</p>
            <span className="contenedorDelete" onClick={() => {setOpenAlertDelete(true); setFileToDelete(item);}}>
              <i className="bi bi-x drop-file-preview__item__del-icon"></i>
            </span>
          </div>
        )})}
        {openAlertDelete && (
            // {
                // () => {
                  // return (
              
              <ModalsAlert
                closeAlert={setOpenAlertDelete}
                action={deleteFile}
                alertText="¿Está seguro que desea eliminar el archivo?"
                messageText="Archivo eliminado con éxito"
                item={fileToDelete}
                otherModal={setConfirmDelete}
              />
              // )}
            // }
        )}
        {
          confirmDelete && (
            <ModalsMessage 
              closeMessage={setConfirmDelete}
              message={"Se ha borrado con éxito los archivos."}
            />
          )
        }

        {fileList.length > 0  && (studAssignment.status == "Asignado" || estado)
          ? fileList.map((item, index) => {
            // console.log(item);
            return (
              <div key={index} className="contenedorUnArchivo">
                <img
                  src={
                    listImgConfig[item.name.split(".")[1]] ||
                    listImgConfig["default"]
                  }
                  alt=""
                />
                <p>{item.name.length<15 ? item.name : `${item.name.slice(0,15)}...`}</p>
                <span
                  className="contenedorDelete"
                  onClick={() => {fileRemove(item); showDocs();}}
                >
                  <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                </span>
              </div>
            )})
          : null}
      </div>
      <div className={fileList.length > 0 ?  "botonEntregar" : "botonNoEntregar"} hidden={esAsesor}>
        <button className={fileList.length > 0 ?  "entregar" : "noEntregar"} onClick={() => {setOpenAlert(true); setEstado(true)}} 
        disabled={fileList.length === 0}
        >
          {/* {estado ? "Editar Entrega" : "Guardar Entrega" } */}
          Guardar Entrega
        </button>
        {/* CAMBIOS ACÁ */}
        {openAlert && (
          <ModalsAlert
          closeAlert={setOpenAlert}
          action={uploadFile}
          alertText="¿Está seguro que desea entregar los archivos?"
          messageText="Archivos subidos con éxito"
          estado={estado}
          setEstado={setEstado}
          setFileList={setFileList}
          fileList={fileList}
          />
        )}
        {
          openLoading && (
            <ModalCargando 
              closeMessage={setOpenLoading}
              estaCargando={openLoading}
              // message={"Se han guardado con exito los archivos"}
            />
          )
        }
        {
          openConfirm && (
            <ModalsMessage 
              closeMessage={setOpenConfirm}
              message={"Se han guardado con éxito los archivos"}
            />
          )
        }
      </div>
    </div>
  ) : (
    //INICIO DEL ELSE
    //ESTADO ENTREGADO
    <div>
      {/* {console.log("ESTADO ENTREGADO")} */}
      {/* {setEstado(false)} */}
      {/* {console.log(fileList)} */}
      <div className={esAsesor ? "botonAnhadirHidden" : estado == false ? "botonNoAnhadir":"botonAnhadir" }>
        <input
          className="file-upload-input"
          type="file"
          accept="pdf/word/txt/image/excel/*"
          multiple
          onChange={onFileChange}
          enabled={estado}
        />
        <div className="text-information" hidden={esAsesor}>+ Añadir</div>
      </div>

      <div className="contenedorArchivos">
        {
        isLoadingDocs ?
        <FadeLoader
          className="mx-auto"
          color="#4b70ac"
          loading={isLoadingDocs}
          // height={24}
          // width={24}
          LengthType={24}
          number={2}
        />
        :
        docs.map((item, index) => (
          <div key={index} className="contenedorUnArchivo">
            <img
              src={
                listImgConfig[item.filename.split(".")[1]] ||
                listImgConfig["default"]
              }
              alt=""
              onClick={() => downloadFile(item)}
            />
            {/* {console.log(`ITEM #${index}: ${JSON.stringify(item, null, 2)}`)} */}
            {/* {console.log(item.filename.length)} */}
            <p>{item.filename.length<15 ? item.filename : `${item.filename.slice(0,15)}...`}</p>
            <span
              className="contenedorDelete" hidden={esAsesor || !estado}
              onClick={() => {setOpenAlertDelete(true); setFileToDelete(item);} }
            >
              <i className="bi bi-x drop-file-preview__item__del-icon"></i>
            </span>
            
          </div>
        ))}
        {/* Se ha sacado el ModalsAlert porque lo esta que renderiza para todos */}
        {openAlertDelete && (
            // {
                // () => {
                  // return (
              
              <ModalsAlert
                closeAlert={setOpenAlertDelete}
                action={deleteFile}
                alertText="¿Está seguro que desea eliminar el archivo?"
                messageText="Archivo eliminado con éxito"
                item={fileToDelete}
                otherModal={setConfirmDelete}
              />
              // )}
            // }
        )}
        {
          confirmDelete && (
            <ModalsMessage 
              closeMessage={setConfirmDelete}
              message={"Se ha borrado con éxito los archivos."}
            />
          )
        }

        {fileList.length > 0 && estado
          ? fileList.map((item, index) => (
              <div key={index} className="contenedorUnArchivo">
                <img
                  src={
                    listImgConfig[item.name.split(".")[1]] ||
                    listImgConfig["default"]
                  }
                  alt=""
                />
                <p>{item.name.length<15 ? item.name : `${item.name.slice(0,15)}...`}</p>
                <span
                  className="contenedorDelete"
                  onClick={() => { 
                    setFileToDelete(item); setOpenAlertDelete(true);
                  }}
                >
                  {/*  */}
                  <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                </span>
                {openAlertDelete && (
                  <ModalsAlert
                    closeAlert={setOpenAlertDelete}
                    action={fileRemove}
                    alertText="¿Está seguro que desea eliminar el archivo?"
                    messageText="Archivo eliminado con éxito"
                    item={item}
                  />
                )}
              </div>
            ))
          : null}
      </div>
      <div className="botonEntregar" hidden={esAsesor}>
        <button type = "button" className="entregar" hidden={esAsesor} onClick={() => { 
          
          if(estado && fileList.length > 0){
            setOpenAlert(true)
          } else {
            setEstado(!estado)
          }
          }
        }
        >
          {estado == false ? "Editar Entrega" : "Guardar Entrega" }

        </button>
        {
        
        openAlert ? (
          <ModalsAlert
            closeAlert={setOpenAlert}
            action={uploadFile}
            alertText="¿Está seguro que desea entregar los archivos?"
            messageText="Archivos subidos con éxito"
            estado={estado}
            setEstado={setEstado}
            setFileList={setFileList}
            fileList={fileList}
          />
        ) :
        null
      }
      {
          openLoading && (
            <ModalCargando 
              closeMessage={setOpenLoading}
              estaCargando={openLoading}
              // message={"Se han guardado con exito los archivos"}
            />
          )
        }
      {
          openConfirm && (
            <ModalsMessage 
              closeMessage={setOpenConfirm}
              message={"Se han guardado con éxito los archivos"}
            />
          )
        }
      </div>
    </div>
  );
}