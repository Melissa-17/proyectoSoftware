import { useState, useEffect } from "react";
import "../../../assets/styles/Coordinador/Sustain/SustentacionGrafico.css";
import Navbar from "../../SidebarMenu/Navbar";
import { useNavigate } from "react-router";
import { GridLoader } from "react-spinners";
import PieChartTesis from "./PieChartTesis";
import { axiosgetListThesisByState } from "#API/Thesis";
import ReactHMLTableToExcel from "react-html-table-to-excel";
import { Table } from "react-bootstrap";

export default function SustentacionGrafico() {
  const navigate = useNavigate();
  const [dataPie, setDataPie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thesisList, setThesisList] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(4);
  const [count, setCount] = useState(1);
  const [sustentado, setSustentado] = useState("");
  const [confirmSustentado, setConfirmSustentado] = useState(false);
  const [confirmNSustentado, setConfirmNSustentado] = useState(false);
  const [loadSustentado, setLoadSustentado] = useState(false);
  const [inputThesis, setInputThesis] = useState("");

  const maximo = Math.ceil(count / porPagina);

  const getThesisList = () => {
    setIsLoading(true);
    axiosgetListThesisByState(JWTtoken, "", 1, 1000000, inputThesis)
      .then((response) => {
        console.log(response.data);
        const data = response.data || [];
        setThesisList(data);
        setCount(data.thesis.count);
        setIsLoading(false);

        setDataPie({
          labels: ["Sustentadas", "No Sustentadas"],
          datasets: [
            {
              label: "Cantidad de Tesis",
              data: [response.data.cantSustentadas, response.data.cantAprobadas],
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
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getThesisList();
  }, [sustentado, confirmSustentado, confirmNSustentado, inputThesis]);

  const retrocesoClic = () => {
    navigate("/Sustentaciones");
  };


  return (
    <div>
      <Navbar />
      <div className="contenedorSustentacionGrafico">
        <div className="headerSustentacionGrafico">
          <div className="contenedorPrimeraLineaHeaderSustentacionGrafico">
            <p>Reporte de Tesis Sustentadas</p>
            <div className="retrocederHeaderRegisterCoordinator">
              <button onClick={retrocesoClic} className="botonRetrocesoDetalle">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                  className="imagenRetrocesoDetalle"
                />
              </button>
            </div>
          </div>
          <div>
            <hr color="black" className="lineaHorizontalSustentacionGrafico" />
            <ReactHMLTableToExcel
              id="botonExportarExcel"
              className="botonExcel"
              table="TableReports"
              filename="Tesis"
              sheet="Tesis"
              buttonText="Exportar a Excel"
            />
            <div className="TableReportTesis">
              <Table
                striped
                bordered
                hover
                className="TableReports"
                id="TableReports"
              >
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(thesisList)}
                  {thesisList && thesisList.thesis && thesisList.thesis.rows ? Object.entries(thesisList.thesis.rows).map(
                    ([key, val], i) => {
                      // console.log(val2.scoreAssignment)
                      return (
                        <tr>
                          <td>{val.title}</td>
                          <td>{val.description}</td>
                          <td>{val.status}</td>
                        </tr>
                      );
                    }
                  ) : null}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div>
          <div className="DataPie">
            {dataPie ? (
              <PieChartTesis charData={dataPie} />
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
      </div>
    </div>
  );
}
