import React, { useState,useContext, useEffect } from "react";
import '#Styles/Teacher/AssignmentJury/AddJury.css';
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import { useLocation, useNavigate } from "react-router";
import { axiosSeekerBySpecialtyAndName } from "../../../api/Seeker";
import { UserContext } from "#Context/userContext";
import { GridLoader } from "react-spinners";
import InfoJury from "./InfoJury";
import { axiosAddJuryThesis, axiosDeleteJuryThesis, axiosgetJurorsThesis } from "../../../api/Thesis";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import ModalsAlert from '../../Modals/ModalsAlert';
import ModalCargando from "../../Contenido/Profesor/ModalCargando";
import ModalsMessage from "../../Contenido/Profesor/ModalsMessage";

export default function AddJury (){

  const {courseId, semesterId, thesis} = useLocation().state;
  const navigate = useNavigate();
  const [inputName, setInputName] = useState('');
  const [inputNameUp, setinputNameUp] = useState('');
  const JWTtoken = localStorage.getItem('token');
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem('user'));
  const idEspecialidad = user.SPECIALTies[0]?user.SPECIALTies[0].id:'';
  const [isLoadingUp, setIsLoadingUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fullJuryList, setFullJuryList] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(3);
  const [count, setCount] = useState(0);
  const [selectedList, setSelectedList] = useState([]);
  //const juryIds=selectedList.map((jury) => jury.id);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [jurysRegistered, setJurysRegistered] = useState([]);
  const [juRegId, setJuRegId] = useState([]);

  const maximo = Math.ceil(count / porPagina);
  const thesisID = thesis?thesis.id:'';

  const  [openModalAceptar, setOpenModalAceptar] = useState(false);
  const  [openModalCancelar, setOpenModalCancelar] = useState(false);
  const [loadAdd, setLoadAdd] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const [confirmAdd, setConfirmAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const listaVacia = [];

  const retrocesoClic = () =>{
    navigate('/teacher/assignment',{
      state:{
        courseId:courseId,
        semesterId:semesterId,
        thesis:thesis
      }
    });
  }

  const getAllJuryList = (page) => {
    axiosSeekerBySpecialtyAndName(JWTtoken,'Jurado',idEspecialidad, inputName,page,porPagina).then(
        (response) => {
            const list = response.data.rows.filter((e) => {
              // console.log(e)
              return !juRegId.includes(e.id);
            })
             || [];
            
            setFullJuryList(list);
            setIsLoading(false);
            setCount(response.data.count);
        }
    ).catch(error => {
        console.error(`Error: ${error}`);
    });
  }


  let inputNameHandler = (e) =>{
    var lowerCase = e.target.value.toLowerCase();
    setInputName(lowerCase);
    // getAllJuryList();
  }

  let inputNameUpHandler = (e) =>{
    var lowerCase = e.target.value.toLowerCase();
    setinputNameUp(lowerCase);
    // getAllJuryList();
  }

  const getJuryThesis = () =>{
    setIsLoadingUp(true);
    axiosgetJurorsThesis(JWTtoken,thesisID, inputNameUp).then(
      (response)=>{
        //console.log(response);
        const list  = response.data||[];
        console.log(list)
        setJurysRegistered(list);
        setJuRegId(list.map((e) => e.USERId));
        setIsLoadingUp(false);

      }
    ).catch(
      (error)=>{
        console.error(`Error: ${error}`);
      }
    )
  }

  const postJuryThesis = ()=>{
    setLoadAdd(true);
    const body = {
      'idThesis':thesisID,
      'idJury':selectedIds
    }
    
    axiosAddJuryThesis(JWTtoken,body).then(
      (response)=>{
        // console.log(response);
        setSelectedIds(listaVacia);
        setSelectedIds(listaVacia);
        setLoadAdd(false);
        setConfirmAdd(true);
      }
    ).catch(
      (error)=>{
        console.error(`Error: ${error}`);
      }
    )
  }

  const deleteJuryThesis = () =>{
    setLoadDelete(true);
    console.log(deletedList);
    console.log(deletedIds);
    axiosDeleteJuryThesis(JWTtoken, thesisID, deletedIds).then(
      (response)=>{
        console.log(response);
        setDeletedIds(listaVacia);
        setDeletedList(listaVacia);
        setLoadDelete(false);
        setConfirmDelete(true);
      }
    ).catch(
      (error)=>{
        console.error(`Error: ${error}`);
      }
    )
  }

  useEffect(()=>{
    getJuryThesis();
  }, [inputNameUp, confirmDelete, confirmAdd])
  
  // console.log(juRegId)
  useEffect(()=>{
    getAllJuryList();
  },[inputName, confirmDelete, confirmAdd, juRegId])

  
  

  // const agregar = (selectedJury) =>{
  //   if(selectedJury){
  //     if(!selectedIds.includes(selectedJury.id)){
  //       let newList = [...selectedList, selectedJury];
  //       setSelectedList(newList);
  //       let newIdList = [...selectedIds, selectedJury.id];
  //       setSelectedIds(newIdList);
  //       //const juryIds=selectedList.map((jury) => jury.id);
  //       console.log(selectedIds);
  //     }
  //   }
  // }

  // const eliminar = (selectedJury) =>{
  //   if(selectedJury){
  //     const idJury = selectedJury.id;
  //     setSelectedList((current) => current.filter((jury)=>jury.id!=idJury));
  //     setSelectedIds((current) => current.filter((id)=>id!=idJury));
  //   }
  // }

  const handleSelectJury = (selectedJury) =>{
    if(selectedIds.includes(selectedJury.id)){
      const idJury = selectedJury.id;
      setSelectedList((current) => current.filter((jury)=>jury.id!=idJury));
      setSelectedIds((current) => current.filter((id)=>id!=idJury));
    }
    else{
      let newList = [...selectedList, selectedJury];
      setSelectedList(newList);
      let newIdList = [...selectedIds, selectedJury.id];
      setSelectedIds(newIdList);
      //const juryIds=selectedList.map((jury) => jury.id);
      console.log(selectedIds);
    }
}

  const handleDeleteJury = (selectedJury)=>{
    if(deletedIds.includes(selectedJury.id)){
      const idJury = selectedJury.id;
      setDeletedList((current) => current.filter((jury)=>jury.id!=idJury));
      setDeletedIds((current) => current.filter((id)=>id!=idJury));
    }
    else{
      let newList = [...deletedList, selectedJury];
      setDeletedList(newList);
      let newIdList = [...deletedIds, selectedJury.id];
      setDeletedIds(newIdList);
      //const juryIds=selectedList.map((jury) => jury.id);
      console.log(selectedIds);
      console.log(deletedList)
    }
  }

  // useEffect(()=>{
  //   agregar();
  // },)

  // useEffect(()=>{
  //   eliminar();
  // },)

  //console.log(thesisID);

  return(
    <div className='main-box-addJury'>
      <div className='nav-bar-addJury'>
        <CreateNewUserPageStudent/>
      </div>
      <div className='content-add-jury-assign'>
        <div className='header-add-jury'>
          <h1 className="titulo-add">JURADOS</h1>
          {/* <button className='save-jurys'>Guardar</button>
          <button className='cancel-jurys'>Cancelar</button> */}
          <div className="contenedorBotonRetrocederHeaderJury-as">
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
        </div>
        <hr className="linea-add"></hr>
        <div className='body-add-jury'>
          <p className='subtitulo-jurados'>Lista de jurados</p>
          <div className="full-list-jurys">
            <div className='buscador-jurados'>
              <input className ='input-buscador-jurado' type="text" 
              placeholder='  Ingrese un nombre...' onChange={inputNameUpHandler}>
              </input>
              <i class="bi bi-search" />
            </div>
            <div className='content-plus-button'>
              <div className='content-list-jury'>
              {
                isLoadingUp ?(
                  <GridLoader
                    className="mx-auto"
                    color="#042354"
                    loading={isLoadingUp}
                    size={24}
                  />
                )
                :jurysRegistered.length>0?
                jurysRegistered.map((jury, index)=>{
                  const user = jury?jury.USER:'';
                  return(
                    <div className='one-jury' key={index}>
                      <InfoJury
                      jurado={user}
                      accion={handleDeleteJury}
                      />
                    </div> 
                  ) 
                })
                :
                <div className='no-jurys-list'>
                  No hay jurados añadidos
                </div>
                }
              </div>
              <button className='delete-jurys' onClick={()=>{setOpenModalCancelar(true)}}>Eliminar</button>
            </div>
          </div>
          <hr className='separador-clases' width ='1000px'></hr>
          <p className='subtitulo-jurados'>Seleccionar nuevo jurado</p>
          <div className="new-jury-add">
            <div className='buscador-jurados'>
              <input className ='input-buscador-jurado' type="text" 
              placeholder='  Ingrese un nombre...' onChange={inputNameHandler}>
              </input>
              <i class="bi bi-search" />
            </div>
            <div className='content-plus-button'>
              <div className='content-list-jury'>
                {
                  isLoading?(
                    <GridLoader
                      className="mx-auto"
                      color="#042354"
                      loading={isLoading}
                      size={24}
                    />
                  )
                  :fullJuryList.length>0?
                  fullJuryList.map((jury, index)=>{
                    return(
                      <div className='one-jury' key={index}>
                        <InfoJury
                        jurado={jury}
                        accion={handleSelectJury}
                        esSeleccionado={selectedIds.includes(jury.id)}
                        />
                      </div> 
                    ) 
                  })
                  :
                  <div className='no-jurys-list'>
                    No existen jurados disponibles
                  </div>
                }
              </div>
              <button className='add-jurys' onClick={()=>{setOpenModalAceptar(true)}}>Añadir</button>
            </div>
          </div>
          <div className="nav-paginas-jury">
            <Paginacion
              pagina={pagina}
              setPagina={setPagina}
              maximo={maximo}
              onClickHandler={getAllJuryList}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>
      {openModalCancelar && <ModalsAlert closeAlert = {setOpenModalCancelar}
            alertText='¿Seguro que desea eliminar los jurados seleccionados?'
            action={deleteJuryThesis}
            setConfirmDelete={setConfirmDelete}
            setLoadDelete={setLoadDelete}
            />
            
            }
      {openModalAceptar && <ModalsAlert closeAlert = {setOpenModalAceptar}
            alertText='¿Desea registrar a los jurados seleccionados?'
            action={postJuryThesis}
            setConfirmAdd={setConfirmDelete}
            setLoadAdd={setLoadDelete}
            />}
      {confirmAdd && (
            <ModalsMessage
              closeMessage={setConfirmAdd}
              // closeunmodalmas={setsubioArchivo}
              message="¡Se asignaron los jurados con éxito!"
            />
          )}
          {confirmDelete && (
            <ModalsMessage
              closeMessage={setConfirmDelete}
              // closeunmodalmas={setsubioArchivo}
              message="¡Se retiraron los jurados con éxito!"
            />
          )}
      {loadAdd && <ModalCargando estacargando={loadAdd} 
          message={"Se está asignando los jurados..."}
          />}
      {loadDelete && <ModalCargando estacargando={loadDelete} 
          message={"Se están retirando los jurados del tema..."}
          />}
    </div>
  );
}