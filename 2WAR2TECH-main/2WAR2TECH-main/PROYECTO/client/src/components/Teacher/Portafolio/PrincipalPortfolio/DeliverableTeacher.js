import React from 'react'
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student'
import '../../../../assets/styles/Teacher/Portafolio/deliverableTeacher.css'
import HeaderTeacher from './HeaderTeacher'
import InitialPartTeacher from './InitialPartTeacher'

export default function DeliverableTeacher(props) {
  return (
    <div>
      <CreateNewUserPageStudent />
      <div className='contenedorTeacher'>
        <HeaderTeacher />
        <InitialPartTeacher num = {props.num}/>
      </div>
    </div>
  )
}
