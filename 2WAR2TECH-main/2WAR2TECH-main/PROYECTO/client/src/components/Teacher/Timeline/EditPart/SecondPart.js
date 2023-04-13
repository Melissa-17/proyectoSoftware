import React, {useState} from "react";
import "../../../../assets/styles/Teacher/Timeline/EditPart/SecondPart.css";

export default function SecondPart() {
  const [taskList, setTaskList] = useState([{}]);
  const handleAddTask = () => {
    setTaskList([...taskList, {}]);
  };
  const handleDeleteTask = (taskId) => {
    const taskListCopy = [...taskList];
    taskListCopy.splice(taskId,1);
    setTaskList(taskListCopy);
  };
  return (
    <div className="EntregableEditPart">
      <div className="primeraColumnaEntregableEditPart">
        <div className="entregablelineEntregableEditPart">
          <p>Entregable</p>
          <button className="botonEntregablePlusEditPart">
            <i class="bi bi-plus" onClick={handleAddTask} />
          </button>
        </div>

        <div className="filaEntregableEditPart">
          {taskList.map((task, index) => {
            return (
              <div className="taskEditPart" key={index}>
                <input
                  type="text"
                  placeholder="Entregable 1"
                  className={`task-${index}`}
                />
                <button type="button" onClick={() => handleDeleteTask(index)}>
                  <i className="bi bi-trash" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="segundaColumnaSecondPart">
        <p>Tipo de Entregable</p>
        <select>
          <option value="Entregable parcial">Entregable Parcial</option>
        </select>
      </div>
    </div>
  );
}
