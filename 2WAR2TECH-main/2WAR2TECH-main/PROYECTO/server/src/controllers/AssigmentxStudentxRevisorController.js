import AssignmentXStudentXRevisorModel from "#Models/AssignmentXStudentXRevisorModel.js";
import AssignmentScoreModel from "#Models/AssignmentScoreModel.js";
import UserModel from "#Models/UserModel.js";
import { Op } from 'sequelize';
import LevelCriteriaModel from "#Models/LevelCriteriaModel.js";
import RubricCriteriaModel from "#Models/RubricCriteriaModel.js";


const getDetailAssigmentxStudentxRevisor = async (req, res) => {  //pantalla rubrica del assignment 
    const detailAssigmentRubric = await AssignmentXStudentXRevisorModel.findAll({
        where: {
            'ASSIGNMENTXSTUDENTId' :{
                [Op.eq]: parseInt(req.params.assignmentStudentId),
            } ,
            'USERId' : { //revisor
                [Op.eq]: parseInt(req.params.revisorId),
            }
        },
        include: [ 
            { 
                model: AssignmentScoreModel,
                include: {
                    model: LevelCriteriaModel,
                    include: {
                        model: RubricCriteriaModel,
                        attributes: ["id", "description"],
                    }
                }
            },{
                model: UserModel,
                attributes: ['id', 'name', 'fLastName', 'mLastName', 'photo'],
            }
        ]
    });
    return res.send(detailAssigmentRubric);
}

export { getDetailAssigmentxStudentxRevisor }