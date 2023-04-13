import FacultyModel from "./FacultyModel.js";
import SpecialtyModel from "./SpecialtyModel.js";
import RoleModel from "./RoleModel.js";
import AssignmentModel from "./AssignmentModel.js";
// import db from "#Config/db.js";
import TeamModel from "./TeamModel.js";
import UserModel from "./UserModel.js";
import UserXTeamXThesisModel from "./UserXTeamXThesisModel.js";
import BlockModel from "./BlockModel.js";
import ThesisTrazabilityModel from "./ThesisTrazabilityModel.js";
// import FileModel from "./FileModel.js";


// TeamModel.hasMany(UserModel);
// UserModel.belongsTo(TeamModel);

await ThesisTrazabilityModel.sync();
// UserModel.sync({force: false});


console.log("Done");
