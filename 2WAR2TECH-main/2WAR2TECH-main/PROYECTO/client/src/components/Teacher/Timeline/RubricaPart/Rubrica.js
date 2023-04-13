import React, {useEffect, useState} from 'react'
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student'
import HeaderRubricaProfesor from './HeaderRubricaProfesor'
import PrimeraParte from './PrimeraParte'
import SegundaParte from './SegundaParte'
import { useParams, useLocation } from 'react-router'
import '../../../../assets/styles/Teacher/Timeline/RubricaPart/Rubrica.css'
import { axiosGetRubricInformation } from '../../../../api/Rubric'
import { axiosGetDetailAssignment } from '../../../../api/AssignmentStudent'
import { GridLoader } from "react-spinners";

export default function RubricaProfesor() {
    const params = useParams();
    const { cxsid, id, rubricId } = useLocation().state;
    
    const [rubricaDetail, setRubricaDetail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const JWTtoken = sessionStorage.getItem("token");

// console.log("RID:  " + rubricId);
    const getRubricaDetail = () => {
        axiosGetRubricInformation(JWTtoken, rubricId, id)
        .then((response) => {
            const data = response.data || "";
            console.log(data);
            setRubricaDetail(data);
            setIsLoading(false);
            // console.log(response.data);
        })
        .catch((error) => {
            console.error(`Error Final Assign Detail: ${error}`);
        });
    };

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
    }, []);

    useEffect(() => {
        getRubricaDetail();
    }, []);

  return (
    !0 ? 
    <div className='contenedorRubricaProfesor'>
        <CreateNewUserPageStudent />
        <div className='RubricaProfesor'>
            <div className='contenedorHeader'>
                <HeaderRubricaProfesor num={params.num} cxsid={cxsid} id={id} entregable={rubricaDetail} />
            </div>
            <div className='contenedorPrimeraParteRubricaProfesor'>
                <PrimeraParte num={params.num} cxsid={cxsid} id={id} entregable={rubricaDetail}
                entregableAnterior={assignDetail}/>
            </div>
            <div className='contenedorSegundaParteRubricaProfesor'>
                <SegundaParte num={params.num} cxsid={cxsid} id={id} entregable={rubricaDetail} rubricId={rubricId}/>
            </div>
        </div>
    </div>
    :
    <GridLoader
    className="mx-auto"
    color="#042354"
    loading={isLoading}
    size={24}
    /> 
  )
}
