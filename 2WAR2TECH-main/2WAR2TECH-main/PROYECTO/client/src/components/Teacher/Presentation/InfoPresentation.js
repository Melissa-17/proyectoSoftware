import React, { useState } from 'react';
import '#Styles/Teacher/Presentation/InfoPresentation.css';
import { formatDate } from "#Helpers/assignmentHelpers.js";
import RegistroModal from './RegistroModal';

export default function InfoPresentation (props){
    const {presentation} = props;
    //console.log(presentation);
    const assign =  presentation?presentation.ASSIGNMENT:'';
    const [openModal, setOpenModal] = useState(false);
    const [modalidad, setModalidad] = useState(true);
  console.log(presentation)
    return(
        <div className='main-box-infoPres'>
            <button className='editar-datos-presentation' onClick={()=>{setOpenModal(true)}}>
                <i class="bi bi-pencil-square fa-2x"></i>
            </button>
            <div className='info-presentation-detail'>
              <p className='presentation-name'>{assign.assignmentName}</p>
              <div className='information-maybe'>
                {
                  presentation.linkVirtualSession?
                  <>
                  <p className='titulo-maybe'>Link: </p>
                  <a href={`${presentation.linkVirtualSession}`} 
                  target="_blank"
                  >Click aquí</a>
                  </>
                  :
                  <></>
                }
              </div>
              <div className='information-maybe'>
                {
                  presentation.location?
                  <>
                    <p className='titulo-maybe'>Ubicación: </p>
                    <p>{presentation.location}</p>
                  </>
                  :
                  ''
                }
              </div>
              <p className='fecha-expo'>Fecha: {presentation.meetingDate?formatDate(presentation.meetingDate):'No registrada'}</p>
              <p className='hora-expo'>Hora: {presentation.meetingDate?formatDate(presentation.meetingDate,'hh:mm'):'No registrada'}</p>
              {
                presentation.location?
                <p className='modalidad-expo'> Modalidad: Presencial</p>
                :
                presentation.linkVirtualSession?
                <p className='modalidad-expo'> Modalidad: Virtual</p>
                :''
              } 
            </div>
            {
              openModal && <RegistroModal closeMessage={setOpenModal} 
              axsId = {presentation.id} meetingDate={presentation.meetingDate} modalidad={presentation.location}
              pres={presentation}/>
            }
        </div>
    )
}