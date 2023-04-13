import React, { useState, useEffect } from "react";
import CreateNewUserPageStudent from "../../../pages/CreateNewUserPage/Student";
import HeaderJury from "./HeaderJury";
import "../../../assets/styles/Jury/Deliverable/DeliverableJury.css";
import Combobox from "react-widgets/Combobox";
import { axiosGetSemestresbyUserId } from "#API/Semestres.js";
import IconTesis from "./IconTesis";
import { axiosGetThesisList } from "../../../api/Thesis";
import { Paginacion } from "#Components/Pagination/Pagination.js";

export default function DeliverableJury() {
  const [specialityList, setSpecialityList] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState();
  const [thesisList, setThesisList] = useState([]);

  const JWTtoken = localStorage.getItem("token");

  const getAllSemestresLista = () => {
    axiosGetSemestresbyUserId(JWTtoken)
      .then((response) => {
        // console.log(response);
        const list = response.data || [];
        setSpecialityList(list);
        setSelectedSpeciality(list[list.length - 1]);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllSemestresLista();
  }, []);

  const handleSemesterChange = (e) => {
    setSelectedSpeciality(e);
  };

  const getThesisList = () => {
    axiosGetThesisList(JWTtoken)
      .then((response) => {
        const list = response.data || [];
        setThesisList(list);
        console.log(list);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getThesisList();
  }, []);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);

  const maximo = Math.ceil(thesisList.length / porPagina);

  return (
    <div>
      <CreateNewUserPageStudent />
      <div className="contenedorDeliverableJury">
        <HeaderJury title={"ENTREGABLES"}/>
        <div className="FirstPart">
          <div className="contenedorComboEspecialidad">
            <h4>Especialidad</h4>
            <div>
              <Combobox
                onChange={handleSemesterChange}
                value={selectedSpeciality}
                dataKey="id"
                textField="abbreviation"
                data={specialityList}
              />
            </div>
          </div>

          <div className="contenedorNombreDeliverableJury">
            <p>Nombre</p>
            <div>
              <input
                type="tel"
                placeholder="Ingrese un nombre"
              />
            </div>
          </div>

          <div className="contenedorBotonBuscar">
            <button className="botonBuscarDeliverableJury">
              Buscar
            </button>
          </div>

        </div>
        <div>
          <hr color="black" className="lineaContenidoHeaderJury" />
        </div>

        <div className="contenidoTesis">
          {thesisList
            .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
            .map((thesisAssign, index) => {
              return (
                <div key={index} className="espaciadoPartial">
                  <IconTesis
                    thesis={thesisAssign}
                    numero={(pagina - 1) * porPagina + (index + 1)}
                  />
                </div>
              );
            })}
        </div>
        <div className="contenedorBotoneriaEntregable">
          <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </div>
    </div>
  );
}
