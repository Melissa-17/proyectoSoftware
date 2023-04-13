import { UserContext } from "#Context/userContext";
import { useContext } from "react";
export const IsRolAuthorized =(rol) =>{
    const user = useContext(UserContext);

    // console.log("USER Y ROL:",user,rol)
    // console.log("INFORMACION DEL LOG:",user && user.ROLEs && user.ROLEs[0].description == rol)
    return (user && user.ROLEs && user.ROLEs[0].description == rol)
}
