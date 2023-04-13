import React, {useState,useEffect} from "react";
import '../../../../assets/styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css'
import { useLocation, useNavigate } from 'react-router'
import ContentRow from "./ContentRow";
import { axiosGetPresentationAssignmentList } from '#API/PresentationAssignment';
import { Paginacion } from '#Components/Pagination/Pagination.js'
import { axiosGetAssignmentByTypeByCourse } from "#API/AssignmentStudent";

export default function OptionPresentation(props) {
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
      navigate("/timeline/advance",{
        state:{
          cxsid: cxsid
        }
      });
    };

    const [presentationAssignList, setPresentationAssignList] = useState([]);
    const {deleteAssignList, setDeleteAssignList} = props;
    const JWTtoken = sessionStorage.getItem("token");

    const getAssignList = () => {
      axiosGetAssignmentByTypeByCourse(JWTtoken, cxsid, 'EXPOSITION')
        .then((response) => {
          // console.log(response.data)
          const list = response.data || [];
          setPresentationAssignList(list);
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    };

    useEffect(() => {
      getAssignList();
    });

     //Paginación
     const [pagina, setPagina] = useState(1);
     const [porPagina, setPorPagina] = useState(4);
     
     const maximo = Math.ceil(presentationAssignList.length / porPagina);

    return (
      <div>
        <div className="tituloOpcionesPrincipalPartTeacher">
          <button
            className="tituloOpcionesNormal"
            onClick={mantienePantalla}
          >
            Entregas Parciales
          </button>
          <button className="tituloOpcionesNormal" onClick={cambioDeliverable}>
            Entregas
          </button>
          <button className="PresentationOpcionesSeleccionado" onClick={cambioPresentation}>
              Exposiciones
          </button>
          <button className="tituloOpcionesNormal" onClick={cambioAdvance}>
            Avances
          </button>
        </div>
        <div>
            <hr color="black" className="lineaOptionPrincipalPart"/>
        </div>
        <div className="cambioOpcionesPrincipalPartTeacher">
          {/* <ContentRow num={3}/> */}
            {
              presentationAssignList.slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              ).map((presentationAssign, index) =>{
                return (
                  <div key={index} className='espaciadoPresentacion'>
                    <ContentRow 
                      entregable={presentationAssign}
                      option={3}
                      deleteAssignList={deleteAssignList}
                      setDeleteAssignList={setDeleteAssignList}
                      cxsid={cxsid}
                      num={index}
                    />
                  </div>
                )
              })
              
            }
        </div>
        <div className='opcionesPresentacion'>
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
        </div>
      </div>
    )
}
