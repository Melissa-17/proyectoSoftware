import React from "react";
import "#Styles/Teacher/CourseMark/CriteriaRow.css";
import { useNavigate } from "react-router-dom";

function CriteriaRow(props) {
  const criterio = props.criterio

    const navigate = useNavigate();
    const seeDetail = () => {
        navigate("/course/mark/detail",{
          state: {
            criteriaId: criterio.id,
            cxsid:props.idcurso,
            semid:props.idsemestre,
          },
        });
    };
    const editDetail = () => {
      navigate("/course/mark/edit",{
        state: {
          criteriaId: criterio.id,
          cxsid:props.idcurso,
          semid:props.idsemestre,
          option:1,
        },
      });
  };

    const handleCheckDelete = (e, newId) => {
      if (e.currentTarget.checked) {
        props.setDeleteCurso([...props.deleteCurso, newId]);
      } else {
        const newList = props.deleteCurso.filter((assignId) => assignId !== newId);
        props.setDeleteCurso(newList);
      }
    };

  return (
    <div className="CriteriaRowContainer">
      <div className="content">
        <div className="CRTitles">
          <div className="checkBox">
            <input 
            type="checkbox" 
            onChange={(e) => handleCheckDelete(e, criterio.id)}
            defaultChecked={false}
            checked={props.deleteCurso.includes(criterio.id)}
            />
          </div>
          <div className="titles">
            <p className="mainTitle">{criterio.name}</p>
            <p className="criteriaWeight">Peso: {criterio.weight}</p>
          </div>
        </div>
        <div className="lineaVertical">
          <hr color="black" className="lineaVerticalCriteriaRow" />
        </div>
        <div className="CRBtns">
          <button className="criteriaEdit" onClick={editDetail}>Editar</button>
          <button className="criteriaDetail" onClick={seeDetail}>Ver detalle</button>
        </div>
      </div>
      <div className="CRlineaHorizontal">
        {/* <hr color="black" className="lineaHorizontalCriteriaRow" 
        style={{width:"1140px"}}
        /> */}
      </div>
    </div>
  );
}

export default CriteriaRow;
