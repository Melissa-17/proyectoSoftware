import AssignmentModel from "#Models/AssignmentModel.js";
import AssignmentXRoleModel from "#Models/AssignmentXRoleModel.js";
import AssignmentXStudentModel from "#Models/AssignmentXStudentModel.js";
import AssignmentXStudentXRevisorModel from "#Models/AssignmentXStudentXRevisorModel.js";
import CommentModel from "#Models/CommentModel.js";
import RoleModel from "#Models/RoleModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import UserModel from "#Models/UserModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";
import { Op } from 'sequelize';


const getListFinalAssignController = async (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;   

    const pageSize = parseInt(req.query.porPagina) ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const studentAssignments = await AssignmentXStudentModel.findAndCountAll({
        attributes: ['id', 'score', 'registerDate', 'status', 'updatedAt'],
        where: {
            'userId': {
                [Op.eq]: parseInt(res.locals.userId),
            },
            status: {[Op.like]: '%'+req.query.status +'%'} 
        },
        include: {
            model: AssignmentModel,
            attributes: ['id', 'assignmentName', 'createdAt','updatedAt', 'startDate', 'limitCompleteDate'],
            where: {
                type: {
                    [Op.like]: '%FINAL ASSIGN%'
                },
                'COURSEXSEMESTERId' : {
                    [Op.eq]: parseInt(req.params.cursoxsemesterid),
                }
                
            },
        },    
        subQuery: false,    
        order: [
            [AssignmentModel, 'startDate', 'ASC'],
        ],
        offset: regStart,
        limit: pageSize,
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
    
    return res.send(studentAssignments);
}

const getListByUserIdFinalAssignController = async (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;   
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const studentAssignments = await AssignmentXStudentModel.findAndCountAll({
        attributes: ['id', 'score', 'registerDate', 'status', 'updatedAt'],
        where: {
            'userId': {
                [Op.eq]: parseInt(req.params.uid),
            },
            status: {[Op.like]: '%'+req.query.status+'%'} 
        },
        include: {
            model: AssignmentModel,
            attributes: ['id', 'assignmentName', 'createdAt','updatedAt', 'startDate', 'limitCompleteDate'],
            where: {
                type: {
                    [Op.like]: '%FINAL ASSIGN%'
                },
                'COURSEXSEMESTERId' : {
                    [Op.eq]: parseInt(req.params.cursoxsemesterid),
                }
                
            },
        },      
        subQuery: false,  
        order: [
            [AssignmentModel, 'startDate', 'ASC'],
        ],
        offset: regStart,
        limit: pageSize,
    });    

    // var idAssignments = studentAssignments.rows.map( x=> x.dataValues.ASSIGNMENT.dataValues.id);
    // const responsablesxAssignments = await AssignmentXRoleModel.findAll({ 
    //     attributes : ["name", "ASSIGNMENTId"],
    //     where :{
    //         ASSIGNMENTId : {
    //             [Op.in] : idAssignments
    //         } 
    //     }        
    // });
    
    // const assigments = studentAssignments.rows.map(x => x.ASSIGNMENT.dataValues);
    // assigments.forEach(x => {
    //     x.AssignmentXRoleModel = responsablesxAssignments.filter(y => y.ASSIGNMENTId == x.id)
    // });    
    
    // if(res.locals.userRole === 4 || res.locals.userRole ===6){              
    //     const filterRowsValue = studentAssignments.rows
    //     .filter(x => x.ASSIGNMENT.dataValues.AssignmentXRoleModel.some(x => x.name == "Evaluador" && x.ROLEId == res.locals.userRole ))
    //     studentAssignments.rows = filterRowsValue;
    //     studentAssignments.count = filterRowsValue.length;
    //     // console.log("Assignments: " + JSON.stringify(studentAssignments, null, 2));
    // }    

    return res.send(studentAssignments);
}

const getDetailFinalAssignController = async (req, res) => {  //prueba con  46
    let studentAssignment = await AssignmentXStudentModel.findByPk(req.params.axsid, {
        attributes: ['id', 'score','linkVirtualSession','registerDate','status', "USERId"],
        include: [           
            {
                model: AssignmentModel,
                attributes: ['id','assignmentName','chapterName','startDate','endDate','maxScore','limitCompleteDate',
                    'limitCalificationDate','limitRepositoryUploadDate','type','additionalComments'],
                where: {
                    [Op.or]: [
                        {type: {
                            [Op.like]: '%FINAL ASSIGN%'    
                        }}, 
                        {type: {
                            [Op.like]: '%PARTIAL ASSIGN%'
                        }}, 
                        {type: {
                            [Op.like]: '%ADVANCE%'
                        }}, 
                    ]
                },
                include: {
                    model:AssignmentXRoleModel,
                    attributes : ["name", "ASSIGNMENTId", "id"],
                    include : {
                        model: RoleModel,
                        attributes : ["description", "id"]
                    }
                }   
            }, {
                model: CommentModel,

                include :[{
                    model : UserModel
                }]
            },{
                model : UserModel,  //datos alumno
                attributes: ["name", "fLastName", "mLastName", "photo" ]
            },  
        ]
    });

    const assignmentRevisors = await AssignmentXStudentXRevisorModel.findAll({
        attributes: ["id", "grade", "USERId"],
        where: {
            ASSIGNMENTXSTUDENTId: req.params.axsid,
        },
        include: [
            {
                model: UserModel,
                attributes: ["id", "name", "fLastName", "mLastName", "photo"],
                include: [{
                    model: SpecialtyModel,
                    attributes: ["name"]
                },{
                    model: RoleModel,
                    attributes: ["description"]
                }]
            }
        ]
    });  

    var userRIdlist = [];
    var aux = false;
    if(assignmentRevisors) {
        // console.log("axs: " + JSON.stringify(assignmentRevisors, null, 2));
        assignmentRevisors.map(x => userRIdlist.push([x.dataValues.USERId, 
            x.dataValues.USER.name + ' ' + x.dataValues.USER.fLastName+ ' ' + x.dataValues.USER.mLastName,
            x.dataValues.USER.dataValues.ROLEs[0].description]))    
    };
    
    // Usuario calificador, entonces deberia tener los permisos 
    // si aparece su userRole en la lista de revisores
    if ([4,5,6].includes(res.locals.userRole) ) {
        userRIdlist.map((userId) => {
            aux = (aux || userId == res.locals.userId);    
        });
    }
            
    // Usuario alumno, entonces debe tener los permisos si es su usuario
    aux = res.locals.userRole=="2" && userId == res.locals.userId;        
        
    if(aux){
        return res.status(401).json({ message: 'You are not authorized to access this request.' });
    } 

    return res.send({studentAssignment,userRIdlist});   
}



export { getListFinalAssignController, getDetailFinalAssignController, getListByUserIdFinalAssignController }