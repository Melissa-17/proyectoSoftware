import React, { useState } from "react";
import "#Styles/Alumno/ThesisThemes/ThesisList/MainListAddTeammate.css";
import AddedAsesor from "./AddedAsesor.js";
import AsesorSearch from "./AsesorSearch.js";

function MainListAddAsesor(props) {
  const [openModal, setOpenModal] = useState(false);
  const 
  { 
    selectedAsesor, 
    setSelectedAsesor, 
  } = props;
          

  // let listOfIdTeammates = setSelectedTeammateList.map((prof, index) => {
  //   return prof.id;
  // });
  const handleAsesorDelete = () => {
    setSelectedAsesor(null);
  };

  return (
    <div>
      <div className="MLteammates">
        <p className="MLaddTitle">Seleccionar asesor:</p>
        <div className="MLteammateCards">
          <div className="add1">
            <button
              className="cardAdd1Btn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <div className="cardAdd1">
                <i  class="bi bi-person fa-6x"></i>
                <p>Seleccionar Asesor</p>
              </div>
            </button>
          </div>

          
          <AddedAsesor
           handleUserDelete = {handleAsesorDelete}
           selectedUser = {selectedAsesor}
           setSelectedUser={setSelectedAsesor}
          />
        </div>
      </div>
      {openModal && (
        <AsesorSearch
          closeModal={setOpenModal}
          selectedUser={selectedAsesor}
          setSelectedUser={setSelectedAsesor}
        />
      )}
    </div>
  );
}

export default MainListAddAsesor;
