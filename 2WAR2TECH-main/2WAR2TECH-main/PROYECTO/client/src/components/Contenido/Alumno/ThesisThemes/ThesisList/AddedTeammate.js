import React, { useState } from "react";
import CardTeammate from "./CardTeammate";
import TeammateSearch from "./TeammateSearch";

function AddedTeammate(props) {
  const JWTtoken = localStorage.getItem("token");
  const {
    handleTeammateDelete,
    selectedTeammateList,
    setSelectedTeammateList,
  } = props;
  return (
    <div className="cardAdd1Btn">
      {selectedTeammateList.map((teammate, index) => {
        return (
          <div key={index} className="spaceX">
            <CardTeammate
              id={teammate.id}
              handleTeammateDelete={handleTeammateDelete}
              pfp={teammate.photo ? teammate.photo : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              name={teammate.name + ' ' + teammate.fLastName + ' ' + teammate.mLastName}
            />
        </div>)
      })}
    </div>
  );
}

export default AddedTeammate;
