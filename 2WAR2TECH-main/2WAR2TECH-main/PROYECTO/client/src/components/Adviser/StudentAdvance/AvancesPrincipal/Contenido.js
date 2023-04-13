import React, { useEffect, useState } from "react";
import { axiosGetAdvanceList } from "#API/Advance.js";
import Buttons from "#Components/Student/InitialPart/Buttons";
import moment from "moment";
import { getValorEstado } from "#Helpers/getValorEstado";
// import Icon from '../../../Student/InitialPart/Icon';
import IconAvances from "./IconAvances";
// import '../../../assets/styles/Student/InitialPart/Deliverable.css';
// import InforDeliv from '../../../Student/InitialPart/InforDeliv';
import CreateNewUserPageStudent from "#Pages/CreateNewUserPage/Student";
import "#Styles/Alumno/AvancesPrincipal/Contenido.css";
import { GridLoader } from "react-spinners";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { axiosGetAdvanceListByUserId } from "#API/Advance";

export default function AvancesPrincipal(props) {
  const [advanceList, setAdvanceList] = useState([]);
  const { student, course, index } = props;
  const locateIndex = index;
  const [count, setcount] = useState(0);
  const JWTtoken = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  const getAllAdvanceList = (page) => {
    axiosGetAdvanceListByUserId(
      JWTtoken,
      student.id,
      page,
      porPagina,
      tipoSeleccionado,
      course.id
    )
      .then((response) => {
        console.log(response.data);
        const list = response.data.rows || [];
        setAdvanceList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error Advance: ${error}`);
      });
  };

  useEffect(() => {
    getAllAdvanceList();
  }, [tipoSeleccionado]);

  const funcionEstado = (estado) => {
    if (estado == "Asignado") return 3;
    else if (estado == "Calificado") return 1;
    else if (estado == "Entregado") return 2;
    else if (estado == "Visto Bueno") return 4;
  };

  const handleChange = (e) => {
    var a = document.getElementById("seleccionPartialAdvisor").value;
    setTipoSeleccionado(a);
    // console.log(a);
  };

  return (
    <div className="todoAvancePrincipal">
      <div className="contenedorDeliverable">
        {/* <div className='contenedorSubtitulos'>
                <InforDeliv />
            </div> */}
        <hr color="black" className="lineaContenidoAvance" />

        <div className="contenedorBotonFiltroAvance">
          <button className="botonFiltroEntregableFinal">
            <i class="bi bi-funnel"></i>
            <select
              className="seleccionPartialAdvisor"
              id="seleccionPartialAdvisor"
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

        <div className="contenedorFilasAvance">
          {isLoading ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading}
              size={24}
            />
          ) : advanceList && count ? (
            advanceList.map((advance, index) => {
              let limitCompleteDate = new Date(
                advance.ASSIGNMENT.limitCompleteDate
              );

              let updateDate = new Date(advance.updatedAt);

              limitCompleteDate =
                moment(limitCompleteDate).format("DD/MM/YYYY");
              updateDate = moment(updateDate).format("DD/MM/YYYY");

              const valorEstado = getValorEstado(advance.status);
              var nume = funcionEstado(advance.status);

              return (
                <div key={index} className="espaciadoAvance">
                  <IconAvances
                    idAvance={advance.id}
                    numero={(pagina - 1) * porPagina + (index + 1)}
                    fecha={limitCompleteDate}
                    valor={nume}
                    fechaCorregido={updateDate}
                    entregable={1}
                    student={student}
                    course={course}
                    index={locateIndex}
                  />
                </div>
              );
            })
          ) : (
            <div className="contenedorNoAvanceAsignados">
              {tipoSeleccionado != "" ? (
                <p>No tiene Avance de tipo "{tipoSeleccionado}"</p>
              ) : (
                <p>No tiene Avances</p>
              )}
            </div>
          )}
          <div className="contenedorBotoneriaEntregable">
            {advanceList && count > 0 ? (
              <Paginacion
                pagina={pagina}
                setPagina={setPagina}
                maximo={maximo}
                onClickHandler={getAllAdvanceList}
                setIsLoading={setIsLoading}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
