import "#Styles/App.css";
import ScreenAvances from "./components/Contenido/Alumno/AvancesPrincipal/ScreenAvances";
import AvancesDetail from "./components/Contenido/Alumno/AvancesDetalle1/AvancesDetail";
import LoginPage from "#Pages/LoginPage";
import CreateNewUserPageAdministrador from "#Pages/CreateNewUserPage";
import CreateNewUserPageStudent from "./pages/CreateNewUserPage/Student";
import Contents from "./components/Student/InitialPart/Content";
import DelivDetail from "./components/Student/DetailPart/DelivDetail";
import axiosClient from "#API/axiosClient.js";
import { axiosGetUserAuth } from "#API/User.js";
import { IsRolAuthorized } from "#Helpers/rolCondition.js";
import { PrivateRoutes } from "#Helpers/PrivateRoutes.js";

import RubricContent from "./components/Student/Rubrica/RubricContent";
import IconoHeader from "./components/Student/Rubrica/IconHeader";
import SeeMore from "./components/Student/Rubrica/SeeMore";
import SeeMoreAdviser from "./components/Adviser/Rubrica/SeeMore";
import PartialDetail from "./components/Student/DetailPart/PartialDetail";

import Pantalla from "./components/Contenido/Coordinador/Semestres/Pantalla";

import FirstAdviser from "./components/Adviser/InitialScreen/FirstAdviser";
import SecondPortfolio from "./components/Adviser/SecondScreenPortfolio/SecondPortfolio";
import ContentPartial from "./components/Student/InitialPart/ContentPartial";
import ContentDeliverable from "./components/Student/InitialPart/ContentDeliverable";
import InfoPresentation from "./pages/Alumno/InfoPresentation";
import Welcome from "./components/Contenido/WelcomePage/Welcome";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Switch,
} from "react-router-dom";
//import { Switch } from "react-router";
import WebFont from "webfontloader";
import { createContext, useEffect, useState } from "react";
import Presentation from "./pages/Alumno/Presentation";
import OpcionBoton from "./components/Student/Rubrica/OptionButton";
import OpcionBotonAdviser from "./components/Adviser/Rubrica/OptionButton";
import EditarSemestre from "./components/Contenido/Coordinador/Semestres/EditarSemestre";

import NuevoSemestre from "./components/Contenido/Coordinador/Semestres/NuevoSemestre";
import NuevoCurso from "./components/Contenido/Coordinador/Semestres/CrearCurso";
import ContentPartialAdvisor from "./components/Adviser/StudentAssignments/ContentPartialAdvisor";
import ContentDeliverableAdvisor from "./components/Adviser/StudentAssignments/ContentDeliverableAdvisor";
import ScreenAvancesAdvisor from "./components/Adviser/StudentAdvance/AvancesPrincipal/ScreenAvancesAdvisor";
import DelivDetailAdviser from "./components/Adviser/DetailPart/DelivDetailAdviser";
import AvancesDetailAdviser from "./components/Adviser/StudentAdvance/AvancesDetalle1/AvancesDetailAdviser";
import DetailApproval from "./components/Coordinator/DetailApproval/DetailApproval";
import EditDetailApproval from "./components/Coordinator/DetailApproval/EditDetail/DetailApproval";

import AdvisorApproval from "./components/Coordinator/Approval/AdvisorApproval";
import MainList from "./components/Contenido/Alumno/ThesisThemes/ThesisList/MainList";
import MainPropose from "./components/Contenido/Alumno/ThesisThemes/ThesisPropose/MainPropose";
import ThemeDetail from "./components/Contenido/Alumno/ThesisThemes/ThesisList/ThemeDetail";
import ProposeDetail from "./components/Contenido/Alumno/ThesisThemes/ThesisPropose/ProposeDetail";
import ProposeDetailInfo from "./components/Contenido/Alumno/ThesisThemes/ThesisPropose/ProposeDetailInfo";
import MainRequest from "./components/Contenido/Alumno/ThesisThemes/Request/MainRequest";
import RequestDetail from "./components/Contenido/Alumno/ThesisThemes/Request/RequestDetail";

