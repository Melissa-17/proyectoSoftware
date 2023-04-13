import React, { useEffect, useState } from "react";
import "../../../../assets/styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css";
import { useLocation, useNavigate } from "react-router";
import ContentRow from "./ContentRow";
import { Paginacion } from '#Components/Pagination/Pagination.js'
import { axiosGetAssignmentByTypeByCourse } from "#API/AssignmentStudent";

export default function OptionDeliverable(props) {
  const navigate = useNavigate();
  const { cxsid } = useLocation().state;

  const mantienePantalla = () => {
    navigate("/timeline/partial", {
      state: {
          cxsid: cxsid,
      }
      
  });
  };

  const cambioDeliverable = () => {
    navigate("/timeline/deliverable", {
      state: {
          cxsid: cxsid,
      }
      
  });
  };

  const cambioPresentation = () => {
    navigate("/timeline/presentation", {
      state: {
          cxsid: cxsid,
      }
      
  });
  };


  const cambioAdvance = () => {
    navigate("/timeline/advance", {
      state: {
          cxsid: cxsid,
      }
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  const [assignList, setAssignList] = useState([]);
  const {deleteAssignList, setDeleteAssignList} = props;

  const JWTtoken = sessionStorage.getItem("token");

  const getAssignList = () => {
    axiosGetAssignmentByTypeByCourse(JWTtoken, cxsid, 'FINAL ASSIGN')
      .then((response) => {
        // console.log(response.data)
        const list = response.data || [];
        setAssignList(list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAssignList();
  });

  useEffect(() => {
    // console.log(isLoading);
  }, [isLoading, setIsLoading]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(assignList.length / porPagina);

  return (
    <div>
      <div className="tituloOpcionesPrincipalPartTeacher">
        <button className="tituloOpcionesNormal" onClick={mantienePantalla}>
          Entregas Parciales
        </button>
        <button
          className="tituloOpcionesSeleccionado"
          onClick={cambioDeliverable}
        >
          Entregas
        </button>
        <button className="tituloOpcionesNormalExposicion" onClick={cambioPresentation}>
          Exposiciones
        </button>
        <button className="tituloOpcionesNormal" onClick={cambioAdvance}>
          Avances
        </button>
      </div>
      <div>
        <hr color="black" className="lineaOptionPrincipalPart" />
      </div>
      <div className="cambioOpcionesPrincipalPartTeacher">
        {assignList && !isLoading ?
        assignList
          .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
          .map((finalAssign, index) => {
            return (
              <div key={index} className="espaciadoDeliverable">
                <ContentRow 
                entregable={finalAssign} option={2}
                deleteAssignList={deleteAssignList}
                setDeleteAssignList={setDeleteAssignList}
                cxsid={cxsid}
                num={index+1}
                />
              </div>
            );
          }):null}
      </div>
      <div className="contenedorBotoneriaEntregable">
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </div>
    </div>
  );
}
