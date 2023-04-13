import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StaffCard from "./StaffCard";
import { axiosSeekerBySpecialtyAndRole } from "#API/Seeker.js";
import "#Styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";

function OptionComite() {
  const navigate = useNavigate();

  const cambioProfesor = () => {
    navigate("/template/optionTechar");
  };
  const cambioJurado = () => {
    navigate("/template/optionJuryMan");
  };
  const mantienePantalla = () => {
    navigate("/template/optionComite");
  };

  const [comiteList, setComiteList] = useState([]);
  const [tipo, setTipo] = useState("Comite");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const JWTtoken = sessionStorage.getItem("token");

  const getAllComiteList = (page) => {
    axiosSeekerBySpecialtyAndRole(JWTtoken, tipo, inputText, page, porPagina)
      .then((response) => {
        const list = response.data.rows || [];
        setComiteList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllComiteList();
  }, [inputText]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  return (
    <div>
      <div className="tituloOpcionesPrincipalPartTeacher">
        <button className="tituloOpcionesNormal" onClick={cambioProfesor}>
          Profesores
        </button>
        <button className="tituloOpcionesNormal" onClick={cambioJurado}>
          Jurados
        </button>
        <button
          className="tituloOpcionesSeleccionado"
          onClick={mantienePantalla}
        >
          Comite
        </button>
      </div>
      <div>
        <hr color="black" className="lineaOptionPrincipalPart" />
      </div>
      <div className="cambioOpcionesPrincipalPartTeacher">
      {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) :(comiteList
        // .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
        .map((teacher, index) => {
          return (
            <div key={index} className="espacioTeacher">
              <StaffCard profesor={teacher} />
            </div>
          );
        }))}
      </div>
      <div className="contenedorBotoneriaEntregable">
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} onClickHandler={getAllComiteList}
          setIsLoading={setIsLoading}/>
      </div>
    </div>
  );
}

export default OptionComite;
