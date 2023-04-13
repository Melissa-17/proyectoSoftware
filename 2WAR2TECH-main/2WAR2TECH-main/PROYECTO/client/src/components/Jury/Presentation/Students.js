import React, { useEffect, useState } from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import '#Styles/Jury/Presentation/Students.css';
import { axiosGetgetListExpositionsJurado } from "../../../api/PresentationAssignment";
import InfoPresentation from "./InfoPresentation";
import { useLocation, useNavigate } from "react-router";
import { GridLoader } from "react-spinners";
import { Paginacion } from "#Components/Pagination/Pagination.js";

export default function Students(){

    const JWToken = localStorage.getItem("token");
    const {curso, num} = useLocation().state;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [studentsPresentations, setStudentsPresentations] = useState([]);
    const [inputName, setInputName] = useState('');
    const [count, setcount] = useState(0);
    //Paginación
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(4);

    const maximo = Math.ceil(count / porPagina);

    // console.log(curso);
    const getFullListPresentations = (page) =>{
        axiosGetgetListExpositionsJurado(JWToken,curso.id,inputName,page,porPagina).then(
            (response) =>{
                // console.log(response);
                const data = response.data.rows || [];
                setStudentsPresentations(data);
                // console.log(data);
                setcount(response.data.count);
                setIsLoading(false);
            }
        ).catch(
            (error)=>{
                console.error(`Error: ${error}`);
            }
        )
    }

    // console.log(studentsPresentations);

    const goCourses = () =>{
        if(num==1) navigate(`/jury/presentation/${num}`);
        else if(num==2) navigate(`/asesor/presentation/${num}`);
        else if(num==3) navigate(`/teacher/presentation/${num}`);
    }

    useEffect(() =>{
        getFullListPresentations();
    },[inputName]);

    let inputNameHandler = (e) =>{
        var lowerCase = e.target.value.toLowerCase();
        setInputName(lowerCase);
        getFullListPresentations();
    }

    // console.log(studentsPresentations);

    return(
        <div className="main-box-students">
            <div className="navBar-jury">
                <CreateNewUserPageStudent />
            </div>
            <div className="content">
                <div className="header-students">
                    <p className="titulo-tes">{curso.abbreviation} (INF)</p>
                    <button className="back-courses" onClick={goCourses}>
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                        className="imagenRetrocesoDetalle"
                        />
                    </button>
                </div>
                <hr className="espacio-separador" width='1200px' color='black'/>
                <div className="filtros">
                    {/* <div className="filtro-estado">
                        <p>Estado</p>
                        <input className="input-estado"></input>
                    </div> */}
                    <div className="filtro-alumno">
                        <p>Alumno</p>
                        <input className="input-alumno" 
                            placeholder=" Ingrese un nombre"
                            onChange={inputNameHandler}/>
                        <i class="bi bi-search fa-1x"/>
                    </div>
                    {/* <div className="filtro-codigo">
                        <p>Codigo</p>
                        <input className="input-codigo"></input>
                    </div>
                    <div className="filtro-correo">
                        <p>Correo</p>
                        <input className="input-correo"></input>
                    </div>
                    <div className="filtro-desde">
                        <p>Desde</p>
                        <input className="input-desde"></input>
                    </div>
                    <div className="filtro-hasta">
                        <p>Hasta</p>
                        <input className="input-hasta"></input>
                    </div> */}
                </div>
                <hr className="espacio-separador" width='1200px' color='#CED4DA'/>
                <div className="list-students">
                    <div className="cabecera-lista">
                        <p className="cabecera-alumno">Alumno</p>
                        <p className="cabecera-fecha">Fecha y Hora</p>
                        <p className="cabecera-accion">Acción</p>
                    </div>
                    <hr className="espacio-separadores" width='1100px'/>
                    <div className="full-list-students">
                        {isLoading ? (
                            <GridLoader
                                className="mx-auto"
                                color="#042354"
                                loading={isLoading}
                                size={24}
                            />
                            ) :studentsPresentations.length > 0?(
                            studentsPresentations.map((presentation, index)=>{
                                return(
                                    // console.log(presentation)
                                    <div key={index} className='presentation-s'>
                                        <InfoPresentation
                                        presentation={presentation}
                                        curso={curso}
                                        num={num}
                                        />
                                    </div>
                                )
                            })
                        )
                            :
                            <div className="no-pres">
                                No existe presentaciones disponibles
                            </div>    
                        }
                    </div>
                </div>
                <div className="nav-paginas">
                    {studentsPresentations.length>0?
                    <Paginacion
                    pagina={pagina}
                    setPagina={setPagina}
                    maximo={maximo}
                    onClickHandler={getFullListPresentations}
                    setIsLoading={setIsLoading}
                    />:""}
                </div>
            </div>
        </div>
    );
}