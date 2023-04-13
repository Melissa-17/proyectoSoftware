import React from 'react';
import "./Trazability.css";

function Trazability(props) {
    const {updateDate, description} = props;
  return (
    <div className='trazabilityContainer'>
        <p className='date'>[{updateDate}]</p>
        <p className='descrip'>{description}</p>
    </div>
  )
}

export default Trazability