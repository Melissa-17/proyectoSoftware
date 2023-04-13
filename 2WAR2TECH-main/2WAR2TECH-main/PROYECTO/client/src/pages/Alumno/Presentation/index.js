import Sidebar from "../../../components/SidebarMenu/Student";
import React, { useState, createContext, useContext, useEffect } from "react";
import "#Styles/Student/Presentation/index.css";
import PartialDeliverable from "../../../components/Student/Presentation/PartialDeliverable";
import { Route, Routes, useLocation } from "react-router-dom";
import InfoPresentation from "../InfoPresentation";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import Loading from "../../../components/Loading/Loading"; //ACA
import DatesInfo from "./DatesInfo";
import { axiosGetPresentationAssignmentList } from "#API/PresentationAssignment";
import Navbar from "../../../components/SidebarMenu/Navbar.js";
import { useNavigate } from "react-router-dom";

function Presentation() {
  const { cxsid, courseName } = useLocation().state;
  const navigate = useNavigate();
  const JWTtoken = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const [presentationAssignList, setPresentationAssignList] = useState([]);

  // console.log(cxsid);

  const gettAllPresentationAssignList = (page) => {
    axiosGetPresentationAssignmentList(JWTtoken, page, porPagina, cxsid)
      .then((response) => {
        console.log(response.data);
        const list = response.data.rows || [];
        setPresentationAssignList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    gettAllPresentationAssignList();
  }, []);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  const retrocesoClic = () => {
    navigate("/mycourses/selection",{
      state:{
        cxsid:cxsid,
        courseName:courseName,
      }
    });
  };

  return (
    <div className="main-page-presentation">
      <Navbar />
      {/* <CreateNewUserPageStudent /> */}
      <div className="main-box">
        <div className="header">
          <h1 className="titulo">Presentación Oral</h1>
          <div className="contenedorBotonVisualPart">
            <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                className="imagenRetrocesoDetalle"
              />
            </button>
          </div>
        </div>
        <hr className="lineaPresentacion" color="black" />
        <div className="contentIndexPresentation">
          {presentationAssignList ? (
            <PartialDeliverable cxsid={cxsid} courseName={courseName} />
          ) : (
            <DatesInfo message="Todavía no tienes alguna presentación oral programada." />
          )}
          {/* <PartialDeliverable cxsid={cxsid} courseName={courseName}/> */}
          {/* <Routes>
            <Route path="/*" element={<PartialDeliverable />} />
            {/* <Route path='/*' element={<InfoPresentation/>} /> 
          </Routes> */}
        </div>
        <div className="presentationFooter"></div>
      </div>
    </div>
  );
}

export default Presentation;
