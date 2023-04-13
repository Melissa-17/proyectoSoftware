import React, {useState,useEffect} from "react";
import { Pie  } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

export default function PieChartTesis ({charData}) {
    // console.log("El chartData es: ",charData);
    
    return (
        <div className="PieCharTesis">
        <h4 className="mt-5 titleBarCharInscription">Tesis sustentadas y no sustentadas:</h4>
        <Pie data={charData} options={{ responsive: true }} />
        </div>
    )
}