import React, {useState} from 'react'
import CreateNewUserPageStudent from '../../../../pages/CreateNewUserPage/Student'
import '../../../../assets/styles/Teacher/Timeline/EditPart/Edit.css'
import Header from './Header'
import { useLocation } from 'react-router'
import Cambio from './Cambio'
import ModalsMessageConfirmated from '../PrincipalPart/ModalsMessageConfirmated'

export default function Edit() {
  const [mensajeConfirmado, setMensajeConfirmado] = useState(false);
  const location = useLocation();
  const { num, numero, cxsid, id, entregable} = location.state;
  
  return (
    <div className='contenedorEditPart'>
        <CreateNewUserPageStudent />
        <div className='editPart'>
          {/* {console.log(entregable)} */}
          <div className='contenedorHeaderEditPart'>
            <Header num={num} numero={numero} cxsid={cxsid} id={id} entregable={entregable}/>
          </div>
          
          <div>
            <Cambio num={num} numero={numero} cxsid={cxsid} id={id}
            mensajeConfirmado={setMensajeConfirmado} entregable={entregable}
            />
          </div>
          
          <div>
            {mensajeConfirmado && <ModalsMessageConfirmated 
            closeMessage={setMensajeConfirmado} message='Guardado con éxito' option={2}
           num={num} numero={numero} cxsid={cxsid} id={id} />}
          </div>

        </div>
    </div>
  )
}
