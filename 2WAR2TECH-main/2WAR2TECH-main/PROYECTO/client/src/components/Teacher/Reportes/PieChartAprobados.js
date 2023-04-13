import React, {useState,useEffect} from "react";
import { Pie  } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

export default function PieChartAprobados ({charData}) {
    // console.log("El chartData es: ",charData);
    
    return (
        <div className="PieCharAprobados">
        <h4 className="mt-5 titleBarCharInscription">Los alumnos aprobados y desaprobados son:</h4>
        <Pie data={charData} options={{ responsive: true }} />
        </div>
    )
}