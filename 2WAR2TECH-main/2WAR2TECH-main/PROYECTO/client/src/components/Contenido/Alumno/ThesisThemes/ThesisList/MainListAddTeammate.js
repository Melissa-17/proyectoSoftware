import React, { useState } from "react";
import "#Styles/Alumno/ThesisThemes/ThesisList/MainListAddTeammate.css";
import TeammateSearch from "./TeammateSearch.js";
import TeammateDefaultBtn from "./TeammateDefaultBtn.js";
import TeammateInfoBtn from "./AddedTeammate.js";
import AddedTeammate from "./AddedTeammate.js";

function MainListAddTeammate(props) {
  const [openModal, setOpenModal] = useState(false);
  const 
  { 
    selectedTeammate, 
    setSelectedTeammate, 
    selectedTeammateList, 
    setSelectedTeammateList 
  } = props;
          

  // let listOfIdTeammates = setSelectedTeammateList.map((prof, index) => {
  //   return prof.id;
  // });
  const handleTeammateDelete = (teammateId) => {
    const newTeammateList = selectedTeammateList.filter((mate) => {
      console.log(mate)
      return mate.id !== teammateId;
    });
    setSelectedTeammateList(newTeammateList);
  };

  return (
    <div>
      <div className="MLteammates">
        <p className="MLaddTitle">Agregar alumno:</p>
        <div className="MLteammateCards">
          <div className="add1">
            <button
              className="cardAdd1Btn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <div className="cardAdd1">
                <i class="bi bi-person fa-6x"></i>
                <p>Agregar compañero</p>
              </div>
            </button>
          </div>
          <AddedTeammate
           handleTeammateDelete = {handleTeammateDelete}
           selectedTeammateList = {selectedTeammateList}
           setSelectedTeammateList={setSelectedTeammateList}
          />
        </div>
      </div>
      {openModal && (
        <TeammateSearch
          closeModal={setOpenModal}
          selectedTeammate={selectedTeammate}
          setSelectedTeammate={setSelectedTeammate}
          selectedTeammateList={selectedTeammateList}
          setSelectedTeammateList={setSelectedTeammateList}
        />
      )}
    </div>
  );
}

export default MainListAddTeammate;
