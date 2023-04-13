import React from "react";
import Header from "./Header";
import "../../../assets/styles/Student/Rubrica/RubricContent.css";
import TitleHeader from "./TitleHeader";
import { useNavigate } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import OpcionBoton from "./OptionButton";

import SeeMore from "./SeeMore";

export default function RubricContent() {

  return (
    <div className="contenedorTotalRubrica">
      <div className="separadorRubric">
        <Header />
      </div>
      <Routes>
          <Route path="/rubrica/*" element={<OpcionBoton />}/>
          <Route path="/rubrica/detail" element={<SeeMore />}/>
      </Routes>
    </div>
  );
}