import DeliverableJury from "./components/Jury/Deliverable/DeliverableJury";
import DetailDeliverableJury from "./components/Jury/Deliverable/DetailPart/DetailDeliverableJury";
import OpcionBotonJury from "./components/Jury/Rubrica/OptionButton";
import InitialPresentationJury from "./components/Jury/Presentation/InitialScreen.js";
import StudentsListPresentation from "./components/Jury/Presentation/Students.js";
import DetailPresentationJury from "./components/Jury/Presentation/DetailPart/PresentationDetail.js";

import DeliverableTeacher from "./components/Teacher/Portafolio/PrincipalPortfolio/DeliverableTeacher";
import SecondPartTeacher from "./components/Teacher/Portafolio/SecondPortfolio/SecondPartTeacher";
import ContentDeliverableTeacher from "./components/Teacher/Portafolio/StudentAssignment/ContentDeliverableTeacher";
import ContentPartialTeacher from "./components/Teacher/Portafolio/StudentAssignment/ContentPartialTeacher";
import DelivDetailTeacher from "./components/Teacher/Portafolio/DetailPart/DelivDetailTeacher";
import ScreenAvancesTeacher from "./components/Teacher/Portafolio/StudentAvance/AvancePrincipal/ScreenAvancesTeacher";
import AvancesDetailTeacher from "./components/Teacher/Portafolio/StudentAvance/AvanceDetalle/AvancesDetailTeacher";
import ContentOptionTeacher from "./components/Teacher/Timeline/PrincipalPart/ContentOptionTeacher";
import VisualPart from "./components/Teacher/Timeline/VisualPart/VisualPart";
import Edit from "./components/Teacher/Timeline/EditPart/Edit";
import RubricaProfesor from "./components/Teacher/Timeline/RubricaPart/Rubrica";

import StuReport from "./components/Teacher/Reportes/StuReport";
import SemReport from "./components/Teacher/Reportes/SemReport";

import RubricaEditarProfesor from "./components/Teacher/Timeline/RubricaPart/EditPart/Rubrica";
import EditCriteria from "./components/Teacher/Timeline/Criteria/EditPart/EditCriteria";
import VisualCriteria from "./components/Teacher/Timeline/Criteria/VisualPart/VisualCriteria";

import ContentPropose from "./components/Adviser/ThesisThemes/ContentPropose";
import ContentRequest from "./components/Adviser/ThesisThemes/ContentRequest";
import NewPropose from "./components/Adviser/ThesisThemes/ProposeFiles/NewPropose";
import ContentStudentPropose from "./components/Adviser/ThesisThemes/ContentStudentPropose";
// import AdviserProposeDetail from './components/Adviser/ThesisThemes/ProposeFiles/AdviserProposeDetail';

import PresentationTeacher from "./components/Teacher/Presentation/InitialScreen.js";
import AddPresentation from "./components/Teacher/Presentation/NewPresentation.js";
import NewThemeTeacher from "./components/Teacher/Presentation/NewTheme.js";
import NewJuryTeacher from "./components/Teacher/Presentation/NewJury.js";
import DetailPresentationTeacher from "./components/Teacher/Presentation/DetailPresentation.js";
import EditPresentationTeacher from "./components/Teacher/Presentation/EditPresentation.js";
import AdviserProposeDetail from "./components/Adviser/ThesisThemes/ProposeFiles/AdviserProposeDetail";
import AdviserRequestDetail from "./components/Adviser/ThesisThemes/RequestFiles/RequestDetail";
import StuProposeDetail from "./components/Adviser/ThesisThemes/StuProposeFiles/StuProposeDetail";
import MainCourseMark from "./components/Teacher/CourseMark/MainCourseMark";
import MainCourseManagement from "./components/Teacher/CourseManagement/MainCourseManagement";
import MainStaffTemplate from "./components/Teacher/Template/MainStaffTemplate";
import CriteriaDetail from "./components/Teacher/CourseMark/CriteriaDetail";
import CriteriaEdit from "./components/Teacher/CourseMark/CriteriaEdit";
import AssignmentJury from "./components/Teacher/AssignmentJury/InitialScreen.js";
import EditAssignJury from "./components/Teacher/AssignmentJury/AddJury.js";

