import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Buffer } from "buffer";
import Navbar from "../../SidebarMenu/Navbar";
import "../../../assets/styles/Teacher/Reporte/StuReportDetail.css";
import {
  axiosGetUserReport,
  axiosGetAllCalUserReport,
} from "../../../api/Reporte";
import LineChartNotas from "./LineChartNotas";
import LineChartNotasEParciales from "./LineChartNotas";
import { GridLoader } from "react-spinners";
import ReactHMLTableToExcel from "react-html-table-to-excel";
import { Table } from "react-bootstrap";

function StuReportDetail() {
  const location = useLocation();
  const { student, course, semester } = location.state;
  const JWTtoken = localStorage.getItem("token");
  console.log(student, course, semester);
  const [data, setData] = useState(null);
  const [dataAlumno, setDataAlumno] = useState(null);
  const [dataExcel, setDataExcel] = useState(null);
  const [dataLineE, setDataLineE] = useState(null);
  const [dataLineEP, setDataLineEP] = useState(null);
  const [dataAlumnoOrden, setDataAlumnoOrden] = useState(null);
  const dataColum = ["Código", "Nombre Completo"];
  const dataBody = [];

  const [listaEntregables, setlistaEntregables] = useState([]);
  const [listaEntregablesParciales, setlistaEntregablesParciales] = useState(
    []
  );
  const [labelsEntregables, setlabelsEntregables] = useState([]);
  const [labelsEntregablesParciales, setlabelsEntregablesParciales] = useState(
    []
  );

  const procesarDatos = (data) => {
    console.log(data);
    //ENTREGABLES
    const tamanhoEntregables =
      data && data.PE && data.PE.pe && data.PE.pe.length
        ? data.PE.pe.length
        : 0;

    // var listaEntregables = [];
    // var labelsEntregables = [];
    for (let index = 0; index < tamanhoEntregables; index++) {
      listaEntregables[index] = data.PE.pe[index].ASSIGNMENT.score;
      labelsEntregables[index] = data.PE.pe[index].ASSIGNMENT.chapterName;
    }

    //ENTREGABLES FINALES
    const tamanhoEntregablesParciales =
      data && data.PEP && data.PEP.pep && data.PEP.pep.length
        ? data.PEP.pep.length
        : 0;

    // var listaEntregablesParciales = [];
    // var labelsEntregablesParciales = [];
    for (let index = 0; index < tamanhoEntregablesParciales; index++) {
      listaEntregablesParciales[index] = data.PEP.pep[index].ASSIGNMENT.score;
      labelsEntregablesParciales[index] =
        data.PEP.pep[index].ASSIGNMENT.chapterName;
    }

    // return { listaEntregables, listaEntregablesParciales, labelsEntregables, labelsEntregablesParciales };
    return;
  };

  const getDataReport = () => {
    course &&
    course.id &&
    student &&
    student.id
      ? axiosGetUserReport(JWTtoken, course.id, student.id)
          .then((response) => {
            console.log(response.data);
            setData(response.data);
            setDataAlumnoOrden({
              nombreAlumno:
                response.data.alumno.name +
                " " +
                response.data.alumno.fLastName +
                " " +
                response.data.alumno.mLastName,
              codigo: response.data.alumno.idPUCP,
              notasPorTipo: response.data.alumno.PROMEDIOS.map((e) => {
                return {
                  titulo: e[0].titulo,
                  prom: e[1].prom,
                  notas: e[2].s.map((j) => {
                    return {
                      nombreAssignment: j.ASSIGNMENT.chapterName,
                      scoreAssignment: j.ASSIGNMENT.score,
                    };
                  }),
                };
              }),
            });
          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          })
      : (() => {})();
  };

  useEffect(() => {
    getDataReport();
  }, []);

  const getDataReportAlumno = () => {
    axiosGetAllCalUserReport(JWTtoken, course.COURSEId, semester.id, student.id)
      .then((response) => {
        console.log(response.data);
        setDataAlumno(response.data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getDataReportAlumno();
  }, []);

  return student && course ? (
    <div className="contenedorAsesor">
      <Navbar />
      <div className="HeaderReporte">
        <div className="contenedorHeaderReporte">
          <div className="tituloHeader">
            <h1>Reportes de calificaciones por alumno</h1>
          </div>
          <div className="contenedorLineaHeader">
            <hr color="#CED4DA" className="linea" />
          </div>
        </div>
      </div>
      <ReactHMLTableToExcel
        id="botonExportarExcel"
        className="botonExcel"
        table="TableReports"
        filename="CalificacionesAlumno"
        sheet="CalificacionesAlumno"
        buttonText="Exportar a Excel"
      />

      <div className="TableReportAlumno">
        <Table
          striped
          bordered
          hover
          className="TableReports"
          id="TableReports"
        >
          {/* </tbody> */}
          {/* {console.log("DATA", dataAlumnoOrden)} */}
          <thead>
            <tr>
              <td>Código</td>
              <td>Nombre Completo</td>
              {dataAlumnoOrden
                ? Object.entries(dataAlumnoOrden.notasPorTipo).map(
                    ([key, val], i) => {
                      return Object.entries(val.notas).map(
                        ([key1, val1], i1) => {
                          {
                            dataColum.push(val1.nombreAssignment);
                          }
                          // console.log(val2.scoreAssignment)
                          return <td>{val1.nombreAssignment}</td>;
                        }
                      );
                    }
                  )
                : null}
              {console.log(dataColum)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {dataAlumnoOrden
                ? dataBody.push(dataAlumnoOrden.codigo)
                : (() => {})()}
              {dataAlumnoOrden
                ? dataBody.push(dataAlumnoOrden.nombreAlumno)
                : (() => {})()}
              <td>{dataAlumnoOrden ? dataAlumnoOrden.codigo : "Sin data"}</td>
              <td>
                {dataAlumnoOrden ? dataAlumnoOrden.nombreAlumno : "sin data"}
              </td>
              {dataAlumnoOrden
                ? Object.entries(dataAlumnoOrden.notasPorTipo).map(
                    ([key, val], i) => {
                      return Object.entries(val.notas).map(
                        ([key1, val1], i1) => {
                          {
                            dataBody.push(val1.scoreAssignment);
                          }
                          // console.log(val2.scoreAssignment)
                          return <td>{val1.scoreAssignment}</td>;
                        }
                      );
                    }
                  )
                : null}
              {console.log(dataBody)}
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="BodyReporte">
        {/* <div  className="contenedorInfo">
          {dataAlumnoOrden
            ? Object.entries(dataAlumnoOrden.notasPorTipo).map(
                ([key, val], i) => {
                  return Object.entries(val.notas).map(([key1, val1], i1) => {
                    {
                      <p>{val1.nombreAssignment}</p>;
                      <p>{val1.scoreAssignment}</p>;
                    }
                    // console.log(val2.scoreAssignment)
                    // return <td>{val1.nombreAssignment}</td>;
                  });
                }
              )
            : null}
        </div> */}
        <div className="contenedoTablaStuReportDetail">
          <div className="contenedorTituloTablaStuReportDetail">
            {dataColum.map((item, index) => (
              <p>{item}</p>
            ))}
          </div>

          <hr className="lineaHorizontalStuReportDetail" />

          <div className="contenedorDataTablaStuReportDetail">
            <div className="contenedorItemTablaStuReportDetail">
              {dataBody.map((item, index) => (
                <div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      <div className="FooterReporte"></div>
    </div>
  ) : null;
}

export default StuReportDetail;