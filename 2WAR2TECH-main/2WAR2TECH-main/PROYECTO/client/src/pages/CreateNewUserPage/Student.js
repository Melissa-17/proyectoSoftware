import SidebarStudent from "#Components/SidebarMenu/Student";
import Navbar from "../../components/SidebarMenu/Navbar";

const CreateNewUserPageStudent = () => {
  return (
    <div className="d-flex flex-column">
      {/* <SidebarStudent
        name="Fabian Mora Acedo"
        role="Alumno"
        theme1="TEMAS DE TESIS"
        theme1_1="LISTA DE TEMAS"
        theme1_2="PROPONER TEMA"
        theme1_3="MIS SOLICITUDES"
        theme2="PORTAFOLIO"
        theme2_1="AVANCE"
        theme2_2="ENTREGABLES"
        theme3="EXPOSICIONES"
        theme4="SOLICITUDES"
      /> */}
      <Navbar/>
    </div>
  );
};

export default CreateNewUserPageStudent;