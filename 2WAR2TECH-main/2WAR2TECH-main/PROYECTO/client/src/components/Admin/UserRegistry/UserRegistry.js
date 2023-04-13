import React, { useState,useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Admin/UserRegistry/UserRegistry.css";
import Header from "./Header";
import PrimerParte from "./PrimerParte";
import SegundaParte from "./SegundaParte";
import { axiosSearchByFER } from "../../../api/Seeker";
const JWTtoken = localStorage.getItem("token");

function UserRegistry() {
  const [userList, setUserList] = useState([]);
  const [rolSeleccionado2, setRolSeleccionado2] = useState("ALUMNO");
  const [count, setCount] = useState(0);

  const [facultadSeleccionado, setFacultadSeleccionado] = useState(1);
  const [especialidadSeleccionado, setEspecialidadSeleccionado] = useState(1);
  const [rolSeleccionado, setRolSeleccionado] = useState(3);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = userList && userList.count ? Math.ceil(userList.count / porPagina) : 1;

  const [isLoadingFacultad, setIsLoadingFacultad] = useState(true);
  const [isLoadingEspecialidad, setIsLoadingEspecialidad] = useState(true);
  const [isLoadingUsuario, setIsLoadingUsuario] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false); 
  const [inputName, setInputName] = useState("");

  const getUsuarioSearch = (page) => {
    setIsLoadingUsuario(true);
    if (rolSeleccionado == 3) setRolSeleccionado2("ALUMNO");
    else if (rolSeleccionado == 4) setRolSeleccionado2("PROFESOR");
    else if (rolSeleccionado == 5) setRolSeleccionado2("ASESOR");
    else if (rolSeleccionado == 6) setRolSeleccionado2("JURADO");
    else if (rolSeleccionado == 7) setRolSeleccionado2("COORDINADOR");

    axiosSearchByFER(
      JWTtoken,
      facultadSeleccionado,
      especialidadSeleccionado,
      rolSeleccionado, 
      page,
      porPagina,
      inputName
    )
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        // console.log(list);
        setUserList(list);
        setIsLoadingUsuario(false);
        setCount(list.count);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  
  useEffect(() => {
    getUsuarioSearch(1);
  }, [isLoadingEspecialidad, modalMensaje,inputName]);

  return (
    <div>
      <Navbar />
      <div className="mainUserRegistryContainer">
        <div>
          <Header />
        </div>
        <div className="contenedorPrimeraParteUserRegistry">
          <PrimerParte
            isLoadingFacultad={isLoadingFacultad}
            setIsLoadingFacultad={setIsLoadingFacultad}
            isLoadingEspecialidad={isLoadingEspecialidad}
            setIsLoadingEspecialidad={setIsLoadingEspecialidad}
            facultadSeleccionado={facultadSeleccionado}
            setFacultadSeleccionado={setFacultadSeleccionado}
            setEspecialidadSeleccionado={setEspecialidadSeleccionado}
            setRolSeleccionado2={setRolSeleccionado2}
            setRolSeleccionado={setRolSeleccionado}
            getUsuarioSearch={getUsuarioSearch}
          />
        </div>
        <div className="contenedorSegundaParteUserRegistry">
          <SegundaParte
            userList={userList}
            rolSeleccionado2={rolSeleccionado2}
            isLoading={isLoadingUsuario}
            setIsLoadingUsuario={setIsLoadingUsuario}
            pagina={pagina}
            porPagina={porPagina}
            maximo={maximo}
            setPagina={setPagina}
            getUsuarioSearch={getUsuarioSearch}
            modalMensaje={modalMensaje}
            setModalMensaje={setModalMensaje}
            count={count}
            setInputName={setInputName} 
          />
        </div>
      </div>
    </div>
  );
}

export default UserRegistry;
