import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {axiosGetDetailSchedule} from "#API/horario";
import Navbar from "../../SidebarMenu/Navbar";
import Form from "react-bootstrap/Form";
import "../../../assets/styles/Coordinador/Mantenimiento/Container.css";

function HorarioDetalle() {
  const { horarioItem } = useLocation().state;
  const [horarioDetail, setHorarioDetail] = useState();
  const JWTtoken = sessionStorage.getItem("token");

  const getHorarioDetail = () => {
    axiosGetDetailSchedule(JWTtoken, horarioItem.id)
      .then((response) => {
        const data = response.data || "";
        console.log(data);
        setHorarioDetail(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getHorarioDetail();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1>DETALLE DE HORARIO</h1>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>
        <div className="coordLeyenda">
          <p>Leyenda: Los campos con (*) son obligatorios</p>
        </div>
      </div>
      <div className="CoordVerDetalle">
        <Form
          id="curso-form"
          className="curso-form"
          // method="post"
        >
          <Form.Group
            className="mb-3 PDdProposedTheme"
            controlId="formTemaPropuesto"
          >
            <Form.Label className="PDtitle">
              <strong>Semestre*:</strong>
            </Form.Label>
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              value={
                horarioDetail.SEMESTER
                  ? horarioDetail.SEMESTER.abbreviation
                    ? horarioDetail.SEMESTER.abbreviation
                    : "No hay semestre"
                  : "No hay horario"
              }
            ></input>
          </Form.Group>

          <Form.Group
            className="mb-3 PDdProposedTheme"
            controlId="formTemaPropuesto"
          >
            <Form.Label>
              <strong>Curso*:</strong>
            </Form.Label>
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              value={
                horarioDetail.COURSE
                  ? horarioDetail.COURSE.name
                    ? horarioDetail.COURSE.name
                    : "No hay curso"
                  : "No hay horario"
              }
            ></input>
          </Form.Group>

          <Form.Group
            className="mb-3 PDdProposedTheme"
            controlId="formTemaPropuesto"
          >
            <Form.Label>
              <strong>Nombre*:</strong>
            </Form.Label>
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              value={
                horarioDetail
                  ? horarioDetail.name
                    ? horarioDetail.name
                    : "No hay nombre"
                  : "No hay horario"
              }
            ></input>
          </Form.Group>

          <Form.Group
            className="mb-3 PDdProposedTheme"
            controlId="formTemaPropuesto"
          >
            <Form.Label>
              <strong>Abreaviacion*:</strong>
            </Form.Label>
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              value={
                horarioDetail
                  ? horarioDetail.abbreviation
                    ? horarioDetail.abbreviation
                    : "No hay abreviacion"
                  : "No hay horario"
              }
            ></input>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default HorarioDetalle;
