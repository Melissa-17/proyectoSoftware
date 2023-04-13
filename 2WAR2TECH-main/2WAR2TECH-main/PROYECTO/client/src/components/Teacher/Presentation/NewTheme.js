import React, { useEffect, useState } from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import '#Styles/Teacher/Presentation/NewTheme.css';
import { useLocation, useNavigate } from "react-router";
import InfoTheme from "./InfoTheme.js";
import { axiosGetASThesisBySpecialtyList } from "../../../api/Thesis";
import { Paginacion } from '#Components/Pagination/Pagination.js';

export default function NewTheme (){

    const {cxsid, listSelected,tema, estudiantes} = useLocation().state;
    const [inputName, setInputName] = useState('');
    const [fullThemesList, setFullThemeList] = useState([]);
    const [studentsXtesis, setStudentsXtesis] = useState([]);
    const [themeSelected, setThemeSelected] = useState();
    const JWTtoken = localStorage.getItem('token');


    const navigate = useNavigate();
    const backOldPage = () =>{
        navigate('/teacher/presentation/addPresentation', {
            state:{
                cxsid: cxsid,
                listaTemporal: listSelected,
                tema: tema,
                estudiantes:estudiantes
        }});
    }

    const seleccionarTema = (theme, students) =>{
        navigate('/teacher/presentation/addPresentation', {
            state:{
                cxsid: cxsid,
                listaTemporal: listSelected,
                tema: theme,
                estudiantes: students
        }});
    }

    const getAllThesisTheme = () =>{
        axiosGetASThesisBySpecialtyList(JWTtoken, inputName, 1, 4).then(
            (response) => {
                const list = response.data || [];
                console.log(list)
                setFullThemeList(list);
                //console.log(fullThemesList);
            }
        ).catch(error =>{
            console.error(`Error: ${error}`);
        })
    }

    let inputNameHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        console.log(lowerCase);
        setInputName(lowerCase);
        getAllThesisTheme();
    };

    useEffect(() =>{
        getAllThesisTheme();
    },[inputName]);

    //Paginación
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(4);
    
    const maximo = Math.ceil(fullThemesList.count / porPagina);

    const getStudentsPerTesis = (theme) =>{
        return  fullThemesList.thesisStudent.rows.filter(e => e.THESISId == theme.id);
    }

    //console.log(fullThemesList);

    return(
        <div className="main-new-theme">
            <div className='navBarNewTheme'>
                <CreateNewUserPageStudent/>
            </div>
            <div className="content-new-theme">
                <div className="header-new-theme">
                    <p className="titulo-new-theme">SELECCIONAR TEMA DE TESIS</p>
                    <button className='back-but-theme' onClick={backOldPage}>
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                        className="imagenRetrocesoDetalleA"
                        />
                    </button>
                </div>
                <hr className="separador"></hr>
                <div className="contenedor-temas-tesis">
                    <div className="buscador">
                        <input className ='input-buscador' type="text" placeholder='  Ingrese un nombre...' 
                            onChange={inputNameHandler}>
                        </input>
                        <i class="bi bi-search" />
                    </div>
                    <div className="temas-tesis">
                        {/* <InfoTheme/>
                        <InfoTheme/>
                        <InfoTheme/> */}
                        {fullThemesList.count > 0 ?
                        fullThemesList.thesis.slice(
                            (pagina - 1) * porPagina,
                            (pagina - 1) * porPagina + porPagina
                            ).map((theme, index) =>{ 
                                const listStudents = getStudentsPerTesis(theme);
                                // {console.log(listStudents)}
                                return(
                                    <div key={index} className='espaciado-zona-themes'>
                                        {/* {console.log('hola 1' +JSON.stringify(selectedList, null,2))}
                                        {console.log(JSON.stringify(jury,null,2))}
                                        {console.log(juryIds.includes(jury.id))} */}
                                        <InfoTheme 
                                        theme={theme}
                                        students={listStudents}
                                        seleccionarTema={seleccionarTema}
                                        /> 
                                    </div>
                                )} 
                            ) 
                        :
                        <div className='no-themes'>
                            <p className='no-theme-info'>No existen temas de tesis</p>
                        </div>
                        }
                    </div>
                </div>
                <div className="paginacion-lista-jurados">
                    <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
                </div>
            </div>
        </div>
    );
}