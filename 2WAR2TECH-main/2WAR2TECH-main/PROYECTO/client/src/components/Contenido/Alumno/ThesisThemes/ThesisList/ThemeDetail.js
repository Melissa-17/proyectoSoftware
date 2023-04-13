import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "#Styles/Alumno/ThesisThemes/ThesisList/ThemeDetail.css";
import Navbar from "../../../../SidebarMenu/Navbar";
import MainListAddTeammate from "./MainListAddTeammate";
import { axiosGetThesisDetails } from "#API/Thesis";
import ThesisDetail from "./ThesisDetail";
import { axiosPostRequestThesis } from "../../../../../api/Thesis";
import { axiosGetUserInfo } from "#API/User";
import ModalsAlert from '../../../../Modals/ModalsAlert'
import { axiosPostTeam } from "../../../../../api/User";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import ModalsMessage from "../../../Profesor/ModalsMessage";
import { GridLoader } from "react-spinners";

function ThemeDetail() {
  const location = useLocation();
  const index = location.state.thesisId;
  const { habilitado } = location.state;
  const navigate = useNavigate();
  const [openAlert, setAlert] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const retrocesoClic = () => {
    navigate("/Thesis/list");
  };

  const [thesisDetail, setThesisDetail] = useState(null);
  let userInfo = useContext(UserContext);
  userInfo = userInfo ? userInfo : JSON.parse(localStorage.getItem('user'));
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [selectedTeammateList, setSelectedTeammateList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedTeammate, setSelecteTeammate] = useState(null);
  // const [team, setTeam] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");

  const getThesisDetail = () => {
    axiosGetThesisDetails(JWTtoken, index)
      .then((response) => {
        const data = response.data || [];
        // console.log("aaaaaa: " + JSON.stringify(data,null,2));
        setThesisDetail(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  // const getUserInfo = () => {
  //   axiosGetUserInfo(JWTtoken)
  //     .then((response) => {
  //       // console.log(response.data);
  //       const data = response.data || null;
  //       setUserInfo(data);
  //     })
  //     .catch((error) => {
  //       console.error(`Error: ${error}`);
  //     });
  // };

  useEffect(() => {
    getThesisDetail();
    // getUserInfo();
  }, []);


  const handleThesisSolitude = () => {
    console.log(selectedTeammateList);
    /* Registra a los miembros de la tesis y al mismo usuario */
    const groupIds = [...selectedTeammateList.map((e) => e.id), userInfo.id];
    console.log(groupIds);

    groupIds.map((id, index) => {
      axiosPostRequestThesis(JWTtoken, id, thesisDetail.id)
      .then((res) => {
        console.log(res);
        if (index === (groupIds.length-1)) {
          axiosPostTeam(JWTtoken, {"studentIds": groupIds, "thesisId": thesisDetail.id}) // Grupo
          .then((res) => {
              console.log(res);
            })
          .catch((err) => {
            console.error(`Error postTeam: ${err}`);
          });
        }
      })
      .catch((err) => {
        console.error(`Error Solicitar Tesis: ${err}`);
      })})
      
      setAlert(false);
      setOpenConfirmation(true)
    
    
    // axiosPostRequestThesis(JWTtoken, userInfo.id, thesisDetail.id)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.error(`Error Solicitar Tesis: ${err}`);
    // })
  }
  
  const redirect = () =>{
    setOpenConfirmation(false);
    navigate('/Thesis/request');
  }

  return (
    
    <div>
      <Navbar />
      <div className="themeDetailContainer">
        <div className="MDheader">
          <h1 className="MDtitle">DETALLE DE TEMA DE TESIS</h1>
          <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
              className="imagenRetrocesoDetalle"
            />
          </button>
        </div>
        <div className="contenedorLineaDetalle">
          <hr color="#CED4DA" className="linea" />
        </div>
        <div className="TSrequest">
          <button className="TSRequestBtn" onClick={setAlert} hidden={!habilitado}>Solicitar</button>
          {openAlert&&<ModalsAlert
                        closeAlert={setAlert}
                        action={handleThesisSolitude}
                        alertText="¿Está seguro que desea hacer esta solicitud? "
                        messageText="Se ha solicitado con exito el tema de Tesis"
                    />}
          {
            openConfirmation&&<ModalsMessage 
                        closeMessage={redirect}
                        closeOtroModal={redirect}
                        closeunmodalmas={redirect}
                        from='solicitudes-detail'
                        message='Se ha solicitado con éxito'/>
          }          
        </div>
        
        {
          isLoading ?
            <GridLoader
                    className="mx-auto"
                    color="#042354"
                    loading={isLoading}
                    size={24}
              />
              :
        thesisDetail ? (
          <div key={index} className="detailed">
            
            <ThesisDetail
              thesis={thesisDetail}
            />
          </div>
        ) : (
          <p>Aún no hay detalle de tesis</p>
        )} 

        <div className="contenedorLineaDetalle">
          <hr color="#CED4DA" className="linea" />
        </div>
        <div className="addTeam">
          <MainListAddTeammate 
          selectedTeammate={selectedTeammate}
          setSelectedTeammate={setSelectedTeammate}
          selectedTeammateList={selectedTeammateList}
          setSelectedTeammateList={setSelectedTeammateList}
          />
        </div>
      </div>
    </div>
  );
}

export default ThemeDetail;
