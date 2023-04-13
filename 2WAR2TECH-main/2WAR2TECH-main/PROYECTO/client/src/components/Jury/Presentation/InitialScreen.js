import React from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import '#Styles/Jury/Presentation/InitialScreen.css';
import Header from './Header.js';
import MainContent from "./MainContent.js";
import { useParams } from "react-router";

export default function InitialScreen(){
    const params = useParams();
    return(
        <div className="main-box-initial">
            <div className="navBar-j">
                <CreateNewUserPageStudent />
            </div>
            <div className="initial-page-jury">
                <Header/>
                <hr className="espacio" style={{marginLeft:"0px"}}></hr>
                <MainContent num={params.num}/>
            </div>
        </div>
    );
}