import { useState, useEffect } from "react";
import "#Styles/Jury/Presentation/DetailPart/MiddlePart.css";
import { useNavigate } from "react-router-dom";
import { getScore, formatDate } from "#Helpers/assignmentHelpers.js";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import { SubmitFileData , axiosGetRoles, SubmitFileDataAdeviser, axiosGetIdRevisor } from "../../../../api/UploadDocAPI";
import {axiosGetFilesExpositionRevisor}  from "../../../../api/PresentationAssignment";
import { axiosDeleteDoc } from "../../../../api/DeleteDocs";
import { removeAccents } from "#Helpers/assignmentHelpers";
import fileDefault from "../../../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../../../assets/svg/file-earmark-word.svg";
import filePdf from "../../../../assets/svg/filetype-pdf.svg";
import fileDocx from "../../../../assets/svg/filetype-docx.svg";
import ModalsMessage from "../../../Modals/ModalsMessage";
import ModalsAlert from "../../../Modals/ModalsAlert";
import ModalCargando from "../../../Contenido/Profesor/ModalCargando";
import { FadeLoader } from "react-spinners";

const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

export default function MiddlePart(props) {
  const navigate = useNavigate();
  const JWTtoken = sessionStorage.getItem("item");
  const { revision, expo, num, presentation} = props;
  console.log(revision)
  console.log(expo);
  const [docs, setDocs] = useState([]);
  const [idRevisor, setIdRevisor] = useState(null)
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [estado, setEstado] = useState(false);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {}, [fileList]);
  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    // console.log(e.target.files[0]);
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
    }
  };

  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  let revisor = JSON.parse(localStorage.getItem('asesor'));
  const getRevisorId = () => {
    if (user.ROLEs[0] && user.ROLEs[0].description == "Alumno")  {
      return revisor.USER.id;
    } else {
      return user.id;
    }
  }

  const rubricaClic = () => {
    
    navigate(`/rubricaAdviser/${expo.id}/${6}/${getRevisorId()}`, {
      state: {
        assignment: expo,
        revisor: revisor,
        index: props.index,
        student: props.student,
        course: props.course,
        numero: num,
        presentation:presentation
      },
    });
  };

  const nota = revision ? revision.grade : "";
  const maximo = expo ? expo.ASSIGNMENT.maxScore : 20;

  const uploadFile = () => {

    setSaving(true);

    const fileListWOAccents = fileList.map((file, index) => {
      const fileWOAccents = new File([file], removeAccents(file.name));

      return fileWOAccents;
    });

    SubmitFileDataAdeviser(fileListWOAccents, JWTtoken, revision.id)
      .then((response) => {
        console.log("File Upload");
        setFileList([]);
        setSaving(false);
        setConfirmationSave(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showDocs = () => {
    setIsLoadingDocs(true);
    revision && revision.id ? axiosGetFilesExpositionRevisor(JWTtoken, revision.id)
    .then((response) => {
      const data = response.data || "";
      console.log(response)
      setDocs(data);
      setIsLoadingDocs(false);
    })
    .catch((error) => {
      console.error(`Error Files: ${error}`);
    })
     : (()=>{})()
    
  };

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
    axiosDeleteDoc(JWTtoken, selectedItem)
      .then((response) => {
        console.log("File deleted");
        setConfirmationDelete(true);

      })
      .catch((error) => {
        console.error(`Error Delete: ${error}`);
      });
  };



  // const getIdRevisor = () => {
  //   axiosGetIdRevisor(JWTtoken,studAssignment.id)
  //     .then((response) => {
  //       // (console.log(response.data.id))
  //       setIdRevisor(response.data.id)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // useEffect(() => {
  //   getIdRevisor();
  // }, []); 

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const [alert, setAlert] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [confirmationSave, setConfirmationSave] = useState(false);
  const [confirmationDelete, setConfirmationDelete] = useState(false); 

  const [selectedItem, setSelectedItem] = useState(null);

  const actionUpload = () =>{
    setAlert(false);
    if (estado && fileList.length > 0) {
      uploadFile();
      setEstado(false);
    } else {
      setEstado(!estado);
    }
  }

  const defineOnCLick = () =>{
    if(estado && fileList.length>0){
      setAlert(true);
    }
    else{
      setEstado(!estado)
    }
  }

  useEffect(() => {
    showDocs();
  }, [expo, confirmationSave, confirmationDelete]);

  // useEffect(()=>{
  //   showDocs();
  // },[])

  // useEffect(()=>{
  //   showDocs();
  // },[])


  

  return (
    <div className="parte-intermedia-presentacion">
      <div className="trabajo-intermedio-presentacion">
        <div className="contenedorArchivosJ">
          {/* {console.log(fileList)} */}
          {
            // isLoadingDocs ?
            // <FadeLoader
            //   className="mx-auto"
            //   color="#4b70ac"
            //   loading={isLoadingDocs}
            //   // height={24}
            //   // width={24}
            //   LengthType={24}
            //   number={2}
            // />
            // :
          docs.length > 0 ? docs.map((item, index) => (
          <div key={index} className="contenedorUnArchivoJ">
            <img
              src={
                listImgConfig[item.filename.split(".")[1]] ||
                listImgConfig["default"]
              }
              alt=""
              onClick={() => downloadFile(item)}
            />
            <p>{item.filename.length<15 ? item.filename : `${item.filename.slice(0,15)}...`}</p>
            {
              estado?
              <span className="contenedorDeleteJ" 
              onClick={() => {setSelectedItem(item);setDeleted(true)}}>
                <i className="bi bi-x drop-file-preview__item__del-icon " style={{"fontSize": "2rem"}}></i>
              </span>
              :
              ''
            }
          </div>
        )) : null
        }
          {fileList.length > 0
            ? fileList.map((item, index) => (
                <div key={index} className="contenedorUnArchivoJ">
                  <img
                    src={
                      listImgConfig[item.name.split(".")[1]] ||
                      listImgConfig["default"]
                    }
                    alt=""
                  />
                  <p>
                    {item.name.length < 15
                      ? item.name
                      : `${item.name.slice(0, 15)}...`}
                  </p>
                  <span
                    className="contenedorDeleteJ"
                    onClick={() => fileRemove(item)}
                  >
                    <i className="bi bi-x drop-file-preview__item__del-icon"></i>
                  </span>
                </div>
              ))
            : null}
        </div>
        {/* {console.log(estado)} */}
        <div className="botonesJurado">
          {
            estado?
            <div className="botonAnhadirJ">
            <input
              className="file-upload-inputJ"
              type="file"
              accept="pdf/word/txt/image/excel/*"
              multiple
              onChange={onFileChange}
            />
            <div className="text-informationJ">+ Añadir</div>
          </div>
          :
          <div className="botonAnhadirJ-noDisponible">
            <input
              className="file-upload-inputJ"
            />
            <div className="text-informationJ">+ Añadir</div>
          </div>
          }
          
          <div className="botonEntregarJurado"
            // className= {
            //   fileList.length > 0
            //     ? "botonEntregarJurado"
            //     : "botonNoEntregarJurado"
            // }
          >
            <button
              type="button"
              className="entregarJurado"

              onClick={() => {defineOnCLick()}}
            >
              {!estado ? "Editar Entrega" : "Guardar Entrega"}
            </button>
          </div>
        </div>
      </div>

      <div className="puntaje-intermedio-presentacion">
        <div className="titulo-nota-presentacion">
          <p>Nota Final</p>
        </div>
        <div className="nota-intermedio-presentacion">
          <p>
            {nota? getScore(nota): "--"}/{maximo}
          </p>
        </div>
        <div className="boton-rubrica-presentacion">
          <button className="rubrica-intermedio-presentacion" onClick={rubricaClic}>Rúbrica</button>
        </div>
      </div>
        {alert && (<ModalsAlert
          closeAlert={setAlert}
          alertText="¿Desea registrar toda la información seleccionada?"
          action={actionUpload}
          />)}
        {saving && (<ModalCargando
          estacargando={saving}
          message="Se están subiendo los archivos, esto tardará unos segundos"
          />)}
        {deleted && <ModalsAlert
          closeAlert={setDeleted}
          alertText="¿Desea eliminar el documento seleccionado?"
          action={deleteFile}
          />}  
          {confirmationSave && (<ModalsMessage
          closeMessage={setConfirmationSave}
          message="Se ha realizado la carga de archivos correctamente"
          />)}
          {confirmationDelete && <ModalsMessage
          closeMessage={setConfirmationDelete}
          message="Se ha eliminado el archivo correctamente"
          />}
    </div>
  );
}