import { UserContext } from "#Context/userContext.js";
import { AsesorContext } from "#Context/asesorContext.js";
import Error404 from "./pages/Error404/Error404";
import { axiosGetAsesorByStudent } from "./api/User";

import PrincipalPartFacultyAdmin from "./components/Admin/Faculty/PrincipalPartFacultyAdmin";
import VisualPartFacultyAdmin from "./components/Admin/Faculty/Visual/VisualPart";
import EditPartFacultyPart from "./components/Admin/Faculty/Edit/EditPart";
import AddEspecialidadFacultyAdmin from "./components/Admin/Faculty/AddEspecialidad/AddEspecialidad";

import PrincipalCoordinator from "./components/Admin/Coordinator/PrincipalCoordinator";
import PrincipalRegister from "./components/Admin/Coordinator/Register/PrincipalRegister";
import PrincipalVisualCoordinator from "./components/Admin/Coordinator/Visual/PrincipalVisualCoordinator";
import PrincipalEditCoordinator from "./components/Admin/Coordinator/Edit/PrincipalEditCoordinator";

import PrincipalSpecialty from "./components/Admin/Specialty/PrincipalSpecialty";

import PrincipalSemester from "./components/Admin/Semester/PrincipalSemester";

import ReactHtmlParser from "react-html-parser";
import PantallaAdministracion from "./components/Contenido/Profesor/Pantalla";
import AdministracionAsesores from "./components/Contenido/Profesor/Asesores.js";
import DetalleAsesor from "./components/Contenido/Profesor/DetalleAsesor.js";
import LoginAccessAccount from "./pages/LoginPage/LoginAccessAccount";
import CreateAccount from "./pages/LoginPage/CreateAccount";

import UserRegistry from "./components/Admin/UserRegistry/UserRegistry";
import PrincipalEditUser from "./components/Admin/UserRegistry/Edit/PrincipalEditUser";

import StuReportDetail from "./components/Teacher/Reportes/StuReportDetail";

import CursoReportDetail from "./components/Teacher/Reportes/CursoReportDetail";
import Courses from "./components/Contenido/Alumno/ChooseCourse/Courses";
import Selection from "./components/Contenido/Alumno/ChooseCourse/Selection";

import CoordCurso from "./components/Coordinator/Curso/CoordCurso.js";
import CoordHorario from "./components/Coordinator/Horario/CoordHorario.js";
import CoordProfesor from "./components/Coordinator/Profesor/CoordProfesor.js";
import RegistroCurso from "./components/Coordinator/Curso/RegistroCurso";

import CursoDetalle from "./components/Coordinator/Curso/CursoDetalle";
import CursoEditar from "./components/Coordinator/Curso/CursoEditar";

import HorarioDetalle from "./components/Coordinator/Horario/Detalle/HorarioDetalle";
import HorarioEdit from "./components/Coordinator/Horario/Editar/HorarioEdit";
import RegistroHorario from "./components/Coordinator/Horario/RegistroHorario";

import RegistroProfesor from "./components/Coordinator/Profesor/RegistroProfesor";
import ProfesorDetalle from "./components/Coordinator/Profesor/ProfesorDetalle";
import ProfesorEditar from "./components/Coordinator/Profesor/ProfesorEditar";
import MainSustain from "./components/Coordinator/Sustain/MainSustain";
import SustentacionGrafico from "./components/Coordinator/Sustain/SustentacionGrafico";
import CoordAsesor from "./components/Coordinator/Asesor/CoordAsesor";

import RegistroAsesor from "./components/Coordinator/Asesor/RegistroAsesor";
import AsesorDetalle from "./components/Coordinator/Asesor/AsesorDetalle";
import AsesorEdit from "./components/Coordinator/Asesor/AsesorEdit";
import MainRegister from "./components/Coordinator/RegisterTheme/MainRegister";

import CoordJurados from "./components/Teacher/Jurados/CoordJurados";
import RegistroJurado from "./components/Teacher/Jurados/RegistroJurado";
import JuradoDetalle from "./components/Teacher/Jurados/JuradoDetalle";
import JuradoEditar from "./components/Teacher/Jurados/JuradoEditar";

