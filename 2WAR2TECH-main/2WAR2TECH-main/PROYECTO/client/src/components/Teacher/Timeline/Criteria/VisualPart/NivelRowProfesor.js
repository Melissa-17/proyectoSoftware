import React,{useState} from "react";
import '../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/NivelRowProfesor.css'
import ModalsNuevoNivel from "./ModalsNuevoNivel";
import ModalsVisualProfesor from "./ModalsVisualProfesor";
import ModalsMessageLevel from "../EditPart/ModalsMessageLevel";

export default function NivelRowProfesor(props) {
  const [modalNuevoNivel, setModalNuevoNivel] = useState(false);
  const [modalVisualProfesor, setModalVisualProfesor] = useState(false);
  const [modalMessageLevel, setModalMessageLevel] = useState(false);
  const cambioModal = () =>{
    setModalNuevoNivel(true);
  }
  const cambioVisual = () =>{
    setModalVisualProfesor(true);
  }
  const cambioPantalla = () =>{
    if(modalNuevoNivel) return <ModalsNuevoNivel closeNuevoNivel={setModalNuevoNivel} modalMensaje={setModalMessageLevel}
    option={1} criterioId={props.criterioId} cambio={2} level={props.level}/>;
    else if(modalVisualProfesor) return <ModalsVisualProfesor closeVisual={setModalVisualProfesor} level={props.level}/>;
  }

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      props.setDeletelevel([...props.deleteLevel, newId]);
    } else {
      const newList = props.deleteLevel.filter((assignId) => assignId !== newId);
      props.setDeletelevel(newList);
    }
  };

  return (
    <div className="contenedorNivelesFilaNivelRowProfesor">
      <input 
      type="checkbox" 
      onChange={(e) => handleCheckDelete(e, props.level.id)}
      defaultChecked={false}
      checked={props.deleteLevel.includes(props.level.id)}
      />
      <div className="contenedorNivelDeseado">
        <p className="nivel">{props.level.name}</p>
        <p className="puntaje">Puntaje máx: {props.level.maxScore}</p>
      </div>
      <hr color="black" className="lineaVerticalEditCriteria" />
      <button className="editar" onClick={cambioModal}>Editar</button>
      <button className="verDetalle" onClick={cambioVisual}>Ver detalle</button>
      {cambioPantalla()}
      {modalMessageLevel && <ModalsMessageLevel closeMessage={setModalMessageLevel} closeOtroModal={setModalNuevoNivel}
      message="Se cambio correctamente"/>}
    </div>
  );
}
