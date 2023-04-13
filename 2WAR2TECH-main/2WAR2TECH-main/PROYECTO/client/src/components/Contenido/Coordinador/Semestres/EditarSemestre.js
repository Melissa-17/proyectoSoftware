import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../../../assets/styles/Coordinador/Semestres/Pantalla.css';
import '../../../../assets/styles/Coordinador/Semestres/Principal.css';
import {Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';   
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";
import ContenedorCursos from './ContenedorCursos'
import ContenedorCursosfilas from './ContenedorCursosfilas' 
import { axiosGetSemestresbyUserId } from '#API/Semestres.js';
import Navbar from '../../../SidebarMenu/Navbar';
import ModalsAlert from '../../../Modals/ModalsAlert';
// import Deliverable from './Deliverable';
// import Partial from './Partial';


 let semestrefijos=['2021-1','2021-2','2022-1','2022-2'];
 
export default function EditarSemestre() {
    const JWTtoken = localStorage.getItem('token');
    const [openAlert, setAlert] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const { semester, courses } = useLocation().state;

    const retrocesoClic = () =>{
        navigate("/Semestre/pantalla");
    }
    const nuevoCursoClic = () =>{
        navigate("/Semestre/detalle/cursonuevo", {
            state: {
                semester: semester,
                courseList: courses
            }
        });
    }

    const handleSemesterSubmit =  (e) => {
        e.preventDefault();
        const semesterName = document.querySelector('.semester-name').value;
        const semesterAbbrev = document.querySelector('.semester-abbrev').value;
        
        const semesterForm = {
            "name": semesterName,
            "abbreviation": semesterAbbrev
        }
      }

  return (
    <div className='estructura'>
        
        <Navbar/>
        <div className='contenedorContenido2'>
            <div className='contenedorTitulo'> 

                <h1>EDITAR SEMESTRE</h1>
                <div className='espacio'>
                    <button
                        // onClick={retrocesoClic}
                        onClick={()=>setAlert(true)}
                        className='botonRetrocesoDetalle'>
                            <img 
                            src='https://cdn-icons-png.flaticon.com/512/2223/2223615.png'
                            className='imagenRetrocesoDetalle'/>
                    </button>
                    {openAlert&&<ModalsAlert
                        closeAlert={setAlert}
                        action={retrocesoClic}
                        alertText="¿Está seguro que desea salir  de la pantalla sin guardar los cambios?"
                        messageText="Archivos subidos con éxito"
                    />}
                </div>
            </div>

            <hr color='black' className='lineaContenido' />
            <div className='leyenda'>
                <p>Leyenda: Los campos con * son obligatorios</p>
            </div>
            <form id="semester-form" className="semester-form" method="post" onSubmit={handleSemesterSubmit}>
                <div className='contenedortextBox'>
                    <div className='textbox'>
                        <label htmlFor='semester-name'>Nombre *</label>
                        
                        <input id="semester-name" name="semester-name" type="text" className="semester-name" 
                        defaultValue={semester.name}/>
                        
                    </div>
                    <div className='espacio2'></div>
                    <div className='textbox'>
                        <label htmlFor='semester-abbrev'>Abreviación *</label>
                        <input id="semester-abbrev" name="semester-abbrev" type="text" className="semester-abbrev" 
                        defaultValue={semester.abbreviation}/>
                        
                    </div>
                </div>
                <div className='contenedordecursos'>
                    <div className='cursostitulo'>
                    <p>Cursos</p>
                    <div></div>
                    <button 
                     onClick={nuevoCursoClic}
                    className='add'><i class="bi bi-plus-lg"></i></button>
                    </div>
                    {console.log("probando si se pasaron los cursos o no")}
                    {console.log(courses)}
                    <ContenedorCursosfilas
                    courseListData={courses}/>
                </div>
                <div className='contenedorbotones'>
                    <div className='espacio'></div> 
                    <button type="submit" form="semester-form"> 
                        Crear
                    </button>
                    <button  >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

 