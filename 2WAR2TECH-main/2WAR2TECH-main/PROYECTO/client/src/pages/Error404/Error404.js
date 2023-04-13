import "../Error404/Error404.css" 
import Navbar from "../../components/SidebarMenu/Navbar";

const Error404 = () => {
    return (
      <div>
        <Navbar/>

        <div className="ContenedorError">

        <h3>Error 404</h3>
        <p>Ups, página no encontrada</p>
        </div>
        
      </div>
    );
  };
  
  export default Error404;