import React, { useEffect, useState } from "react";
import "#Styles/Teacher/Presentation/MainCards.css";
import Card from "./Card";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { axiosGetThesisGroupByAsesor } from "../../../api/User";
import { useLocation } from "react-router";

export default function MainCards(props){

  const {courseId, semesterId} = props;

  //Paginacion
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);
  const [count, setCount] = useState(0);
  const maximo = Math.ceil(count / porPagina);

  const [isLoading, setIsLoading] = useState(true);
  const [inputName, setInputName] = useState('');
  const [thesisList, setThesisList] = useState([]);

  const JWToken = localStorage.getItem('token');

  let inputNameHandler = (e)=>{
    var lowerCase = e.target.value.toLowerCase();
    setInputName(lowerCase);
    getThesisList();
  }

  const getThesisList = (page) =>{
    const body = {
      'ciclo':semesterId,
      'curso':courseId
    }
    setIsLoading(true);
    axiosGetThesisGroupByAsesor(JWToken,body,page,porPagina,inputName).then(
      (response)=>{
        console.log(response);
        const list = response.data.rows||[];
        setThesisList(list);

        setCount(response.data.count);
        setIsLoading(false);
      }
    ).catch(
      (error)=>{
        console.log(`Error: ${error}`);
      }
    )
  }

  useEffect(()=>{
    getThesisList();
  },[inputName])

  return(
    <div className='main-box-cards'>
      <div className='buscador-tema-tesis'>
        <input
          className="buscador-tema-tesis"
          type="text"
          placeholder="  Ingrese un nombre..."
          onChange={inputNameHandler}/>
        <i class="bi bi-search" />
      </div>
      <div className='contenido-cards'>
        {
          isLoading?
          (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
            />
          ): thesisList.length>0?
            thesisList.map((thesis, index)=>{
              return(
                <Card
                thesis={thesis}
                semesterId={semesterId}
                courseId={courseId}/>
              )
            })
          :
          <div className='no-tesis-list'>
            No existen temas de tesis
          </div>
        }
      </div>
      <div className="nav-paginas-tesis">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getThesisList}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}