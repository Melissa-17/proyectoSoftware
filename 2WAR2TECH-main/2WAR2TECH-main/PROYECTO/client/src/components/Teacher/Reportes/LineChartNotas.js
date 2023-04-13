import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function LineChartNotas({ charData }) {
  return (
    <div className="LineChartNotas">
      <h4 className="mt-5 titleLineChart">Las notas de los Entregables son:</h4>
      <Line data={charData} options={{ responsive: true }} />
    </div>
  );
}
