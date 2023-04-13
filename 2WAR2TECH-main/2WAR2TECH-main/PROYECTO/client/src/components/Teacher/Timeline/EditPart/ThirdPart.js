import React, {useState} from "react";
import "../../../../assets/styles/Teacher/Timeline/EditPart/ThirdPart.css";
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import esLocale from 'date-fns/esm/locale/es';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function ThirdPart() {
    const [fechaSeleccionadaInicio, setFechaSeleccionadaInicio] = useState(new Date()); 
    const [fechaHoraSeleccionadaInicio, setFechaHoraSeleccionadaInicio] = useState(new Date()); 
    return (
    <div className="contenedorThirdPart">
      <div className="contenedorPrimeraColumnaThirdPart">
        <p className="fechaInicio">Fecha de inicio</p>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
          <DatePicker
            value={fechaSeleccionadaInicio}
            onChange={setFechaSeleccionadaInicio}
            format="dd/MM/yyyy"
            className="fecha"
          />
        </MuiPickersUtilsProvider>
        <p className="fechaSubida">Fecha de subida al repositorio</p>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
          <DateTimePicker
            value={fechaHoraSeleccionadaInicio}
            onChange={setFechaHoraSeleccionadaInicio}
            format="dd/MM/yyyy hh:mm"
            className="fechahora"
          />
        </MuiPickersUtilsProvider>
      </div>

      <div className="contenedorSegundaColumnaThirdPart">
        <div className="contenedorPrimeraColumnaThirdPart">
            <p className="fechaInicio">Fecha de fin</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DatePicker
                value={fechaSeleccionadaInicio}
                onChange={setFechaSeleccionadaInicio}
                format="dd/MM/yyyy"
                className="fecha"
            />
            </MuiPickersUtilsProvider>
            <p className="fechaSubida">Fecha límite de envío</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DateTimePicker
                value={fechaHoraSeleccionadaInicio}
                onChange={setFechaHoraSeleccionadaInicio}
                format="dd/MM/yyyy hh:mm"
                className="fechahora"
            />
            </MuiPickersUtilsProvider>
        </div>
      </div>

      <div className="contenedorTerceraColumnaThirdPart">
            <p className="fechaInicio">Fecha límite de calificación</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DateTimePicker
                value={fechaHoraSeleccionadaInicio}
                onChange={setFechaHoraSeleccionadaInicio}
                format="dd/MM/yyyy hh:mm"
                className="fechahora"
            />
            </MuiPickersUtilsProvider>
      </div>
    </div>
  );
}
