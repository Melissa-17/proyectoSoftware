import React, {useState,useEffect} from "react";
import { Bar  } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import "../../../assets/styles/Teacher/Reporte/CursoReportDetail.css";

export default function BarChartNotas ({charData}) {
    // console.log("El chartData es: ",charData);
    
    return (
        <div className="BarCharNotas">
        <h4 className="mt-5 titleBarCharInscription">Las notas de los alumnos son:</h4>
        <Bar data={charData} options={{ responsive: true }} />
        </div>
    )
}