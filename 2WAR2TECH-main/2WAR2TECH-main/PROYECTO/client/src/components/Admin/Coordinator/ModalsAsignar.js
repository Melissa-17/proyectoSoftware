import React, { useEffect, useState } from "react";
import "../../../assets/styles/Admin/Coordinator/ModalsAsignar.css";
import { axiosGetFaculties } from "../../../api/Faculty";
import { axiosGetDetailFaculty } from "../../../api/Faculty";
import { axiosPostCoordinatorToSpecialty } from "../../../api/Specialty";

export default function ModalsAsignar({
  closeMessage,
  modalMessage,
  coordinadorItem,
}) {
  const JWTtoken = sessionStorage.getItem("token");
  const [facultyList, setFacultyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [facultadSeleccionado, setFacultadSeleccionado] = useState(1);
  const [facultyDetail, setFacultyDetail] = useState();
  const [especialidadSeleccionado, setEspecialidadSeleccionado] = useState(1);

  const getFacultyList = () => {
    axiosGetFaculties(JWTtoken)
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        setFacultyList(list);
        setIsLoading(false);
        setFacultadSeleccionado(list && list[0] ? list[0].id : facultadSeleccionado) 
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
        // console.log(response.data);
        const data = response.data || "";
        console.log(data)
        setFacultyDetail(data);
        setEspecialidadSeleccionado(data.specialty.rows[0].id);
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

  console.log(facultyDetail);

  return (
    // <form
    //   id="registroNuevaFacultad"
    //   className="registroNuevaFacultad"
    //   method="post"
    //   onSubmit={(e) => handleCommentSubmit(e)}
    // >
    <div className="modalMessageBackgroundMMM">
      <div className="modalAsignarContainer">
        <div className="headerAsignarContainer">
          <div className="primeraFilaHeaderAsignarContainer">
            <p>Asignar Especialidad</p>
            <button
              className="salirModalNuevaFacultad"
              //   type="button"
              onClick={() => {
                closeMessage(false);
              }}
            >
              <i class="bi bi-x-lg" />
            </button>
          </div>
          <hr color="black" className="lineaHorizontalNuevaFacultad" />
        </div>
        <div className="contenedorFacultadEspecialidad">
          <p>Facultad:</p>
          <select
            className="seleccionModalAsignarFacultad"
            id="seleccionModalAsignarFacultad"
            onChange={handleChangeFacultad}
          >
            {facultyList && !isLoading
              ? facultyList.map((facultyItem, index) => {
                  return (
                    <option value={facultyItem.id}>{(facultyItem.name).toUpperCase()}</option>
                  );
                })
              : null}
          </select>
        </div>
        <div className="contenedorEspecialidadEspecialidad">
          <p>Especialidad:</p>
          <select
            className="seleccionModalAsignarEspecialidad"
            id="seleccionModalAsignarEspecialidad"
            onChange={handleChangeEspecialidad}
          >
            {facultyDetail &&
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
              <option>No se presenta especialidades</option>
            )}
          </select>
        </div>
        <div className="botoneriaAsignarEspecialidad">
          <button
            className="cancelar"
            onClick={() => {
              closeMessage(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="guardar"
            onClick={() => {
              const commentFormData = {
                idU: coordinadorItem.id,
                idS: especialidadSeleccionado,
              };
              // console.log(especialidadSeleccionado);
              axiosPostCoordinatorToSpecialty(JWTtoken, commentFormData)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.error(err);
                });
              closeMessage(false);
              modalMessage ? modalMessage(true) : (() => {})();

              // console.log(especialidadSeleccionado);
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
    // </form>
  );
}
