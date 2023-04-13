import React from 'react'
import '../../../../../assets/styles/Teacher/Timeline/Criteria/EditPart/ModalsNuevoNivel.css'
import {Editor} from '@tinymce/tinymce-react'
import { useRef } from 'react'

export default function ModalsNuevoNivel({closeNuevoNivel, option}) {
    const editorRef = useRef();
    
  return (
    <div className="contenedorModalsNuevoNivelGeneral">
      <div className="contendorModalsNuevoNivel">
        <div className="contenedorHeaderModalsNuevoNivel">
          <p>Nuevo Entregable</p>
          <button onClick={() => {closeNuevoNivel(false);}}>
            <i class="bi bi-x-lg" />
          </button>
        </div>

        <div>
            <hr color="black" className="lineaModalsNuevoNivel" />
        </div>

        <div className='contenedorPrimeraFilaNuevoNivel'>
            <div className='contenedorNombreCriterioNuevoNivel'>
                <p>Nombre del criterio</p>
                <input type="text" placeholder='Sobresaliente'
                className='inputNombreCriterioModalsNuevoNivel'/>
            </div>
            <div className='contenedorPuntajeMaximaNuevoNivel'>
                <p>Puntaje máximo</p>
                <input type="text" placeholder='20'
                className='inputPuntajeMaximoModalsNuevoNivel'/>
            </div>
        </div>

        <div className='contenedorDescripcionNuevoNivel'>
            <p>Descripción</p>
            <Editor 
            tinymce-script-src="tinymce/tinymce.min.js"
            onInit={(evt,editor) => editorRef.current = editor}
            init={{
                menubar: false,
                selector: 'textarea',
                init_instance_callback : function(editor) {
                    var freeTiny = document.querySelector('.tox .tox-notification--in');
                    freeTiny.style.display = 'none';
                },
                resize: false,
                height: "360px"
            }} className='editorNuevoNivel'
            />
        </div>
        
        <div className='contenedorBotoneriaNuevoNivel'>
            <button onClick={() => {closeNuevoNivel(false);}}>Aceptar</button>
        </div>

      </div>
    </div>
  )
}
