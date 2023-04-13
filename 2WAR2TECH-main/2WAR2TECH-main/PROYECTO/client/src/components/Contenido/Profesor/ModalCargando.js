import React from 'react'
import '../../Modals/ModalsMessage.css'
import { FadeLoader } from "react-spinners";

export default function ModalCargando({closeMessage,estacargando, message }) {
  const mensaje = message ? message : "El archivo se está cargando, esto tardará unos segundos";
  return (
    <div className="modalMessageBackground">
      <div className="modalMessageContainerModalsLevel">
        <div className="fondodeCarga">
          <div className="MensajeCargando">
            
            <p className="MMdescripcionTexto">
                {mensaje}
            </p>
            <div>
                <FadeLoader
                    className="mx-auto"
                    color="#4b70ac"
                    loading={estacargando}
                    // height={24}
                    // width={24}
                    LengthType={24}
                    number={2}
                />
            </div>
          </div>
           
        </div>
      </div>
    </div>
  )
}