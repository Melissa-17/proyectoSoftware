import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosPatchCommentProposedThesis } from "#API/Thesis";
import "./ModalComment.css";

function ModalComment(props) {
  const { closeMessage,NuevoEstado, update,ejecutarAxios,thesisId,botonaceptar} = props; 
  const JWTtoken = sessionStorage.getItem("token");
  const handleObservacionSubmit = (e) => {
      e.preventDefault();
      const observacion = document.querySelector(".FeedbackControl").value;
      const ObservacionData = {
        thesisId: thesisId,
        observacion: observacion,
      };
      console.log(ObservacionData);
      axiosPatchCommentProposedThesis(JWTtoken, ObservacionData)
      .then((res) => {
        console.log(res);
        update ? update() : (()=>{})(); 
        botonaceptar ? botonaceptar(true) : (()=>{})(); 
        closeMessage ? closeMessage(false) : (()=>{})(); 
      })
      .catch((err) => {
        console.log(err);
      });
    // closeMessage(false);
  };

  return (
    <div className="modalMessageBackgroundMMM">
      <div className="modalMessageContainer">
        <div className="MCbody">
          <div className="MCommentHeader">
            <p>Observaciones de tema de tesis</p>
            <button onClick={()=>{closeMessage(false);botonaceptar(false);}}>X</button>
          </div>
          <hr color="black" className="commentModalLine" />
          <Form
            className="Feedback feedback-form"
            id="feedback-form"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleObservacionSubmit}
          >
            <Form.Group className="mb-3 Feedback" controlId="formFeedback">
              <Form.Label className="Feedback">
                <strong>Retroalimentación:</strong>
              </Form.Label>
              <Form.Control
                className="FeedbackControl"
                as="textarea"
                rows={12}
              />
            </Form.Group>
          </Form>
          <div className="MCommentFooter">
            <button
              onClick={() => {
                botonaceptar(false);
                closeMessage(false);
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="feedback-form"
              onClick={() => {
                ejecutarAxios(NuevoEstado); 
                
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComment;
