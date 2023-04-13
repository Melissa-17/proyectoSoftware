import React from 'react'
import HeaderAdviser from './Header'
import InitialPartAdviser from './InitialPart'
import CreateNewUserPageStudent from '../../../pages/CreateNewUserPage/Student'
import '../../../assets/styles/Adviser/InitialScreen/FirstAdviser.css'

export default function FirstAdviser() {
  return (
    <div>
      <CreateNewUserPageStudent />
      <div className='contenedorAsesor'>
        <HeaderAdviser />
        <InitialPartAdviser/>
      </div>
    </div>
  )
}
