import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "#Styles/Login/LoginAccessAccount.css";
import { axiosLogin } from "#API/User";
import ModalLoginError from "./LoginModals/ModalLoginError";

function LoginAccessAccount(props) {
  const { user, setUser, asesor, setAsesor } = props;
  const navigate = useNavigate();
  const [loginInvalido, setLoginInvalido] = useState(false);

  const googleOAuth = () => {
    window.open("http://localhost:3001/test-user/auth/google", "_self");
  };
  // useEffect(() => {
  //   console.log(user)
  // }, [user]);

  function comprobarEmail(valor, campo) {
    var mensaje = "";
    if (this.value == "") {
      mensaje = "Debe completar un email";
    } else if (this.value.substr(this.value.length - 12) != "@pucp.edu.pe" && this.value.substr(this.value.length - 10) != "@gmail.com") {
      mensaje = "El email debe contener una @pucp.edu.pe o @gmail.com";
    }
    this.setCustomValidity(mensaje);
  }
  var email = document.querySelector("#inputEmail");
  if (email) {
    email.addEventListener("invalid", comprobarEmail);
    email.addEventListener("input", comprobarEmail);
  }

  function comprobarContrasenha(valor, campo) {
    var mensaje = "";
    if (this.value == "") {
      mensaje = "Debe completar una contrasenha";
    }
    this.setCustomValidity(mensaje);
  }
  var psswd = document.querySelector("#inputPasswd");
  if (psswd) {
    psswd.addEventListener("invalid", comprobarContrasenha);
    psswd.addEventListener("input", comprobarContrasenha);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.querySelector(".emailForm").value;
    const password = document.querySelector(".passwordForm").value;
    // const proposeFormData = {
    //   email: email,
    //   password: password,
    // };

    const assignmentData = {
      email: email,
      password: password,
    };
    // console.log(assignmentData);
    axiosLogin(assignmentData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        localStorage.setItem("token", res.data.token);
        const data = res.data;
        console.log(data);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setAsesor(data.asesor);

        navigate("/welcome");
      })
      .catch((err) => {
        console.log(err);
        if (err.name == "AxiosError") setLoginInvalido(true);
      });

    //      closeMessage(false);
  };

  return (
    <div>
      <div className="loginBackground">
        <div className="rectangleBackground">
          <div className="loginHeader">
            <img
              src="https://www.udual.org/principal/wp-content/uploads/2021/12/Copia-de-Imagotipo-PUCP-alta_resolucion-1.png"
              className="catolicaImagen"
              alt="imagen de la catolica"
            />
            <p className="loginTitle">
              <strong>Sistema de Tesis PUCP</strong>
            </p>
            <p className="titleContent">
              <strong>Accede a tu cuenta</strong>
            </p>
          </div>
          <div className="loginContent">
            <div className="googleLogin">
              <button className="contenedorCompletado" onClick={googleOAuth}>
                <img
                  src="https://silvaleon.com/wp-content/uploads/2021/05/logo-google-2.png"
                  class="contenedorGoogle"
                  alt="logo google"
                />
                <p>Iniciar sesión con Gmail PUCP</p>
              </button>
            </div>
            <div className="loginDivider">
              <hr width={208} size={1} noshade="noshade" color="black" />
            </div>

            <div className="loginAccess">
              <form
                className="createAccForm createAcc-form"
                onSubmit={handleLogin}
                id="login-form"
                method="post"
              >
                <input
                  type="text"
                  className="emailForm"
                  name="emailForm"
                  id="inputEmail"
                  placeholder="example@pucp.edu.pe"
                  required
                />
                <input
                  type="password"
                  className="passwordForm"
                  name="passwordForm"
                  id="inputPasswd"
                  placeholder="Contraseña"
                  required
                />
                {/* <div className="rememberMe">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="rememberMeCB"
                    id="exampleCheck1"
                    
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Recuérdame
                  </label>
                </div> */}

                <button type="submit" className="btnEntry" form="login-form">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
          <div className="loginFooter">
            <p className="pregunta">¿Empezarás la tesis? </p>
            <a href="/login/create" class="link">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>
      {loginInvalido && (
        <ModalLoginError
          closeMessage={setLoginInvalido}
          message="Verifique su correo PUCP o su contraseña"
        />
      )}
    </div>
  );
}

export default LoginAccessAccount;
