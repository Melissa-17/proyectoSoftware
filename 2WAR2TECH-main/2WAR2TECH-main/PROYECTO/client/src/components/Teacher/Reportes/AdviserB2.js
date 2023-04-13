import React from 'react'
import '#Styles/Adviser/InitialScreen/AdviserBt.css'
import { useNavigate } from 'react-router-dom'
import { createCompleteName, capitalizeTitle, capitalize } from '#Helpers/stringHelpers';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import { getUserPhoto } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer";

export default function AdviserBt(props) {
  const { student, course, semester } = props;
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem("user"));
  // console.log(student)
  const getStudInfo = () => {
    // console.log(student);
    return student;
    // if (
    //   user.ROLEs &&
    //   (user.ROLEs[0].description == "Jurado")
    // ) {
    //   return student.alumnos[0];
    // } else {
    //   return student;
    // }
    // return student;
  };

  const studInfo = student ? getStudInfo() : null;
  // console.log(studInfo);

  const devuelveFecha = () => {
    if (props.valor == 1) {
      return <p>Entregado</p>;
    } else {
      return <p>Próxima entrega: Entregable Parcial 1 para el {props.fecha}</p>;
    }
  };

  const navigate = useNavigate();

    const AsesorClic = () =>{
      if(props.valor != 1){
        navigate(`/teacher/alumno/reporte/detail`, {
          state: {
            "student": studInfo.USER,
            "course": course,
            "semester": semester
          }
        });
      }
    }

  const name = studInfo.USER.name ? studInfo.USER.name : "noName";
  const fLname =
    studInfo && studInfo.USER.fLastName ? studInfo.USER.fLastName : "noLname";
  const mLname =
    studInfo && studInfo.USER.mLastName ? studInfo.USER.mLastName : "noLname";
  // const name = props.option == 2? studInfo && studInfo.USER && studInfo.USER.name ? studInfo.USER.name : "noName":
  //   studInfo && studInfo.alumnos[0].USER && studInfo.alumnos[0].USER && studInfo.alumnos[0].USER.name ? studInfo.alumnos[0].USER.name : "noName";
  // const fLname = props.option == 2? studInfo && studInfo.USER && studInfo.USER.fLastName ? studInfo.USER.fLastName : "noLname":
  //   studInfo && studInfo.alumnos[0].USER && studInfo.alumnos[0].USER && studInfo.alumnos[0].USER.fLastName ? studInfo.alumnos[0].USER.fLastName : "noLname";
  // const mLname = props.option == 2? studInfo && studInfo.USER && studInfo.USER.mLastName ? studInfo.USER.mLastName : "noLname":
  //   studInfo && studInfo.alumnos[0].USER && studInfo.alumnos[0].USER && studInfo.alumnos[0].USER.mLastName ? studInfo.alumnos[0].USER.mLastName : "noLname";

  return studInfo ? (
    <button className="contenidoBotonAdviser" onClick={AsesorClic}>
      <div className="contenidoTituloBotonAdviser">
        <div className="sesionEscrita">
          <p>{createCompleteName(name, fLname, mLname)}</p>
          <p>
            {capitalizeTitle(
              studInfo.USER && studInfo.USER.SPECIALTies[0]
                ? studInfo.USER.SPECIALTies[0].name 
                : "No hay especialidad") }
          </p>
          {/* {console.log(studInfo)} */}
        </div>
        <div className="imagenAdviser">
          {/* {console.log(studInfo)} */}
          {studInfo && studInfo.USER && studInfo.USER.photo ? (
            <img
              className="imgAdviser"
              src={`data:image/png;base64,${Buffer.from(
                studInfo.USER.photo.data
              ).toString("base64")}`}
              alt="profile-pic"
            />
          ) : (
            <img
              className="imgAdviser"
              // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              src="https://wallpapercave.com/uwp/uwp2417748.png"
              alt="foto asesor"
            />
          )}
        </div>
      </div>
      <div className={`contenido${props.valor == 1 ? "Abajo" : "Abajo2"}`}>
        <div className="tituloPrincipal">
          <h1>{capitalize(student.THESIS.title)}</h1>
        </div>
        <div className="estadoAdviser">{/* TODO: Proxima entrega */}</div>
      </div>
    </button>
  ) : null;
}
