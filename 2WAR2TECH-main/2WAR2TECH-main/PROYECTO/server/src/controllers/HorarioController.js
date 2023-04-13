import AssignmentModel from "#Models/AssignmentModel.js";
import AssignmentTaskModel from "#Models/AssignmentTaskModel.js";
import AssignmentXRoleModel from "#Models/AssignmentXRoleModel.js";
import AssignmentXStudentXRevisorModel from "#Models/AssignmentXStudentXRevisorModel.js";
import CalificationModel from "#Models/CalificationModel.js";
import CalificationXAssignmentModel from "#Models/CalificationXAssignment.js";
import CommentModel from "#Models/CommentModel.js";
import CourseModel from "#Models/CourseModel.js";
import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import SemesterModel from "#Models/SemesterModel.js";
import UserModel from "#Models/UserModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";
import UserXSpecialtyModel from "#Models/UserXSpecialtyModel.js";
import { Op } from "sequelize";

const getHorarioController = async(req,res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    
    const horarios = await CourseXSemesterModel.findAndCountAll({
        attributes: ['id', 'name','abbreviation','numberOfThesis','beginDateApproval','endDateApproval'],
        where: {
            COURSEId: {
               [Op.eq]: req.params.courseId,
            },
            SEMESTERId:{
                [Op.eq]: req.params.semesterId,
            }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize
    })

    return res.status(201).send(horarios);
}

const getDetailHorarioController = async(req,res) => {
    const horario = await CourseXSemesterModel.findByPk(req.params.idHorario,{
        attributes: ['id', 'name','abbreviation'],
        include: [
            {
                model: CourseModel,
                attributes: ['name','code'],
            },
            {
                model: SemesterModel,
                attributes: ['abbreviation'],
            }
        ]
    })

    return res.status(201).send(horario);
}

const addHorarioController = async(req, res) => {
    /*
    Espera un body tal como:
    {
        "idSem": "4",
        "idCurso": "1",
        "name": "HORARIO NUMERO 2",
        "abbreviation": "H-202"
    }     
    */

    const newCourseXSem = CourseXSemesterModel.build();
    newCourseXSem.name = req.body.name;
    newCourseXSem.abbreviation = req.body.abbreviation;
    newCourseXSem.numberOfThesis = 0;
    newCourseXSem.beginDateApproval = '0000-00-00 00:00:00';
    newCourseXSem.endDateApproval = '0000-00-00 00:00:00';
    newCourseXSem.COURSEId = req.body.idCurso;
    newCourseXSem.SEMESTERId = req.body.idSem;
    await newCourseXSem.save();
    
    return res.status(201).send(`Se han creado el horario correctamente.`);
}

const copyHorarioController = async(req, res) => {
    /*
    Espera un body tal como:
    {
        "idSem": "5",
        "idCurso": "1",
        "name": "HORARIO NUMERO 4",
        "abbreviation": "H-204",
        "idCxSCopia:"1",
        "copiarFechas": "0" //0 si no copia fechas, 1 si sí
    }     
    */
//    console.log(req.body);


    const existcXs = await CourseXSemesterModel.findByPk(req.body.idCxSCopia);
    if(!existcXs){
        return res.status(404).send({
            errorMessage: `No se encontró el horario ${req.body.idCxSCopia}.`
        });
    }

    //COPIA EL HORARIO
    let newCourseXSem = CourseXSemesterModel.build();
    newCourseXSem.name = req.body.name;
    newCourseXSem.abbreviation = req.body.abbreviation;
    newCourseXSem.numberOfThesis = 0;
    if(req.body.copiarFechas == 1){        
        newCourseXSem.beginDateApproval = existcXs.beginDateApproval;
        newCourseXSem.endDateApproval = existcXs.endDateApproval;
    }
    newCourseXSem.SEMESTERId = req.body.idSem;
    newCourseXSem.COURSEId = req.body.idCurso;
    await newCourseXSem.save();

    //COPIA LOS CALIFICATIONS
    const califications = await CalificationModel.findAll({
        where: {
            COURSEXSEMESTERId: existcXs.id,
        }
    })
    let c, newCal;
    for(c of califications){
        newCal = CalificationModel.build();
        newCal.name = c.name;
        newCal.tipo = c.tipo;
        newCal.weight = c.weight;
        newCal.description = c.description;
        newCal.COURSEXSEMESTERId = newCourseXSem.id;
        await newCal.save();

    }
    const newCalifications = await CalificationModel.findAll({
        where: {
            COURSEXSEMESTERId: newCourseXSem.id,
        }
    })

    //COPIA LOS ASSIGNMENTS
    const assignments = await AssignmentModel.findAll({
        where: {
            type:{
                [Op.ne]: "PROGRAMMED_EXPOSITION",
            },
            COURSEXSEMESTERId: existcXs.id,
        }
    })
    let a, newAss, assignmentTask, at, newAT, calXAssignment, newCxA, assignmentRole, ar, newAR, nc;
    for(a of assignments){
        newAss = AssignmentModel.build();
        newAss.assignmentName = a.assignmentName;
        newAss.chapterName = a.chapterName;
        newAss.maxScore = a.maxScore;
        newAss.type = a.type;
        newAss.additionalComments = a.additionalComments;
        newAss.COURSEXSEMESTERId = newCourseXSem.id;
        newAss.RUBRICId = a.RUBRICId;
        if(req.body.copiarFechas == 1){        
            newAss.startDate = a.startDate;
            newAss.endDate = a.endDate;
            newAss.limitCompleteDate = a.limitCompleteDate;
            newAss.limitCalificationDate = a.limitCalificationDate;
            newAss.limitRepositoryUploadDate = a.limitRepositoryUploadDate;
        }
        await newAss.save();

        //COPIA LOS ASSIGNMENTTASK DE CADA ASSIGNMENT
        assignmentTask = await AssignmentTaskModel.findAll({
            where: {
                ASSIGNMENTId: a.id,
            }
        });
        
        for(at of assignmentTask){
            newAT = AssignmentTaskModel.build();
            newAT.name = at.name;
            newAT.ASSIGNMENTId = newAss.id;
            await newAT.save();
        }

        //COPIA LAS CALIFICACIONESXASSIGNMENTS de cada ASSIGNMENT        
        var j=0;
        for(c of califications){
            calXAssignment = await CalificationXAssignmentModel.findOne({
                where: {
                    CALIFICATIONId: c.id,
                    ASSIGNMENTId: a.id,
                }
            })
            if(calXAssignment){
                for(nc of newCalifications){
                    if(c.tipo == nc.tipo){
                        newCxA = CalificationXAssignmentModel.build();
                        newCxA.weight = calXAssignment.weight;
                        newCxA.CALIFICATIONId = nc.id;
                        newCxA.ASSIGNMENTId = newAss.id;
                        await newCxA.save();
                        break;
                    }
                }
            }               
        }     
        
        //COPIA LOS ASSIGNMENTROLE DE CADA ASSIGNMENT
        assignmentRole = await AssignmentXRoleModel.findAll({
            where: {
                ASSIGNMENTId: a.id,
            }
        });
        
        for(ar of assignmentRole){
            newAR = AssignmentXRoleModel.build();
            newAR.name = ar.name;
            newAR.ROLEId = ar.ROLEId;
            newAR.ASSIGNMENTId = newAss.id;
            await newAR.save();
        }
    }
    
    return res.status(201).send(`Se ha copiado el horario correctamente.`);
}

const deleteHorarioController = async(req, res) => {
    console.log(req.params)
    const existHorario = await CourseXSemesterModel.findByPk(parseInt(req.params.idHorario));
    if(!existHorario){
        return res.status(404).send({
            errorMessage: `No se encontró el curso ${req.params.idHorario}.`
        });
    }

    await existHorario.destroy();

    return res.status(200).send("Borrado exitoso.");
}

const editHorarioController = async(req, res) => {
    /*
    Espera un body tal como:
    {
        "idHorario": "1",
        "name": "HORARIO NUMERO 2",
        "abbreviation": "H-202"
    }     
    */

    const cXs = await CourseXSemesterModel.findByPk(req.body.idHorario);
    if(!cXs){
        return res.status(404).send({
            errorMessage: `No se encontró el horario ${req.body.idHorario}.`
        });
    }
    cXs.name = req.body.name;
    cXs.abbreviation = req.body.abbreviation;
    await cXs.save();
    
    return res.status(201).send(`Se ha modificado el horario correctamente.`);
}


const getProfessorsController = async(req,res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;
    const text = req.query.text ? req.query.text : '';
    
    const profesores = await UserModel.findAndCountAll({
        attributes: [ 'id', 'idPUCP', 'name','fLastName','mLastName','photo', 'email' ],
        where:{
            [Op.or]: [
                { name: { [Op.like]: '%' + text + '%' }},
                { fLastName: { [Op.like]: '%' + text + '%' }},
                { mLastName: { [Op.like]: '%' + text + '%' }}
            ],
        },
        include: [
            {
                model: UserXRoleModel,
                attributes: [],
                where: {
                    ROLEId: 4,
                }
            },
            {
                model: UserXSpecialtyModel,
                attributes: [],
                where: {
                    SPECIALTYId: res.locals.userSpecialtyId,
                }
            },
            {
                model: CourseXSemesterModel,
                attributes: [ 'id', 'name', 'abbreviation' ],
                through: { attributes: [] }
            }
        ],
        offset: regStart,
        limit: pageSize,
    })

    return res.status(201).send(profesores);
}

const deleteProfessorController = async(req, res) => {
    const existProf = await UserModel.findByPk(req.params.idProf);
    if(!existProf){
        return res.status(404).send({
            errorMessage: `No se encontró el profesor ${req.params.idProf}.`
        });
    }

    await existProf.destroy();

    const uXcXs = await UserXCourseXSemesterModel.findAll({
        where: {
            USERId: req.params.idProf,
        }
    });
    uXcXs.forEach(x => x.destroy());

    return res.status(200).send("Borrado exitoso.");
}

const getHorariosProfessorController = async(req,res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    // console.log(req.params)
    const horarios = await CourseXSemesterModel.findAndCountAll({
        attributes: ['id', 'name','abbreviation','numberOfThesis','beginDateApproval','endDateApproval'],
        where: {
            COURSEId: {
               [Op.eq]: parseInt(req.params.courseId),
            },
            SEMESTERId:{
                [Op.eq]: parseInt(req.params.semesterId),
            }
        },
        include: {
            model: UserXCourseXSemesterModel,
            attributes:['USERId'],
            where: {
                USERId: parseInt(req.params.idProf),
            },
            // required: true
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize
    })
    // console.log(horarios)

    return res.status(201).send(horarios);
}

export { getHorarioController , addHorarioController, copyHorarioController, deleteHorarioController , editHorarioController ,
    getDetailHorarioController, getProfessorsController , deleteProfessorController, getHorariosProfessorController};