import React, { useState } from "react";
import '../../../assets/styles/Teacher/CourseMark/CriteriaRow.css'

function EvaluationRow(props) {
  
  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      props.setDeleteCriterio([...props.deleteCriterio, newId]);
    } else {
      const newList = props.deleteCriterio.filter((assignId) => assignId !== newId);
      props.setDeleteCriterio(newList);
    }
  };

  return (
    <div className="CriteriaRowContainer">
      <div className="content">
        <div className="CRTitles">
          <div className="checkBox">
            {/* {console.log(props.evaluation)} */}
            <input 
            type="checkbox"
            onChange={(e) => handleCheckDelete(e, props.evaluation.id)}
            defaultChecked={false}
            checked={props.deleteCriterio.includes(props.evaluation.id)}
            />
          </div>
          <div className="titles">
            <p className="mainTitle">{props.name}</p>
            <p className="criteriaWeight">Peso: {props.weight}</p>
          </div>
        </div>
        <div className="lineaVertical">
          <hr color="black" className="lineaVerticalCriteriaRow" />
        </div>
        <div className="CRBtns">
          <button className="criteriaEdit"onClick={() => {
            props.setIdEvaluation(props.evaluation.id);
            props.setOpenModalEdit(true);
            }}>
            Editar
          </button>
        </div>
      </div>
      <div className="CRlineaHorizontal">
        <hr color="black" className="lineaHorizontalCriteriaRow" />
      </div>
      {/* {openModalEdit && 
      <EditCriteriaModal closeMessage={setOpenModalEdit} 
      evaluationList={props.evaluationList}
      setEvaluationList={props.setEvaluationList}
      id={props.evaluation.id}/>} */}
    </div>
  );
}

export default EvaluationRow;
