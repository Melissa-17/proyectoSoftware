import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Teacher/Administration/PantallaAdministracion.css";
import "#Styles/Teacher/Administration/MenuSuperior.css";
import "#Styles/Teacher/Administration/filtro.css";
import { Combobox } from "react-widgets";
import ContenedorAlumnosAsesor from './ContenedorAlumnosAsesor.js';
import RowAlumno from "./filaAlumno";
import { UserContext } from "#Context/userContext";
import {axiosGetStudentsAsesors} from '#API/User.js';
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { Buffer } from "buffer"; 
export  default function DetalleAsesor() {
    const [alumnosList, setAlumnosList]  = useState();
    const navigate = useNavigate();
    const {idAsesor,cxsid,info} = useLocation().state;
    
    // console.log(info)
    const nombre=info && info.name? info.name:" "
    const apellido1=info && info.fLastName? info.fLastName:" "
    const apellido2= info && info.mLastName? info.mLastName:" " 
    const correo=info &&info.email?info.email:" " 
    const codigo=info&&info.idPUCP?info.idPUCP:"00000000 "
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(4);
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const maximo = count ? Math.ceil(count / porPagina) : 1;

    const retrocesoClic = () => {
        navigate("/Asesores",{state:{cxsid:cxsid}});
      };
      /*
      
      */
      let user = useContext(UserContext);
      user = user ? user : JSON.parse(localStorage.getItem('user'));
      const location = useLocation(); 
  
   const getStudentList = (page, texto) => {
     const JWTtoken = localStorage.getItem('token');
     axiosGetStudentsAsesors(JWTtoken, info.id,"", page,porPagina)
       .then(
           (response) => {
               const list = response.data.StudentsAsesor.rows|| [];  
               console.log(response.data);
               setAlumnosList(list); 
               setCount(response.data.StudentsAsesor.count);
               setIsLoading(false);
           }
       ).catch(error => {
           console.error(`Error: ${error}`);
       });
   };
useEffect(() => {
     getStudentList(1,"");    
  }, []);
  return (
     <div className="Estructura">
        <Navbar />
        <div className="ContenedorContenido">
            <div className="filacontenido">
                <div className="TituloAdministracion">
                    <h1>ASESOR</h1>
                    <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                            className="imagenRetrocesoDetalle"
                        />
                    </button>
                </div> 
            </div>
             
                
               <div className="infoAsesor">
                {
                    info && info.photo && info.photo.data ?
                    <img className="foto" 
                    src={`data:image/png;base64,${Buffer.from(info.photo.data).toString('base64')}`} 
                        alt='foto asesor' />
                        :
                    <img className="foto" 
                    src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                    alt='foto asesor' />
                } 
                    <h4>{nombre+" "+apellido1+" "+apellido2}</h4>
                    <p>{correo }</p>
                    <p>{codigo}</p>
               </div>
             
                <div className="filacontenido">
                <p className="subtitulo">ALUMNOS ASIGNADOS</p>    
                </div>
             
               
              
            <div>
                
                    {isLoading ?
                    <GridLoader
                        className="mx-auto"
                        color="#042354"
                        loading={isLoading}
                        size={24}
                    />
                    :
                    <ContenedorAlumnosAsesor
                    alumnosList={alumnosList}
                    />}

<div className="contenedorFinal">
        <div className="contenedorBotoneriaEntregable">
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={getStudentList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
                    
            </div>
            
        </div>   
        
     </div>
  )
}