import React, { useState } from "react";
import TeammateSearch from "./TeammateSearch";

function TeammateDefaultBtn(selectedTeammate, setSelectedTeammate) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTeammateList, setSelectedTeammateList] = useState([]);

  return (
    <div>
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

export default TeammateDefaultBtn;
