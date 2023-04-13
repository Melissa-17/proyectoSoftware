import React, { useEffect } from 'react'
import CreateNewUserPageStudent from '../../../pages/CreateNewUserPage/Student'
import Header from './Header';
import '#Styles/Teacher/Presentation/InitialScreen.css';
import MainContent from './MainContent.js';
import { useLocation } from 'react-router';
import MainCards from './MainCards';


export default function InitialScreen(){

    const {courseId,semesterId} = useLocation().state;

    return(
        
        <div className='general-box'>
            <div className='navBarT'>
                <CreateNewUserPageStudent/>
            </div>
            <div className='initial-page'>
                <Header
                titulo='EXPOSICIONES'/>
                {/* <MainContent
                cxsid={cxsid}/> */}
                <MainCards
                courseId={courseId}
                semesterId={semesterId}/>
            </div>
        </div>      
    )
}