import React from "react";
import "#Styles/Student/InfoPresentation/Jury.css";
import { getUserPhoto } from "#Helpers/assignmentHelpers";
import { createCompleteName } from "#Helpers/stringHelpers";
import { useNavigate } from "react-router";
import { getScore } from "#Helpers/assignmentHelpers";
import { UserContext } from "#Context/userContext";
import { useContext } from "react";
import fileDefault from "../../../assets/svg/file-earmark-arrow-up.svg";
import fileDoc from "../../../assets/svg/file-earmark-word.svg";
import fileDocx from "../../../assets/svg/filetype-docx.svg";
import filePdf from "../../../assets/svg/filetype-pdf.svg";


const listImgConfig = {
  default: fileDefault,
  pdf: filePdf,
  docx: fileDocx,
  doc: fileDoc,
};

function Jury(props) {
  const { jury, maxScore,studentAssignment, option, id, cxsid, courseName } = props;
  const infoJury = jury.USER;
  const fileJury = jury.FILEs;
  const juryGrade = jury.grade;
console.log(infoJury)
  let user = useContext(UserContext);
  user = user ? user : JSON.parse(localStorage.getItem('user'));
  let revisor = JSON.parse(localStorage.getItem('asesor'));
//   const revisor = (user.asesor) ? user.asesor : {
//     USER: {name: 'Eduardo',
//     fLastName: 'Rios',
//     mLastName: 'Campos',
//     SPECIALTies: [{
//         name: 'Ingeniería Informática'
//     }]}
// };
    const navigate = useNavigate();
    
    const goToExpo = () =>{
        navigate(`/rubrica/${id}/${option}/${infoJury.id}`,{
            state: {
                assignment: studentAssignment,
                revisor: revisor,
                index: option,
                cxsid:cxsid,
                courseName:courseName
            }
        });
      }

      const downloadFile = (item) => {
        const key = `${item.id}-${item.filename}`;
        const url = `https://aws-s3-wartech-2022-2.s3.amazonaws.com/assignment/${key}`;
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
      };

  return (
    <div className="juryMainContainer">
      <div className="juryCard">
        <div className="foto-helpers">
          {getUserPhoto(infoJury && infoJury.photo ? infoJury.photo : null)}
        </div>
        {/* {infoJury.photo ? (
          <img
            className="juryPic"
            src={`data:image/png;base64,${Buffer.from(
              infoJury.photo.data
            ).toString("base64")}`}
            alt="profile-pic"
          />
        ) : null
        (
          <img
            className="juryPic"
            // src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            src="https://wallpapercave.com/uwp/uwp2417748.png"
            alt="foto asesor"
          />
        )
        } */}
        <p>
          <strong>
            {createCompleteName(
              infoJury.name,
              infoJury.fLastName,
              infoJury.mLastName
            )}
          </strong>
        </p>
      </div>
      <div className="juryDocRetro">
        {console.log(fileJury)}
        {fileJury.length > 0 ? (
          fileJury.map((item, index) => (
            <div key={index} className="contenedorArchivoJury">
              <img
                src={
                  listImgConfig[item.filename.split(".")[1]] ||
                  listImgConfig["default"]
                }
                alt=""
                onClick={() => downloadFile(item)}
              />
              <p>{item.filename.length<15 ? item.filename : `${item.filename.slice(0,15)}...`}</p>
            </div>
          ))
        ) : (
          <p className="retro-doc">Aún no hay retroalimentación</p>
        )}
      </div>
      <div className="juryGrade">
        <p>{getScore(juryGrade)}/{maxScore}</p>
      </div>
      <div className="juryRubric">
        <button onClick={goToExpo}>Rúbrica</button>
      </div>
    </div>
  );
}

export default Jury;
