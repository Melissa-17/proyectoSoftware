import AssignmentModel from "#Models/AssignmentModel.js";
import AssignmentXStudentModel from "#Models/AssignmentXStudentModel.js";
import AssignmentXStudentXRevisorModel from "#Models/AssignmentXStudentXRevisorModel.js";
import UserModel from "#Models/UserModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import { Op, col, Sequelize,fn } from 'sequelize';
import AssignmentXRoleModel from "#Models/AssignmentXRoleModel.js";
import RoleModel from "#Models/RoleModel.js";
import UserXThesisModel from "#Models/UserXThesisModel.js";
import FileModel from "#Models/FileModel.js";
import ThesisModel from "#Models/ThesisModel.js";

const getListExpositionController = async (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const studentAssignments = await AssignmentXStudentModel.findAndCountAll({
        attributes: ['id', 'score', 'registerDate', 'status', 'updatedAt'],
        where: {
            'userId': {
                [Op.eq]: parseInt(res.locals.userId),
            },
            status: {[Op.like]: '%'+req.query.status+'%'} 
        },
        include: {
            model: AssignmentModel,
            attributes: ['id', 'assignmentName', 'startDate', 'limitCompleteDate'],
            where: {
                type: {
                    [Op.like]: '%EXPOSITION%'
                },
                'COURSEXSEMESTERId' : {
                    [Op.eq]: parseInt(req.params.cursoxsemesterid),
                }
            },
            // include: {
            //     model: AssignmentXRoleModel,
            // }
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

const getListByUserIdExpositionController = async (req, res) => {
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
            attributes: ['id', 'assignmentName', 'startDate', 'limitCompleteDate'],
            where: {
                type: {
                    [Op.like]: '%EXPOSITION%'
                },
                'COURSEXSEMESTERId' : {
                    [Op.eq]: parseInt(req.params.cursoxsemesterid),
                }
            },
            // include: {
            //     model: AssignmentXRoleModel,
            // }
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

    // filtro para profesor : 4  y jurado : 6
    if(res.locals.userRole ===6){      
        const filterRowsValue = studentAssignments.rows
            .filter(x => x.ASSIGNMENT.dataValues.AssignmentXRoleModel.some(x => x.name === "Evaluador" && x.ROLEId === res.locals.userRole ))
        studentAssignments.rows = filterRowsValue;
        studentAssignments.count = filterRowsValue.length;    
    }
    
    return res.send(studentAssignments);
}

const getDetailExpositionController = async (req, res) => {   //probar con 32

    const studentAssignment = await AssignmentXStudentModel.findByPk(req.params.axsid, {
        include: [
            {
                model: AssignmentModel,
                where: {
                    type: {
                        [Op.like]: '%EXPOSITION%'
                    }
                },
            },{
                model : UserModel,  //datos alumno
                attributes: ["name", "fLastName", "mLastName", "photo" ]
            }
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
                include: [
                    {
                        model: SpecialtyModel,
                        attributes: ["name"],
                        through: { attributes: [] }
                    },
                    {
                        model: RoleModel,
                        attributes: ['id', 'description'],
                        through: { attributes: [] }
                    }
                ]
            },
            {
                model: FileModel,
                attributes: [ 'id', 'filename' ]
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
    /*
    var userId = 0;
    var userRId = 0;
    var aux = 0;
    if(studentAssignment) userId = studentAssignment.dataValues.USERId;
    if(assignmentRevisors) userRId = assignmentRevisors.map(x=> x.dataValues.USERId);  //falta comprobar por cada revisor , xq son varios
    console.log("user : " , userId, userRId);
    if(userId == res.locals.userId) aux = userId;
    if(userRId == res.locals.userId) aux = userRId;

    if((aux == 0)){ 
        return res.status(401).json({ message: 'You are not authorized to access this request.' });
    }
    */
    return res.send({studentAssignment, assignmentRevisors});
}


const getListExpositionsJuradoController1 = async (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    //parametros: cursoxsemesterid
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const userId = parseInt(res.locals.userId)

    const axsxr = await UserXThesisModel.findAndCountAll({
        as: 'ASSIGNMENT_X_STUDENT_X_REVISOR',
        where: {
            USERId: userId,
           '$ASSIGNMENT_X_STUDENT.ASSIGNMENT.type$': { [Op.like]: '%EXPOSITION%'},
        },
        
        include: [
            {
                model : AssignmentXStudentModel,
                as: 'ASSIGNMENT_X_STUDENT',
                include :[
                    {
                        model: AssignmentModel,
                        as: 'ASSIGNMENT',
                        attributes: ['id', 'assignmentName','type', 'startDate'],
                        where: {
                            type: {
                                    [Op.like]: '%EXPOSITION%',          
                            },
                            'COURSEXSEMESTERId' : {
                            [Op.eq]: parseInt(req.params.cursoxsemesterid),
                            }
                        },
                    }
                ]

            }
        ],
        // subQuery: false,
        // order: [
        //     [{model: AssignmentModel, as: 'ASSIGNMENT'},'startDate','ASC'], 
        // ], 
        offset: regStart,
        limit: pageSize ,
        logging: console.log
    });

    return res.send(axsxr);
}

const getListExpositionsJuradoController = async (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    //parametros: cursoxsemesterid
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    let tipo = '';
    const userId = parseInt(res.locals.userId);
    
    switch(parseInt(res.locals.userRole)){
        case 5:{
            tipo = 'ASESOR';
            break;
        }
        case 6: {
            tipo = 'JURY';
            break;
        }
    }
    const userxthesis = await UserXThesisModel.findAll({
        where: {
            USERId: userId,
            type : tipo,
        },
    });
    let studentsThesis;
    const thesisId = userxthesis.map( x=> x.THESISId);
    if(parseInt(res.locals.userRole) == 4){
        studentsThesis = await UserXThesisModel.findAll({
            where: {
                type : 'OWNER',
            },
        });
    }else{
        studentsThesis = await UserXThesisModel.findAll({
            where: {
                THESISId: {
                    [Op.in] : thesisId,
                },
                type : 'OWNER',
            },
        });
    }
    

    const studentsId = studentsThesis.map( x=> x.USERId);
    const studentAssignments = await AssignmentXStudentModel.findAndCountAll({
        attributes: ['id', 'USERId','linkVirtualSession', 'meetingDate','location', 'score', 'registerDate', 'status', 'updatedAt'],
        where: {
            'USERId': {  //where userId == req.params.userid
                [Op.in]: studentsId,
            }
        },
        include: [{ //puede recibir una matriz para obtener varios modelos asociados a la vez.
            model: AssignmentModel,
            attributes: ['id', 'assignmentName', 'limitCompleteDate', 'type', 'startDate', 'endDate'],
            where: {
                type: {
                    [Op.like]: '%EXPOSITION%'
                },
                'COURSEXSEMESTERId' : {
                    [Op.eq]: parseInt(req.params.cursoxsemesterid)
                }
            }
        },{
            model: UserModel,
            where: 
            Sequelize.where(
            fn("CONCAT", col("USER.name"), ' ', col("fLastName"),  ' ' , // gb
            col("mLastName")),
            {
                [Op.like]: '%'+req.query.text+'%',
            }),
        }],      
        subQuery: false,  
        order: [
            [AssignmentModel, 'startDate', 'ASC'],
        ],
        offset: regStart,
        limit: pageSize
    });

    return res.send(studentAssignments);
}


const getListExpositionThesisController = async (req, res) => {
   //req.params.idThesis;
    const Students = await UserXThesisModel.findAll({
        where: {
            THESISId : req.params.idThesis,
            type : 'OWNER'
        },
    });
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    
    const idStudents = Students.map( x=> x.USERId);
    const expositionThesis = await AssignmentXStudentModel.findAndCountAll({
        where:{
            USERId : {[Op.in] : idStudents}
        },
        include: {
            model: AssignmentModel,
            attributes: ['id', 'assignmentName', 'startDate', 'limitCompleteDate', 'COURSEXSEMESTERId'],
            where: {
                type: {
                    [Op.like]: '%EXPOSITION%'
                },
                'COURSEXSEMESTERId' : {
                    [Op.eq]: parseInt(req.params.cursoxsemesterid),
                }
            },
        },
        offset: regStart,
        limit: pageSize, 
    });

    return res.send(expositionThesis);
}


const editExpositionAxSController = async (req, res) => {
///    exposition/edit-expositionThesis/:axsId
   /*{
            "linkVirtualSession": "LinkExample",
            "location" : "H320",
            "meetingDate" : "2022-08-15T00:05:00.000Z"
    }*/ 

    const body = req.body; 
    const existAxS = await AssignmentXStudentModel.findByPk(req.params.axsId);
    if(!existAxS){
        return res.status(401).json({ message: `No existe la tesis con id ${req.params.axsId}` });
    }
    
    if(body.linkVirtualSession){    
        existAxS.linkVirtualSession = body.linkVirtualSession;
        existAxS.location = "";
    }
    if(body.location){
        existAxS.location = body.location;
        existAxS.linkVirtualSession = "";
    }
    existAxS.meetingDate =  body.meetingDate; 
    
    await existAxS.save();

    return  res.send(existAxS);
}

const getDetailExpostionJury = async(req, res) => {
    const revision = await AssignmentXStudentXRevisorModel.findOne({
        attributes: [ 'id', 'grade', 'feedbackDate', 'USERId' ],
        where:{
            ASSIGNMENTXSTUDENTId: req.params.idAXS,
            USERId: req.params.idR
        },
        include: {
            model: FileModel,
            attributes: [ 'id', 'filename' ]
        }
    })
    const exposition = await AssignmentXStudentModel.findByPk(req.params.idAXS,
        {
            attributes: [ 'id', 'linkVirtualSession', 'location', 'meetingDate', 'registerDate', 'status' ],
            include: [
                {
                    model: UserModel,
                    attributes: [ 'id', 'name', 'fLastName', 'mLastName' ],
                    include: [
                        {
                            model: ThesisModel,
                            attributes: [ 'id', 'title', 'theme', 'objective' ],
                            through: { 
                                attributes: [],
                                where: {
                                    type: 'OWNER'
                                }
                            }
                        },
                        {
                            model: SpecialtyModel,
                            attributes: [ 'id', 'name' ],
                            through: { attributes: [] }
                        }
                    ]
                },
                {
                    model: AssignmentModel,
                    attributes: [ 'id', 'assignmentName', 'maxScore']
                }
            ]
        }
    );
    return res.send({exposition, revision});
}

const getExpositionFiles = async (req, res) => {
    const files = await FileModel.findAll({
        attributes: [ 'id', 'filename' ],
        where: {
            ASSIGNMENTXSTUDENTXREVISORId: req.params.idAXSXR
        }
    });
    return res.status(201).send(files);
}


export { getListExpositionController, getDetailExpositionController, getListByUserIdExpositionController ,getListExpositionsJuradoController,
    getListExpositionThesisController, editExpositionAxSController, getDetailExpostionJury, getExpositionFiles }