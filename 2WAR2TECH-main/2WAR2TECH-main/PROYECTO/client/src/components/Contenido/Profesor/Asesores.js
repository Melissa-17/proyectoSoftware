
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Teacher/Administration/PantallaAdministracion.css";
import "#Styles/Teacher/Administration/MenuSuperior.css";
import "#Styles/Teacher/Administration/filtro.css";
import { Combobox } from "react-widgets";
 import { ContenedorAsesoresAdmin } from "./ContenedorAsesoresAdmin.js";
import { UserContext } from "#Context/userContext";
import {axiosGetRegisteredAsesors} from '#API/User.js';
import { GridLoader } from "react-spinners";

export default function AdministracionAsesores() {
   
    const [actualizarAsesores, setActualizarAsesores] = useState(false);
    const navigate = useNavigate();
    const retrocesoClic = () => {
        navigate("/courses");
      };
    const navtoAlumnos =()=>{
        navigate("/teacher/Administration",{state:{cxsid:cxsid}})
      };
    let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
     const location = useLocation();
     const { cxsid } = location.state;
     const [ListaAsesores, setListaAsesores]  = useState();
     const [isLoading, setIsLoading] = useState(true);
  
  const getAllProfessorsList = (texto) => {
    
    const JWTtoken = localStorage.getItem('token');
    axiosGetRegisteredAsesors(JWTtoken,cxsid,texto)
      .then(
          (response) => {
              const list = response.data.rows || [];
            //   console.log(list);
              setListaAsesores(list); 
              setIsLoading(false);
          }
      ).catch(error => {
          console.error(`Error: ${error}`);
      });
  };
  const  handleinputChange = (e) => { 
    var x = document.getElementById("busqueda").value;
    // console.log(x);
    getAllProfessorsList(x);
  }
  useEffect(() => {
    getAllProfessorsList("");    
 }, []);
 
  return (
     <div className="Estructura">
        <Navbar />
        <div className="ContenedorContenido">
        <div className="filacontenido">
                <div className="TituloAdministracion">
                    <h1>GESTION DE PERSONAS</h1>
                    <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                            className="imagenRetrocesoDetalle"
                        />
                    </button>
                </div>
                <div>
                    <hr className="linea" color="#DEE2E6"/> 
                </div>
            </div>
            <div className="ContenedorOpciones">
                <ul>
                    <button className="botonesOpcion"
                        onClick={navtoAlumnos}
                    >
                    Alumnos
                    </button>
                </ul>
                <ul>
                    <button className="botonesOpcionSeleccionado" >
                    Asesores
                    </button>
                </ul>
            </div>
            <div className="filacontenido">
                <p className="subtitulo">LISTA DE ASESORES DEL CURSO</p>
            </div>
            <div className="filacontenido">
                <div>
                     
                </div>
                <div>
                    <input type="text" 
                        id="busqueda"
                        className="Busqueda"
                        onChange={handleinputChange}
                        placeholder='Ingrese un nombre...'>    
                    </input>
                    <button className='boton'>
                        <i class="bi bi-search" />
                    </button>
                </div>
                {/* <div className="espacioB"></div> */}
            </div> 
            <div >
                {isLoading ? 
                <GridLoader
                    className="mx-auto"
                    color="#042354"
                    loading={isLoading}
                    size={24}
                />
                :
                <ContenedorAsesoresAdmin
                    asesoresList={ListaAsesores} 
                    
                /> }
                

            </div>
            
        </div>   
     </div>
  )
}

