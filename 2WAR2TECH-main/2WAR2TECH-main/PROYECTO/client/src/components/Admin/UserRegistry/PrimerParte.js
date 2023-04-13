import React, { useState, useEffect } from "react";
import "../../../assets/styles/Admin/UserRegistry/PrimeraParte.css";
import { axiosGetFaculties } from "../../../api/Faculty";
import { axiosGetDetailFaculty } from "../../../api/Faculty";

export default function PrimerParte(props) {
  const [facultyList, setFacultyList] = useState([]);
  const [facultyDetail, setFacultyDetail] = useState();
  const {
    isLoadingFacultad,
    setIsLoadingFacultad,
    isLoadingEspecialidad,
    setIsLoadingEspecialidad,
    facultadSeleccionado,
    setFacultadSeleccionado,
    setEspecialidadSeleccionado,
    setRolSeleccionado2,
    setRolSeleccionado,
    getUsuarioSearch
  } = props;

  const JWTtoken = sessionStorage.getItem("token");

  const getFacultyList = () => {
    axiosGetFaculties(JWTtoken)
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        setFacultyList(list);
        // console.log(list);
        setIsLoadingFacultad(false);
        setFacultadSeleccionado(list && list[0] ? list[0].id : 0);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getFacultyList();
  }, []);

  const handleChangeFacultad = (e) => {
    var a = document.getElementById("seleccionModalAsignarFacultad").value;
    setFacultadSeleccionado(a);
  };

  const getEspecialidadFacultad = () => {
    axiosGetDetailFaculty(JWTtoken, facultadSeleccionado)
      .then((response) => {
        //  console.log(response.data);
        const data = response.data || "";
        setFacultyDetail(data);
        setEspecialidadSeleccionado(data && data.specialty && data.specialty.rows && 
          data.specialty.rows[0] && data.specialty.rows[0].id ? data.specialty.rows[0].id : 0);
        setIsLoadingEspecialidad(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getEspecialidadFacultad();
  }, [facultadSeleccionado]);

  const handleChangeEspecialidad = (e) => {
    var a = document.getElementById("seleccionModalAsignarEspecialidad").value;
    setEspecialidadSeleccionado(a);
  };

  const handleChangeRol = (e) => {
    var a = document.getElementById("seleccionModalAsignarRol").value;
    setRolSeleccionado(a);
  };

  // console.log(facultyDetail);

  return (
    <div className="contenedorCuadroPrimeraParte">
      <p>
        Es necesario ingresar la facultad, especialidad y el rol para mostrar a
        los usuarios. Luego, presione el botón{" "}
        <i>
          <strong>Buscar</strong>
        </i>
        .
      </p>

      <div className="primeraLineaCuadroPrimeraParte">
        <p className="facultad">Facultad:</p>
        <select
          className="seleccionModalAsignarFacultad"
          id="seleccionModalAsignarFacultad"
          onChange={handleChangeFacultad}
        >
          {facultyList && !isLoadingFacultad
            ? facultyList.map((facultyItem, index) => {
                return (
                  <option value={facultyItem.id}>{(facultyItem.name).toUpperCase()}</option>
                );
              })
            : ""}
        </select>
        <p className="especialidad">Especialidad:</p>
        <select
          className="seleccionModalAsignarEspecialidad"
          id="seleccionModalAsignarEspecialidad"
          onChange={handleChangeEspecialidad}
        >
          {facultyDetail &&
          !isLoadingEspecialidad &&
          facultyDetail.specialty &&
          facultyDetail.specialty.count > 0 ? (
            facultyDetail.specialty.rows.map((especialidadItem, index) => {
              return (
                <option value={especialidadItem.id}>
                  {(especialidadItem.name.toUpperCase())}
                </option>
              );
            })
          ) : (
            <option>Aún no hay especialidades registradas</option>
          )}
        </select>
      </div>

      <div className="segundaLineaPrimeraParte">
        <p className="rol">Rol:</p>
        <select
          className="seleccionModalAsignarRol"
          id="seleccionModalAsignarRol"
          onChange={handleChangeRol}
        >
          <option value={3}>ALUMNO</option>
          <option value={4}>PROFESOR</option>
          <option value={5}>ASESOR</option>
          <option value={6}>JURADO</option>
          <option value={7}>COORDINADOR</option>
        </select>
        <button type="button" onClick={() => getUsuarioSearch(1)}>
          Buscar
        </button>
      </div>
    </div>
  );
}