import UserManagement from "./components/SidebarMenu/UserManagement";

function App() {
  // Fuente
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat", "Roboto"],
      },
    });
  }, []);

  /* Configuracion de usuario */
  const [user, setUser] = useState(null);
  const [asesor, setAsesor] = useState(null);

  const getUserAuth = () => {
    axiosGetUserAuth()
      .then((response) => {
        let userT = response.data.user;
        sessionStorage.setItem("token", response.data.token);
        // let asesorT;

        // axiosGetAsesorByStudent(response.data.token, userT.id, 1) // TODO: CAMBIAR ESTE
        //   .then((res) => {
        //     // console.log(res.data);
        //     asesorT = res.data;
        //     setAsesor(res.data);
        //     userT = { ...userT, asesor: asesorT };
        //     localStorage.setItem("user", JSON.stringify(user));
        //     setUser(userT);
        //     // console.log(userT);
        //   })
        //   .catch((err) => {
        //     console.error(`Error axiosGetAsesorByStudent: ${err}`);
        //     localStorage.setItem("user", JSON.stringify(user));
        //     setUser(userT);
        //   });
        localStorage.setItem("user", JSON.stringify(userT));
        setUser(userT);

        // axiosClient.defaults.headers.common['Authorization'] = response.data.token;
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  useEffect(() => {
    if (!user) {
      getUserAuth();
    }

    // if(localStorage.getItem('user')) {
    //   setUser(JSON.parse(localStorage.getItem('user')));
    // }
    console.log(user);
  }, [user]);

  const AppStyle = {
    fontFamily: "Montserrat",
    backgroundColor: "white",
    height: "100vh",
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className="App" style={AppStyle}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/404" element={user ? <Error404 /> : <LoginPage />} />
            <Route path="/" element={user ? <Navigate to="/welcome" /> : <LoginPage />} />
            <Route path="/welcome" element={user ? <Welcome /> : <LoginPage />} />
            <Route path="/login/access" element={ <LoginAccessAccount   user={user}   setUser={setUser}   asesor={asesor}   setAsesor={setAsesor} /> } />
            <Route path="/login/create" element={<CreateAccount />} />
            <Route path="/login/management" element={<UserManagement />} />
            {/*   Alumno   */}

            <Route element={<PrivateRoutes rol={["Alumno"]} />}>
              <Route path="/entregable/partial" element={<ContentPartial />} />
              <Route path="/entregable/deliverable" element={<ContentDeliverable />} />
              <Route path="/deliverable/detail/:id/:option" element={<DelivDetail />} />
              <Route path="/partial/detail/:id/:option" element={<DelivDetail />} />
              <Route path="/avances/*" element={<ScreenAvances />} />
              <Route path="/avances/avancesDetail/:id/:num" element={<AvancesDetail />} />
              <Route path="/presentation" element={<Presentation />} />
              <Route path="/presentation/detail/:id/:num" element={<InfoPresentation />} />
              <Route path="/rubrica/:id/:option/:idrevisor" element={<OpcionBoton />} />
              <Route path="/rubrica/detail/:id/:option/:idrevisor" element={<SeeMore />} />
              <Route path="/Thesis/list" element={<MainList />} />
              <Route path="/Thesis/theme" element={<ThemeDetail />} />
              <Route path="/Thesis/request" element={<MainRequest />} />
              <Route path="/Thesis/request/detail" element={<RequestDetail />} />
              <Route path="/Thesis/propose" element={<MainPropose />} />
              <Route path="/Thesis/proposeDetail" element={<ProposeDetailInfo />} />
              <Route path="/Thesis/newPropose" element={<ProposeDetail />} />
              <Route path="/mycourses" element={<Courses />} />
              <Route path="/mycourses/selection" element={<Selection />} />
            </Route>

            {/*   Coordinador   */}

            <Route element={<PrivateRoutes rol={["Coordinador"]} />}>
              <Route path="/Semestre/pantalla/*" element={<Pantalla />} />
              <Route path="/Semestre/detalle" element={<EditarSemestre />} />
              <Route path="/Semestre/nuevo" element={<NuevoSemestre />} />
              <Route path="/Semestre/detalle/cursonuevo" element={<NuevoCurso />} />
              <Route path="/asesor-approval/detail" element={<DetailApproval />} />
              <Route path="/asesor-approval/detail/edit" element={<EditDetailApproval />} />
              <Route path="/asesor-approval" element={<AdvisorApproval />} />

              <Route path="/Coordinador/curso" element={<CoordCurso />} />
              <Route path="/Coordinador/horario" element={<CoordHorario />} />
              <Route path="/Coordinador/profesores" element={<CoordProfesor />} />
              <Route path="/Coordinador/curso/registro" element={<RegistroCurso />} />
              <Route path="/Coordinador/curso/detalle" element={<CursoDetalle />} />
              <Route path="/Coordinador/curso/editar" element={<CursoEditar />} />
              <Route path="/Coordinador/horario/registro" element={<RegistroHorario />} />
              <Route path="/Coordinador/horario/detalle" element={<HorarioDetalle />} />
              <Route path="/Coordinador/horario/editar" element={<HorarioEdit />} />

              <Route path="/Coordinador/profesores/registro" element={<RegistroProfesor />} />
              <Route path="/Coordinador/profesores/detalle" element={<ProfesorDetalle />} />
              <Route path="/Coordinador/profesores/editar" element={<ProfesorEditar />} />

              <Route path="/Sustentaciones" element={<MainSustain />} />
              <Route path="/Sustentaciones/grafico" element={<SustentacionGrafico />} />

              <Route path="/Coordinador/asesores" element={<CoordAsesor />} /> 
              <Route path="/Coordinador/asesores/registro" element={<RegistroAsesor />} />
              <Route path="/Coordinador/asesores/detalle" element={<AsesorDetalle />} />
              <Route path="/Coordinador/asesores/editar" element={<AsesorEdit />} />

              <Route path="/Coordinador/registrar-tema" element={<MainRegister />} />
            </Route>

            {/*   Asesor , Jurado , Profesor   */}

            <Route
              element={<PrivateRoutes rol={["Asesor", "Profesor", "Jurado"]} />}
            >
              <Route path="/revisor" element={<FirstAdviser />} />
              <Route path="/revisor/alumno" element={<SecondPortfolio />} />
              <Route path="/revisor/alumno/partial" element={<ContentPartialAdvisor />} />
              <Route path="/revisor/alumno/partial/detail/:id/:option" element={<DelivDetailAdviser />} />
              <Route path="/revisor/alumno/deliverable" element={<ContentDeliverableAdvisor />} />
              <Route path="/revisor/alumno/deliverable/detail/:id/:option" element={<DelivDetailAdviser />} />
              <Route path="/revisor/alumno/avances" element={<ScreenAvancesAdvisor />} />
              <Route path="/revisor/alumno/avances/detail/:id/:num" element={<AvancesDetailAdviser />} />
              <Route path="/rubricaAdviser/:id/:option/:idrevisor" element={<OpcionBotonAdviser />} />
              <Route path="/rubricaAdviser/detail/:id/:option/:idrevisor" element={<SeeMoreAdviser />} />
            </Route>

            {/*  Asesor  */}

            <Route element={<PrivateRoutes rol={["Asesor"]} />}>
              <Route path="/asesor/contentPropose" element={<ContentPropose />} />
              <Route path="/asesor/contentRequest" element={<ContentRequest />} />
              <Route path="/asesor/contentStudentPropose" element={<ContentStudentPropose />} />
              <Route path="/asesor/proposeDetail" element={<AdviserProposeDetail />} />
              <Route path="/asesor/NewPropose" element={<NewPropose />} />
              <Route path="/asesor/requestDetail" element={<AdviserRequestDetail />} />
              <Route path="/asesor/stuProposeDetail" element={<StuProposeDetail />} />

              <Route path="/asesor/presentation/:num" element={<InitialPresentationJury />} />
              <Route path="/asesor/presentation/students" element={<StudentsListPresentation />} />
              <Route path="/asesor/presentation/students/detail" element={<DetailPresentationJury />} />
            </Route>

            {/*  Jurado  */}

            <Route element={<PrivateRoutes rol={["Jurado"]} />}>
              <Route path="/jury/deliverable" element={<DeliverableJury />} />
              <Route path="/jury/deliverable/detail/:id/:num" element={<DetailDeliverableJury />} />
              <Route path="/rubricaJury/:id/:option/:idrevisor" element={<OpcionBotonJury />} />
              <Route path="/jury/portafolio" element={<DeliverableTeacher num={1} />} />
              <Route path="/jury/alumno/:num" element={<SecondPartTeacher />} />
              <Route path="/jury/alumno/partial/:num" element={<ContentPartialTeacher />} />
              <Route path="/jury/alumno/partial/detail/:id/:option" element={<DelivDetailTeacher />} />
              <Route path="/jury/alumno/deliverable/:num" element={<ContentDeliverableTeacher />} />
              <Route path="/jury/alumno/deliverable/detail/:id/:option" element={<DelivDetailTeacher />} />
              <Route path="/jury/alumno/avances/:num" element={<ScreenAvancesTeacher />} />
              <Route path="/jury/alumno/avances/detail/:id/:num" element={<AvancesDetailTeacher />} />
              <Route path="/rubricaJury/:id/:option/:idrevisor" element={<OpcionBoton />} />
              <Route path="/jury/presentation/:num" element={<InitialPresentationJury />} />
              <Route path="/jury/presentation/students" element={<StudentsListPresentation />} />
              <Route path="/jury/presentation/students/detail" element={<DetailPresentationJury />} />
            </Route>

            {/*  Profesor  */}

            <Route element={<PrivateRoutes rol={["Profesor"]} />}>
              <Route path="/teacher/portafolio" element={<DeliverableTeacher num={2} />} />
              <Route path="/teacher/alumno/:num" element={<SecondPartTeacher />} />
              <Route path="/teacher/alumno/partial/:num" element={<ContentPartialTeacher />} />
              <Route path="/teacher/alumno/partial/detail/:id/:option" element={<DelivDetailTeacher />} />
              <Route path="/teacher/alumno/deliverable/:num" element={<ContentDeliverableTeacher />} />
              <Route path="/teacher/alumno/deliverable/detail/:id/:option" element={<DelivDetailTeacher />} />
              <Route path="/teacher/alumno/avances/:num" element={<ScreenAvancesTeacher />} />
              <Route path="/teacher/alumno/avances/detail/:id/:num" element={<AvancesDetailTeacher />} />
              <Route path="/timeline" element={<ContentOptionTeacher />} />
              <Route path="/timeline/detail/:num" element={<VisualPart />} />
              <Route path="/timeline/edit" element={<Edit />} />
              <Route path="/timeline/rubrica/:num" element={<RubricaProfesor />} />
              <Route path="/timeline/rubrica/edit/:num" element={<RubricaEditarProfesor />} />
              <Route path="/timeline/criteria/edit/:num/:option" element={<EditCriteria />} />
              <Route path="/timeline/criteria/visual/:num/:option" element={<VisualCriteria />} />
              <Route path="/course/mark" element={<MainCourseMark />} />
              <Route path="/courses" element={<MainCourseManagement />} />
              <Route path="/template/*" element={<MainStaffTemplate />} />
              <Route path="/course/mark/detail" element={<CriteriaDetail />} />
              <Route path="/course/mark/edit" element={<CriteriaEdit />} />
              <Route path="/teacher/presentation" element={<PresentationTeacher />} />
              <Route path="/teacher/presentation/detailPresentationTeacher" element={<DetailPresentationTeacher />} />
              <Route path="/teacher/presentation/editTeacher" element={<EditPresentationTeacher />} />
              <Route path="/teacher/presentation/addPresentation" element={<AddPresentation />} />
              <Route path="/teacher/presentation/addPresentation/newTheme" element={<NewThemeTeacher />} />
              <Route path="/teacher/presentation/addPresentation/newJury" element={<NewJuryTeacher />} />
              <Route path="/teacher/assignment" element={<AssignmentJury />} />
              <Route path="/teacher/assignment/editJurys" element={<EditAssignJury />} />

              <Route path="/teacher/Administration" element={<PantallaAdministracion />} />
              <Route path="/Asesores" element={<AdministracionAsesores />} />
              <Route path="/teacher/semestre/reporte" element={<SemReport />} />

              <Route path="/teacher/alumno/reporte" element={<StuReport />} />
              <Route path="/teacher/alumno/reporte/detail" element={<StuReportDetail />} />

              <Route path="/teacher/semestre/reporte/detail" element={<CursoReportDetail />} />
              <Route path="/Asesor/Detalle" element={<DetalleAsesor />} />
              <Route path="/teacher/Jurados" element={<CoordJurados />} />
              <Route path="/teacher/Jurados/registro" element={<RegistroJurado />} />
              
              <Route path="/teacher/Jurados/detalle" element={<JuradoDetalle />} />
              <Route path="/teacher/Jurados/editar" element={<JuradoEditar />} />

              <Route path="/teacher/presentation/:num" element={<InitialPresentationJury />} />
              <Route path="/teacher/presentation/students" element={<StudentsListPresentation />} />
              <Route path="/teacher/presentation/students/detail" element={<DetailPresentationJury />} />
            </Route>

            {/*   Administrador   */}
            <Route element={<PrivateRoutes rol={["Administrador"]} />}>
              <Route path="/faculty" element={<PrincipalPartFacultyAdmin />} />
              <Route path="/faculty/visual" element={<EditPartFacultyPart />} />
              <Route path="/faculty/addEspecialidad" element={<AddEspecialidadFacultyAdmin />} />

              <Route path="/coordinator" element={<PrincipalCoordinator />} />
              <Route path="/coordinator/registro" element={<PrincipalRegister />} />
              <Route path="/coordinator/visual" element={<PrincipalVisualCoordinator />} />
              <Route path="/coordinator/edit" element={<PrincipalEditCoordinator />} />

              <Route path="/users" element={<UserRegistry />} />
              <Route path="/users/edit" element={<PrincipalEditUser />} />

              <Route path="/specialty" element={<PrincipalSpecialty />} />

              <Route path="/semester" element={<PrincipalSemester />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
{
  /* <Route path='/new-user' element={ user ? <CreateNewUserPageStudent /> : <Navigate to="/"/>}/>
            <Route path='/entregable' element={ user ? <Navigate to="/entregable/partial"/> : <LoginPage /> }/>
  {/*  ///////////////////////////////////  */
}
{
  /* <Route path='/*' element={<Contents />} />
            <Route path='/deliverable/detail' element={<DelivDetail />} /> */
}

{
  /* <Route path='/*' element={<RubricContent />} /> */
}

{
  /* <Route path='/*' element={<CreateNewUserPageStudent />} /> */
}
{
  /*  ///////////////////////////////////  */
}

{
  /*  ///////////////////////////////////  */
}
{
  /* <Route path='/entregable/partial' element={user ? <ContentPartial /> : <LoginPage />} />
            <Route path='/entregable/deliverable' element={user ? <ContentDeliverable /> : <LoginPage />} />
            <Route path='/deliverable/detail/:id/:option' element={ user ? <DelivDetail /> : <LoginPage />} />
            <Route path='/partial/detail/:id/:option' element={user ? <DelivDetail /> : <LoginPage />} />
            <Route path='/avances/*' element={user ? <ScreenAvances /> : <LoginPage />} />
            <Route path='/avances/avancesDetail/:id/:num' element={user ? <AvancesDetail /> : <LoginPage />}/>
            <Route path='/presentation' element={user ? <Presentation /> : <LoginPage />} />
            <Route path='/presentation/detail/:id/:num' element={user ? <InfoPresentation /> : <LoginPage />} />

            <Route path='/rubrica/:id/:option/:idrevisor' element={user ? <OpcionBoton /> : <LoginPage />} />
            <Route path='/rubrica/detail/:id/:option/:idrevisor' element={user ? <SeeMore /> : <LoginPage />} />

            <Route path='/Semestre/pantalla' element={user ? <Pantalla /> : <LoginPage />} />
            <Route path='/Semestre/detalle/' element={user ? <EditarSemestre /> : <LoginPage />} />
            <Route path='/Semestre/nuevo' element={user ? <NuevoSemestre /> : <LoginPage />} /> */
}
{
  /*  ///////////////////////////////////  */
}
