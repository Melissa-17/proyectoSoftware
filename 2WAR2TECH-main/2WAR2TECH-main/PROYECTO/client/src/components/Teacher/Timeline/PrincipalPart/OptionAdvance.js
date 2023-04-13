import React from "react";
import "../../../../assets/styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css";
import { useNavigate, useLocation } from "react-router";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { useState, useEffect } from "react";
import { axiosGetAdvanceList } from "#API/Advance.js";
import ContentRow from "./ContentRow";
import { axiosGetAssignmentByTypeByCourse } from "#API/AssignmentStudent";

export default function OptionAdvance(props) {
  const navigate = useNavigate();
  const { cxsid } = useLocation().state;

  const mantienePantalla = () => {
    navigate("/timeline/partial",{
      state:{
        cxsid: cxsid
      }
    });
  };
  const cambioDeliverable = () => {
    navigate("/timeline/deliverable",{
      state:{
        cxsid: cxsid
      }
    });
  };
  const cambioPresentation = () => {
    navigate("/timeline/presentation",{
      state:{
        cxsid: cxsid
      }
    });
  };
  const cambioAdvance = () => {
    navigate("/timeline/advance",{
      state:{
        cxsid: cxsid
      }
    });
  };

  const [advanceList, setAdvanceList] = useState([]);
  const {deleteAssignList, setDeleteAssignList} = props;
  const JWTtoken = sessionStorage.getItem("token");

  const getAssignList = () => {
    axiosGetAssignmentByTypeByCourse(JWTtoken, cxsid, 'ADVANCE')
      .then((response) => {
        const list = response.data || [];
        setAdvanceList(list);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAssignList();
  });

  // useEffect(() => {
  //   console.log(deleteAssignList);
    
  // }, [deleteAssignList, setDeleteAssignList])

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(advanceList.length / porPagina);

  return (
    <div>
      <div className="tituloOpcionesPrincipalPartTeacher">
        <button className="tituloOpcionesNormal" onClick={mantienePantalla}>
          Entregas Parciales
        </button>
        <button className="tituloOpcionesNormal" onClick={cambioDeliverable}>
          Entregas
        </button>
        <button className="tituloOpcionesNormalExposicion" onClick={cambioPresentation}>
          Exposiciones
        </button>
        <button className="tituloOpcionesSeleccionado" onClick={cambioAdvance} style={{width:"100px"}}>
          Avances
        </button>
      </div>
      <div>
        <hr color="black" className="lineaOptionPrincipalPart" />
      </div>
      <div className="cambioOpcionesPrincipalPartTeacher">
        {advanceList.slice((pagina - 1) * porPagina,
            (pagina - 1) * porPagina + porPagina
            ).map((advance, index) => {
            return (
              <div key={index} className="espaciadoDeliverable">
                <ContentRow 
                entregable={advance} option={4} 
                deleteAssignList={deleteAssignList}
                setDeleteAssignList={setDeleteAssignList}
                cxsid={cxsid}
                num={index+1}
                />
              </div>
            );
          })}
      </div>
      <div className="contenedorBotoneriaEntregable">
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>
    </div>
  );
}
