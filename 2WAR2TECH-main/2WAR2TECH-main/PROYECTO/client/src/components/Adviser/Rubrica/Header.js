import React, { useState } from "react";
import "#Styles/Adviser/Rubrica/Header.css";
import { useNavigate } from "react-router-dom";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalsMessage from "../../Modals/ModalsMessage";

export default function Header(props) {
  const navigate = useNavigate();

  const studAssignment = props.assign ? props.assign.studentAssignment : null;
  const revisor = props.assign ? props.assign.assignmentRevisors[0].USER : "";
  // console.log(props.cambio);
  const retroceder = () => {
    if(props.numero==1){
      navigate('/jury/presentation/students/detail',{
          state:{
              idAXS: props.presentation.id,
              curso: props.curso,
              presentation: props.presentation,
              num: props.numero
          }
      });
  }else{
      if(props.numero==2){
          navigate('/asesor/presentation/students/detail',{
              state:{
                  idAXS: props.presentation.id,
                  curso: props.curso,
                  presentation: props.presentation,
                  num: props.numero
              }
          });
      }else if(props.numero==3){
          navigate('/teacher/presentation/students/detail',{
              state:{
                  idAXS: props.presentation.id,
                  curso: props.curso,
                  presentation: props.presentation,
                  num: props.numero
              }
          });
      }
  }
  };
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  return (
    <div className="contenedorHeader">
      <div className="contenedorHeaderDetalle">
        <div className="TituloDetalle" style={{ marginRight: "26px" }}>
          <h1 className="titulo">Rúbrica</h1>
        </div>
        {
          props.assignRubric?
          <div className="buttons-edit">
            <button
              className="botonOpcion"
              onClick={() => {
                props.funcionGuardar();
                setOpenMessage(true);
              }}
            >
              Guardar
            </button>
            <button
              className="Cancelar-cambios"
              onClick={() => {
                setOpenAlert(true);
              }}
            >
              Cancelar
            </button>
          </div>:
          <p style={{marginRight:"250px"}}></p>
        }
        
        <button className="RetrocesoDetalle" onClick={retroceder} >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
            className="imagenRetroceso"
          />
        </button>
      </div>
      <hr color="black" className="lineaHeader" />
      {openMessage && (
        <ModalsMessage
          closeMessage={setOpenMessage}
          message="Guardado con éxito"
          navigateFunc={retroceder}
        />
      )}
      {openAlert && (
        <ModalsAlert
          closeAlert={setOpenAlert}
          alertText="¿Está seguro que no desea guardar?"
          action={props.funcionCancelar}
          navigateFunc={retroceder}
        />
      )}
      {/* {openAlert2 && (
        <ModalsAlert
          closeAlert={setOpenAlert2}
          alertText="¿Está seguro que desea salir sin guardar?"
          action={props.funcionCancelar}
          navigateFunc={hizoClic4}
        />
      )} */}
    </div>
  );
}
