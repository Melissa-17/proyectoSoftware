import React, { useState } from "react";
import "./ModalAsesor.css";
import { axiosGetRegisteredAsesors } from "../../../api/User";
import CardAsesor from "./CardAsesor";
import { Paginacion } from "#Components/Pagination/Pagination.js";
import { GridLoader } from "react-spinners";
import { axiosAddAsesor } from "../../../api/Thesis";
import { axiosGetNoThesisUsers } from "../../../api/User";
import { axiosAddStudent } from "../../../api/Thesis";

export default function ModalAsesor({ closeMessage, option, thesisData, modalMensaje,modalMensaje2,modalMensajeAlumno,modalMensajeAlumno2 }) {
  const JWTtoken = sessionStorage.getItem("token");
  const [asesorList, setAsesorList] = useState([]);
  const [seleccionado, setSeleccionado] = useState(false);
  const [indexSeleccionado, setIndexSeleccionado] = useState(-1);
  const [asesorSeleccionado, setAsesorSeleccionado] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [alumnoList, setAlumnoList] = useState([]);
  const [isLoadingAlumno, setIsLoadingAlumno] = useState(true);

  //Paginación
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10000);
  const [count, setcount] = useState(0);
  const maximo = Math.ceil(count / porPagina);

  const funcionAsesor = () => {
    const commentNombre = document.querySelector(
      ".inputAsesorModalAsesor"
    ).value;

    axiosGetRegisteredAsesors(JWTtoken, -1, commentNombre, 1, porPagina)
      .then((response) => {
        const data = response.data || [];
        // console.log(data);
        setAsesorList(data.rows);
        setcount(data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
    setSeleccionado(false);
    // console.log(asesorList);
  };
  // console.log(option);

  
  
  const funcion = ()=>{
    if(option==1){
      // console.log(asesorList, count)
      return asesorList && count > 0 ? (
        asesorList.map((asesorItem, index) => {
          // console.log(asesorItem)
          return (
            <div key={index} className="espaciadoDeliverable">
              {/* {asesorItem ? ( */}
                {/* {console.log(<CardAsesor/>)} */}
                <CardAsesor
                  asesorItem={asesorItem}
                  index={index}
                  seleccionado={seleccionado}
                  setSeleccionado={setSeleccionado}
                  indexSeleccionado={indexSeleccionado}
                  setIndexSeleccionado={setIndexSeleccionado}
                  setAsesorSeleccionado={setAsesorSeleccionado}
                  option={1}
                />
                
              {/* ) : ( */}

                {/* <p>No tiene una lista de asesores</p> */}
              {/* )} */}
            </div>
          );
        })
      ): <p>No tiene una lista de asesores</p>
    }else if(option==2){
      // console.log(alumnoList);
      return(
        alumnoList && alumnoList.length > 0 ? (
          alumnoList.map((alumnoItem, index) => {
            return (
              <div key={index} className="espaciadoDeliverable">
                {alumnoItem ? (
                  <CardAsesor
                  asesorItem={alumnoItem}
                  index={index}
                  seleccionado={seleccionado}
                  setSeleccionado={setSeleccionado}
                  indexSeleccionado={indexSeleccionado}
                  setIndexSeleccionado={setIndexSeleccionado}
                  setAsesorSeleccionado={setAsesorSeleccionado}
                  option={2}
                />
                ) : (
                  <p>No tiene una lista de alumnos</p>
                )}
              </div>
            );
          })
        ):<p>No tiene una lista de alumnos</p>
      );
    }
  }

  return (
    <div className="modalMessageBackgroundMMM">
      <div className="contenedorModalAsesor">
        <div className="contenedorHeaderModalAsesor">
          {option == 1 ? (
            <div className="modalAsesor--title">
            <p className="asesor">Busqueda de Asesor</p>
            <p className="fs-6">Presione el botón de búsqueda para aplicar los criterios</p>
            </div>
          ) : (
            <div className="modalAsesor--title">
            <p className="alumno">Busqueda de Alumno</p>
            <p className="fs-6">Presione el botón de búsqueda para aplicar los criterios</p>
            </div>
          )}
          <button
            className="botonCerrarModalAsesor"
            onClick={() => {
              closeMessage(false);
            }}
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <hr color="black" className="lineaHorizontalModalAsesor" />

        <div className="busquedaModalAsesor">
          {option == 1 ? (
            <input
              placeholder="Ingrese un asesor"
              className="inputAsesorModalAsesor"
            />
          ) : (
            <input
              placeholder="Ingrese un alumno"
              className="inputAlumnoModalAsesor"
            />
          )}
          <button
            className="botonBusquedaModalAsesor"
            onClick={() => {
              if (option == 1) {
                funcionAsesor();
              } else {
                axiosGetNoThesisUsers(JWTtoken)
                .then((response) => {
                  const data = response.data || [];
                  // console.log(data);
                  setAlumnoList(data);
                  setIsLoadingAlumno(true);
                })
                .catch((error) => {
                  console.error(`Error: ${error}`);
                });
              }
            }}
          >
            <i class="bi bi-search"></i>
          </button>
        </div>

        <div className="contenedorListaModalAsesor">
          {!isLoading && !isLoadingAlumno ? (
            <GridLoader
              className="mx-auto"
              color="#042354"
              loading={isLoading? isLoading: isLoadingAlumno}
              size={24}
            />
          ) : funcion()}
        </div>
        <div className="botoneriaModalAsesor">
          {count > 0 || alumnoList.length>0 ? (
            <button
              className="Aceptar"
              onClick={() => {
                // console.log(asesorSeleccionado);
                if(option==1){
                  axiosAddAsesor(JWTtoken, thesisData.id, asesorSeleccionado.id)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                closeMessage(false);
                modalMensaje2(true);
                modalMensaje(true);
                }else{
                  // console.log(asesorSeleccionado.id);
                  axiosAddStudent(JWTtoken, thesisData.id, asesorSeleccionado.id)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                  closeMessage(false);
                  modalMensajeAlumno2(true);
                  modalMensajeAlumno(true);
                }
              }}
            >
              Aceptar
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
