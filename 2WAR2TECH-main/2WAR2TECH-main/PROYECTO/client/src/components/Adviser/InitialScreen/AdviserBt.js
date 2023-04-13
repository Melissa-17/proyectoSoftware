import React from "react";
import "#Styles/Adviser/InitialScreen/AdviserBt.css";
import { useNavigate } from "react-router-dom";
import {
  createCompleteName,
  capitalizeTitle,
  capitalize,
} from "#Helpers/stringHelpers";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import { getUserPhoto } from "#Helpers/assignmentHelpers.js";
import { Buffer } from "buffer";

export default function AdviserBt(props) {
  const { student, course } = props;
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

  const AsesorClic = () => {
    if (props.valor != 1) {
      navigate(`/revisor/alumno`, {
        state: {
          student: studInfo.USER,
          course: course,
        },
      });
    }
  };

  const name = studInfo.USER.name ? studInfo.USER.name : "noName";
  const fLname =
    studInfo && studInfo.USER.fLastName ? studInfo.USER.fLastName : " ";
  const mLname =
    studInfo && studInfo.USER.mLastName ? studInfo.USER.mLastName : " ";

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
