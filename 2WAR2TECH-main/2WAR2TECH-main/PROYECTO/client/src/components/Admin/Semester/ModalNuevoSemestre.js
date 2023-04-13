import React, { useState, useEffect } from "react";
import "../Specialty/ModalNuevaFacultad.css";
import Form from "react-bootstrap/Form";
import { axiosAddSemester } from "../../../api/Semestres";
import ModalValidacion from "./ModalValidacion";
import { axiosGetFaculties } from "../../../api/Faculty";
import { axiosGetDetailFaculty } from "../../../api/Faculty";

export default function ModalNuevoSemestre({ closeMessage, modalMessage }) {
  const JWTtoken = sessionStorage.getItem("token");
  const [modalValidacion, setModalValidacion] = useState(false);
  const [modalValidacionIncompleto, setModalValidacionIncompleto] =
    useState(false);
  const [modalValidacionAnho, setModalValidacionAnho] = useState(false);

  const [facultadList, setFacultyList] = useState([]);
  const [isLoadingFacultad, setIsLoadingFacultad] = useState(true);
  const [facultadSeleccionado, setFacultadSeleccionado] = useState("");
  const [facultyDetail, setFacultyDetail] = useState("");
  const [isLoadingEspecialidad, setIsLoadingEspecialidad] = useState(true);
  const [especialidadSeleccionado, setEspecialidadSeleccionado] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentAnho = document.querySelector(".formAnho").value;
    const commentCiclo = document.querySelector(".formCiclo").value;

    const comment = commentAnho + "-" + commentCiclo;

    // console.log(comment);
    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      abbreviation: comment,
    };
    // console.log(commentNombre);
    // llamada al servicio

    if (commentCiclo == "" || commentAnho == "") {
      setModalValidacionIncompleto(true);
    } else {
      if (commentAnho < 1917 || commentAnho > 2060)
        setModalValidacionAnho(true);
      else if (commentCiclo > 2 || commentCiclo < 0) setModalValidacion(true);
      else {
        // console.log(especialidadSeleccionado);
        axiosAddSemester(JWTtoken, especialidadSeleccionado, commentFormData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        modalMessage(true);
      }
    }
  };

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

  const handleChange = (e) => {
    var a = document.getElementById("selectFacultadNuevoSemestre").value;
    setFacultadSeleccionado(a);
  };

  const getEspecialidadFacultad = () => {
    axiosGetDetailFaculty(JWTtoken, facultadSeleccionado)
      .then((response) => {
        console.log(response.data);
        const data = response.data || "";
        setFacultyDetail(data);
        setEspecialidadSeleccionado(
          data &&
            data.specialty &&
            data.specialty.rows &&
            data.specialty.rows[0] &&
            data.specialty.rows[0].id
            ? data.specialty.rows[0].id
            : 0
        );
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

  return (
    <form
      id="registroNuevoSemestre"
      className="registroNuevoSemestre"
      method="post"
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="modalGlobalNuevoSemestre">
        <div className="modalCuerpoNuevoSemestre">
          <div className="headerNuevoSemestre">
            <p className="tituloHeaderNuevoSemestre2">AGREGAR SEMESTRE</p>
            <button
              className="salirModalNuevoSemestre2"
              type="button"
              onClick={() => {
                closeMessage(false);
              }}
            >
              <i class="bi bi-x-lg" />
            </button>
          </div>

          <hr color="black" className="lineaHorizontalNuevaFacultad" />

          <div className="contenedorLeyendaModalNuevoSemestre">
            <p className="leyendaModalNuevoSemestre">
              Leyenda: Los campos con * son obligatorios
            </p>
          </div>

          {/* <div className="contenedorComboBoxModalNuevoSemestre">
            <p>Seleccione una facultad:</p>
            <select
              className="selectFacultadNuevoSemestre"
              id="selectFacultadNuevoSemestre"
              onChange={handleChange}
            >
              {facultadList && !isLoadingFacultad && facultadList.length > 0
                ? facultadList.map((facultyItem, index) => {
                    return (
                      <option value={facultyItem.id}>
                        {facultyItem.name.toUpperCase()}
                      </option>
                    );
                  })
                : ""}
            </select>
          </div>

          <div
            className="contenedorComboBoxModalNuevoSemestre"
            style={{ marginTop: "10px" }}
          >
            <p>Seleccione una especialidad:</p>
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
                      {especialidadItem.name.toUpperCase()}
                    </option>
                  );
                })
              ) : (
                <option>Aún no hay especialidades registradas</option>
              )}
            </select>
          </div> */}

          <div className="contenedorAbreviacionSemestre">
            <p className="abreviacion">Abreviación*</p>
            {/* <input
              type="text"
              className="abreviacionSemestreRegistro"
              placeholder="Ingrese una abreviación"
            /> */}
            <div className="abreviacionAnhoCiclo">
              <Form.Control
                className="formAnho"
                type="number"
                placeholder="Ingrese el año"
              />
              <p>-</p>
              <Form.Control
                className="formCiclo"
                type="number"
                placeholder="Ingrese el ciclo"
              />
            </div>
          </div>

          <div className="botoneriaNuevaFacultad">
            <button
              className="cancelar"
              type="button"
              onClick={() => {
                closeMessage(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="guardar"
              type="submit"
              form="registroNuevoSemestre"
            >
              Guardar
            </button>
          </div>

          <div>
            {modalValidacion && (
              <ModalValidacion
                closeMessage={setModalValidacion}
                message="El ciclo debe ser mayor o igual a 0 y menor o igual a 2."
              />
            )}
            {modalValidacionIncompleto && (
              <ModalValidacion
                closeMessage={setModalValidacionIncompleto}
                message="Debe completar tanto el año como el ciclo."
              />
            )}
            {modalValidacionAnho && (
              <ModalValidacion
                closeMessage={setModalValidacionAnho}
                message="El año debe ser superior a 1917 y inferior a 2060."
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
