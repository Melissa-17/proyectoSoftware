import React, {useState,useEffect} from "react";
import "../../../assets/styles/Adviser/Rubrica/SeeMore.css";
import Header from "./Header";
import { useParams, useLocation } from "react-router-dom";
import { axiosGetFinalAssignmentDetail } from '#API/FinalAssignment.js';
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";

export default function SeeMore() {
  const params = useParams();
  const location = useLocation();
  const criteria = location.state.criteria;
  const numero = location.state.numero;

  const [finalAssign, setFinalAssign] = useState(null);
  const JWTtoken = sessionStorage.getItem("token");

  const getAllFinalAssign = () => {
    axiosGetFinalAssignmentDetail(JWTtoken, params.id)
      .then((response) => {
        const data = response.data || "";
        setFinalAssign(data);
      })
      .catch((error) => {
        console.error(`Error Final Assign Detail: ${error}`);
      });
  };

  useEffect(() => {
    getAllFinalAssign();
  }, []);

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorSeeMore">
        <div>
          <Header
            opcion={2}
            idEntregable={params.id}
            cambio={params.option}
            revisor={params.idrevisor}
            assign={finalAssign}
            numero={numero}
          />
        </div>
        <div className="contenedorColumna">
          
          <div className="texto">
            <div className="tituloTexto">
              <p>
                {criteria.obtainedScore ? criteria.obtainedScore : "-"}/{criteria.LEVEL_CRITERIum.maxScore}
              </p>
            </div>
            <div className="rolTexto">
              <p>{criteria.LEVEL_CRITERIum.RUBRIC_CRITERIum.description}</p>
            </div>
            <div className="descripcionTexto">
              <p>Descripción de la Rubrica</p>
            </div>
            <div className="contenidoTexto">
              <p>{criteria.LEVEL_CRITERIum.description}</p>
            </div>
            <div className="observacionTexto">
              <p className="observa">Obsevaciones</p>
              <p className="descripObserva">{criteria.notes}</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
