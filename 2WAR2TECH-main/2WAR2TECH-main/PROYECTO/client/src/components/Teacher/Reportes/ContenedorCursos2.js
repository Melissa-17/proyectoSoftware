import React from "react";
import { GridLoader } from "react-spinners";
import Card from './CardCurso2';
import '#Styles/Teacher/Reporte/ContenedorCursos2.css';

function ContenedorCursos2(props) {
  const { courseList , semester, course,
    curLoading, semLoading, horLoading } = props;

  return (
    <div className="contenedordeSemestre">
      <div className="contenedorCursos">
        {
          curLoading && semLoading && horLoading?
          <GridLoader
              className="mx-auto"
              color="#042354"
              loading={semLoading}
              size={10}
            />
        : courseList ? (
          courseList.map((courseH, index) => {
            // const valorEstado = getValorEstado(curso.status);
            return (
              <div key={index} className="espaciado">
                <Card 
                realCourse={course}
                course={courseH} 
                semester={semester}

                />
              </div>
            );
          })
        ) : (
          <p>Seleccione un semestre</p>
        )}
      </div>
    </div>
  );
}

export default ContenedorCursos2;
