import AssignmentModel from "#Models/AssignmentModel.js";
import CommentModel from "#Models/CommentModel.js";
import AssignmentXStudentModel from "#Models/AssignmentXStudentModel.js";
import AssignmentXStudentXRevisorModel from "#Models/AssignmentXStudentXRevisorModel.js";
import UserModel from "#Models/UserModel.js";
import SpecialtyModel from '#Models/SpecialtyModel.js'
import { Op } from 'sequelize';
import AssignmentXRoleModel from "#Models/AssignmentXRoleModel.js";
import RoleModel from "#Models/RoleModel.js";


const getListAdvanceController = async (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const studentAssignments = await AssignmentXStudentModel.findAndCountAll({
        attributes: ['id', 'score', 'registerDate', 'status', 'updatedAt'],
        where: {
            'userId': {
                [Op.eq]: parseInt(res.locals.userId),
            },
            status: { [Op.like]: '%'+req.query.status+'%'}
        },
        include:[ 
            {
                model: AssignmentModel,
                attributes: ['id', 'assignmentName', 'startDate', 'createdAt','updatedAt', 'limitCompleteDate'],
                where: {
                    type: {
                        [Op.like]: '%ADVANCE%'
                    },
                    'COURSEXSEMESTERId' : {
                        [Op.eq]: parseInt(req.params.cursoxsemesterid),
                    }
                },   
            },
            
        ],
        subQuery: false,
        order: [
            [AssignmentModel, 'startDate', 'ASC'],
        ],
        offset: regStart,
        limit: pageSize
    });
    
    var idAssignments = studentAssignments.rows.map( x=> x.dataValues.ASSIGNMENT.dataValues.id);
    const responsablesxAssignments = await AssignmentXRoleModel.findAll({ 
        attributes : ["name", "ASSIGNMENTId"],
        where :{
            ASSIGNMENTId : {
                [Op.in] : idAssignments
            } 
        },
        include : {
            model: RoleModel,
            attributes : ["description"]
        }
    });

    const assignmentXRoleModels =responsablesxAssignments.map(x=> x.dataValues);

    const assigments = studentAssignments.rows.map(x => x.dataValues.ASSIGNMENT.dataValues);
    assigments.forEach(x => {
        x.AssignmentXRoleModel = assignmentXRoleModels.filter(y => y.ASSIGNMENTId == x.id)
    });
    
    return res.send({studentAssignments});
}

const getListByUserIdAdvanceController = async (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const studentAssignments = await AssignmentXStudentModel.findAndCountAll({
        attributes: ['id', 'score', 'registerDate', 'status', 'updatedAt'],
        where: {
            'userId': {
                [Op.eq]: parseInt(req.params.uid),
            },
            status: { [Op.like]: '%'+req.query.status+'%'}
        },
        include: {
            model: AssignmentModel,
            attributes: ['id', 'assignmentName', 'createdAt','updatedAt', 'startDate', 'limitCompleteDate'],
            where: {
                type: {
                    [Op.like]: '%ADVANCE%'
                },
                'COURSEXSEMESTERId' : {
                    [Op.eq]: parseInt(req.params.cursoxsemesterid),
                }
            }
        },   
        subQuery: false,     
        order: [
            [AssignmentModel, 'startDate', 'ASC'],
        ],
        offset: regStart,
        limit: pageSize
    });


     
    var idAssignments = studentAssignments.rows.map( x=> x.dataValues.ASSIGNMENT.dataValues.id);
    const responsablesxAssignments = await AssignmentXRoleModel.findAll({ 
        attributes : ["name", "ASSIGNMENTId", "ROLEId"],
        where :{
            ASSIGNMENTId : {
                [Op.in] : idAssignments
            } 
        },
        include : {
            model: RoleModel,
            attributes : ["description"]
        }
    });



    const assignmentXRoleModels =responsablesxAssignments.map(x=> x.dataValues);

    const assigments = studentAssignments.rows.map(x => x.dataValues.ASSIGNMENT.dataValues);
    assigments.forEach(x => {
        x.AssignmentXRoleModel = assignmentXRoleModels.filter(y => y.ASSIGNMENTId == x.id)
    });
    
    // filtro para profesor : 4  y jurado : 6
    if(res.locals.userRole ===6){      
        const filterRowsValue = studentAssignments.rows
            .filter(x => x.ASSIGNMENT.dataValues.AssignmentXRoleModel.some(x => x.name === "Evaluador" && x.ROLEId === res.locals.userRole ))
        studentAssignments.rows = filterRowsValue;
        studentAssignments.count = filterRowsValue.length;
    
    }

    return res.send(studentAssignments);
}

const getDetailAdvanceController = async (req, res) => {

    const studentAssignment = await AssignmentXStudentModel.findByPk(req.params.axsid, {
        include: [
            {
                model: AssignmentModel,
                where: {
                    type: {
                        [Op.like]: '%ADVANCE%'
                    }
                }
            }, {
                model: CommentModel,
                include :[{
                    model : UserModel
                }
                ]
                
            },{
                model : UserModel,  //datos alumno
                attributes: ["name", "fLastName", "mLastName","photo" ]
            }
        ]
    });


    var idAssignment = 0;
    if(studentAssignment){
    idAssignment = studentAssignment.dataValues.ASSIGNMENT.dataValues.id;}
    
    const responsablesxAssignment = await AssignmentXRoleModel.findOne({ 
        attributes : ["name", "ASSIGNMENTId"],
        where :{
            ASSIGNMENTId : idAssignment  
        },
        include : {
            model: RoleModel,
            attributes : ["description"]
        }
    });

    if(responsablesxAssignment){
        const assignmentXRoleModels = responsablesxAssignment.dataValues;
        const assigments = studentAssignment.dataValues.ASSIGNMENT.dataValues;
        if(assigments.id == assignmentXRoleModels.ASSIGNMENTId){
            assigments.AssignmentXRoleModel = assignmentXRoleModels;
        }
    }
   
   
    const assignmentRevisors = await AssignmentXStudentXRevisorModel.findAll({
        attributes: ["id", "grade", "USERId"],
        where: {
            ASSIGNMENTXSTUDENTId: req.params.axsid,
        },
        include: {
            model: UserModel,
            attributes: ["id", "name", "fLastName", "mLastName", "photo"],
            include: {
                model: SpecialtyModel,
                attributes: ["name"]
            }
        }
    });
  
    


    var userId = 0;
    var userRId = 0;
    var aux = 0;
    if(studentAssignment) userId = studentAssignment.dataValues.USERId;
    if(assignmentRevisors) userRId = assignmentRevisors.map(x=> x.dataValues.USERId);
    if(userId == res.locals.userId) aux = userId;
    if(userRId == res.locals.userId) aux = userRId;

    if((aux == 0)){
        return res.status(401).json({ message: 'You are not authorized to access this request.' });
    }
    
    return res.send({studentAssignment, assignmentRevisors});
}

export { getListAdvanceController, getDetailAdvanceController, getListByUserIdAdvanceController }