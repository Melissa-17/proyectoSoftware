import React, { useState } from "react";
import CardAsesor from "./CardAsesor";
import AsesorSearch from "./AsesorSearch";

function AddedAsesor(props) {
  const JWTtoken = localStorage.getItem("token");
  const {
    handleUserDelete,
    selectedUser,
    setSelectedUser,
  } = props;
  
  return (
    selectedUser ? 
    <div className="cardAdd1Btn">
        <div className="spaceX">
          <CardAsesor
            id={selectedUser.id}
            handleUserDelete={handleUserDelete}
            pfp={selectedUser.photo ? selectedUser.photo : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            name={selectedUser.name + ' ' + selectedUser.fLastName + ' ' + selectedUser.mLastName}
          />
        </div>
    </div>
    : null
    );
}

export default AddedAsesor;
