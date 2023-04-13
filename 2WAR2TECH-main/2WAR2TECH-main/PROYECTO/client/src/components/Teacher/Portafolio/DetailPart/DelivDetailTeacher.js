import React, { useState, createContext, useContext, useEffect } from "react";
import "#Styles/Student/DetailPart/DelivDetail.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InitialPartTeacher from "./InitialPartTeacher";
import FinalPartTeacher from "./FinalPartTeacher";
import MiddlePartTeacher from "./MiddlePartTeacher";
import { axiosGetFinalAssignmentDetail } from "#API/FinalAssignment.js";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import Loading from "../../../Loading/Loading";

export default function DelivDetailTeacher() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { index, student, course, num} = useLocation().state;
  var numero_num = num;

  const [finalAssign, setFinalAssign] = useState(null);
  const JWTtoken = sessionStorage.getItem("token");

  const getAllFinalAssign = () => {
    axiosGetFinalAssignmentDetail(JWTtoken, params.id)
      .then((response) => {
        const data = response.data || "";
        console.log(data);
        setFinalAssign(data);
      })
      .catch((error) => {
        console.error(`Error Final Assign Detail: ${error}`);
      });
  };

  useEffect(() => {
    async function fetchData() {
      getAllFinalAssign();
      setLoading(true);
      const a = await setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    fetchData();
  }, [setLoading]);
  

  const retrocesoClicTeacher = () => {
    if (params.option == 2){
      if(numero_num==2){
        navigate(`/teacher/alumno/partial/${numero_num}`,{
          state: {
            student: student,
            course: course
          }
        });
      }else{
        if(numero_num==1){
          navigate(`/jury/alumno/partial/${numero_num}`,{
            state: {
              student: student,
              course: course
            }
          });
        }
      }
    }
    else if (params.option == 1){
      if(numero_num==2){
        navigate(`/teacher/alumno/deliverable/${numero_num}`,{
          state: {
            student: student,
            course: course
          }
        });
      }else{
        if(numero_num==1){
          navigate(`/jury/alumno/deliverable/${numero_num}`,{
            state: {
              student: student,
              course: course
            }
          });
        }
      }
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="todoDeliverable">
          <CreateNewUserPageStudent />
          <div className="contenedorDetalle">
            <div className="contenedorEncabezadoDetalle">
              <div className="contenedorTitutoDetalle">
                <h1 className="titulo">ENTREGABLES </h1>
              </div>
              <button onClick={retrocesoClicTeacher} className="botonRetrocesoDetalle">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>

            <div className="contenedorLineaDetalle">
              <hr color="#CED4DA" className="linea" />
            </div>
            <InitialPartTeacher assign={finalAssign} />
            <MiddlePartTeacher
              valor={params.id}
              opcion={params.option}
              assign={finalAssign}
              index={index}
              student={student}
              num={numero_num}
              course={course}
            />
            <FinalPartTeacher assign={finalAssign} />
          </div>
        </div>
      )}
    </div>
  )
}
