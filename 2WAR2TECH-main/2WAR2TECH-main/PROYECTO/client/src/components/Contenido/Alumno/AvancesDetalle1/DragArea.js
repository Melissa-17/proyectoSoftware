import { useState } from "react";
import "../../../../assets/styles/Alumno/AvancesPrincipal/DragArea.css"
//import styled from "styled-components";

export default function DragArea() {
  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const changeImage = (e) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
  };
  return (
    <div>
        <br />
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              changeImage(e);
            }}
          />
          <div className="text-information">
            <h3>Drag and drop a file or select add Image</h3>
          </div>
        </div>

        <div className="center">
          <img
            src={ImageSelectedPrevious}
            alt=""
            height="150px"
            width="250px"
          />
        </div>
    </div>
  );
}


