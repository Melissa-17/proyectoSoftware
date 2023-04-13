import React, { useContext, useEffect, useState } from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import '#Styles/Teacher/Presentation/NewJury.css';
import { useLocation, useNavigate } from "react-router";
import InfoJury from "./InfoJury";
import { axiosSeekerBySpecialtyAndName } from "../../../api/Seeker";
import { Paginacion } from '#Components/Pagination/Pagination.js';
import { UserContext } from "#Context/userContext";

export default function NewJury(){

    const {cxsid, listSelected, tema, estudiantes} = useLocation().state;
    const [inputName, setInputName] = useState('');
    const [fullJuryList, setFullJuryList] = useState([]);
    const navigate = useNavigate();
    const JWTtoken = localStorage.getItem('token');
    const [selectedList, setSelectedList] = useState(listSelected);
    const [listaVacia, setListaVacia] = useState([]);
    const juryIds = selectedList.map((jury) => jury.id);
    let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    const idEspecialidad = user.SPECIALTies[0]?user.SPECIALTies[0].id:'';

    const backNewPres = () =>{
        navigate('/teacher/presentation/addPresentation', {
            state:{
                cxsid: cxsid,
                listaTemporal: listSelected,
                tema: tema,
                estudiantes:estudiantes
        }})
    }

    const confirmarSeleccion = () =>{
        navigate('/teacher/presentation/addPresentation', {
            state:{
                cxsid: cxsid,
                listaTemporal: selectedList,
                tema: tema,
                estudiantes:estudiantes
        }})
    }

    const getAllJuryList = () => {
        axiosSeekerBySpecialtyAndName(JWTtoken,'Jurado',idEspecialidad, inputName).then(
            (response) => {
                const list = response.data || [];
                console.log(list);
                //console.log(response)
                setFullJuryList(list.rows);
            }
        ).catch(error => {
            console.error(`Error: ${error}`);
        });
    }

    useEffect(() =>{
        getAllJuryList();
    },[inputName]);

    let inputNameHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        console.log(lowerCase);
        console.log(user);
        setInputName(lowerCase);
        getAllJuryList();
    };

    //Paginación
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(4);
    
    const maximo = Math.ceil(fullJuryList.length / porPagina);

    const handleSelectJury = (selectedJury) =>{
        if(juryIds.includes(selectedJury.id)){
            removeJury(selectedJury.id);
        }
        else{
            let newList = [...selectedList, selectedJury];
            setSelectedList(newList);
            // console.log(listJurados);
        }
    }

    const removeJury = (idJury) =>{
        setSelectedList((current) => current.filter((jury)=>jury.id!=idJury))
    }

    useEffect(()=>{
        setSelectedList(listSelected);
    },[inputName]);


    return(
        <div className="main-new-jurado">
            <div className='navBarNewTheme'>
                <CreateNewUserPageStudent/>
            </div>
            <div className="content-new-jurado">
                <div className="header-jurado">
                    <p className="titulo-jurado">SELECCIONAR JURADO</p>
                    <button className='back-but-jury' onClick={backNewPres}>
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                        className="imagenRetrocesoDetalleA"
                        />
                    </button>
                </div>
                <hr className="espacio-jurado"></hr>
                <div className="opciones-filtro">
                    <button className="btn-seleccionar" onClick={confirmarSeleccion}>Seleccionar</button>
                    <input className="input-especialidad" placeholder="Escoger especialidad"></input>
                    <div className="buscador-jurado">
                        <input className ='input-buscador-jurado' type="text" 
                        placeholder='  Ingrese un nombre...' onChange={inputNameHandler}>
                        </input>
                        <i class="bi bi-search" />
                    </div>

                </div>
                <div className="seccion-lista">
                    <p className="subtitulo-jurado">Jurados Seleccionados: {selectedList.length}</p>
                    <div className="lista-jurados">
                        {fullJuryList.length > 0 ?
                        fullJuryList.slice(
                            (pagina - 1) * porPagina,
                            (pagina - 1) * porPagina + porPagina
                            ).map((jury, index) =>{ 
                                return(
                                    <div key={index} className='espaciadoZonaJurado'>
                                        {/* {console.log('hola 1' +JSON.stringify(selectedList, null,2))}
                                        {console.log(JSON.stringify(jury,null,2))}
                                        {console.log(juryIds.includes(jury.id))} */}
                                        <InfoJury
                                        esSeleccionado={juryIds.includes(jury.id)}
                                        jury={jury}
                                        handleSelectJury={handleSelectJury}/> 
                                    </div>
                                )} 
                            ) 
                        :
                        <div className='noPresentation'>
                            <p className='no-present-text'>No existen jurados</p>
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