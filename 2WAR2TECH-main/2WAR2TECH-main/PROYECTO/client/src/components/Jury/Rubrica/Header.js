import React from "react";
import '#Styles/Student/Rubrica/Header.css'
import { useNavigate } from "react-router-dom";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export default function Header(props) {

  const navigate = useNavigate();

  const studAssignment = props.assign ? props.assign.studentAssignment : null;
  let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    let revisor = JSON.parse(localStorage.getItem('asesor'));
    
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };

  const hizoClic4 = () =>{
    if(props.cambio == props.index && props.cambio != 0) navigate(`/presentation/detail/${props.idEntregable}/${props.cambio}`);
    else{
      if(props.opcion == 2){
        navigate(`/rubrica/${props.idEntregable}/${props.cambio}/${props.revisor}`,{
          state: {
            assignment: studAssignment,
            revisor: revisor,
            index: props.numero
          }
        });
      }
      else if(props.opcion == 1){
        if(props.cambio >= 3) navigate(`/avances/avancesDetail/${props.idEntregable}/${props.cambio-3}`);
        else if(props.cambio < 0){
            navigate(`/asesor/alumno/deliverable/detail/${props.idEntregable}/${props.cambio*-1}`,{
              state: {
                index: props.numero,
                student: props.student
            }
            });
        }else if(props.cambio == 1 || props.cambio == 0){
          navigate(`/deliverable/detail/${props.idEntregable}/${props.cambio}`, {
            state: {
              index: props.index
            }
          });
        }
        else{
          navigate(`/partial/detail/${props.idEntregable}/${props.cambio}`,{
            state: {
              index: props.index
            }
          });
        }
      }
    } 
  }

  return (
    <div className="contenedorHeader">
      <div className="contenedorHeaderDetalle">
        <div className="TituloDetalle">
          <h1 className="titulo">Rúbrica</h1>
        </div>
        <button className="RetrocesoDetalle"
        onClick={hizoClic4}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
            className="imagenRetroceso"
          />
        </button>
      </div>    
      <hr color="black" className="lineaHeader"/>
    </div>
  );
}
