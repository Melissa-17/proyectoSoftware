import { sidebarDataStudent } from "#Components/SidebarMenu/SidebarDataStudent";
import { sidebarDataAdmin } from "#Components/SidebarMenu/SidebarDataAdmin";
import { sidebarDataAssessor } from "#Components/SidebarMenu/SidebarDataAssessor";
import { sidebarDataCoordinator } from "#Components/SidebarMenu/SidebarDataCoordinator";
import { sidebarDataProfessor } from "#Components/SidebarMenu/SidebarDataProfessor";
import { sidebarDataJury } from "#Components/SidebarMenu/SidebarDataJury";

export const getNavbarByRole = (role, Submenu) => {
    role = role.toLowerCase();
    if (role === "administrador") {
    return sidebarDataAdmin.map((item, index) => {
        return <Submenu item={item} key={index} />;
    });
    } else if (role === "asesor") {
    return sidebarDataAssessor.map((item, index) => {
        return <Submenu item={item} key={index} />;
    });
    } else if (role === "coordinador") {
    return sidebarDataCoordinator.map((item, index) => {
        return <Submenu item={item} key={index} />;
    });
    } else if (role === "jurado") {
    return sidebarDataJury.map((item, index) => {
        return <Submenu item={item} key={index} />;
    });
    } else if (role === "profesor") {
    return sidebarDataProfessor.map((item, index) => {
        return <Submenu item={item} key={index} />;
    });
    } else if (role === "alumno") {
    return sidebarDataStudent.map((item, index) => {
        return <Submenu item={item} key={index} />;
    });
    }
      
}

export const getNavbarColorByRole = (role) => {
    role = role.toLowerCase();
    
    if (role === "administrador" || role === "jurado" || role === "profesor") {
    return '#8BB733';
    } else if (role === "asesor") {
    return '#AAB8C6';
    } else if (role === "coordinador") {
    return '#16C78E';
    } else if (role === "alumno") {
    return '#F0AE19';
    }
}