import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../SidebarMenu/Navbar";
import Form from "react-bootstrap/Form";
import { axiosEditCourse } from "../../../api/Cursos";
import { axiosGetDetailCourse } from "../../../api/Cursos";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalValidacion from "../../Admin/Semester/ModalValidacion";
import ModalConfirmated from "./ModalConfirmated";

function CursoEditar() {
  const { cursoItem } = useLocation().state;
  const [cursoDetail, setCursoDetail] = useState();

  const navigate = useNavigate();
  const [modalMensaje, setModalMensaje] = useState(false);
  const JWTtoken = sessionStorage.getItem("token");

  const [openModalAceptar, setOpenModalAceptar] = useState(false);
  const [openModalCancelar, setOpenModalCancelar] = useState(false);

  const retrocesoClic = () => {
    navigate("/Coordinador/curso");
  };

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

    // console.log(1);

    if (name == "") setValidacionNombre(true);
    else if (code == "") setValidacionCodigo(true);
    else if (credits == "") setValidacionCredito(true);
    else if (credits < 0) setValidacionCreditoNegativo(true);
    else {
      axiosEditCourse(JWTtoken, cursoItem.id, body)
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

  const getCursoDetail = () => {
    axiosGetDetailCourse(JWTtoken, cursoItem.id)
      .then((response) => {
        const data = response.data || "";
        console.log(data);
        setCursoDetail(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCursoDetail();
  }, []);

  return cursoDetail ? (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <form
          id="formCursoEdi"
          className="formCursoEdi"
          onSubmit={handleCursoSubmit}
        >
          <div className="CoordHeader">
            <div className="CoordTitulo">
              <h1
              style={{marginRight:"510px"}}
              >EDICIÓN DE CURSO</h1>
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
            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDtitle">
                <strong>Nombre*:</strong>
              </Form.Label>

              <Form.Control
                className="PDDProposedThemeControl nombre"
                type="text"
                defaultValue={
                  cursoDetail
                    ? cursoDetail.name
                      ? cursoDetail.name
                      : "No hay nombre"
                    : "No hay curso"
                }
              />
            </Form.Group>

            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label>
                <strong>Código*:</strong>
              </Form.Label>

              <Form.Control
                className="PDDProposedThemeControl codigo"
                type="text"
                defaultValue={
                  cursoDetail
                    ? cursoDetail.code
                      ? cursoDetail.code
                      : "No hay codigo"
                    : "No hay curso"
                }
              />
            </Form.Group>

            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label>
                <strong>Créditos*:</strong>
              </Form.Label>

              <Form.Control
                className="PDDProposedThemeControl creditos"
                type="number"
                step=".01"
                defaultValue={
                  cursoDetail
                    ? cursoDetail.credits
                      ? cursoDetail.credits
                      : "No hay creditaje"
                    : "No hay curso"
                }
              />
            </Form.Group>
          </div>
          <div className="RCbotoneria"
          style={{marginLeft:"-300px"}}
          >
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
              type="submit"
              form="formCursoEdi"
            >
              Guardar
            </button>
          </div>
        </form>
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
          message="Se editó correctamente"
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
  ) : null;
}
export default CursoEditar;
