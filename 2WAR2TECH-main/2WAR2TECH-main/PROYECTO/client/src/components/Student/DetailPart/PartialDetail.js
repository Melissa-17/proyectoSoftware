import React, {useState, createContext, useContext, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosGetFinalAssignmentDetail } from '#API/FinalAssignment.js';
import InitialPart from './InitialPart';
import FinalPart from './FinalPart';
import MiddlePart from './MiddlePart';
import Navbar from '../../SidebarMenu/Navbar';
import CreateNewUserPageStudent from '../../../pages/CreateNewUserPage/Student';

export default function PartialDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const [docs, setDocs] = useState([]);

    const [finalAssign, setFinalAssign] = useState(null);
    const JWTtoken = sessionStorage.getItem('token');

    const getAllFinalAssign = () => {
        axiosGetFinalAssignmentDetail(JWTtoken, params.id).then(
            (response) => {
                const data = response.data || '';
                // console.log(data);
                setFinalAssign(data);
            }
        ).catch(error => {
            console.error(`Error Final Assign Detail: ${error}`);
        });
    };

    useEffect(() => {
        getAllFinalAssign();
        
    }, [docs, setDocs]);


    const retrocesoClic = () =>{
        navigate("/entregable");
    }
  return (
    finalAssign ?
    <div className='todoDeliverable'>
        <Navbar/>
        <CreateNewUserPageStudent />
      <div className='contenedorDetalle'>
            <div className='contenedorEncabezadoDetalle'>
                <div className='contenedorTitutoDetalle'>
                    <h1 className='titulo'>ENTREGABLES</h1>
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
                <hr color='#CED4DA' className='linea'/>
            </div>

            <InitialPart 
            assign={finalAssign}/>
            <MiddlePart
              docs={docs}
              setDocs={setDocs}
            assign={finalAssign}
             />
            <FinalPart assign={finalAssign}/>
        </div>
    </div>
    :
    null
  )
}
