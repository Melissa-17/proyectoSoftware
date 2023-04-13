import React, {useEffect, useState} from "react";
import "../../../assets/styles/Coordinador/Approval/InitialPartApproval.css";
import {Day, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import esLocale from 'date-fns/esm/locale/es';
import ModalsError from "../../Modals/ModalsError";
import { axiosAddPostulationPeriod, axiosEditPostulationPeriod, axiosGetPostulationPeriodByName } from "#API/PostulationPeriod";
import { formatDate } from '#Helpers/assignmentHelpers.js'

export default function InitialPartApproval() {
  const [fechaSeleccionadaInicio, setFechaSeleccionadaInicio] = useState(new Date());
  const [fechaSeleccionadaFin, setFechaSeleccionadaFin] = useState(new Date());
  const [modalError, setModalError] = useState(false);
  const [habilitado, setHabilitado] = useState(true);
  const [periodHab, setPeriodHab]  = useState(null);

  const HabilitarClic = () => {
    if(fechaSeleccionadaFin >= fechaSeleccionadaInicio) {
      setHabilitado(!habilitado);
      handleHabilitarButton();
    }
    else setModalError(true);
  }

  const DeshabilitarClic = () =>{
    setHabilitado(!habilitado);
  }

  const funcionBotonOpcion = () =>{
    if(habilitado) {
      return <button className="buttonHabilitar"
     onClick={() => {HabilitarClic();}}
    >
      Habilitar</button>;
    }
    else {
     return <button className="buttonHabilitar" 
      onClick={() => {handleDeshabilitarButton();}}
      >Deshabilitar</button>
    };
  }
  

  const getPeriodHab = () => {
    axiosGetPostulationPeriodByName(JWTtoken, "solicitud")
    .then((response) => {
      // Formato para quitar el Timezone (causa un error que muestre la fecha anterior)
      const startDate = response.data.startDate.split('Z')[0];
      const endDate = response.data.endDate.split('Z')[0];

      // console.log(startDate); 
      
      
      setFechaSeleccionadaInicio(startDate);
      setFechaSeleccionadaFin(endDate);
      
      setHabilitado(false);
    })
    .catch((err) => {
      // setHabilitado(false);
      // console.error(`Get Period: ${err}`);
    });
  }

  useEffect(() => {
    getPeriodHab();
  }, [])
  
  const handleHabilitarButton = () => {
    

    const formData = {
      "startDate": formatDate(fechaSeleccionadaInicio, "YYYY-MM-DD"),
      "endDate": formatDate(fechaSeleccionadaFin, "YYYY-MM-DD"),
      "tipo" : "solicitud",
    }
    // console.log(formData);

    axiosAddPostulationPeriod(JWTtoken, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(`Add Postulation: ${err}`);
    });
  }

  const handleDeshabilitarButton = () => {
    

    const formData = {
      "startDate": formatDate(fechaSeleccionadaInicio, "YYYY-MM-DD"),
      "endDate": formatDate(fechaSeleccionadaFin, "YYYY-MM-DD"),
      "tipo": "solicitud"
    }
    console.log(formData);

    axiosEditPostulationPeriod(JWTtoken, formData)
    .then((res) => {
      console.log(res);
      setHabilitado(!habilitado);
    })
    .catch((err) => {
      console.error(`Edit Postulation: ${err}`);
    });
  }

  const JWTtoken = sessionStorage.getItem("token");
  
  {/*const patchThesis = (accion) => {
    const body =
     {
         "thesisId": thesis.id,
         "status": accion
     }

     axiosPatchThesis(JWTtoken, body)
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.error(`Error: ${error}`);
     });
   };*/}

  return (
    <div className="contenedorInitialPartApproval">
      <div className="contenedorCuadroApproval">
        <div className="contenedorRangoFecha">
          <div className="enunciadoApproval">
            <p>
              Determinar el rango de fechas para que los alumnos puedan solicitar su tema de tesis
            </p>
          </div>
          <div className="dosFilasApproval">
            <div className="primeraFilaApproval">
              <p>Fecha inicio:</p>
              <i class="bi bi-calendar-event-fill"/>
              <div className="DatePicker1InitialPartApproval">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                  <DatePicker value={fechaSeleccionadaInicio} onChange={(e) => setFechaSeleccionadaInicio(e)} 
                  format="dd/MM/yyyy" 
                  // minDate={new Date()}
                  disabled={!habilitado}/>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="segundaFilaApproval">
              <p>Fecha final:</p>
              <i class="bi bi-calendar-event-fill" />
              <div className="DatePicker1InitialPartApproval">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                  <DatePicker value={fechaSeleccionadaFin} onChange={(e) => setFechaSeleccionadaFin(e)} 
                  format="dd/MM/yyyy" 
                  // minDate={new Date()}
                  disabled={!habilitado} />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>
        </div>
        <div className="contenedorHabilitarInitialPartApproval">
          {funcionBotonOpcion()}
          {modalError && <ModalsError closeError={setModalError} message='Fecha final debe ser mayor a la fecha inicial' />}
        </div>
      </div>
      
    </div>
  );
}
