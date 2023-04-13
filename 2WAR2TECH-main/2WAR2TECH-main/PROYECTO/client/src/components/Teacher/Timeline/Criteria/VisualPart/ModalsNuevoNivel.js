import React from "react";
import "../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/ModalsNuevoNivel.css";
import { Editor } from "@tinymce/tinymce-react";
// import tinymce from 'tinymce/tinymce';
import { useRef } from "react";
import { axiosEditCriteriaLevel } from "../../../../../api/RubricCriteria";
import { axiosAddCriteriaLevel } from "../../../../../api/RubricCriteria";
import ReactHtmlParser from "react-html-parser";

export default function ModalsNuevoNivel({ closeNuevoNivel, option, criterioId, cambio, level, modalMensaje }) {
  const editorRef = useRef(null);
  const JWTtoken = sessionStorage.getItem("token");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentNombreCriterio = document.querySelector(
      ".inputNombreCriterioModalsNuevoCriterio"
    ).value;
    const commentDescripcionCriterio = editorRef.current.getContent();
    const valorPuntaje = parseInt(
      document.querySelector(".inputPuntajeCriterioModalsNuevoCriterio").value
    );
    if(cambio==2){
      const commentFormData = {
        name: commentNombreCriterio,
        maxScore: valorPuntaje,
        description: commentDescripcionCriterio
      };
      // llamada al servicio
      
      console.log(commentNombreCriterio);
      
      axiosEditCriteriaLevel(JWTtoken,level.id, commentFormData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else{
      if(cambio==1){
        const commentFormData = {
          name: commentNombreCriterio,
          maxScore: valorPuntaje,
          description: commentDescripcionCriterio,
          idRC: criterioId
        };

        axiosAddCriteriaLevel(JWTtoken, commentFormData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  };

  return (
    <form
      id="ModalsNuevoNivelIdForm"
      className="ModalsNuevoNivelIdForm"
      method={cambio==1? "post" : "patch"}
      onSubmit={(e) => handleCommentSubmit(e)}
    >
      <div className="contenedorModalsNuevoNivelGeneral">
        {/* {console.log(level)} */}
        <div className="contendorModalsNuevoNivel">
          <div className="contenedorHeaderModalsNuevoNivel">
            {cambio==1?<p>Nuevo Nivel</p>:<p>Editar Nivel</p>}
            <button
              onClick={() => {
                closeNuevoNivel(false);
              }}
              type="button"
              className={cambio==1? "botonContenedorHeaderModalsNuevoNivel" : "botonContenedorHeaderModalsEditNivel"}
            >
              <i class="bi bi-x-lg" />
            </button>
          </div>

          <div>
            <hr color="black" className="lineaModalsNuevoNivel" />
          </div>

          <div className="contenedorPrimeraFilaNuevoNivel">
            <div className="contenedorNombreCriterioNuevoNivel">
              <p>Nombre del criterio</p>
              <input
                type="text"
                placeholder="Sobresaliente"
                style={{width:"200px"}}
                defaultValue={cambio==2 && level.name? level.name: ""}
                className="inputNombreCriterioModalsNuevoCriterio"
              />
            </div>
            <div className="contenedorPuntajeMaximaNuevoNivel">
              <p>Puntaje máximo</p>
              <input
                type="text"
                placeholder="20"
                style={{width:"200px"}}
                defaultValue={cambio==2 && level.maxScore? level.maxScore : ""}
                className="inputPuntajeCriterioModalsNuevoCriterio"
              />
            </div>
          </div>

          <div className="contenedorDescripcionNuevoNivel">
            <p>Descripción</p>
            <Editor
              tinymce-script-src="tinymce/tinymce.min.js"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                menubar: false,
                selector: "textarea",
                plugins: [
                  'lists'
                ],
                toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                          'alignleft aligncenter alignright alignjustify | ' +
                          'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help', 
                init_instance_callback: function (editor) {
                  var freeTiny = document.querySelector(
                    ".tox .tox-notification--in"
                  );
                  freeTiny.style.display = "none";
                },
                resize: false,
                height: "360px",
              }}
              initialValue={cambio==2 && level.description?level.description:""}
              className="descripcionCriterioModalsNuevoCriterio"
            />
          </div>

          <div className="contenedorBotoneriaNuevoNivel">
            <button
              onClick={() => {
                // closeNuevoNivel(false);
                modalMensaje(true);
              }}
              style={{marginLeft:"90px"}}
              form="ModalsNuevoNivelIdForm"
              variant="primary"
              type="submit"
              className="aceptarBotonModalsNuevoNivel"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
