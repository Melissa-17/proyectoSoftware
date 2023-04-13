import React, { useState, useEffect } from "react";
import "#Styles/Teacher/Presentation/MainContent.css";
import InfoBox from "./InfoBox";
import { axiosGetListProgrammedExposition } from "../../../api/ProgrammedExposition";
import { Buffer } from "buffer";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { useNavigate } from "react-router";
import ModalsAlert from "../../Modals/ModalsAlert";
import { getScore, formatDate } from "#Helpers/assignmentHelpers.js";
import { GridLoader } from "react-spinners";
import { axiosDeleteAssignment } from "../../../api/AssignmentStudent";

export default function MainContent(props) {
  const [presentationList, setpresentationList] = useState([]);
  const [inputName, setInputName] = useState('');
  const [listaVacia, setListaVacia] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const JWTtoken = localStorage.getItem("token");

  const getPresentationList = (page) => {
    axiosGetListProgrammedExposition(
      JWTtoken,
      props.cxsid,
      inputName,
      page,
      porPagina
    )
      .then((response) => {
        //console.log(response.data);
        const list = response.data.rows || [];
        setpresentationList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getPresentationList();
    //console.log(props.cxsid);
    // console.log(presentationList);
  },);

  let inputNameHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputName(lowerCase);
    getPresentationList();
  };

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  const addNewPresentation = () => {
    navigate("/teacher/presentation/addPresentation", {
      state: {
        cxsid: props.cxsid,
        listaTemporal: listaVacia,
        tema: listaVacia,
        estudiantes: listaVacia,
      },
    });
  };

  const renderiza = () =>{
    getPresentationList();
}

  return (
    <div className="main-box">
      <div className="interaccion">
        <div className="boton-add">
          <button className="add-presentation" onClick={addNewPresentation}>
            Crear Exposición
          </button>
        </div>
        <div className="opcion-buscador">
          <input
            className="buscador"
            type="text"
            placeholder="  Ingrese un nombre..."
            onChange={inputNameHandler}
          ></input>
          <button className="busquedaNombre">
            <i class="bi bi-search" />
          </button>
          {/* <i className='fas fa-search'></i>
                    <input className='buscador'
                    placeholder='   Buscar por nombre'>
                    </input> */}
        </div>
      </div>
      <div className="content-presentations">
        {/* <InfoBox
                    perfil='https://f.rpp-noticias.io/2019/02/15/753300descarga-11jpg.jpg' 
                    nombreCompleto='Fabian Mora Acedo'
                    carrera='Ingenieria informatica'
                    horaInicio='10:00'
                    horaFin='11:00'
                    fecha='04/03/2022'/>
                    <InfoBox
                    perfil='https://f.rpp-noticias.io/2019/02/15/753300descarga-11jpg.jpg' 
                    nombreCompleto='Fabian Mora Acedo'
                    carrera='Ingenieria informatica'
                    horaInicio='10:00'
                    horaFin='11:00'
                    fecha='04/03/2022'/>
                    <InfoBox
                    perfil='https://f.rpp-noticias.io/2019/02/15/753300descarga-11jpg.jpg' 
                    nombreCompleto='Fabian Mora Acedo'
                    carrera='Ingenieria informatica'
                    horaInicio='10:00'
                    horaFin='11:00'
                    fecha='04/03/2022'/> */}
        {/*console.log(presentationList)*/}
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : presentationList.length > 0 ? (
          presentationList
            // .slice(
            //   (pagina - 1) * porPagina,
            //   (pagina - 1) * porPagina + porPagina
            // )
            .map((presentation, index) => {
              const student = presentation ? presentation.USER : "";
              const fullName =
                student.name +
                " " +
                student.fLastName +
                " " +
                student.mLastName;
              const assign = presentation ? presentation.ASSIGNMENT : "";
              // const fechaExpo = (assign.startDate).toDateString();
              return (
                <div key={index} className="espaciadoZonaTeacher">
                  <InfoBox
                    nombreCompleto={fullName}
                    carrera="Ingeniería informática"
                    perfil={
                      student.photo
                        ? `data:image/png;base64,${Buffer.from(
                            student.photo.data
                          ).toString("base64")}`
                        : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    }
                    cxsid={props.cxsid}
                    assignId={assign.id}
                    presentationId={presentation.id}
                    fecha={formatDate(assign.startDate)}
                    horaInicio={formatDate(assign.startDate, "hh:mm")}
                    horaFin={formatDate(assign.endDate, "hh:mm")}
                    renderiza={renderiza}
                  />
                  {/* {console.log(presentation)} */}
                </div>
              );
            })
        ) : (
          <div className="noPresentation">
            <p className="no-present-text">No existe presentaciones</p>
            {/* <InfoBox 
                                        nombreCompleto='Isai Enrique Bravo Sierra'
                                        carrera='Ingeniería informática'
                                        perfil = {false?
                                        `data:image/png;base64,${Buffer.from().toString('base64')}`
                                        :
                                        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                                        }/> 
                            <InfoBox 
                                        nombreCompleto='Isai Enrique Bravo Sierra'
                                        carrera='Ingeniería informática'
                                        perfil = {false?
                                        `data:image/png;base64,${Buffer.from().toString('base64')}`
                                        :
                                        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                                        }/>  */}
          </div>
        )}
      </div>
      <div className="nav-paginas">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getPresentationList}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
