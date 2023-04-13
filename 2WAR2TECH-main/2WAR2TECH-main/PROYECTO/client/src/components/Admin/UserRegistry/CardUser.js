import React from "react";
import "../../../assets/styles/Admin/UserRegistry/CardUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export default function CardUser(props) {
    const navigate = useNavigate();
    const {userItem, rolSeleccionado2, deleteList, setDeleteList} = props;
    // console.log(userItem);
    const handleCheckDelete = (e, newId) => {
      if (e.currentTarget.checked) {
        setDeleteList([...deleteList, newId]);
      } else {
        const newList = deleteList.filter((assignId) => assignId !== newId);
        setDeleteList(newList);
      }
    };

  return (
    <div className="cuadroCardUser">
      <input type="checkbox" className="checkBoxCardUser"
      onChange={(e) => handleCheckDelete(e, userItem.id)}
      defaultChecked={false}
      checked={deleteList.includes(userItem.id)}
      />
      <div className="cuadroSecundarioCardUser">
        {userItem.photo ? (
          <img
            className="fotoUsuarioCardUser"
            src={`data:image/png;base64,${Buffer.from(
              userItem.photo.data
            ).toString("base64")}`}
            alt="profile-pic"
          />
        ) : (
          <img
            className="profileImg"
            src="https://wallpapercave.com/uwp/uwp2417748.png"
            alt="foto asesor"
          />
        )}
        {/* <img
            className="imagenCuadroSecundarioCardUser"
            src="https://wallpapercave.com/uwp/uwp2417748.png"
            alt="foto asesor"
          /> */}
        <p>{userItem.name+" "+userItem.fLastName+" "+userItem.mLastName}</p>
      </div>
      
      <div className="contenedorEmailRolCardUser">
        <Link className="linkEmailCardUser">{userItem.email}</Link>
        <p className="rolCardUser">{rolSeleccionado2}</p>
      </div>

      <button className="contenedorEditCardUser"
      onClick={()=>{
        navigate("/users/edit",{
          state:{
            userItem:userItem
          }
        });
      }}
      >
        <i class="bi bi-pencil-square"></i>
      </button>
    </div>
  );
}
