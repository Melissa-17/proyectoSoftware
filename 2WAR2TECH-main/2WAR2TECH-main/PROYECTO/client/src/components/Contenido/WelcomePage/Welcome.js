import React, { useState, useEffect } from "react";
import Navbar from "../../SidebarMenu/Navbar";
import "#Styles/Welcome/Welcome.css";
import { axiosGetUser } from "#API/GetUser.js";
import okay from "./GifOk/oki.gif";
import gif2 from "./GifOk/loadScreen.gif";
import hello from "./GifOk/hello.gif";
import Loading from "../../Loading/Loading";

function Welcome() {
  const [user, setUser] = useState([]);
  const JWTtoken = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const getUser = () => {
    axiosGetUser(JWTtoken)
      .then((response) => {
        const user = response.data;
        setUser(user);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // console.log("linea 56")
      setLoading(true);
      // console.log("linea 10")
      const a = await setTimeout(() => {
        // console.log("dentro")
        setLoading(false);
      }, 2200);
    }

    fetchData();
  }, [setLoading]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="welcomeContainer">
            <div className="welcome-header">
              <p className="titulo">
                Bienvenido {user.name ? user.name : " "}{" "}
                {user.fLastName ? user.fLastName : " "}{" "}
                {user.mLastName ? user.mLastName : " "}{" "}
              </p>
              <div className="contenedorLineaDetalle">
                <hr color="#CED4DA" className="linea" />
              </div>
            </div>
            <div className="welcome-content">
              {/* <img src={hello} alt="ok-gif"></img> */}
              {/* <p>Esta es una pantalla de inicio provisional</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Welcome;
