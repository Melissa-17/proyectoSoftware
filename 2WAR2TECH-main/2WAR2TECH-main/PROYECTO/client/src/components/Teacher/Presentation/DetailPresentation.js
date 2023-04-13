import React, { useEffect, useState } from 'react';
import '#Styles/Teacher/Presentation/DetailPresentation.css';
import CreateNewUserPageStudent from '../../../pages/CreateNewUserPage/Student';
import { useLocation, useNavigate } from 'react-router';
import { axiosGetDetailProgrammedExposition } from '../../../api/ProgrammedExposition';
import { formatDate } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer";
import { GridLoader } from 'react-spinners';
import { axiosgetJurorsThesis } from '../../../api/Thesis';
import { axiosgetListExpositionThesis } from '../../../api/PresentationAssignment';
import InfoPresentation from './InfoPresentation';
import { Paginacion } from "#Components/Pagination/Pagination.js";



export default function DetailPresentation(){

    const {thesis, semesterId, courseId} = useLocation().state;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [infoPresentation, setInfoPresentation] = useState();
    const JWToken = localStorage.getItem('token');
    const [isLoadingJury, setIsLoadingJury] = useState(true);
    const [isLoadingPresentation, setIsLoadingPresentation] = useState(true);
    const [jurysRegistered, setJurysRegistered]= useState([]);
    const thesisID = thesis?thesis.id:'';
    const [presentationList, setPresentationList] = useState([]);

    //Paginacion
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(3);
    const [count, setCount] = useState(0);
    const maximo = Math.ceil(count / porPagina);


    const navigate = useNavigate();
    const backPage = () => {
        navigate('/teacher/presentation',{
            state:{
                semesterId: semesterId,
                courseId: courseId
            }
        });
    }
    const usuarios = thesis?thesis.USERs:[];
    //console.log(usuarios);
    const firstUser = usuarios?usuarios[0].USER_X_COURSE_X_SEMESTERs:'';
    //console.log(firstUser);
    const cxsid = firstUser?firstUser[0].COURSEXSEMESTERId:'';
    //console.log(cxsid);
    // const CxS = usuarios?usuarios.USER_X_COURSE_SEMESTERs[0]:'';
    // console.log(CxS);
    // const cxsid = CxS?CxS.COURSEXSEMESTERId:1;

    const getJuryThesis = () =>{
        axiosgetJurorsThesis(JWToken,thesisID,"").then(
          (response)=>{
            // console.log(response);
            const list  = response.data||[];
            setJurysRegistered(list);
            setIsLoadingJury(false);
          }
        ).catch(
          (error)=>{
            console.error(`Error: ${error}`);
          }
        )
      }

    const getPresentationsThesis = (page) =>{
      //console.log(cxsid);
      //console.log(thesisID);
      console.log(thesis);
        axiosgetListExpositionThesis(JWToken,cxsid,thesisID,page,porPagina).then(
            (response)=>{
                //console.log(response);
                const list = response.data.rows || '';
                setPresentationList(list);
                setCount(response.data.count);
                setIsLoadingPresentation(false);
            }
        ).catch(
            (error)=>{
                console.error(`Error: ${error}`);
            }
        )
    }

    useEffect(()=>{
        getPresentationsThesis();
    },)

    // const getPresentationDetail = () =>{
    //     axiosGetDetailProgrammedExposition(JWToken,axsid).then(
    //         (response)=>{
    //             console.log(response);
    //             const list = response.data || [];
    //             setInfoPresentation(list);
    //             setIsLoading(false);
    //         }
    //     ).catch(
    //         (error)=>{
    //             console.error(`Error: ${error}`);
    //         }
    //     )
    // }

     useEffect(()=>{
        getJuryThesis();
     },[]);

    // const studExpo = infoPresentation? infoPresentation.studentExposition:'';
    // const presentationAssign = studExpo? studExpo.ASSIGNMENT:'';
    //console.log(studExpo);
    // const fechaInicio = presentationAssign?presentationAssign.startDate:'';
    // const fechaFin = presentationAssign?presentationAssign.endDate:'';
    // const userExpo = studExpo? studExpo.USER:'';
    // const userxThese = userExpo? userExpo.USER_X_THEses[0]:'';
    // const thesis = userxThese?userxThese.THESIS:'';
    // const jurados = infoPresentation?infoPresentation.jurors:'';
    // const team =infoPresentation?infoPresentation.team:'';
    // const asesor = infoPresentation?infoPresentation.asesor:'';
    // const userAsesor = asesor?asesor.USER:'';
    // const fullNameAsesor = userAsesor.name+' '+userAsesor.fLastName+' '+userAsesor.mLastName;
    // console.log(jurados);
    // console.log(team);
    // console.log(asesor);
    //const fechaInicio = fecha +' ' + initialTime;
    //const fechaFin = fecha + ' ' +  finalTime;

    return(
        <div className='main-detail'>
            <div className='navBarTeacher-detail'>
                <CreateNewUserPageStudent/>
            </div>
            <div className='general-content-detail'>
                <div className='header-add-detail'>
                    <p className='titulo-detail'>TEMA DE TESIS</p>
                    <button className='back-but-detail' onClick={backPage}>
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                        className="imagenRetrocesoDetalle"
                        />
                    </button>
                </div>
                <hr className='separador-detail'></hr>
                <div className='add-content-detail'>
                    <div className='subtitulo-detail'>
                        <p>DETALLE DE LA TESIS</p>
                        <div className='espacio-blanco-detail'> </div>
                    </div>
                    {
                      isLoadingJury?
                      (
                        <GridLoader
                          className="mx-auto"
                          color="#042354"
                          loading={isLoadingJury}
                          size={24}
                        />
                      )
                      :
                      <>
                        {/* <div className='seccion-tiempo-edit'>
                        <div className='hora-inicio-edit'>
                                    <p>Fecha y Hora de inicio</p>
                                    <p className='fecha-hora-inicio'>{formatDate(fechaInicio)} - {formatDate(fechaInicio,'hh:mm')}</p>
                        </div>
                        <div className='hora-fin-edit'>
                                    <p>Fecha y Hora de fin</p>
                                    <p className='fecha-hora-inicio'>{formatDate(fechaFin)} - {formatDate(fechaFin,'hh:mm')}</p>
                        </div>
                    </div> */}
                    <div className='seccion-tesis-detail'>
                        <p className='nombre-tema-tesis-detail'>{thesis.title}</p>
                        {/* <p className='fecha-edicion-edit'>Fecha de publicacion: {formatDate(userxThese.createdAt)}</p> */}
                        <p className='fecha-edicion-detail'>Fecha de publicacion: {formatDate(thesis.updatedAt)}</p>
                        <div className='descripcion-tema-tesis-detail'>
                            <p>{thesis.description}</p>
                        </div>
                    </div>
                      <div className='seccion-asesor-alumno-detail'>
                        <div className='bloque-completo'>
                            <h5 className='subtitulo-tipo'>JURADOS</h5>
                            <div className='seccion-jurado-detail'>
                            {
                                jurysRegistered.length>0?
                                jurysRegistered.map((jurado, index) => {
                                    const userJurado = jurado?jurado.USER:'';
                                    const fullName = userJurado.name + ' '+ userJurado.fLastName + ' '+ userJurado.mLastName;
                                    return(
                                        <div className='jurado-detail' key={index}>
                                            <img className='foto-jurado-detail'
                                            src={
                                                userJurado.photo
                                                ? `data:image/png;base64,${Buffer.from(
                                                    userJurado.photo.data
                                                ).toString("base64")}`
                                                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                            }/>
                                            <p className='nombre-jurado-detail'>{fullName}</p>
                                            <p className='carrera-jurado-detail'>Ingeniería informática</p>
                                        </div>
                                    );
                                })
                                :
                                <div className='seccion-no-jurado-detail'>
                                    No existe jurados registrados
                                </div>
                            }
                            </div>
                        </div>

                        {/*
                        <div className='bloque-completo'>
                            <h5 className='subtitulo-tipo'>ASESOR</h5>
                            <div className='seccion-asesor-detail'>
                                <img className='foto-asesor-detail'
                                src={
                                    userAsesor.photo
                                    ? `data:image/png;base64,${Buffer.from(
                                        userAsesor.photo.data
                                    ).toString("base64")}`
                                    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                }/>
                                <p className='nombre-asesor-detail'>{fullNameAsesor}</p>
                                <p className='carrera-asesor-detail'>Ingeniería informática</p>
                            </div>
                        </div> */}
                        <div className='bloque-completo'>
                            <h5 className='subtitulo-tipo'>EQUIPO</h5>
                            <div className='seccion-alumno-detail'>
                                {
                                    usuarios.length>0?
                                    usuarios.map((alumno, index) => {
                                        const userAlumno = alumno?alumno:'';
                                        const fullName = userAlumno.name + ' '+ userAlumno.fLastName + ' '+ userAlumno.mLastName;
                                        return(
                                            <div className='alumno-detail' key={index}>
                                                <img className='foto-alumno-detail'
                                                src={
                                                    userAlumno.photo
                                                    ? `data:image/png;base64,${Buffer.from(
                                                        userAlumno.photo.data
                                                    ).toString("base64")}`
                                                    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                                }/>
                                                <p className='nombre-alumno-detail'>{fullName}</p>
                                                <p className='carrera-alumno-detail'>Ingeniería informática</p>
                                            </div>
                                        );
                                    })
                                    :
                                    <div className='seccion-no-jurado-detail'>
                                        No existe equipo registrados
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                      </>
                    }
                </div>
              <div className='presentations-list-detail'>
                <p>Lista de exposiciones</p>
                <div className='contenedor-presentations-thesis'>
                    {
                      isLoadingPresentation?(
                        <GridLoader
                          className="mx-auto"
                          color="#042354"
                          loading={isLoadingJury}
                          size={24}
                        />
                      ) : presentationList.length>0?
                        presentationList.map((presentation,index)=>{
                          return(
                            <div className='one-presentation'>
                              <InfoPresentation
                              presentation={presentation}/>
                            </div>
                          )
                        })
                      :
                      <div className='no-presentations-list'>
                        <p>No existen presentaciones disponibles</p>
                      </div>  
                    }
                </div>
                <div className="nav-paginas-presentations">
                  <Paginacion
                    pagina={pagina}
                    setPagina={setPagina}
                    maximo={maximo}
                    onClickHandler={getPresentationsThesis}
                    setIsLoading={setIsLoadingPresentation}
                  />
                </div>
              </div>
            </div>
    </div>
    );
}

