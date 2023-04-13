import React, { useContext, useEffect } from "react";
import Navbar from "../../../SidebarMenu/Navbar";
import "#Styles/Alumno/ChooseCourse/Selection.css";
import { useLocation, useNavigate } from "react-router";
import { axiosGetAsesorByStudent } from "../../../../api/User";
import { UserContext } from "#Context/userContext";

function Selection() {
  const { cxsid, courseName } = useLocation().state;
  const JWTtoken = sessionStorage.getItem("token");
  // console.log(courseName);

  const navigate = useNavigate();

  const goToEntregable = () => {
    navigate("/entregable/partial", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      },
    });
  };

  const goToAvance = () => {
    navigate("/avances", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      },
    });
  };

  const goToExpo = () => {
    navigate("/presentation", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      },
    });
  };

  const retrocesoClic = () => {
    navigate("/mycourses");
  };
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem('user'));

  const getAsesorByStudent = () => {
    let asesorT;
    let userT;
    axiosGetAsesorByStudent(JWTtoken, user.id, cxsid) 
            .then((res) => {
              console.log(res.data);
              asesorT = res.data;
              // userT = { ...user, asesor: asesorT };
              localStorage.setItem("asesor", JSON.stringify(asesorT));
              // setUser(userT);
              // console.log(userT);
            })
            .catch((err) => {
              console.error(`Error axiosGetAsesorByStudent: ${err}`);
              // localStorage.setItem("user", JSON.stringify(user));
              // setUser(userT);
            });
  }

  useEffect(() => {
    getAsesorByStudent();
  }, [])
  

  return (
    <div>
      <Navbar />
      <div className="selectionContainer">
        <div className="coursesHeader">
          <div className="contenedorHeaderSelection">
            <p className="title">MIS CURSOS</p>
            <div className="contenedorBotonVisualPart"
            style={{marginTop:"10px"}}
            >
              <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>
          </div>
          <div className="contenedorLineaDetalle">
          <hr color="black" className="lineaContenidoAvance" style={{width:"1210px", marginBottom:"20px",marginTop:"10px"}}/>
          </div>
        </div>
        <p className="courseName">{courseName}</p>
        <div className="selectionContent">
          <button onClick={goToExpo}>
            <div className="selectionAvances">
              <div className="blue"></div>
              <div className="selectionAvancesContent">
                <p className="titleAvance">Presentación oral</p>
                <p className="descripAvance">
                  Aquí encontrarás las presentaciones orales que te asignarán en
                  el semestre.
                </p>
              </div>
            </div>
          </button>
          <button onClick={goToEntregable}>
            <div className="selectionEntregables">
              <div className="blue"></div>
              <div className="selectionEntregablesContent">
                <p className="titleEntregable">Entregables</p>
                <p className="descripEntregable">
                  Aquí se encuentran los entregables parciales y finales que
                  deberás presentar durante el curso.
                </p>
              </div>
            </div>
          </button>
          <button onClick={goToAvance}>
            <div className="selectionAvances">
              <div className="blue"></div>
              <div className="selectionAvancesContent">
                <p className="titleAvance">Avances</p>
                <p className="descripAvance">
                  Aquí se encuentran los avances que deberás entregar durante el
                  semestre.
                </p>
              </div>
            </div>
          </button>
        </div>
        <div className="selectionFooter"></div>
      </div>
    </div>
  );
}

export default Selection;
