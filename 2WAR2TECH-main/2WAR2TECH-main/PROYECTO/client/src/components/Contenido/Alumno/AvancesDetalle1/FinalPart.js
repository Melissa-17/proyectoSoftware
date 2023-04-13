import React from 'react';
import '#Styles/Student/DetailPart/FinalPart.css';
import {useParams, useEffect, useState} from 'react';
import { axiosGetFeedbackAssignmentDetail } from '#API/FeedbackAssignment.js';
import { axiosGetCommentListByAXSId } from '#API/Comment.js';
import { axiosAddComment } from '#API/Comment.js';
import { Buffer } from "buffer";
import {useNavigate } from 'react-router-dom';
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import ModalsMessage from '../../../Modals/ModalsMessage';

export default function FinalPart(props) {
  
  
  const JWTtoken = sessionStorage.getItem('token');
  
  const [commentList, setCommentList] = useState([]);
  const {openAlert, setOpenAlert} = props;
  const [actualiza, setActualiza] = useState(true);
  const studAssignment = props.assign ? props.assign.studentAssignment : null;
  // console.log(props.assign)
  
  const numberOfComments = studAssignment && studAssignment.COMMENTs ? studAssignment.COMMENTs.length : '';
  
  const getCommentList = () => {
    axiosGetCommentListByAXSId(JWTtoken, studAssignment.id)
      .then((response) => {
        const data = response.data || "";
        setCommentList(data);
        
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Error GetCommentListByASXId: ${error}`);
      });
  };

  useEffect(() => {
    getCommentList();
  }, [studAssignment]);

  useEffect(()=>{
    getCommentList();
  },[openAlert])

  let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    
    // const revisor = (user.asesor) ? user.asesor : {
    //     USER: {name: 'Eduardo',
    //     fLastName: 'Rios',
    //     mLastName: 'Campos',
    //     SPECIALTies: [{
    //         name: 'Ingeniería Informática'
    //     }]}
    // };
    let revisor = JSON.parse(localStorage.getItem('asesor'));

  /* Envio de comentarios */
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = document.querySelector('.commentBox').value;
    const commentFormData = {
      'comment': comment,
      'ASSIGNMENTXSTUDENTId': studAssignment.id
    }

    
    axiosAddComment(JWTtoken, commentFormData)
      .then((res) => {
        getCommentList();
        setOpenAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    (props.assign && studAssignment) &&
    <div className="commentsContainer">
        <div className="commentanding">
          <div className="commentsTitle">
            <p>Comentarios:</p>
          </div>
          <hr color="#CED4DA" className="line" />
        </div>

        <div className='commentsFile'>
          {
            numberOfComments > 0 ? 
            <div className="comments-no-empty">
              <div className='table-scroll'>
              {
                commentList.map((commentAssign, index) => {
                  // const nameTeacher = revisor.name + ' ' + revisor.fLastName + ' ' + revisor.mLastName ;
                  // const nameStudent = studAssignment.USER.name + ' ' + studAssignment.USER.fLastName + ' ' +studAssignment.USER.mLastName ;
                  const commentLine = commentAssign.comment;
                  const userSelected =  commentAssign.USERId == studAssignment.USERId ? studAssignment : revisor;
                  const userSelectedInfo = userSelected.USER ? userSelected.USER : '';
                  // const nameGeneral = userSelected.USER? 
                  //   userSelected.USER.name + ' ' + userSelected.USER.fLastName + ' ' + userSelected.USER.mLastName 
                  //   :
                  //   '';
                  //const nameGeneral = userSelectedInfo.name + ' ' + userSelectedInfo.fLastName + ' ' + userSelectedInfo.mLastName ;
                  const nameGeneral = commentAssign.USER.name + ' ' + commentAssign.USER.fLastName + ' ' + commentAssign.USER.mLastName ;
                  // console.log(userSelected);  
                  return(
                    <div className='oneComment' key={index}>
                      <div className='imgAsesor'>
                        {
                          commentAssign.USER.photo ?
                            <img
                            src={`data:image/png;base64,${Buffer.from(commentAssign.USER.photo.data).toString('base64')}`}
                            className='fotoA' 
                            alt='foto asesor'/>
                            :
                            <img
                            src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                            className='fotoA' 
                            alt='foto asesor'/>
                        }
                      </div>
                      <div className='text'>
                        {/* {
                          commentAssign.USERId == studAssignment.USERId ?
                          <p className='nameT'>{`${nameStudent}`}</p>
                          :
                          <p className='nameT'>{`${nameTeacher}`}</p>
                        } */}
                        <p className='nameT'>{`${nameGeneral}`}</p>
                        <p className='comment'>{`${commentLine}`}</p>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          : 
          <div className="comments">
          <p className="notYet">Aún no hay comentarios</p>
          </div>
          }
          <form id="comment-form" className="comment-form" method="post" onSubmit={handleCommentSubmit}>
            <div className="addComentsContainer">
              <div className="addCommentContainer">
                <label 
                className="addCommenTitle"
                htmlFor="comment"
                >
                  Comentario
                </label>
                <textarea 
                className="commentBox"
                placeholder='Escribir comentario de 500 caracteres...'
                id="comment"
                name="comment"
                >

                </textarea>
              </div>
              <div className="addButtonContainer">
                <button className="addComment" variant="primary" type="submit" form="comment-form"
                onClick={handleCommentSubmit}>
                    + Añadir comentario
                </button>
              </div>
            </div>
          </form>
        </div>
        {openAlert && <ModalsMessage closeMessage={setOpenAlert} message='Comentario enviado con éxito' />}
    </div>
  )
}
