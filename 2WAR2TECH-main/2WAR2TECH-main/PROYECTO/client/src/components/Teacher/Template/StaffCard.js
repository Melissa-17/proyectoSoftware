import React from "react";
import "#Styles/Teacher/Timeline/PrincipalPart/ContentRow.css";
import { Buffer } from "buffer"; 
function StaffCard(props) {
  const {
    profesor,
    deleteList,
    setDeleteList,
  } = props; 

  const handleCheckDelete = (e, newId) => {
    if (e.currentTarget.checked) {
      setDeleteList([...deleteList, newId]);
    } else {
      const newList = deleteList.filter((assignId) => assignId !== newId);
      setDeleteList(newList);
    }
  };

  return profesor ? (
    <div className="contenedorCardCoordinador">
      <div className="contenedorCheckBoxCardCoordinador">
        <input
          type="checkbox"
          onChange={(e) => handleCheckDelete(e, profesor.id)}
          defaultChecked={false}
          checked={deleteList.includes(profesor.id)}
          className="checkBoxCardCoordinador"
        />
      </div>

      <div className="contenedorInfoCardCoordinador">
        <div className="primeraLineaInfoCardCoordinador">
          {profesor.photo ? (
            <img
              className="profile-img"
              src={`data:image/png;base64,${Buffer.from(
                profesor.photo.data
              ).toString("base64")}`}
              alt="profile-pic"
            />
          ) : (
            <img
              className="profile-img"
              src="https://wallpapercave.com/uwp/uwp2417748.png"
              alt="foto asesor"
            />
          )}
          {/* <img
            className="profile-img"
            src="https://wallpapercave.com/uwp/uwp2417748.png"
            alt="foto asesor"
          /> */}
          <p>
            {profesor && profesor.name
              ? profesor.name +
                " " +
                profesor.fLastName +
                " " +
                profesor.mLastName
              : "No tiene nombre"}
          </p>
        </div>
      </div>    
    </div>
  ):null;
}

export default StaffCard;
