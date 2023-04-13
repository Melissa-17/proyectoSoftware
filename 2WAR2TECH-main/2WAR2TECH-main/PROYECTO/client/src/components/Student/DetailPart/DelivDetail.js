import React, { useState, createContext, useContext, useEffect } from "react";
import "#Styles/Student/DetailPart/DelivDetail.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InitialPart from "./InitialPart";
import FinalPart from "./FinalPart";
import MiddlePart from "./MiddlePart";
import { axiosGetFinalAssignmentDetail } from "#API/FinalAssignment.js";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import Loading from "../../Loading/Loading";

export default function DelivDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const locateindex = location.state.index;
  const { cxsid, courseName } = useLocation().state;
  // const [docs, setDocs] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [isLoadingDocsRetro, setIsLoadingDocsRetro] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [finalAssign, setFinalAssign] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");

  const getAllFinalAssign = () => {
    axiosGetFinalAssignmentDetail(JWTtoken, params.id)
      .then((response) => {
        const data = response.data || "";
        console.log(data);
        setFinalAssign(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error Final Assign Detail: ${error}`);
      });
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     getAllFinalAssign();
  //     setLoading(true);
  //     const a = await setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //   }

  //   fetchData();
  // }, [setLoading]);

  useEffect(() => {
    getAllFinalAssign();
  }, [openConfirm])

  const retrocesoClic = () => {
    if (params.option == 2) navigate("/entregable/partial", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      }
    });
    else if (params.option == 1) navigate("/entregable/deliverable", {
      state: {
        cxsid: cxsid,
        courseName: courseName,
      }
    });
    else if(params.option == 0) navigate("/Asesor/second");
  };

  const [value, setValue] = useState();
  const refreshPage = () => {
    // const [value, setValue] = useState();
    setValue({})
    // console.log('Holaaaa')
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="todoDeliverable">
          <CreateNewUserPageStudent />
          <div className="contenedorDetalle">
            <div className="contenedorEncabezadoDetalle">
              <div className="contenedorTitutoDetalle"
              style={{marginRight:"520px"}}
              >
                <h1 className="titulo">ENTREGABLES </h1>
              </div>
              <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>

            <div className="contenedorLineaDetalle">
            <hr color="black" className="lineaContenidoAvance" style={{width:"1100px", marginBottom:"20px",marginTop:"10px"}}/>
            </div>
            <InitialPart courseName={courseName} assign={finalAssign} />
            <MiddlePart
              // docs={docs}
              // setDocs={setDocs}
              valor={params.id}
              opcion={params.option}
              assign={finalAssign}
              index={locateindex}
              getAssignDetail={getAllFinalAssign}
              isLoadingDocs={isLoadingDocs}
              setIsLoadingDocs={setIsLoadingDocs}
              isLoadingDocsRetro={isLoadingDocsRetro}
              setIsLoadingDocsRetro={setIsLoadingDocsRetro}

              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}

              cxsid={cxsid}
              courseName={courseName}

            />
            <FinalPart 
            assign={finalAssign}
            funcion = {refreshPage} />
          </div>
        </div>
      )}
    </div>
  );
}
