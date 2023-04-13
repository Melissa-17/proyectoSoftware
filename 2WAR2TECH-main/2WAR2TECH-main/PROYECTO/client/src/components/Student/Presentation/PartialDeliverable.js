import React, { useEffect, useState } from "react";
import { axiosGetPresentationAssignmentList } from "#API/PresentationAssignment";
import "../../../assets/styles/Student/Presentation/PartialDeliverable.css";
import Buttons from "../InitialPart/Buttons.js";
import IconDeliverable from "../Presentation/IconDeliverable";
import { getValorEstado } from "#Helpers/getValorEstado";
import moment from "moment";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import DatesInfo from "../../../pages/Alumno/Presentation/DatesInfo";

export default function PartialDeliverable(props) {
  const { cxsid, courseName } = props;
  const [presentationAssignList, setPresentationAssignList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const JWTtoken = sessionStorage.getItem("token");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  // console.log(cxsid);

  const gettAllPresentationAssignList = (page) => {
    axiosGetPresentationAssignmentList(JWTtoken, page, porPagina, cxsid, tipoSeleccionado)
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
  }, [tipoSeleccionado]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  const funcionEstado = (estado) => {
    if (estado == "Asignado") return 3;
    else if (estado == "Calificado") return 1;
    else if (estado == "Entregado") return 2;
  };

  const handleChange = (e) => {
    var a = document.getElementById("seleccionFiltroAvance").value;
    setTipoSeleccionado(a);
    // console.log(a);
  };

  return (
    <div className="contenedorGeneralPresentacion">
      <div className="contenedorNotificacionPartialDeliverable">
        <DatesInfo message="¡No olvides revisar bien la fecha, hora y ubicación de tus presentaciones!" />
      </div>

      <div className="contenedorBotonFiltroExposicion">
        <button className="botonFiltroEntregableFinal">
          <i class="bi bi-funnel"></i>
          <select
            className="seleccionFiltroAvance"
            id="seleccionFiltroAvance"
            onChange={handleChange}
          >
            <option value={""}>TODOS</option>
            <option value={"Calificado"}>Calificado</option>
            <option value={"Visto Bueno"}>Visto Bueno</option>
            <option value={"Entregado"}>Entregado</option>
            <option value={"Asignado"}>Asignado</option>
          </select>
        </button>
      </div>

      <div className="contenedorFilasPresentacion">
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : presentationAssignList && count > 0 ? (
          presentationAssignList.map((presentationAssign, index) => {
            console.log(presentationAssign);
            let limitCompleteDate = presentationAssign.ASSIGNMENT
              .limitCompleteDate
              ? new Date(presentationAssign.ASSIGNMENT.limitCompleteDate)
              : null;

            let updateDate = presentationAssign.updatedAt
              ? new Date(presentationAssign.updatedAt)
              : null;

            limitCompleteDate = limitCompleteDate
              ? moment(limitCompleteDate).format("DD/MM/YYYY")
              : "-";
            updateDate = updateDate
              ? moment(updateDate).format("DD/MM/YYYY")
              : "-";

            const valorEstado = getValorEstado(presentationAssign.status);
            var nume = funcionEstado(presentationAssign.status);

            return (
              <div key={index} className="espaciadoPresentacion">
                <IconDeliverable
                  idExposicion={presentationAssign.id}
                  numero={(pagina - 1) * porPagina + (index + 1)}
                  fecha={limitCompleteDate}
                  valor={nume}
                  fechaCorregido={updateDate}
                  entregable={1}
                  numeroEnviar={4}
                  cxsid={cxsid}
                  courseName={courseName}
                />
              </div>
            );
          })
        ) : (
          <div className="contenedorNoAvanceAsignados">
            {tipoSeleccionado != "" ? (
              <p>No tiene Exposicion de tipo "{tipoSeleccionado}"</p>
            ) : (
              <p>No tiene Exposiciones</p>
            )}
          </div>
        )}
      </div>
      <div className="opcionesPresentacion">
        {presentationAssignList && count > 0 ? (
          <Paginacion
            pagina={pagina}
            setPagina={setPagina}
            maximo={maximo}
            onClickHandler={gettAllPresentationAssignList}
            setIsLoading={setIsLoading}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
