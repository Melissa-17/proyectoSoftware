import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StaffCard from "./StaffCard";
import {
  axiosSeekerBySpecialtyAndRole,
  axiosSeekerBySpecialtyAndName,
} from "#API/Seeker.js";
import "#Styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";

function OptionTeacher() {
  const navigate = useNavigate();

  const mantienePantalla = () => {
    navigate("/template/optionTechar");
  };
  const cambioJurado = () => {
    navigate("/template/optionJuryMan");
  };

  const [teacherList, setTeacherList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const JWTtoken = sessionStorage.getItem("token");
  const [inputText, setInputText] = useState("");
  const [tipo, setTipo] = useState("Profesor");
  const [idEspecialidad, setEspecialidad] = useState(13);

  const getAllTeacherList = (page) => {
    // axiosSeekerBySpecialtyAndRole(JWTtoken, tipo, texto)
    axiosSeekerBySpecialtyAndName(
      JWTtoken,
      tipo,
      idEspecialidad,
      inputText,
      page,
      porPagina
    )
      .then((response) => {
        console.log(response.data);
        const list = response.data.rows || [];
        setTeacherList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllTeacherList();
  }, [inputText]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  return (
    <div>
      <div className="tituloOpcionesPrincipalPartTeacher">
        <button
          className="tituloOpcionesSeleccionado"
          onClick={mantienePantalla}
        >
          Profesores
        </button>
        <button className="tituloOpcionesNormal" onClick={cambioJurado}>
          Jurados
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
        ) : (
          teacherList
            // .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
            .map((teacher, index) => {
              return (
                <div key={index} className="espacioTeacher">
                  <StaffCard profesor={teacher} />
                </div>
              );
            })
        )}
      </div>
      <div className="contenedorBotoneriaEntregable">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getAllTeacherList}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}

export default OptionTeacher;
