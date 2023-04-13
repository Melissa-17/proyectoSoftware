import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { axiosGetDetailCourse } from "#API/Cursos";
import Navbar from "../../SidebarMenu/Navbar";
import Form from "react-bootstrap/Form";
import "../../../assets/styles/Coordinador/Mantenimiento/Container.css";
function CursoDetalle() {
  const { cursoItem } = useLocation().state;
  const [cursoDetail, setCursoDetail] = useState();
  const JWTtoken = sessionStorage.getItem("token");

  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/Coordinador/curso");
  };

  const getCursoDetail = () => {
    axiosGetDetailCourse(JWTtoken, cursoItem.id)
      .then((response) => {
        const data = response.data || "";
        console.log(data)
        setCursoDetail(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getCursoDetail();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="CoordContainer">
        <div className="CoordHeader">
          <div className="CoordTitulo">
            <h1
            style={{marginRight:"500px"}}
            >DETALLE DE CURSO</h1>
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
                <strong>Nombre*:</strong>
              </Form.Label>
              <input type="text" readonly class="form-control-plaintext" id="staticEmail" 
              value={
                cursoDetail ? cursoDetail.name ? cursoDetail.name :"No hay nombre" : "No hay curso"
              }></input>
            </Form.Group>

            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDCodigo">
                <strong>Código*:</strong>
              </Form.Label>
              <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={
                cursoDetail ? cursoDetail.code ? cursoDetail.code :"No hay codigo" : "No hay curso"
              }></input>
            </Form.Group>

            <Form.Group
              className="mb-3 PDdProposedTheme"
              controlId="formTemaPropuesto"
            >
              <Form.Label className="PDCreditos">
                <strong>Créditos*:</strong>
              </Form.Label>
              <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={
                cursoDetail ? cursoDetail.credits ? cursoDetail.credits :"No hay creditos" : "No hay curso"
              }></input>
            </Form.Group>
          </Form>
        </div>
    </div>
  );
}

export default CursoDetalle;
