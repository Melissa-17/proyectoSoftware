import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from "#Context/userContext";
import { useContext } from "react";

export const PrivateRoutes = (props) => {
    let user = useContext(UserContext);
    user = user ? user : JSON.parse(localStorage.getItem('user'));
    
    const { rol } = props;
    // console.log(props)
    // console.log("React user: " + JSON.stringify(user, null, 2) + " rol: " + props)
    return(
        user && user.ROLEs && rol.includes(user.ROLEs[0].description) ? <Outlet/> : <Navigate to="/404"/>
    )
}

