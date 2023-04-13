import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StaffCard from "./StaffCard";
import { axiosSeekerBySpecialtyAndRole } from "#API/Seeker.js";
import "#Styles/Teacher/Timeline/PrincipalPart/PrincipalPart.css";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import ModalsAlert from "../../Modals/ModalsAlert";
import ModalConfirmated from "../../Coordinator/Curso/ModalConfirmated";

function OptionJuryMan() {
  const navigate = useNavigate();

  const mantienePantalla = () => {
    navigate("/template/optionJuryMan");
  };

  const [juryList, setJuryList] = useState([]);
  const [tipo, setTipo] = useState("Jurado");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState(0);
  const JWTtoken = sessionStorage.getItem("token");

  const [deleteList, setDeleteList] = useState([]);
  const [modalMensaje, setModalMensaje] = useState(false);
  const [modalConfirmacionSeleccionado, setModalConfirmacionSeleccionado] =
    useState(false);
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const getAllJuryList = (page) => {
    axiosSeekerBySpecialtyAndRole(JWTtoken, tipo, inputText, page, porPagina)
      .then((response) => {
        const list = response.data.rows || [];
        setJuryList(list);
        setcount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllJuryList();
  }, [inputText]);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(count / porPagina);

  return (
    <div>
      <div className="CoordMain">
        {isLoading ? (
          <GridLoader
            className="mx-auto"
            color="#042354"
            loading={isLoading}
            size={24}
          />
        ) : juryList && juryList.length > 0 ? (
          juryList
            // .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
            .map((teacher, index) => {
              return (
                <div key={index} className="espacioTeacher">
                  <StaffCard profesor={teacher} deleteList={deleteList} setDeleteList={setDeleteList}/>
                </div>
              );
            })
        ) : (
          "No hay jurados"
        )}
      </div>

      <div className="contenedorBotoneriaEntregable">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          maximo={maximo}
          onClickHandler={getAllJuryList}
          setIsLoading={setIsLoading}
        />
      </div>
      <div className="">
        {modalConfirmacionSeleccionado && (
          <ModalsAlert
            alertText="¿Seguro que desea borrar el (los) jurado (s)?"
            closeAlert={setModalConfirmacionSeleccionado}
            closeMensaje={setModalMensaje}
            deleteList={deleteList}
            setDeleteList={setDeleteList}
            source="JURADO"
          />
        )}
        {modalMensaje && (
          <ModalConfirmated
            closeMessage={setModalMensaje}
            message="Se ha eliminado correctamente"
          />
        )}
      </div>
    </div>
  );
}

export default OptionJuryMan;
