import React, { useEffect, useState } from "react";
import "#Styles/Alumno/ThesisThemes/ThesisList/MainListRow.css";
import { useNavigate } from "react-router-dom";
import { axiosGetThesisList } from "#API/Thesis";
import { axiosGetUserInfo } from "#API/User";
import { capitalize } from "#Helpers/stringHelpers";
import { axiosPostRequestThesis } from "#API/Thesis";
import ModalsAlert from '../../../../Modals/ModalsAlert'
import ModalsComplete from "../../../../Modals/ModalsComplete";
import ModalsMessage from "../../../Profesor/ModalsMessage";
import { axiosPostTeam } from "../../../../../api/User";
function MainListRow(props) {
  const navigate = useNavigate();
  const JWTtoken = sessionStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);
  const [openAlert, setAlert] = useState(false);

  const seeClic = () => {
    navigate("/Thesis/theme", {
      state: {
        thesisId: props.index,
        habilitado: props.habilitado
      }
    });
  };

  const getUserInfo = () => {
    axiosGetUserInfo(JWTtoken)
      .then((response) => {
        // console.log(response.data);
        const data = response.data || null;
        setUserInfo(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleThesisSolitude = () => {
    // console.log(userInfo.id, thesisDetail.id);
    axiosPostRequestThesis(JWTtoken, userInfo.id, props.index)
    .then((res) => {
      axiosPostTeam(JWTtoken, {"studentIds": [userInfo.id], "thesisId": props.index}) // Grupo
          .then((res) => {
              // console.log("A");
              console.log(res);

            })
          .catch((err) => {
            console.error(`Error postTeam: ${err}`);
          });
      // console.log(res);
    })
    .catch((err) => {
      console.error(`Error Solicitar Tesis: ${err}`);
    })
    setAlert(false);
    // setOpenConfirmation(true);
    console.log('hola');
    props.confirmation(true);
  }

  return (
    <div className="MLcomponentList">
      <div className="MLcardList">
        <div className="MLcardData">
          <p className="MLcardTitle">
            {(props.title).toUpperCase()}
          </p>
        </div>
        <div className="MLcardAdviser">
          {props.adviserPfp?
          <img
          className="MLcardpfp"
          src={props.adviserPfp}
          alt="foto asesor"
        />
        :
        <img
            className="MLcardpfp"
            src="https://wallpapercave.com/uwp/uwp2417748.png"
            alt="foto asesor"
          />  
        }
          <p className="MLcardName">
            <strong>{props.adviserName} {props.adviserFLastame} {props.adviserMLastame} </strong>
          </p>
          <p className="MLcardSpecialty">Ingeniería Informática</p>
        </div>
        <div className="MLcardButtons">
          <button className="MLSeeDetailBtn" onClick={seeClic} type="button">
            Ver detalle
          </button>
          <button className="MLRequestBtn" onClick={setAlert} type="button" hidden={!props.habilitado}>Solicitar</button>
          {openAlert&&<ModalsAlert
                        closeAlert={setAlert}
                        action={handleThesisSolitude}
                        alertText="¿Está seguro que desea hacer esta solicitud? "
                        messageText="Se ha solicitado con exito el tema de Tesis"
                        source="Alumno-ListaDeTemas"
                    />}
        </div>
      </div>
    </div>
  );
}

export default MainListRow;
