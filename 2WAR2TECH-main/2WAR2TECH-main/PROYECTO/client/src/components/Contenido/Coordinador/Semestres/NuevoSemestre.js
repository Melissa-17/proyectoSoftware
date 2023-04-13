import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import '../../../../assets/styles/Coordinador/Semestres/Pantalla.css';
import '../../../../assets/styles/Coordinador/Semestres/Principal.css';
import {Route, Routes, useNavigate, useLocation } from 'react-router-dom';   
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";
import ContenedorCursos from './ContenedorCursos'
import ContenedorCursosfilas from './ContenedorCursosfilas' 
import { axiosGetSemestresbyUserId, axiosAddSemester } from '#API/Semestres.js';
import { axiosAddCourse } from '#API/Cursos.js';
import Navbar from '../../../SidebarMenu/Navbar';
import { axiosAddCourseXSemester } from '../../../../api/Cursos';
import ModalsMessage from '../../../Modals/ModalsMessage';
import ModalsAlert from './ModalsAlert';
// import Deliverable from './Deliverable';
// import Partial from './Partial';
 
export default function NuevoSemestre() {

    const [openMessage, setOpenMessage] = useState(false);
    const [semester, setSemester] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation(); 
    const [courseList, setCourseList] = useState((location.state && location.state.courseList) ? location.state.courseList : []);
    const [alertaSemestre, setAlertaSemestre] = useState(false);
    
    const JWTtoken = localStorage.getItem('token');


    const navigate = useNavigate();

    const retrocesoClic = () =>{
        navigate("/Semestre/pantalla");
    }
    const nuevoCursoClic = () =>{
        navigate("/Semestre/detalle/cursonuevo", {
            state:{
                semester: semester,
                courseList: courseList,
            }
        });
    }

    useEffect(() => {
    }, [courseList]);
    

    const handleCourseDelete = (courseId) => {
        const newCourseList = courseList.filter((course) => {
            return course.COURSEId !== courseId;
        });
        setCourseList(newCourseList);
      };  

    const handleSemesterSubmit =  async (e) => {
        e.preventDefault();
        const semesterName = document.querySelector('.semester-name').value;
        const semesterAbbrev = document.querySelector('.semester-abbrev').value;
        
        const semesterForm = {
            "name": semesterName,
            "abbreviation": semesterAbbrev
        }
        setSemester(semester);
        let semesterIdCreated = 9999;
        await axiosAddSemester(JWTtoken, 13, semesterForm)
          .then((res) => {
            // console.log(res)
            semesterIdCreated = res.data.id;
          })
          .catch((err) => {
            console.log(err);
          });

        const courseToSend = courseList.map((course, index) => {
            return {
                "name": course.COURSE.name,
                "code": course.COURSE.key,
                "credits": course.COURSE.credits,
                "type": course.COURSE.type,
                "users": course.COURSE.users
            }
        });
        let courseResponseList = [];
        await courseToSend.map(async (course, index) => {
            if (course.type == "NEW") {
                axiosAddCourse(JWTtoken, course).then((res) => {
                    courseResponseList.push(res.data);
                    if (index === courseToSend.length - 1) {
                        const courseXSemesterList = courseResponseList.map((course, index) => {
                            return {
                                "id": course.id,
                                "users": [...courseList[index].COURSE.users, 10],
                            }
                        });

                        

                        axiosAddCourseXSemester(JWTtoken, semesterIdCreated, {"cursos": courseXSemesterList})
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                        
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }
        })

        
      }

      const handleNameChange = (e) => {
        setSemester({...semester, "name": e.target.value});
      }

      const handleAbbreviationChange = (e) => {
        setSemester({...semester, "abbreviation": e.target.value});
      }

      useEffect(() => {

      }, [semester]);
      
  return (
    <div className='estructura'>
        <Navbar/>
        <div className='contenedorContenido2'>
            <div className='contenedorTitulo'> 

                <h1 className='nuevoSemestreContenedorTitulo'>NUEVO SEMESTRE</h1>
                <div className='espacio'>
                    <button
                        onClick={retrocesoClic}
                        className='botonRetrocesoDetalleNuevoSemestre'>
                            <img 
                            src='https://cdn-icons-png.flaticon.com/512/2223/2223615.png'
                            className='imagenRetrocesoDetalle'/>
                    </button>
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
                        onChange={handleNameChange}/>
                        
                    </div>
                    <div className='espacio2'></div>
                    <div className='textbox'>
                        <label htmlFor='semester-abbrev'>Abreviación *</label>
                        <input id="semester-abbrev" name="semester-abbrev" type="text" className="semester-abbrev" 
                        onChange={handleAbbreviationChange}/>
                        
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
                    <ContenedorCursosfilas courseList={courseList} setCourseList={setCourseList} 
                    handleCourseDelete={handleCourseDelete}/>
                </div>
                <div className='contenedorbotones'>
                    <div className='espacio'></div> 
                    <button type="submit" form="semester-form" onClick={()=>setOpenMessage(true)}>
                    Crear
                    </button>
                    {openMessage && (
                    <ModalsMessage
                        closeMessage={setOpenMessage}
                        message="Semestre añadido con éxito"
                        navigateFunc={retrocesoClic}
                        isNavigateFunc={true}
                    />
                    )}
                    <button onClick={() => {setAlertaSemestre(true);}}>
                        Cancelar
                    </button>
                    {alertaSemestre && <ModalsAlert closeAlert={setAlertaSemestre}
                     alertText="¿Desea cancelar los cambios hechos?"
                     cambioPantalla={retrocesoClic}/>}
                </div>
            </form>
        </div>
    </div>
  )
}