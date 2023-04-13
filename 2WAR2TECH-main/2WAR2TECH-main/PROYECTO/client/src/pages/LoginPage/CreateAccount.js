import React, { useEffect, useState } from "react";
import "#Styles/Login/CreateAccount.css";
import { axiosGetFaculties } from "#API/Faculty";
import { axiosGetFacultySpecialty } from "#API/Faculty";
import { capitalize } from "../../helpers/stringHelpers";
import Form from "react-bootstrap/Form";
import { axiosPostAddStudent } from "#API/User";
import ModalAccountCreated from "./LoginModals/ModalAccountCreated";
import { useNavigate } from "react-router";
import ModalLoginError from "./LoginModals/ModalLoginError";

function CreateAccount() {
  const [facultyList, setFacultyList] = useState([]);
  const [specialtyId, setSpecialtyId] = useState();
  const [specialtyList, setSpecialtyList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [works, setWorks] = useState(true);
  const navigate = useNavigate();
  const returnSuccess = () => {
    navigate("/");
  };

  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   async function fetchData() {
  //
  //       const a = await setTimeout(() => {
  //           setLoading(false);
  //       }, 1000);
  //   }

  //   fetchData();
  // }, [setLoading])

  const getAllFacuSpecialties = () => {
    axiosGetFacultySpecialty()
      .then((response) => {
        const list = response.data || [];
        // console.log(list);
        setFacultyList(list);
        if(list[0].SPECIALTies.length>0)setSpecialtyId(list[0].SPECIALTies[0].id);
        else setSpecialtyId(-1);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getAllFacuSpecialties();
  }, []);

  const handleFacultyChange = (e) => {
    const facId = e.target.value;
    const arr =
      facultyList && facultyList[facId] && facultyList[facId].SPECIALTies
        ? facultyList[facId].SPECIALTies
        : null;
    setSpecialtyList(arr);
    if (arr && arr.length > 0) setSpecialtyId(arr[0].id);
    else setSpecialtyId(-1);
  };

  const handleSpecialtyChange = (e) => {
    const specId = e.target.value;
    // console.log(specialtyList);
    // console.log(specId);
    const spec =
      specialtyList && specialtyList[specId] && specialtyList[specId].id
        ? specialtyList[specId].id
        : -1;
    setSpecialtyId(spec);
  };

  const [validacionEspecialidad, setValidacionEspecialidad] = useState(false);

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    const names = document.querySelector(".nombreForm").value;
    const fLastName = document.querySelector(".fLnameForm").value;
    // const mLastName = document.querySelector(
    //   ".mLnameForm"
    // ).value;
    const codigo = document.querySelector(".codeForm").value;
    const email = document.querySelector(".emailForm").value;
    const password = document.querySelector(".passordForm").value;

    const accountFormData = {
      names: names,
      fLastName: fLastName,
      mLastName: " ",
      idSpecialty: specialtyId,
      codigo: codigo,
      email: email,
      password: password,
    };

    const accountData = {
      names: names,
      fLastName: fLastName,
      mLastName: " ",
      idSpecialty: specialtyId,
      codigo: codigo,
      email: email,
      password: password,
    };

    // console.log(specialtyId);

    if (specialtyId == -1) setValidacionEspecialidad(true);
    else {
      axiosPostAddStudent(accountData)
        .then((res) => {
          console.log(res);
          setWorks(true);
          setOpenModal(true);
        })
        .catch((err) => {
          console.log(err);
          setWorks(false);
          setOpenModal(true);
        });
    }
    // const a = setTimeout(() => {}, 1000);
  };

  const googleOAuth = () => {
    window.open("http://localhost:3001/test-user/auth/google", "_self");
  };

  function comprobarNombre(valor, campo) {
    var mensaje = "";
    if (this.value == "") {
      mensaje = "Debe completar un nombre";
    }
    this.setCustomValidity(mensaje);
  }
  var nombre = document.querySelector("inputName");
  if (nombre) {
    nombre.addEventListener("invalid", comprobarNombre);
    nombre.addEventListener("input", comprobarNombre);
  }

  function comprobarApellido(valor, campo) {
    var mensaje = "";
    if (this.value == "") {
      mensaje = "Debe completar un apellido";
    }
    this.setCustomValidity(mensaje);
  }
  var apellido = document.querySelector("#inputFLname");
  if (apellido) {
    apellido.addEventListener("invalid", comprobarApellido);
    apellido.addEventListener("input", comprobarApellido);
  }

  function comprobarCodigo(valor, campo) {
    var mensaje = "";
    if (this.value == "") {
      mensaje = "Debe completar un codigo PUCP";
    } else if (this.value.length != 8)
      mensaje = "Debe ser un código PUCP de 8 dígitos";
    this.setCustomValidity(mensaje);
  }
  var codigo = document.querySelector("#inputCode");
  if (codigo) {
    codigo.addEventListener("invalid", comprobarCodigo);
    codigo.addEventListener("input", comprobarCodigo);
  }

  function comprobarEmail(valor, campo) {
    var mensaje = "";
    if (this.value == "") {
      mensaje = "Debe completar un email";
    } else if (this.value.substr(this.value.length - 12) != "@pucp.edu.pe") {
      mensaje = "El email debe contener una @pucp.edu.pe";
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

  //console.log(facultyList);
  return (
    <div className="loginBackground">
      <div className="rectangleBackground">
        <div className="createAccHeader">
          <img
            src="https://www.udual.org/principal/wp-content/uploads/2021/12/Copia-de-Imagotipo-PUCP-alta_resolucion-1.png"
            className="catolicaImagen"
            alt="imagen de la catolica"
          />
          <div className="header2">
            <p className="createAccTitle">
              <strong>Sistema de Tesis PUCP</strong>
            </p>
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
          </div>
        </div>
        <div className="createAccContent">
          <p className="titleContentCreateAcc">
            <strong>Regístrate</strong>
          </p>
          <form
            className="createAccForm createAcc-form"
            onSubmit={handleAccountSubmit}
            id="createAcc-form"
            method="post"
          >
            <div className="contentCreateAcc">
              <input
                type="text"
                className="nombreForm"
                name="nombreForm"
                id="inputName"
                placeholder="Nombres"
                required
              />
              <input
                type="text"
                className="fLnameForm"
                name="fLnameForm"
                id="inputFLname"
                placeholder="Apellidos "
                required
              />
              {/* <input
                type="text"
                className="mLnameForm"
                name="mLnameForm"
                id="inputMLname"
                placeholder="Apellido Materno"
              /> */}
              <select
                name="facultySelect"
                className="form-control"
                placeholder="Facultad"
                onChange={handleFacultyChange}
              >
                {facultyList && facultyList.length > 0 ? (
                  facultyList.map((elemento, index) => (
                    <option key={index} value={index}>
                      {capitalize(elemento.name)}
                    </option>
                  ))
                ) : (
                  <option key={-1}>No hay facultad</option>
                )}
              </select>

              <select
                name="facultySelect"
                className="form-control"
                placeholder="Especialidad"
                onChange={handleSpecialtyChange}
              >
                {specialtyList && specialtyList.length > 0 ? (
                  specialtyList.map((elemento, index) => (
                    <option key={index} value={index}>
                      {capitalize(elemento.name)}
                    </option>
                  ))
                ) : (
                  <option key={-1}>No hay especialidades</option>
                )}
              </select>
              <Form.Control
                className="codeForm"
                id="inputCode"
                type="number"
                placeholder="Código PUCP"
                required
              />
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
                className="passordForm"
                name="passordForm"
                id="inputPasswd"
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="TyC">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck2"
                required
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Al registrarse usted está aceptando los{" "}
                <a
                  href="https://www.pucp.edu.pe/terminos-y-condiciones/"
                  target="_blank"
                >
                  Términos y Condiciones
                </a>
              </label>
            </div>

            <div className="loginFooter" style={{ marginBottom: "10px" }}>
              <p className="pregunta">¿Ya tienes una cuenta? </p>
              <a href="/login/access" class="link">
                Inicia sesión aquí
              </a>
            </div>

            <button className="registerBtn" type="submit" form="createAcc-form">
              Registrarse
            </button>
          </form>
        </div>
        <div className="createAccFooter"></div>
      </div>
      {openModal && (
        <ModalAccountCreated
          closeMessage={setOpenModal}
          works={works}
          messageOk="Su cuenta ha sido creada con éxito :)"
          messageError="Error al crear la cuenta, revise sus datos :("
          navigateFunc={returnSuccess}
        />
      )}
      {validacionEspecialidad && (
        <ModalLoginError
          closeMessage={setValidacionEspecialidad}
          message="Debe seleccionar una especialidad existente"
        />
      )}
    </div>
  );
}

export default CreateAccount;
