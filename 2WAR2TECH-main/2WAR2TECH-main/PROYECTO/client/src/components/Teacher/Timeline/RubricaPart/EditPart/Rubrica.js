import React, {useEffect, useState} from 'react'
import CreateNewUserPageStudent from '../../../../../pages/CreateNewUserPage/Student'
import HeaderRubricaProfesor from './HeaderRubricaProfesor'
import PrimeraParte from './PrimeraParte'
import SegundaParte from './SegundaParte'
import { useParams, useLocation } from 'react-router'
import '../../../../../assets/styles/Teacher/Timeline/RubricaPart/Rubrica.css'
import BotoneriaRubricaProfesor from './BotoneriaRubricaProfesor'
import { axiosGetRubricInformation } from '../../../../../api/Rubric'
import { axiosGetDetailAssignment } from '../../../../../api/AssignmentStudent'

export default function RubricaEditarProfesor() {
    const params = useParams();
    const { cxsid, id, rubricId, criterioId, rubricaDetail } = useLocation().state;
    
    // const [rubricaDetail, setRubricaDetail] = useState([]);
    const JWTtoken = sessionStorage.getItem("token");

    // const getRubricaDetail = () => {
        // axiosGetRubricInformation(JWTtoken, rubricId)
        // .then((response) => {
            // const data = response.data || "";
            // setRubricaDetail(data);
            // console.log(response.data);
        // })
        // .catch((error) => {
        //     console.error(`Error Final Assign Detail: ${error}`);
        // });
    // };

    const [assignDetail, setAssignDetail] = useState([]);

    const getAssignDetail = () => {
        axiosGetDetailAssignment(JWTtoken, id)
        .then((response) => {
            const data = response.data || "";
            setAssignDetail(data);
            // console.log(response.data);
        })
        .catch((error) => {
            console.error(`Error Final Assign Detail: ${error}`);
        });
    };

    useEffect(() => {
        getAssignDetail();
    });

    // useEffect(() => {
    //     getRubricaDetail();
    // });

  return (
    <div className='contenedorRubricaProfesor'>
        <CreateNewUserPageStudent />
        <div className='RubricaProfesor'>
            <div className='contenedorHeader'>
                <HeaderRubricaProfesor num={params.num} cxsid={cxsid} id={id} rubricId={rubricId}
                entregable={rubricaDetail}/>
            </div>
            <div className='contenedorPrimeraParteRubricaProfesor'>
                <PrimeraParte entregable={rubricaDetail} entregableAnterior={assignDetail}
                num={params.num} cxsid={cxsid} id={id} rubricId={rubricId}/>
            </div>
            {/* <div className='contenedorSegundaParteRubricaProfesor'>
                <SegundaParte num={params.num} cxsid={cxsid} id={id} entregable={rubricaDetail} rubricId={rubricId}/>
            </div> */}
            {/* <div className='contenedorbotoneriaRubricaProfesor'>
                <BotoneriaRubricaProfesor num={params.num} cxsid={cxsid} id={id} rubricId={rubricId}/>
            </div> */}
        </div>
    </div>
  )
}
