import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SubmitFileData , axiosGetRoles, SubmitFileDataAdeviser, axiosGetIdRevisor } from "../../../api/UploadDocAPI";
import { axiosGetDocs } from "../../../api/ShowDocs";
import { axiosDownloadDocs } from "../../../api/DownloadDocs";
import { axiosDeleteDoc } from "../../../api/DeleteDocs";
import fileDefault from "../../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../../assets/svg/file-earmark-word.svg";
import filePdf from "../../../assets/svg/filetype-pdf.svg";
import fileDocx from "../../../assets/svg/filetype-docx.svg";
// import "../UploadDoc/UploadDoc.css";
import "../UploadDoc/UploadDocAdviser.css"
import { formatDate } from "#Helpers/assignmentHelpers.js";
import moment from "moment";
import ModalsAlert from "../../Modals/ModalsAlert";
import { removeAccents } from "#Helpers/assignmentHelpers";
import { FadeLoader } from "react-spinners";
import ModalCargando from "../../Contenido/Profesor/ModalCargando";
import ModalsMessage from "../../Contenido/Profesor/ModalsMessage";

const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

export default function UploadDocAdviser(props) {
  const JWTtoken = sessionStorage.getItem("item");
  const [formData, setFormData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [showEdit, setShowEdit] = useState(true);
  const [docs, setDocs] = useState([]);
  const [esAsesor, setEsAsesor] = useState(false);
  const [esAlumno, setEsAlumno] = useState(false);
  const [esProfesor, setEsProfesor] = useState(false);
  const [esJurado, setEsJurado] = useState(false);
  const params = useParams();
  const studAssignment = props.assign ? props.assign : null;
  const limitDate = new Date(studAssignment.ASSIGNMENT.limitCalificationDate);
  const today = new Date(moment().format("YYYY/MM/DD"));
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openLoadingDelete, setOpenLoadingDelete] = useState(false);
  
  const [idRevisor, setIdRevisor] = useState(null)
  const [fileToDelete, setFileToDelete] = useState(null);
  const {isLoadingDocsRetro, setIsLoadingDocsRetro, openConfirm, setOpenConfirm } = props;

  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
  };
  const showDocs = () => {
    axiosGetDocs(JWTtoken, studAssignment.id)
      .then((response) => {
        const data = response.data || "";
        setDocs(data.listR);
        setIsLoadingDocsRetro(false);
        // console.log(showEdit);
      })
      .catch((error) => {
        console.error(`Error Files: ${error}`);
      });
  };
  useEffect(() => {
    showDocs();
  }, [openConfirm, studAssignment, confirmDelete]);

  const getIdRevisor = () => {
    axiosGetIdRevisor(JWTtoken,studAssignment.id)
      .then((response) => {
        // (console.log(response.data.id))
        setIdRevisor(response.data.id)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getIdRevisor();
  }, []); 


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

    SubmitFileDataAdeviser(fileListWOAccents, JWTtoken, idRevisor)
      .then((response) => {
        setOpenLoading(false);
        setOpenConfirm(true);
        console.log("File Upload");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getRoles = () => {
    axiosGetRoles(JWTtoken)
      .then((response) => {
        if((response.data.ROLEs[0].description) == 'Asesor'){
          setEsAsesor(true)
        } else if((response.data.ROLEs[0].description) == 'Profesor'){
          setEsProfesor(true)
        } else if((response.data.ROLEs[0].description) == 'Jurado'){
          setEsJurado(true)
        } else if((response.data.ROLEs[0].description) == 'Alumno'){
          setEsAlumno(true);
      }
        
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getRoles();
  }, []); 
  
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
    setOpenLoadingDelete(true);
    axiosDeleteDoc(JWTtoken, item)
      .then((response) => {
        console.log("File deleted");
        setOpenLoadingDelete(false);
        setConfirmDelete(true);
      })
      .catch((error) => {
        console.error(`Error Delete: ${error}`);
      });
  };

  // return studAssignment.status == "Asignado" ||  limitDate < today  ? (
  //   <div>
      
  //     { console.log("CASO ASIGNADO Y HABILITADO") }
  //     <div className = {esAsesor ? "botonNoAnhadirA" : "botonNoAnhadirAHidden" }>
  //       <input
  //         className="file-upload-inputA"
  //         type="file"
  //         accept="pdf/word/txt/image/excel/*"
  //         multiple
  //         disabled
  //       />
  //       <div className="text-informationA">+ Añadir</div>
  //     </div>

  //     <div className="contenedorArchivosA">
  //       {docs.map((item, index) => (
  //         <div key={index} className="contenedorUnArchivoA">
  //           <img
  //             src={
  //               listImgConfig[item.filename.split(".")[1]] ||
  //               listImgConfig["default"]
  //             }
  //             alt=""
  //             onClick={() => downloadFile(item)}
  //           />
  //           <p>{item.filename}</p>
  //           <span className="contenedorDeleteA" onClick={() => deleteFile(item)}>
  //             <i className="bi bi-x drop-file-preview__item__del-icon"></i>
  //           </span>
  //         </div>
  //       ))}

  //       {fileList.length > 0
  //        && showEdit
  //         ? fileList.map((item, index) => (
  //             <div key={index} className="contenedorUnArchivoA">
  //               <img
  //                 src={
  //                   listImgConfig[item.name.split(".")[1]] ||
  //                   listImgConfig["default"]
  //                 }
  //                 alt=""
  //               />
  //               <p>{item.name}</p>
  //               <span
  //                 className="contenedorDeleteA"
  //                 onClick={() => fileRemove(item)}
  //               >
  //                 <i className="bi bi-x drop-file-preview__item__del-icon"></i>
  //               </span>
  //             </div>
  //           ))
  //         : null}
  //     </div>
  //     <div className={!showEdit ? "noEntregarA" : "botonEntregarA"} hidden={esAsesor==false}>
  //       <div className="text-information-no-entregarA">Guardar Retro</div>
  //     </div>
  //   </div>
  // ) : 
  //FINAL DEL IF
  //ESTADO ENTREGADO Y PUEDE CALIFICAR
  // console.log(props.revisaUsuario());
  return (studAssignment.status == "Entregado" || studAssignment.status == "Visto Bueno") && limitDate > today ? (
    <div>
      {/* { console.log("CASO ENTREGADO Y HABILITADO") } */}
      <div className = {((esAsesor || esProfesor) && !showEdit) ? "botonAnhadirA" : ((esAsesor || esProfesor) && showEdit) ? "botonNoAnhadirA" : "botonNoAnhadirAHidden"}
      hidden={!props.revisaUsuario()}
      >
        <input
          className="file-upload-inputA"
          type="file"
          accept="pdf/word/txt/image/excel/*"
          multiple
          onChange={onFileChange}
        />
        <div className="text-informationA">+ Añadir</div>
      </div>

      <div className="contenedorArchivosA">
        {
        isLoadingDocsRetro ?
        <FadeLoader
          className="mx-auto"
          color="#4b70ac"
          loading={isLoadingDocsRetro}
          // height={24}
          // width={24}
          LengthType={24}
          number={2}
        />
        :
        docs.map((item, index) => (
          <div key={index} className="contenedorUnArchivoA">
            <img
              src={
                listImgConfig[item.filename.split(".")[1]] ||
                listImgConfig["default"]
              }
              alt=""
              onClick={() => downloadFile(item)}
            />
            <p>{item.filename.length<15 ? item.filename : `${item.filename.slice(0,15)}...`}</p>
            <span className="contenedorDeleteA" 
            hidden={showEdit}
            onClick={() => {setOpenAlertDelete(true); setFileToDelete(item)}}>
              <i className="bi bi-x drop-file-preview__item__del-icon " style={{"fontSize": "2rem"}}></i>
            </span>
           
          </div>
        ))}
         {openAlertDelete && (
              <ModalsAlert
                closeAlert={setOpenAlertDelete}
                action={deleteFile}
                alertText="¿Está seguro que desea eliminar el archivo?"
                messageText="Archivo eliminado con éxito"
                item={fileToDelete}
              />
            )}
            {
          openLoadingDelete && (
            <ModalCargando 
              closeMessage={setOpenLoadingDelete}
              estaCargando={openLoadingDelete}
              message={"Se está borrando su archivo..."}
            />
          )
        }
            {
          confirmDelete && (
            <ModalsMessage 
              closeMessage={setConfirmDelete}
              message={"Se ha borrado con éxito los archivos."}
            />
          )
        }

        {fileList.length > 0 && (studAssignment.status == "Entregado" || studAssignment.status == "Visto Bueno" || showEdit)
          ? 
          
          fileList.map((item, index) => (
              <div key={index} className="contenedorUnArchivoA">
                <img
                  src={
                    listImgConfig[item.name.split(".")[1]] ||
                    listImgConfig["default"]
                  }
                  alt=""
                />
                <p>{item.name.length<15 ? item.name : `${item.name.slice(0,15)}...`}</p>
                <span
                  className="contenedorDeleteA"
                  onClick={() => { setFileToDelete(item); setOpenAlertDelete(true);}}
                  hidden={showEdit}
                >
                  <i className="bi bi-x drop-file-preview__item__del-icon" style={{"fontSize": "2rem"}}></i>
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
      

      { (esAsesor || esProfesor) && props.revisaUsuario() ?
      (esAsesor || (esProfesor && studAssignment.status=="Visto Bueno"))
      ?
        <div className="botonEntregarA" hidden={!(esAsesor || esProfesor)}>
        <button className="entregarA" onClick={() => {
          if(!showEdit && (fileList.length) > 0 ) { // Solo abre el modal si hay nuevos archivos
            setOpenAlert(true);              
          } else {
            setShowEdit(!showEdit)
          }
        }
     }>
          {showEdit ? "Editar Retro" : "Guardar Retro" }
        </button>
        {openAlert && (
          <ModalsAlert
          closeAlert={setOpenAlert}
          action={uploadFile}
          alertText="¿Está seguro que desea entregar los archivos?"
          messageText="Archivos subidos con éxito"
          estado={showEdit}
          setEstado={setShowEdit}
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
        :
        !esAlumno && !isLoadingDocsRetro ?

        <div className="noFileText">No puede adjuntar archivos, debe esperar a que el asesor apruebe la entrega.</div>
        :
        null
        :
        !esAlumno && !isLoadingDocsRetro ?
        <div className="noFileText">No puede adjuntar archivos, ya que no es el responsable de enviarlo.</div>
        :
        null
      }
    </div>
  ) : (
    //INICIO DEL ELSE (No puede calificar si no esta entregado ni la fecha es valida)
    <div>
      {/* { console.log("CASO ELSE - NO PUEDE CALIFICAR") } */}
      {/* <div className = {esAsesor ? "botonNoAnhadirA" : "botonNoAnhadirAHidden" } hidden={esAsesor==false} >
        <input
          className="file-upload-inputA"
          type="file"
          accept="pdf/word/txt/image/excel/*"
          multiple
          onChange={onFileChange}
          disabled
        />
        <div className="text-informationA">+ Añadir</div>
      </div> */}

      <div className="contenedorArchivosAB">
        {
        isLoadingDocsRetro ?
        <FadeLoader
          className="mx-auto"
          color="#4b70ac"
          loading={isLoadingDocsRetro}
          // height={24}
          // width={24}
          LengthType={24}
          number={2}
        />
        :
        docs.length > 0 ? 
        docs.map((item, index) => (
          <div key={index} className="contenedorUnArchivoA">
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
        : null
        }
      
      
      

        {/* {fileList.length > 0 && showEdit
          ? fileList.map((item, index) => (
              <div key={index} className="contenedorUnArchivoA">
                <img
                  src={
                    listImgConfig[item.name.split(".")[1]] ||
                    listImgConfig["default"]
                  }
                  alt=""
                />
                <p>{item.name}</p>
                <span
                  className="contenedorDeleteA"
                  onClick={() => fileRemove(item)}
                >
                  <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                </span>
              </div>
            ))
          : null} */}
      </div>
      
      {
      (!esAlumno) ?
        !props.revisaUsuario() ? 
        <div className="noFileText">No puede adjuntar archivos, ya que no es el responsable de enviarlo.</div>
        :
        (studAssignment.status != "Entregado" && studAssignment.status != "Calificado") ? 
        <div className="noFileText">No puede adjuntar archivos. El alumno aún no ha adjuntado su entrega.</div>
        : (limitDate < today) ?
        <div className="noFileText">{`No puede adjuntar archivos. La fecha límite para calificar ${formatDate(limitDate, "DD/MM/yyyy")} ha pasado.`}</div>
        :
        // <div className="noFileText">No puede adjuntar archivos por el momento</div>
        null
      :
      null
      }
      {/* <button hidden className={showEdit ? "noEntregarAButton" : "entregarA"} onClick={() => setShowEdit(!showEdit)}>{showEdit ? "Editar Retro" : "Guardar Retro" } </button> */}
        
      
    </div>
  );
}