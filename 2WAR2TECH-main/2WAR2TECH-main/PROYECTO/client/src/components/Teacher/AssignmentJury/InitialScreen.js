import React from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import '#Styles/Teacher/AssignmentJury/InitialScreen.css';
import Header from "../AssignmentJury/Header";
import MainContent from "./MainContent";
import { useLocation } from "react-router";


export default function InitialScreen (){

    const {courseId, semesterId} = useLocation().state;
    return(
        <div className="main-box-initial">
             <div className='navBar-t'>
                <CreateNewUserPageStudent/>
            </div>
            <div className='initial-page-screen'>
                 <Header
                 titulo='ASIGNACION DE JURADOS'/>
                <MainContent
                courseId = {courseId}
                semesterId={semesterId}/>
            </div>
        </div>
    );
}