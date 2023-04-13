import React, {useState,useEffect} from 'react'
import '../../../../assets/styles/Teacher/Portafolio/InitialPartTeacher.css'
import Combobox from "react-widgets/Combobox";
import { axiosGetSemestresbyUserId } from '#API/Semestres.js';
import { axiosGetCursosBySemesterId } from '#API/Cursos';
import { axiosGetListOfStudents } from '#API/User';
import { Paginacion } from '#Components/Pagination/Pagination.js'
import AdviserBt from './AdviserBt';

export default function InitialPartTeacher(props) {
    const [semestreLista, setSemestreLista] = useState([]);
    const [courseList, setCourseList]  = useState([]);
    //Esta lista cambiar
    const [studentList, setStudentList]  = useState([]);

    const [selectedSemester, setSelectedSemester] = useState({id: 999999});
    const [selectedCourse, setSelectedCourse] = useState({id: 999999});
    const [inputName, setInputName] = useState("");

    const JWTtoken = localStorage.getItem('token');
    
    const getAllCourseList = (id) => {
        axiosGetCursosBySemesterId(JWTtoken, id).then(
            (response) => {
                // console.log(response); 
                const list = response.data || [];
                setCourseList(list);
                setSelectedCourse(list[0]);
            }
        ).catch(error => {
            console.error(`Error: ${error}`);
        });
    };

    const getAllSemestresLista = () => {

        axiosGetSemestresbyUserId(JWTtoken).then(
            (response) => {
                // console.log(response); 
                const list = response.data || [];
                setSemestreLista(list);
                setSelectedSemester(list[list.length-1]);
                getAllCourseList(list[list.length-1].id);
            }
        ).catch(error => {
            console.error(`Error: ${error}`);
        });
    };

    const getStudentList = () => {
        const inputList = {
            "ciclo": selectedSemester.id,
            "curso": selectedCourse.id,
            "text": inputName
        }
        // console.log(inputList);

        axiosGetListOfStudents(JWTtoken, inputList).then(
            (response) => {
                const list = response.data || [];
                // console.log(list);
                setStudentList(list);
            }
        ).catch(error => {
            console.error(`Error: ${error}`);
        });
    };

    useEffect(() => {
        getAllSemestresLista();
    }, []);

    useEffect(() => {
        getStudentList();
    })
    
    const  handleSemesterChange = (e) => {
        getAllCourseList(e.id);
        setSelectedSemester(e);
    } 

    const handleCourseChange = (e) => {
    
        setSelectedCourse(e);
        getStudentList();
    }

    let inputNameHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputName(lowerCase);
        getStudentList();
    };
    const comboCourseList = courseList.map(e => {
        return e.COURSE
    });

    //Paginación
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(4);
    
    const maximo = Math.ceil(studentList.length / porPagina);
  return (
    <div className='contenedorInicialTeacher'>
      <div className='primeraFilaTeacher'>
            <div className='cicloCbTeacher'>
                <p>Ciclo:</p>
                <div className='SelectCicloTeacher'>
                    
                    <Combobox
                    
                    onChange={handleSemesterChange}
                    value={selectedSemester}
                    dataKey="id"
                    textField="abbreviation" 
                    
                    data={semestreLista}/>
                </div>
            </div>
            <div className='tesisCbTeacher'>
                <p>Curso:</p>
                <div className='SelectTesisTeacher'>
                    <Combobox
                        
                        onChange={handleCourseChange}
                        value={selectedCourse}
                        dataKey="id"
                        textField="name" 
                        
                        data={comboCourseList}
                    />
                </div>
            </div>
        </div>
        <div className='segundaFilaTeacher'>
            <div className='subtituloSegundaFilaTeacher'>
                <p>Ingrese nombre de alumno:</p>
            </div>
            <div className='botonNombreTeacher'>
                <input type="text" placeholder='Ingrese un nombre...' onChange={inputNameHandler}></input>
                <button className='busquedaNombreTeacher'>
                    <i class="bi bi-search" />
                </button>
            </div>
        </div>
        <div className='terceraFilaTeacher'>
            <div className='subtituloTerceraFilaTeacher'>
                <p>Ingrese una palabra asociada:</p>
            </div>
            <div className='botonNombreTeacher'>
                <input type="text" placeholder='Ingrese un nombre...' onChange={inputNameHandler}></input>
                <button className='busquedaNombreTeacher'>
                    <i class="bi bi-search" />
                </button>
            </div>
        </div>
        <div className='zonaBotonesTeacher'>
            {studentList.length > 0 ? studentList.slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                    ).map((student, index) => 
                <div key={index} className='espaciadoZonaTeacher'>
                    {console.log("HOL",student)}
                    <AdviserBt 
                    student={student.ASSIGNMENT_X_STUDENT}
                    
                    course={selectedCourse}
                    valor = {2}
                    num = {props.num}/>    
                </div>
            ) :
            <div className='no-alumn'>No hay alumnos.</div>
            }
            
        </div>
        <div className='contenedorBotoneriaEntregable'>
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
        </div>
    </div>
  )
}
