import React from "react";
import "#Styles/Alumno/ThesisThemes/ThesisList/CardTeammate.css";
import { Buffer } from "buffer";

function CardTeammate(props) {
  // console.log(props);
  return (
    <div>
      <div className="cardAdd1">
        {
        props.pfp.data ? 
        <img
          className="teammatePfp"
          src={`data:image/png;base64,${Buffer.from(
            props.pfp.data
          ).toString("base64")}`}
          alt="profile-pic"
        />
        : 
        <img src={props.pfp} className="teammatePfp" 
        />
        }
        <p>{props.name}</p>
      </div>
      <button type="button" className='buttontrash' onClick={() => props.handleTeammateDelete(props.id)}><i class="bi bi-trash3"></i></button>
    </div>
  );
}

export default CardTeammate;
