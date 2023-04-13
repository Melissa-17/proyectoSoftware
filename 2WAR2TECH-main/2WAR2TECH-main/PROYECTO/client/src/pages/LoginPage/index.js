import '#Styles/Login/Login.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login/access");
    }

    const googleOAuth = () => {
        window.open("http://localhost:3001/test-user/auth/google", "_self");
    }

    return (
        <div class="contenedorInicioSesion">
            <div class="contenedorPrincipal">
                <div class="contenedorCatolica">
                    <img 
                    src="https://www.udual.org/principal/wp-content/uploads/2021/12/Copia-de-Imagotipo-PUCP-alta_resolucion-1.png"
                    class="catolicaImagen" B
                    alt="imagen de la catolica" />
                </div>
                <div class="contenedorTituloLogin">
                    <p class="Titulo">Sistema de Tesis PUCP</p>
                </div>
                <div class="contenedorSubtitulo">
                    <h2 class="subtitulo">Accede a tu cuenta</h2>
                </div>
                <div class="contenedorOpcion">
                    <div class="opcion" onClick={ googleOAuth }>
                        <button class="contenedorCompletado">
                            <img 
                            src="https://silvaleon.com/wp-content/uploads/2021/05/logo-google-2.png"
                            class="contenedorGoogle"
                            alt="logo google" />
                            <p>Iniciar sesión con Gmail PUCP</p>
                        </button>
                    </div>
                    <div class="contenedorLinea">
                        <p>
                            <hr width={208}  size={1} noshade="noshade" color='black' />
                        </p>
                    </div>
                </div>
                <div class="contenedorEnviar">
                    <button class="botonEnviar" onClick={goToLogin}>
                        Ingresar
                    </button>
                </div>
                <div class="contenedorPregunta">
                    <p class="pregunta">¿Empezarás la tesis? </p>
                    <a href="/login/create" class="link">Regístrate aquí</a>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;