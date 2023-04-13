import React from 'react'
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "#Components/Loading/Loading";
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student';
import Partial from './Partial';
import "#Styles/Student/InitialPart/Content.css";

export default function ContentPartialTeacher() {
    const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { student, course } = useLocation().state;
  const params = useParams();


  const hizoClic1 = () => {
    if(params.num == 2){
      navigate(`/teacher/alumno/partial/${params.num}`, {
        state: {
          student: student,
          course: course
        }
      });
    }else{
      if(params.num == 1){
        navigate(`/jury/alumno/partial/${params.num}`, {
          state: {
            student: student,
            course: course
          }
        });
      }
    }
    setIsActive(true);
    setIsActive2(false);
  };
  const hizoClic2 = () => {
    if(params.num == 2){
      navigate(`/teacher/alumno/deliverable/${params.num}`, {
        state: {
          student: student,
          course: course
        }
      });
    }else{
      if(params.num == 1){
        navigate(`/jury/alumno/deliverable/${params.num}`, {
          state: {
            student: student,
            course: course
          }
        });
      }
    }
    setIsActive(false);
    setIsActive2(true);
  };

    const HeaderPortfolioClic = () =>{
      if(params.num == 2){
        navigate(`/teacher/alumno/${params.num}`,{
          state:{
            student: student,
            course: course
          }
        });
      }else{
        if(params.num == 1){
          navigate(`/jury/alumno/${params.num}`,{
            state:{
              student: student,
              course: course
            }
          });
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
  }, [setLoading]);

    return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="todoContent">
          <CreateNewUserPageStudent />
          <div className="contenedorContenidoPartial">
            <div className="contenedorTitulo">
              <h1 className="titulo">ENTREGABLES</h1>
              <div className="space"></div>
            <div className="retro">
              <button className="botonRetrocesoDetalle" onClick={HeaderPortfolioClic}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>
            </div>
            <div className="contenedorOpcionesEntregable">
              <ul>
                <button
                  className="botonesOpcionSeleccionado"
                  onClick={hizoClic1}
                >
                  Entregas Parciales
                </button>
              </ul>
              <ul>
                <button className="botonesOpcion" onClick={hizoClic2}>
                  Entregables
                </button>
              </ul>
            </div>

            <hr color="black" className="lineaContenidPartial" />

            <div className="contenedorCambios">
              <Partial student={student}
              course={course}
              num={params.num}/>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
