import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation, useParams } from "react-router-dom";
import Contenido from "./Contenido";
import "#Styles/Alumno/AvancesPrincipal/ScreenAvances.css";
import CreateNewUserPageStudent from "#Pages/CreateNewUserPage/Student";
import Loading from "../../../../Loading/Loading";

export default function ScreenAvancesTeacher() {
  const [loading, setLoading] = useState(false);
  const { index, student, course } = useLocation().state;
  const params = useParams();

  const navigate = useNavigate();

    const HeaderPortfolioClic = () =>{
      if(params.num==2){
        navigate(`/teacher/alumno/${params.num}`,{
          state:{
            student : student,
            course: course
          }
        })
      }else{
        if(params.num==1){
          navigate(`/jury/alumno/${params.num}`,{
            state:{
              student : student,
              course: course
            }
          })
        }
      }
      
    }

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        const a = await setTimeout(() => {
            setLoading(false);
        }, 500);
        
    }
    
    fetchData();
  }, [setLoading])
  return (
    <div>
      {loading?
      <Loading/>
      :
      <div className="contenedorPantallaTodo">
      <CreateNewUserPageStudent />
      <div className="contenedorTodo">
        <div className="contenedorContenido">
          <div className="header">
            <div className="contenedorTitulo">
              <h1 className="titulo">AVANCES</h1>
            </div>
            <div className="space"></div>
            <div className="button-back">
              <button className="botonRetrocesoDetalle" onClick={HeaderPortfolioClic}>
                  <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>  
          </div>
          <div className="contenedorOpcionesAvance">
            <Contenido 
            student={student}
            course={course}
            index={index}
            num={params.num}/>
          </div>
        </div>
      </div>
    </div>
      }
    </div>
  )
}
