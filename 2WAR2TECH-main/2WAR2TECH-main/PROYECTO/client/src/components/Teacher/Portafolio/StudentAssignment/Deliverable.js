import React, { useEffect } from 'react';
import Icon from './Icon';
import moment from 'moment';
import { useState } from 'react';
import { getValorEstado } from '#Helpers/getValorEstado';
import { Paginacion } from '#Components/Pagination/Pagination.js'
import { axiosGetFinalAssignmentListByUserId } from '#API/FinalAssignment';

export default function Deliverable(props) {
    const [finalAssignList, setFinalAssignList] = useState([]);
    const JWTtoken = sessionStorage.getItem('token');
    const { student, course, num } = props;
    
    const getAllFinalAssignList = () => {
        axiosGetFinalAssignmentListByUserId(JWTtoken, student.id).then(
            (response) => {
                const list = response.data.rows || [];
                setFinalAssignList(list);
            }
        ).catch(error => {
            console.error(`Error: ${error}`);
        });
    };

    useEffect(() => {
        getAllFinalAssignList();
    }, []);

    //Paginación
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(4);
    
    const maximo = Math.ceil(finalAssignList.length / porPagina);

    const funcionEstado = (estado) =>{
        if(estado=="Asignado") return 3;
        else if(estado=="Calificado") return 1;
        else if(estado=="Entregado") return 2;
    }

  return (
    <div className='contenedorDeliverable'>
        <div className='contenedorFilasEntregables'>
        <div className='contenedorIconDeliverable'>
            {
                finalAssignList.slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                    ).map((finalAssign, index) => { 
                        let limitCompleteDate = finalAssign.ASSIGNMENT.limitCompleteDate ? new Date(
                            finalAssign.ASSIGNMENT.limitCompleteDate
                          ) : null; 
                          
              
                          let updateDate = finalAssign.updatedAt ? new Date(finalAssign.updatedAt) : null;
              
                          limitCompleteDate = limitCompleteDate ? moment(limitCompleteDate).format("DD/MM/YYYY") : "-";
                          updateDate = updateDate ? moment(updateDate).format("DD/MM/YYYY") : "-";
              
                          const valorEstado = getValorEstado(finalAssign.status);
                          var nume = funcionEstado(finalAssign.status);
                    
                    return (
                        <div key={index} className='espaciadoDeliverable'>
                            <Icon 
                            idEntregable={finalAssign.id}
                            numero={(pagina - 1) * porPagina + (index + 1)}
                            fecha={limitCompleteDate}
                            valor={nume}
                            fechaCorregido={updateDate}
                            entregable={1}
                            student={student}
                            course={course}
                            num={num}
                            />
                        </div>
                    )
                })
            }
            </div>
           
            <div className='contenedorBotoneriaEntregable'>
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
            </div>

        </div>
    </div>
  )
}
