import React, { useState } from "react";
import "../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/EditCriteria.css";
import "../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/HeaderEditCriteria.css";
import { axiosEditCriteria } from "../../../../../api/Rubric";
import ModalsAlertEditCriteria from "./ModalsAlert";
import ModalsMessageEditPart from "./ModalsMessage";
import { useNavigate } from "react-router";

export default function SecondPartEditCriteria(props) {
  const JWTtoken = sessionStorage.getItem("token");
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalMensaje, setModalMensaje] = useState(false);

  const cambioAlerta = () => {
    setModalAlerta(true);
  };
  const cambioMensaje = () => {
    setModalMensaje(true);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const comment = document.querySelector(
      ".textAreaDescripcionEditCriteria"
    ).value;
    const commentNombre = document.querySelector(
      ".inputNombreSecondPartEditCriteria"
    ).value;
    // La estructura de este formData la obtienes del
    // body que indica en el AXIOS
    const commentFormData = {
      description: comment,
      name: commentNombre,
    };
    // llamada al servicio
    axiosEditCriteria(
      JWTtoken,
      props.rubricId,
      props.criterioId,
      commentFormData
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const retrocesoClic = () => {
    if (props.option == 1) {
      navigate(`/timeline/rubrica/${props.num}`, {
        state: {
          cxsid: props.cxsid,
          id: props.id,
          rubricId: props.rubricId,
          criterioId: props.criterioId,
        },
      });
    } else {
      if (props.option == 2) {
        navigate(`/timeline/rubrica/edit/${props.num}`, {
          state: {
            cxsid: props.cxsid,
            id: props.id,
            rubricId: props.rubricId,
            criterioId: props.criterioId,
          },
        });
      } else {
        if (props.option > 2) {
          navigate(
            `/timeline/criteria/visual/${props.num}/${props.option - 2}`,
            {
              state: {
                cxsid: props.cxsid,
                id: props.id,
                rubricId: props.rubricId,
                criterioId: props.criterioId,
              },
            }
          );
        }
      }
    }
  };

  return (
    <div>
      <form
        id="editCriteriaIdForm"
        className="editCriteriaIdForm"
        method="patch"
        onSubmit={(e) => handleCommentSubmit(e)}
      >
        <div className="contenedorHeaderEditCriteriaGlobal">
          <div className="contenedorHeaderCriteriaProfesor">
            <div className="lineaHeaderRubricaProfesor">
              <div className="contenedorFilasCriteriaProfesor">
                <p className="edicion">EDICIÓN CRITERIA</p>
                <input
                  type="text"
                  placeholder="Coloque un nombre"
                  defaultValue={
                    props.criteriaDetail &&
                    props.criteriaDetail.criteria &&
                    props.criteriaDetail.criteria.name
                      ? props.criteriaDetail.criteria.name
                      : ""
                  }
                  className="inputNombreSecondPartEditCriteria"
                />
              </div>

              <div className="contenedorBotonVisualPart">
                <button
                  onClick={retrocesoClic}
                  className="botonRetrocesoDetalle"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                    className="imagenRetrocesoDetalle"
                  />
                </button>
              </div>
            </div>
            <div>
              <hr color="black" className="lineaContenidoCriteriaProfesor" />
            </div>
          </div>
        </div>

        <div className="contenedorSeparadorEditCriteria">
          <div className="PrimeraParteEditCriteria">
            <p className="infoGeneral">Información general</p>
            <div className="descripcionPrimeraParte">
              <p className="descripcion">Descripción opcional</p>
              <textarea
                wrap="soft"
                placeholder="Ingrese una descripción..."
                defaultValue={
                  props.criteriaDetail && props.criteriaDetail.criteria
                    ? props.criteriaDetail.criteria.description
                    : ""
                }
                className="textAreaDescripcionEditCriteria"
              />
            </div>
          </div>

          <div className="contenedorBotoneriaEditCriteria">
            <div>
              <button className="cancelar" type="button" onClick={cambioAlerta}>
                Cancelar
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setModalMensaje(true);
                }}
                form="editCriteriaIdForm"
                variant="primary"
                type="submit"
                className="guardar"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div>
        {modalAlerta && (
          <ModalsAlertEditCriteria
            closeAlert={setModalAlerta}
            alertText="¿Desea cancelar los cambios?"
            option={props.option}
            num={props.num}
            cxsid={props.cxsid}
            id={props.id}
            rubricId={props.rubricId}
            criterioId={props.criterioId}
          />
        )}

        {modalMensaje && (
          <ModalsMessageEditPart
            message="Se guardó correctamente el cambio"
            option={props.option}
            num={props.num}
            cxsid={props.cxsid}
            id={props.id}
            rubricId={props.rubricId}
            criterioId={props.criterioId}
          />
        )}
      </div>
    </div>
  );
}
