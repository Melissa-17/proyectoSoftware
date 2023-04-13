import React, {useEffect, useState} from "react";
import Header from "./Header";
import "../../../../assets/styles/Teacher/Timeline/VisualPart/VisualPart.css";
import { useParams } from "react-router";
import CreateNewUserPageStudent from "../../../../pages/CreateNewUserPage/Student";
import { useNavigate, useLocation } from "react-router";
import { axiosGetDetailAssignment } from "../../../../api/AssignmentStudent";
import { formatDate } from '#Helpers/assignmentHelpers.js';
import { GridLoader } from "react-spinners";
import ModalValidacion from "../../../Admin/Semester/ModalValidacion";

export default function VisualPart() {
  const params = useParams();
  const navigate = useNavigate();
  const { cxsid, id, entregable } = useLocation().state;

  const [assignDetail, setAssignDetail] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const JWTtoken = sessionStorage.getItem("token");

  const getAssignDetail = () => {
    axiosGetDetailAssignment(JWTtoken, id)
      .then((response) => {
        const data = response.data || "";
        // console.log(data);
        setAssignDetail(data);
        setLoading(false);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error Final Assign Detail: ${error}`);
      });
  };

  useEffect(() => {
    getAssignDetail();
  }, []);

  const cambioEditar = () =>{
    navigate("/timeline/edit",{
        state:{
            num:params.num,
            numero:2,
            cxsid:cxsid,
            id:id,
            entregable:entregable
        }
    });
  }

  const [validacion, setValidacion] = useState(false);

  const cambioRubrica = () =>{
    if(assignDetail.RUBRICId){
      navigate(`/timeline/rubrica/${params.num}`,{
        state:{
          cxsid:cxsid,
          id:id,
          rubricId: assignDetail.RUBRICId
        }
      });
    }else setValidacion(true);
  }

  return (!isLoading?
    <div className="contenedorVisualPartGlobal">
      <CreateNewUserPageStudent />
      <div className="contenedorVisualPart">
        <div className="contenedorInfoGeneralVisualPart">
          <div className="contenedorHeaderVisualPart">
            <Header num={params.num} cxsid={cxsid} entregable={assignDetail}/>
          </div>
          {/* {console.log(assignDetail)} */}
          <div className="infoGeneral">
            <div className="tituloInfoGeneralVisualPart">
              <div className="tituloBtn"> 
              {/* {console.log(assignDetail)} */}
                <button className="botonVerRubrica" onClick={cambioRubrica}>Ver rúbrica</button>
                <button className="btnEditar" onClick={cambioEditar}>Editar</button>
              </div>
            </div>
          </div>

            <div className="unidadVisualPart">
                <p className="nombre">Nombre de unidad</p>
                <p className="unidad">{assignDetail.assignmentName? assignDetail.assignmentName : "No tiene nombre"}</p>
            </div>

            <div className="contenedorFechaVisualPart">
                <div className="fechaSubida">
                    <p className="titulo">Fecha de subida al repositorio</p>
                    <p className="fecha">
                      {assignDetail.limitRepositoryUploadDate? formatDate(assignDetail.limitRepositoryUploadDate,"DD/MM/yyyy hh:mm"):
                      <p>No ha subido aún</p>}
                      </p>
                </div>
                <div className="fechaLimiteEnvio">
                    <p className="titulo">Fecha límite de envío</p>
                    <p className="fecha">{formatDate(assignDetail.limitCompleteDate,"DD/MM/yyyy hh:mm")}</p>
                </div>
                <div className="fechaLimiteCalificacion">
                    <p className="titulo">Fecha límite de calificación</p>
                    <p className="fecha">{formatDate(assignDetail.limitCalificationDate,"DD/MM/yyyy hh:mm")}</p>
                </div>
            </div>
            
            {/* {console.log(assignDetail)} */}
            <div className="responsableVisualPart">
                <p className="responsable">Responsable(s)</p>
                {assignDetail.ROLEs? assignDetail.ROLEs.map((roleAssign) => {
                  if (roleAssign && roleAssign.ASSIGNMENT_X_ROLE && roleAssign.ASSIGNMENT_X_ROLE.name == "Evaluador")
                  return (
                    <ul>
                      <li>{roleAssign.description}</li>
                    </ul>
                  );
                }):<p>No hay roles asignados</p>}
            </div>

            <div className="contenedorEntregableVisualPart">
                <p className="entregable">Entregable(s)</p>
                {assignDetail.ASSIGNMENT_TASKs && assignDetail.ASSIGNMENT_TASKs.length != 0? 
                assignDetail.ASSIGNMENT_TASKs.map((taskAssign) => {
                  return (
                    <ul>
                      <li>{taskAssign.name}</li>
                    </ul>
                  );
                }):<p className="fallo">No hay entregas hechas</p>}
                {/* <ul>
                    <li>Reporte de ejecución de la revisión</li>
                    <li>Formulario de extracción</li>
                </ul> */}
            </div>

            
            <div className="botoneriaVisualPart">
                {/* <button className="botonDescarga">Descargar rúbrica</button> */}
                
            </div>

            <div>
              {validacion && <ModalValidacion 
              closeMessage={setValidacion}
              message="No contiene rubrica disponible."
              />}
            </div>
        </div>
      </div>
    </div>: 
    <GridLoader
    className="mx-auto"
    color="#042354"
    loading={isLoading}
    size={24}
  />
  );
}
