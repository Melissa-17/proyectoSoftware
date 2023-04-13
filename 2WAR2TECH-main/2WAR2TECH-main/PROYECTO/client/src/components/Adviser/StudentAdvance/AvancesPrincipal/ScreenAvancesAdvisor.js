import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import AvancesPrincipal from "./Contenido";
import "#Styles/Alumno/AvancesPrincipal/ScreenAvances.css";
import CreateNewUserPageStudent from "#Pages/CreateNewUserPage/Student";
import Loading from "../../../Loading/Loading";
export default function ScreenAvancesAdvisor() {
  const [loading, setLoading] = useState(false);
  const { index, student, course } = useLocation().state;

  const navigate = useNavigate();

  const HeaderPortfolioClic = () => {
    navigate("/revisor/alumno", {
      state: {
        student: student,
        course: course,
      },
    });
  };

  // useEffect(() => {
  //   async function fetchData() {
  //       setLoading(true);
  //       const a = await setTimeout(() => {
  //           setLoading(false);
  //       }, 500);

  //   }

  //   fetchData();
  // }, [setLoading])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="contenedorPantallaTodo">
          <CreateNewUserPageStudent />
          <div className="contenedorTodo">
            <div className="contenedorContenido">
              <div className="header">
                <div className="contenedorTitulo">
                  <h1 className="titulo"
                  style={{marginRight:"820px"}}
                  >AVANCES</h1>
                  <div className="contenedorBotonVisualPart">
                    <button
                      onClick={HeaderPortfolioClic}
                      className="botonRetrocesoDetalle"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                        className="imagenRetrocesoDetalle"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="contenedorOpcionesAvance">
                <AvancesPrincipal
                  student={student}
                  course={course}
                  index={index}
                />
              </div>
              {/* <div className='contenedorCambios'>
                <Routes>
                    <Route path='partial' element={<Partial />} />
                    <Route path='deliverable/*' element={<Deliverable />} />
                </Routes>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
