import React, { useState } from 'react'
import '#Styles/Teacher/Presentation/RegistroModal.css';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/esm/locale/es';
import Combobox from "react-widgets/Combobox";
import { axiosPatchExpositionAxS } from '../../../api/PresentationAssignment';

function RegistroModal(props) {

  const {closeMessage, axsId, meetingDate, mod, pres} = props;
  const [modalidad, setModalidad] = useState(mod?1:2);
  const [initialTime, setInitialTime] = useState(meetingDate?meetingDate:new Date());
  const [opciones, setOpciones] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ id: 999999 });
  const JWToken = localStorage.getItem('token');
  const [inputText, setInputText] = useState('');
  let list = [
    {
      id: 1,
      name:'Presencial'
    },
    {
      id:2,
      name:'Virtual'
    }
  ]
  //setOpciones(list);

  const handleOptionChange = (e) => {
    setSelectedOption(e);
    setModalidad(e.id);
  };

  let handleInformationChange = (e)=>{
    setInputText(e.target.value);
  }

  const editInformationPresentation = ()=>{
    let link=null;
    let place=null;
    if(modalidad==1){
      place = inputText;
    }
    else{
      // link='//'+inputText;
      link=inputText;
    }
    const body = {
      'linkVirtualSession':link,
      'location':place,
      'meetingDate':initialTime
    }
    axiosPatchExpositionAxS(JWToken, axsId,body).then(
      (response)=>{
        console.log(response);
      }
    ).catch(
      (error)=>{
        console.error(`Error: ${error}`);
      }
    )
    closeMessage(false);
  }

  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className='main-info-registro-modal'>
          <div className='header-modal'>
            <button className='close-modal-registro' onClick={()=>{closeMessage(false)}}>
              <i class="bi bi-x fa-3x"></i>
            </button>
          </div>
          <div className='content-modal'>
            <div className='time-date-information'>
              <p className='time-date-pres'>Ingrese fecha y hora</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils} local={esLocale}>
                <DateTimePicker className= 'picker-inicio' value={initialTime} 
                  onChange={(e)=>{setInitialTime(e)}}/>
              </MuiPickersUtilsProvider>
            </div>
            <div className='type-presentation'>
              <p className='type-text'>Seleccione la modalidad</p>
              <Combobox
                onChange={handleOptionChange}
                // value={selectedOption}
                dataKey="id"
                textField="name"
                data={list}
                defaultValue={1}/>
            </div>
            <hr className='separador-aditional-information'/>
            <div className='aditional-information'>
              {
                modalidad==1?
                  <div className='location-presentation'>
                    <p className='location-text'>Lugar:</p>
                    <input className='input-location-pres' onChange={handleInformationChange}
                    defaultValue={pres.location?pres.location:''}></input>
                  </div>  
                :modalidad==2?
                  <div className='link-zoom-presentation'>
                    <p className='link-text'>Url:</p>
                    <input className='input-link-text' onChange={handleInformationChange}
                    defaultValue={pres.linkVirtualSession?pres.linkVirtualSession:''}></input>
                  </div>  
                :
                <div className='no-type'>
                  No se selecciono una modalidad
                </div>  
              }
            </div>
          </div>
          <div className='footer-modal'>
            <button className='save-infor' onClick={editInformationPresentation}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistroModal
