import React, { useEffect, useState } from 'react';
import '#Styles/Teacher/Presentation/EditPresentation.css';
import CreateNewUserPageStudent from '../../../pages/CreateNewUserPage/Student';
import { useLocation, useNavigate } from 'react-router';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/esm/locale/es';
import ModalsAlert from '../../Modals/ModalsAlert';
import { axiosGetDetailProgrammedExposition, axiospatchProgrammedExposition } from '../../../api/ProgrammedExposition';
import { formatDate } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer";
import { GridLoader } from 'react-spinners';

export default function EditPresentation(){

    const {cxsid,axsid} = useLocation().state;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const JWToken = localStorage.getItem('token');
    const [infoPresentation, setInfoPresentation] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const backPage = () => {   
        navigate('/teacher/presentation',{
            state:{
                cxsid: cxsid
            }
        });
    }

    const  [openModalAceptar, setOpenModalAceptar] = useState(false);
    const  [openModalCancelar, setOpenModalCancelar] = useState(false);

    const getPresentationDetail = () =>{
        axiosGetDetailProgrammedExposition(JWToken,axsid).then(
            (response)=>{
                console.log(response); 
                const list = response.data || [];
                setInfoPresentation(list);  
                setIsLoading(false);    
            }
        ).catch(
            (error)=>{
                console.error(`Error: ${error}`);
            }
        )
    }

     useEffect(()=>{
         getPresentationDetail();
     },[]);

    //console.log(infoPresentation);
    const studExpo = infoPresentation? infoPresentation.studentExposition:'';
    const presentationAssign = studExpo? studExpo.ASSIGNMENT:'';
    console.log(presentationAssign);
    const fechaIni = presentationAssign?presentationAssign.startDate:'';
    const fechaFin = presentationAssign?presentationAssign.endDate:'';
    const userExpo = studExpo? studExpo.USER:'';
    const userxThese = userExpo? userExpo.USER_X_THEses[0]:'';
    const thesis = userxThese?userxThese.THESIS:'';
    const jurados = infoPresentation?infoPresentation.jurors:'';
    const team =infoPresentation?infoPresentation.team:'';
    const asesor = infoPresentation?infoPresentation.asesor:'';
    const userAsesor = asesor?asesor.USER:'';
    const fullNameAsesor = userAsesor.name+' '+userAsesor.fLastName+' '+userAsesor.mLastName;
    const [initialTime, setInitialTime] = useState(new Date ());
    const [finalTime, setFinalTime] = useState(new Date());
    //setInitialTime(fechaIni);
    //setFinalTime(fechaFin);

    const saveChanges = () =>{
        const idExpo = studExpo? studExpo.ASSIGNMENTId:'';
        const body = {
            'startDate' : initialTime,
            'endDate' : finalTime
        }
        //Edicion de la exposicion
        axiospatchProgrammedExposition(JWToken, idExpo, body).then(
            (response)=>{
                console.log(response);
            }
        ).catch(
            (error)=>{
                console.error(`Error: ${error}`);
            }
        )
        //retorno a la pagina principal
        navigate('/teacher/presentation',{
            state:{
                cxsid: cxsid
            }
        }); 

    }

    return(
        <div className='main-edit'>
            <div className='navBarTeacher-edit'>
                <CreateNewUserPageStudent/>
            </div>
            <div className='general-content-edit'>
                <div className='header-add-edit'>
                    <p className='titulo-edit'>EXPOSICIONES</p>
                    <button className='back-but-edit' onClick={()=>{setOpenModalCancelar(true)}}>
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                        className="imagenRetrocesoDetalle"
                        />
                    </button>
                </div>
                <hr className='separador-edit'></hr>
                <div className='add-content-edit'>
                    <div className='subtitulo-edit'>
                        <p>EDICIÓN DE UNA EXPOSICIÓN</p>
                        <div className='espacio-blanco-edit'> </div>
                    </div>
                    {
                      isLoading?
                      (
                        <GridLoader
                          className="mx-auto"
                          color="#042354"
                          loading={isLoading}
                          size={24}
                        />
                      )
                      :
                      <>
                        <div className='seccion-tiempo-edit'>
                        <div className='hora-inicio-edit'>
                                    <p>Fecha y Hora de inicio</p>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} local={esLocale}>
                                        <DateTimePicker className= 'picker-inicio' value={initialTime} 
                                        onChange={(e)=>{setInitialTime(e)}}/>
                                    </MuiPickersUtilsProvider>
                        </div>
                        <div className='hora-fin-edit'>
                                    <p>Fecha y Hora de fin</p>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} local={esLocale}>
                                        <DateTimePicker className='picker-fin' value={finalTime} 
                                        onChange={(e)=>{setFinalTime(e)}}/> 
                                    </MuiPickersUtilsProvider>
                        </div>
                        {/*<div className='boton-clean'>
                            <button className='limpiar-boton'>Limpiar</button>
                        </div> */}
                    </div>
                    <div className='seccion-tesis-edit'>
                        <p className='nombre-tema-tesis-edit'>{thesis.title}</p>
                        <p className='fecha-edicion-edit'>Fecha de publicacion: {formatDate(userxThese.createdAt)}</p>
                        <div className='descripcion-tema-tesis-edit'>
                            <p>{thesis.description}</p>
                        </div>
                    </div>
                    <div className='seccion-asesor-alumno-edit'>
                        <div className='bloque-completo'>
                            <h5 className='subtitulo-tipo'>JURADOS</h5>
                            <div className='seccion-jurado-edit'>
                                {/* <h5>Jurados</h5> */}
                            {
                                jurados.length>0?
                                jurados.map((jurado, index) => {
                                    const userJurado = jurado?jurado.USER:'';
                                    const fullName = userJurado.name + ' '+ userJurado.fLastName + ' '+ userJurado.mLastName;
                                    return(
                                        <div className='jurado-edit' key={index}>
                                            <img className='foto-jurado-edit'
                                            src={
                                                userJurado.photo
                                                ? `data:image/png;base64,${Buffer.from(
                                                    userJurado.photo.data
                                                ).toString("base64")}`
                                                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                            }/>
                                            <p className='nombre-jurado-edit'>{fullName}</p>
                                            <p className='carrera-jurado-edit'>Ingeniería informática</p>
                                        </div>    
                                    );
                                })
                                :
                                <div className='seccion-no-jurado-edit'>
                                    No existe jurados registrados
                                </div>    
                            }
                            </div>
                        </div>
                        <div className='bloque-completo'>
                            <h5 className='subtitulo-tipo'>ASESOR</h5>
                            <div className='seccion-asesor-edit'>
                                <img className='foto-asesor-edit'
                                src={
                                    userAsesor.photo
                                    ? `data:image/png;base64,${Buffer.from(
                                        userAsesor.photo.data
                                    ).toString("base64")}`
                                    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                }/>
                                <p className='nombre-asesor-edit'>{fullNameAsesor}</p>
                                <p className='carrera-asesor-edit'>Ingeniería informática</p>
                                {/* <hr width='200px' color='#B8D3FF'/> */}
                            </div>
                        </div>
                        <div className='bloque-completo'>
                            <h5 className='subtitulo-tipo'>EQUIPO</h5>
                            <div className='seccion-alumno-edit'>
                                {
                                    team.length>0?
                                    team.map((alumno, index) => {
                                        const userAlumno = alumno?alumno.USER:'';
                                        const fullName = userAlumno.name + ' '+ userAlumno.fLastName + ' '+ userAlumno.mLastName;
                                        return(
                                            <div className='alumno-edit' key={index}>
                                                <img className='foto-alumno-edit'
                                                src={
                                                    userAlumno.photo
                                                    ? `data:image/png;base64,${Buffer.from(
                                                        userAlumno  .photo.data
                                                    ).toString("base64")}`
                                                    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                                }/>
                                                <p className='nombre-alumno-edit'>{fullName}</p>
                                                <p className='carrera-alumno-edit'>Ingeniería informática</p>
                                            </div>    
                                        );
                                    })
                                    :
                                    <div className='seccion-no-jurado-edit'>
                                        No existe equipo registrados
                                    </div>   
                                }
                            </div>
                        </div>
                    </div>
                      </>
                    }
                    <div className='seccion-botones'>
                        <button className='btn-registrar'
                        onClick={()=>{setOpenModalAceptar(true)}}>guardar</button>
                        <button className='btn-cancelar' 
                        onClick={() => {setOpenModalCancelar(true)}}>Cancelar</button>
                    </div>
                </div>    
            </div>
        {openModalCancelar && <ModalsAlert closeAlert = {setOpenModalCancelar}
            alertText='¿Seguro que desea salir sin guardar los cambios?'
            action={backPage}/>}
        {openModalAceptar && <ModalsAlert closeAlert = {setOpenModalAceptar}
            alertText='¿Desea registrar toda la información seleccionada?'
            action={saveChanges}/>}
    </div>
    );
}

