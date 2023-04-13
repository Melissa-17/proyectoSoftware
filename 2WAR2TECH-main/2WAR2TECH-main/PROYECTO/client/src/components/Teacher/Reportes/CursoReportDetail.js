import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { axiosGetReport } from "../../../api/Reporte";
import PieChartAprobados from "./PieChartAprobados";
import BarChartNotas from "./BarChartNotas";
import { GridLoader } from "react-spinners";
import "../../../assets/styles/Teacher/Reporte/CursoReportDetail.css";
import Navbar from "../../SidebarMenu/Navbar";
import ReactHMLTableToExcel from "react-html-table-to-excel";
import { Table } from "react-bootstrap";

function CursoReportDetail() {
  const location = useLocation();
  const { course, semester, realCourse } = location.state;

  console.log(course);
  const JWTtoken = localStorage.getItem("token");
  // console.log(course)
  // console.log(semester)
  const [data, setData] = useState(null);
  const [dataExcelHead, setDataExcelHead] = useState({});
  const [dataExcelBody, setDataExcelBody] = useState({});
  const [dataPie, setDataPie] = useState(null);
  const [dataBar, setDataBar] = useState(null);

  const dataColum = [
    "Codigo",
    "Nombre Completo",
    // "EP1",
    // "EP2",
    // "EP3",
    // "EP4",
    // "PROM EP",
    // "E1",
    // "E2",
    // "E3",
    // "PROM E",
    // "EXPO",
    // "DOC FINAL",
    // "PROM FINAL",
    // "ESTADO",
  ];
  const [listaEntregables, setlistaEntregables] = useState([]);
  const [listaEntregablesParciales, setlistaEntregablesParciales] = useState(
    []
  );

  const procesarDatos = (data, numAlumno) => {
    //ENTREGABLES Parciales
    const tamanhoEntregablesParciales =
      data && data.PEP && data.PEP.s && data.PEP.s.length
        ? data.PEP.s.length
        : 0;

    for (let index = 0; index < tamanhoEntregablesParciales; index++) {
      listaEntregablesParciales[index] = data.PEP.s[index].ASSIGNMENT.score;
    }
    //ENTREGABLES
    const tamanhoEntregables =
      data && data.PE && data.PE.s && data.PE.s.length ? data.PE.s.length : 0;

    for (let index = 0; index < tamanhoEntregables; index++) {
      listaEntregables[index] = data.PE.s[index].ASSIGNMENT.score;
    }
    return;
  };

  const procesarColumnas = (data, numAlumno) => {
    //ENTREGABLES Parciales
    const tamanhoEntregablesParciales =
      data && data.PEP && data.PEP.s && data.PEP.s.length
        ? data.PEP.s.length
        : 0;

    for (let index = 0; index < tamanhoEntregablesParciales; index++) {
      numAlumno == 0
        ? dataColum.push(data.PEP.s[index].ASSIGNMENT.chapterName)
        : (() => {})();
    }
    numAlumno == 0 ? dataColum.push(data.PEP.titulo) : (() => {})();

    //ENTREGABLES
    const tamanhoEntregables =
      data && data.PE && data.PE.s && data.PE.s.length ? data.PE.s.length : 0;

    for (let index = 0; index < tamanhoEntregables; index++) {
      numAlumno == 0
        ? dataColum.push(data.PE.s[index].ASSIGNMENT.chapterName)
        : (() => {})();
    }
    numAlumno == 0 ? dataColum.push(data.PE.titulo) : (() => {})();
    numAlumno == 0 ? dataColum.push(data.PEF.titulo) : (() => {})();
    numAlumno == 0 ? dataColum.push(data.PDF.titulo) : (() => {})();
    numAlumno == 0 ? dataColum.push(data.PF.tituloFinal) : (() => {})();
    numAlumno == 0 ? dataColum.push(data.PF.tituloEstado) : (() => {})();

    return;
  };

  const getDataReport = () => {
    axiosGetReport(JWTtoken, course.id)
      .then((response) => {
        console.log(response.data);
        response && response.data && response.data.alumnos && response.data.alumnos[0] ?
        
        setDataExcelHead(
          response.data.alumnos[0].PROMEDIOS.map((e) => {
            return {
              titulo: e[0].titulo,
              prom: e[1].prom,
              notas: e[2].s.map((j) => {
                return {
                  nombreAssignment: j.ASSIGNMENT.chapterName,
                  scoreAssignment: j.ASSIGNMENT.score,
                };
              }),
            }
          })
        )
        :
          (()=>{})();
        // console.log(response.data);
        setData(response.data);
        if (response.data && response.data.alumnos) {
        setDataExcelBody(
          response.data.alumnos.map((q) => {
            return {
              nombreAlumno: q.name + " " + q.fLastName + " " + q.mLastName,
              codigo: q.idPUCP,
              notasPorTipo: q.PROMEDIOS.map((e) => {
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
            };
          })
        );
        setDataPie({
          labels: ["Cantidad Aprobados", "Cantidad Desaprobados"],
          datasets: [
            {
              label: "Cantidad de alumnos",
              data: [
                response.data.cantAprobados,
                response.data.cantDesaprobados,
              ],
              backgroundColor: [
                "#004EA8",
                // "#BCEBC9",
                // "#BFA6C7",
                // "#F1ABC0",
                // "#F8C59E",
                "#FF5722",
              ],
              borderWidth: 1,
              borderColor: [
                "#004EA8",
                // "#BCEBC9",
                // "#BFA6C7",
                // "#F1ABC0",
                // "#F8C59E",
                "#FF5722",
              ],
            },
          ],
        });

        // const labels = [response.data && response.data.frecuencia ? Object.entries(response.data.frecuencia).map(([key, val], i) => {return(key)}) : []]

        setDataBar({
          // labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
          labels:
            response.data && response.data.frecuencia
              ? Object.entries(response.data.frecuencia).map(
                  ([key, val], i) => {
                    return key;
                  }
                )
              : [],
          datasets: [
            {
              label: "Frecuencia de notas",
              data:
                response.data && response.data.frecuencia
                  ? Object.entries(response.data.frecuencia).map(
                      ([key, val], i) => {
                        return val;
                      }
                    )
                  : [],
              backgroundColor: ["rgba(255, 177, 101,0.4)"],
              borderWidth: 2,
              borderColor: ["rgba(255, 177, 101, 1)"],
            },
          ],
        });
      }
       
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };
  useEffect(() => {
    getDataReport();
  }, []);

  return (
    <div className="contenedorAsesor">
      <Navbar />
      <div className="HeaderReporte">
        <div className="contenedorHeaderReporte">
          <div className="tituloHeader" style={{textAlign:"left"}}>
            <h1>Reportes de calificaciones por semestre</h1>
          </div>
          <div className="contenedorLineaHeader">
            <hr color="#CED4DA" className="linea" />
            <ReactHMLTableToExcel
              id="botonExportarExcel"
              className="botonExcel"
              table="TableReports"
              filename="CalificacionesXSemestre"
              sheet="CalificacionesXSemestre"
              buttonText="Exportar a Excel"
            />
            <div className="TableReportSemester">
              <Table
                striped
                bordered
                hover
                className="TableReports"
                id="TableReports"
              >
                <thead>
                  <tr>
                    {/* {console.log(dataExcelHead)} */}
                    {dataExcelHead
                      ? Object.entries(dataExcelHead).map(([key, val], i) => {
                          console.log(val);
                          Object.entries(val.notas).map(([key1, val1], i1) => {
                            dataColum.push(val1.nombreAssignment);
                            // console.log(val1.nombreAssignment)
                            // return <th>{val1.nombreAssignment}</th>;
                          });
                          // dataColum.push("Promedio");
                        })
                      : null}
                    {/* {console.log(dataColum)} */}
                    {/* {data
                      ? Object.entries(data.alumnos).map(([key, val], i) => {
                          
                        })
                      : null} */}

                    {dataColum.map((row, index) => {
                      return <th key={index}>{row}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {console.log(dataExcelBody)}
                  {dataExcelBody ?
                  Object.entries(dataExcelBody).map(([key, val], i) => {
                    return(
                      <tr key={key}>
                        <td>{val.codigo}</td>
                        <td>{val.nombreAlumno}</td>
                        
                        {Object.entries(val.notasPorTipo).map(([key1, val1], i1) => {
                          // console.log(val1)
                          return(
                            <td>{val1.scoreAssignment}</td>,
                          Object.entries(val1.notas).map(([key2, val2], i2) => {
                            // console.log(val2.scoreAssignment)
                           return (
                            <td>{val2.scoreAssignment}</td>
                           )

                          })
                          
                          )
                        })}
                      </tr>
                    )
                  })
                : null}
                </tbody>
                {/* <tbody>
                  {data
                    ? Object.entries(data.alumnos).map(([key, val], i) => {
                        procesarDatos(val, i);
                        return (
                          <tr key={key}>
                            <td>{val.idPUCP}</td>
                            <td>{val.name}</td>
                            <td>{val.fLastName}</td>
                            <td>{val.mLastName}</td>
                            {Object.entries(listaEntregablesParciales).map(
                              ([key, val], i) => {
                                return <td>{val}</td>;
                              }
                            )}
                            <td>{val.PEP.pEP}</td>

                            {Object.entries(listaEntregables).map(
                              ([key, val], i) => {
                                return <td>{val}</td>;
                              }
                            )}
                            <td>{val.PE.pE}</td>

                            <td>{val.PEF.pEF}</td>

                            <td>{val.PDF.pDF}</td>

                            <td>{val.PF.promFinal}</td>

                            <td>{val.PF.estado}</td>
                  
                          </tr>
                        );
                      })
                    : null}
                </tbody> */}
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="BodyReporteCur">
        <div className="DataPie">
          {dataPie ? (
            <PieChartAprobados charData={dataPie} />
          ) : (
            <GridLoader
              className="mx-auto"
              color="#042354"
              // loading={dataPie}
              size={24}
            />
          )}
        </div>
        <div className="BarChart">
          {dataBar ? (
            <BarChartNotas charData={dataBar} />
          ) : (
            <GridLoader
              className="mx-auto"
              color="#042354"
              // loading={dataPie}
              size={24}
            />
          )}
        </div>
      </div>
      <div className="FooterReporte"></div>
    </div>
  );
}

export default CursoReportDetail;
