import React, { useEffect, useState } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "../../../assets/styles/Coordinador/Mantenimiento/Container.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { axiosAddCourse } from "../../../api/Cursos";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalConfirmated from "./ModalConfirmated";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";

function RegistroCurso() {
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/Coordinador/curso");
  };

  const JWTtoken = sessionStorage.getItem("token");
  const [openModalAceptar, setOpenModalAceptar] = useState(false);
  const [openModalCancelar, setOpenModalCancelar] = useState(false);


  const [validacionNombre, setValidacionNombre] = useState(false);
  const [validacionCodigo, setValidacionCodigo] = useState(false);
  const [validacionCredito, setValidacionCredito] = useState(false);
  const [validacionCreditoNegativo, setValidacionCreditoNegativo] =
    useState(false);

  const handleCursoSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector(".nombre").value;
    const code = document.querySelector(".codigo").value;
    const credits = document.querySelector(".creditos").value;

    const body = {
      name: name,
      code: code,
      credits: credits,
    };

    if (name == "") setValidacionNombre(true);
    else if (code == "") setValidacionCodigo(true);
    else if (credits == "") setValidacionCredito(true);
    else if (credits < 0) setValidacionCreditoNegativo(true);
    else {
      axiosAddCourse(JWTtoken, body)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      setOpenModalAceptar(true);
    }
    //regreso a la pantalla principal
    // navigate("/Coordinador/curso");
  };

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1
            style={{marginRight:"480px"}}
            >REGISTRO DE CURSO</h1>
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
          <hr color="black" className="lineaContenidoApproval" />
        </div>
        <div className="coordLeyenda">
          <p>Leyenda: Los campos con (*) son obligatorios</p>
        </div>
        <div className="CoordIngresoData">
          <form
            id="formRegistroCurso"
            className="formRegistroCurso"
            onSubmit={handleCursoSubmit}
          >
            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDtitle">
                <strong>Nombre*:</strong>
              </Form.Label>
              <Form.Control
                className="PDDProposedThemeControl nombre"
                placeholder="Ingrese el nombre del curso"
                id="nombre"
                name="nombre"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDCodigo">
                <strong>Código*:</strong>
              </Form.Label>
              <Form.Control
                className="PDDProposedThemeControl codigo"
                placeholder="Ingrese el código del curso"
                id="codigo"
                name="codigo"
              />
            </Form.Group>

            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDCreditos">
                <strong>Créditos*:</strong>
              </Form.Label>
              <Form.Control
                className="PDDProposedThemeControl creditos"
                placeholder="Ingrese el creditaje del curso"
                id="creditos"
                name="creditos"
                type="number"
                step=".01"
              />
            </Form.Group>
            <div className="RCbotoneria" style={{ marginLeft: "-300px" }}>
              <button
                className="RCCancelar"
                type="button"
                onClick={() => {
                  setOpenModalCancelar(true);
                }}
              >
                Cancelar
              </button>
              <button
                className="RCGuardar"
                variant="primary"
                type="submit"
                form="formRegistroCurso"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
      {openModalCancelar && (
        <ModalsAlert
          closeAlert={setOpenModalCancelar}
          alertText="¿Seguro que desea salir sin guardar los cambios?"
          action={retrocesoClic}
        />
      )}
      {openModalAceptar && (
        <ModalConfirmated
          closeMessage={setOpenModalAceptar}
          message="Se guardó correctamente"
          option={1}
          // action={retrocesoClic}
        />
      )}
      {validacionNombre && (
        <ModalValidacion
          closeMessage={setValidacionNombre}
          message="Debe completar el nombre del curso."
        />
      )}
      {validacionCodigo && (
        <ModalValidacion
          closeMessage={setValidacionCodigo}
          message="Debe completar el código del curso."
        />
      )}
      {validacionCredito && (
        <ModalValidacion
          closeMessage={setValidacionCredito}
          message="Debe completar el crédito del curso."
        />
      )}
      {validacionCreditoNegativo && (
        <ModalValidacion
          closeMessage={setValidacionCreditoNegativo}
          message="El crédito debe ser positivo del curso."
        />
      )}
    </div>
  );
}

export default RegistroCurso;
