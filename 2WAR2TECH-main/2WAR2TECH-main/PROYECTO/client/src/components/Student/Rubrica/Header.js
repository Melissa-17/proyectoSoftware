import React from "react";
import "#Styles/Student/Rubrica/Header.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function Header(props) {
  const navigate = useNavigate();

  const studAssignment = props.assign ? props.assign.studentAssignment : null;
  const revisor = props.assign ? props.assign.assignmentRevisors[0].USER : "";

  const hizoClic4 = () => {
    if (props.opcion == 2) {
      navigate(
        `/rubrica/${props.idEntregable}/${props.cambio}/${props.revisor}`,
        {
          state: {
            assignment: studAssignment,
            revisor: revisor,
            index: props.numero,
          },
        }
      );
    } else if (props.opcion == 1) {
      if (props.cambio == 3)
        navigate(
          `/avances/avancesDetail/${props.idEntregable}/${
            props.cambio
          }`,
          {
            state: {
              cxsid: props.cxsid,
              courseName:props.courseName
            },
          }
        );
      else if (props.cambio == 4) {
        navigate(`/presentation/detail/${props.idEntregable}/${props.cambio}`,{
          state:{
            cxsid: props.cxsid,
            courseName:props.courseName
          }
        });
      } else if (props.cambio == 1) {
        navigate(`/deliverable/detail/${props.idEntregable}/${props.cambio}`, {
          state: {
            cxsid: props.cxsid,
            courseName:props.courseName
          },
        });
      } else {
        if (props.cambio == 2) {
          navigate(`/partial/detail/${props.idEntregable}/${props.cambio}`,{
              state: {
                cxsid: props.cxsid,
                courseName:props.courseName
              },
            }
          );
        }
      }
    }
  };

  return (
    <div className="contenedorHeader">
      <div className="contenedorHeaderDetalle">
        <div className="TituloDetalle">
          <h1 className="titulo">Rúbrica</h1>
        </div>
        <button className="RetrocesoDetalle" onClick={hizoClic4}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
            className="imagenRetroceso"
          />
        </button>
      </div>
      <hr color="black" className="lineaHeader" />
    </div>
  );
}
