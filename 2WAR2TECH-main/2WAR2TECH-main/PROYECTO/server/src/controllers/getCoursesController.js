import CourseModel from "#Models/CourseModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import CourseXSemesterModel  from "#Models/CourseXSemesterModel.js";
import UserModel from "#Models/UserModel.js";

const getCoursesController = async (req, res) => {
    const courses = await CourseModel.findAll({});
    
    return res.send(courses);
}

const getProfesorsCoursexSemesterController = async (req, res) => {

    const idP = await UserXCourseXSemesterModel.findAll({
        include :[{
            model : CourseXSemesterModel,
            where :{
                'COURSEId':  {
                    [Op.eq]: parseInt(req.params.CourseId),
                } , 
                'SEMESTERId':  {
                    [Op.eq]: parseInt(req.params.SemesterId),
                } ,    
            }
        },
        {
            model : UserModel,
            include :{
                model: UserXRoleModel,
                where :{
                    'ROLEId': {
                        [Op.eq]: 4,
                    }
                }
            }
        }

    ]

    });
    
    return res.send(idP);
}



export default {getProfesorsCoursexSemesterController, getCoursesController};