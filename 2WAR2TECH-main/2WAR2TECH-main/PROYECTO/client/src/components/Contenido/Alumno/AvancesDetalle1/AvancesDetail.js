import React, {useState,useEffect} from 'react';
import '../../../../assets/styles/Student/DetailPart/DelivDetail.css';
import { useLocation, useNavigate } from 'react-router-dom';
import InitialPart from './InitialPart';
import FinalPart from './FinalPart';
import MiddlePart from './MiddlePart';
import { useParams } from 'react-router-dom';
import { axiosGetFinalAssignmentDetail } from '#API/FinalAssignment.js';
import Navbar from '../../../SidebarMenu/Navbar';
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student';

export default function AvancesDetail() {
    const [docs, setDocs] = useState([]);

    const navigate = useNavigate();
    const { cxsid, courseName } = useLocation().state;
    const [isLoadingDocs, setIsLoadingDocs] = useState(true);
    const [isLoadingDocsRetro, setIsLoadingDocsRetro] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);

    const retrocesoClic = () =>{
        if(params.num == 0) navigate("/Asesor/second");
        else navigate("/avances", {
            state: {
              cxsid: cxsid,
              courseName: courseName,
            }
          });
    }

    const params = useParams();
    var numero = parseInt(params.num);

    const [advance, setAdvance] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openAlert, setOpenAlert] = useState(false);
    const JWTtoken = sessionStorage.getItem('token');

    const getDetailAdvance = () => {
        axiosGetFinalAssignmentDetail(JWTtoken, params.id).then(
            (response) => {
                const data = response.data || '';
                setAdvance(data);
                setIsLoading(false);
            }
        ).catch(error => {
            console.error(`Error Advance Detail: ${error}`);
        });
    };

    useEffect(() => {
        getDetailAdvance();
    }, [openConfirm]);

  return (
    !isLoading &&
    <div className='contenedorDetalle'>
        <CreateNewUserPageStudent />
        <div className='contenedorEncabezadoDetalle'>
            <div className='contenedorTitutoDetalle'
            style={{marginRight:"530px"}}
            >
                <h1 className='titulo'>AVANCES</h1>
            </div>
            <button
            onClick={retrocesoClic}
            className='botonRetrocesoDetalle'>
                <img 
                src='https://cdn-icons-png.flaticon.com/512/2223/2223615.png'
                className='imagenRetrocesoDetalle'/>
            </button>
        </div>
        
        <div className='contenedorLineaDetalle'>
        <hr color="black" className="lineaContenidoAvance" style={{width:"1120px"}}/>
        </div>
        
        <InitialPart 
        numero={params.num}
        assign={advance}
        courseName={courseName}
        />
        <MiddlePart
        docs={docs}
        setDocs={setDocs}
        id = {params.id}
        opcion={numero}
        assign={advance}
        isLoadingDocs={isLoadingDocs}
        setIsLoadingDocs={setIsLoadingDocs}
        isLoadingDocsRetro={isLoadingDocsRetro}
        setIsLoadingDocsRetro={setIsLoadingDocsRetro}
        cxsid={cxsid}
        courseName={courseName}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        />
        <FinalPart 
        id = {params.id}
        opcion={numero}
        assign={advance}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        />


    </div>
  )
}

