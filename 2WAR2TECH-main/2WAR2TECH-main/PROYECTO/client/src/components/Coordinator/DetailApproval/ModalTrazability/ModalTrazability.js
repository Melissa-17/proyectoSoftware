import React, { useEffect, useState } from "react";
import { axiosGetTrazability } from "#API/Thesis";
import "./ModalTrazability.css";
import { GridLoader } from "react-spinners";
import Trazability from "./Trazability";
import { formatDate } from "../../../../helpers/assignmentHelpers";
import moment from "moment";
import { Paginacion } from "#Components/Pagination/Pagination.js";

function ModalTrazability(props) {
  const { closeMessage, thesisId } = props;
  const JWTtoken = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(1);
  const [trazabilityList, setTrazabilityList] = useState([]);

  const getTrazability = (page) => {
    axiosGetTrazability(JWTtoken, thesisId, page, porPagina)
      .then((response) => {
        //console.log(response.data);
        const list = response.data.rows || [];
        setTrazabilityList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getTrazability();
  }, []);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  // console.log(trazabilityList);

  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="MTbody">
          <div className="MTHeader">
            <p>Registro de cambios realizados</p>
            <button
              onClick={() => {
                closeMessage(false);
              }}
            >
              X
            </button>
          </div>
          <hr className="lineaMT" />
          <div className="MTContent">
            {isLoading ? (
                <GridLoader
                  className="mx-auto"
                  color="#042354"
                  loading={isLoading}
                  size={16}
                />
              ) : (
                trazabilityList.map((trazability, index) => {
                  let updateDate = formatDate(trazability.updatedAt,'DD/MM/YYYY - HH:mm');
                  return (

                    <Trazability
                    key={index}
                       updateDate={updateDate}
                      description={trazability.description}
                    />
                  );
                })
              )}
          </div>
          <div className="MTFooter">
            <Paginacion
              pagina={pagina}
              setPagina={setPagina}
              maximo={maximo}
              onClickHandler={getTrazability}
              setIsLoading={setIsLoading}
            />
            {/* PAGINACIÓN ACÁ */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalTrazability;
