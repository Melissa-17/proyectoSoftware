import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../../SidebarMenu/Navbar";
import Detailed from "./Detailed";
import { useParams, useLocation } from "react-router-dom";
import { axiosGetThesisDetails } from "#API/Thesis.js";
import "#Styles/Adviser/ThesisThemes/ThesisFiles/AdviserProposeDetail.css";
import { GridLoader } from "react-spinners";

function AdviserProposeDetail() {
  const location = useLocation();
  const {thesisId}  = location.state;
  const navigate = useNavigate();
  const retrocesoClic = () => {
    navigate("/asesor/contentPropose");
  };
  const [isLoading, setIsLoading] = useState(false);

  const JWTtoken = sessionStorage.getItem("token");
  const [thesis, setThesis] = useState(null);
  // console.log(thesisId);
  
  const getDetailThesis = () => {
    setIsLoading(true);
    axiosGetThesisDetails(JWTtoken, thesisId)
      .then((response) => {
        // console.log(response.data)
        const data = response.data || [];
        setThesis(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getDetailThesis();
  },[]);

  return (
    <div>
      <Navbar />
      <div className="proposeDetailContainer">
        <div className="APDheader">
          <h1 className="PDtitle">DETALLE PROPUESTA TESIS</h1>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
        <hr color="#CED4DA" className="linea" />
        <div className="detailContainer">
          {isLoading ? 
          <GridLoader
          className="mx-auto"
          color="#042354"
          loading={isLoading}
          size={24}
        /> 
        :
        thesis ?
          <Detailed
            titulo={thesis.title ? thesis.title : "No hay titulo"}
            area={thesis.areaName ? thesis.areaName : "No hay area"}
            objetivo={thesis.objective ? thesis.objective : "No hay objectivo"}
            descripcion={thesis.description ? thesis.description : "No hay descripción"}
            FILEs={thesis.FILEs}
            thesis={thesis}
          />: "No hay detalle"}
        </div>
        {/* <div className="detailFooter">
          <button className="MLRequestBtn" type="button">
            Editar
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default AdviserProposeDetail;
