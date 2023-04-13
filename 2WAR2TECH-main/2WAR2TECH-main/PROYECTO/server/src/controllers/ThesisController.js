import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import FileModel from "#Models/FileModel.js";
import PostulationPeriodModel from "#Models/PostulationPeriodModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import ThesisModel from "#Models/ThesisModel.js";
import UserModel from "#Models/UserModel.js";
import UserXThesisModel from "#Models/UserXThesisModel.js";
import { literal, Op } from 'sequelize';
import AWS from 'aws-sdk';
import contentDisposition from 'content-disposition';
import TeamModel from "#Models/TeamModel.js";
import UserXTeamXThesisModel from "#Models/UserXTeamXThesisModel.js";
import ThesisTrazabilityModel from "#Models/ThesisTrazabilityModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import { Sequelize, fn, col} from 'sequelize';

const removeAccents = (str) => {
    // return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

const getAllThesisBySpecialty = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis/specialty/:idCourse/:idSemester
    const cxs = await CourseXSemesterModel.findOne({ attributes: [ 'beginDateApproval', 'endDateApproval'], where: { COURSEId: req.params.idCourse, SEMESTERId: req.params.idSemester } });
    if(!cxs){
        return res.status(404).send({
            errorMessage: `El curso y el semestre no tienen relación`
        });
    }
    const thesis = await ThesisModel.findAll({ 
        attributes: [ 'id', 'title', 'theme', 'status' ],
        where: { SPECIALTYId: res.locals.userSpecialty },
        include: { 
            model: UserModel, 
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ],
            through: { attributes: [ 'type' ]},
            include: {
                model: CourseXSemesterModel,
                attributes: [],
                where: { id: cxs.id }
            },
            through: { attributes: []}
        },
        order: [
            ['status', 'DESC'],
            ['updatedAt', 'DESC']
        ] 
        });
    return res.status(201).send({thesis, cxs});
}

const getListThesisByState = async (req, res) => {
    //req.query.status = "SUSTENTADA";
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis/list-states/

    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    //const whereStatus = req.query.status ? { status : req.query.status } : undefined;  //si se especifica el estado (sustentada), que lo liste, sino lista todos 
    

    const approvedTheses = await ThesisModel.findAll({
        attributes: [ 'id'],
        where: { 
            SPECIALTYId : res.locals.userSpecialtyId,
            [Op.or]:[   
                {status : "APROBADO"},
                {status : "SUSTENTADA"}, 
            ],   
            title: { [Op.like]: `%${req.query.textThesis}%`},
        },
    });

    const approvedThesesId = approvedTheses.map( x=> x.id );
    //console.log( approvedTheses, approvedThesesId);

    const thesis = await ThesisModel.findAndCountAll({
        attributes: [ 'id', 'title', 'description', 'status', 'updatedAt', 'createdAt'],
        where: { 
           id :{
            [Op.in] : approvedThesesId,
           },
           status: { [Op.like]: `%${req.query.status}%`},
        },
        include :{
            required: true,
            model: UserXThesisModel,
            where:{
                type : "OWNER"
            },
            include :[{
                model: UserModel, 
                attributes : [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ],
            }]
        },  
        distinct: true,
        order: [
            ['updatedAt', 'DESC'], ['createdAt', 'DESC'],
        ],
        offset: regStart,
        limit: pageSize,
    });

    const cantAprobadas = await ThesisModel.count({
        where: { 
            SPECIALTYId : res.locals.userSpecialtyId,
            status: 'APROBADO',
        },
    });
    
    const cantSustentadas = await ThesisModel.count({
        where: { 
            SPECIALTYId : res.locals.userSpecialtyId,
            status: 'SUSTENTADA',
        },
    });

    return res.status(201).send({thesis,cantAprobadas,cantSustentadas});
}

const getAsesorThesis = async (req, res) => {


    const thesis = await ThesisModel.findOne({ where: { id: req.params.idThesis } });
    if(!thesis){
        return res.status(404).send({
            errorMessage: `No se encuentra la tesis  ${req.params.idThesis}` 
        });
    }

    const asesor = await userxThesis.findOne({
        where: {
            THESISId : req.params.idThesis,
            type: "ASESOR"
        },
        include:[{
            model: UserModel,
        }]
    });

    return res.status(201).send(asesor);

}



const getAllThesisBySpecialty2 = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis/specialty/
    
    const thesis = await ThesisModel.findAll({ 
        attributes: [ 'id', 'title', 'theme', 'status','areaName' ], 
        where: { 
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId
            }
        },
        include: { 
            model: UserModel, 
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ], 
            through: { 
                attributes: [ 'type' ]
            }
        },
        order: [
            ['status', 'DESC'],
            ['updatedAt', 'DESC']
        ] 
        }
    );
    return res.status(201).send(thesis);
}

const getNewAsesorsThesisBySpecialty = async(req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    let regStart = (page - 1)* pageSize; 

    const thesisNOT = await ThesisModel.findAll({
        attributes: ['id'],
        where:{
            status: 'APROBADO',
            SPECIALTYId: res.locals.userSpecialtyId
        },
        include: {
            attributes: [],
            model: UserXThesisModel,
            where:{
                type: 'STUDENT_APPLICANT',
                USERId: res.locals.userId
            },
        }
    });

    const thesis1NOT = await ThesisModel.findAll({
        attributes: ['id'],
        where:{
            status: 'APROBADO',
            SPECIALTYId: res.locals.userSpecialtyId
        },
        include: {
            attributes: [],
            model: UserXThesisModel,
            where:{
                type: 'OWNER',
            },
        }
    });


    let arrId = [];
    let t;
    for(t of thesisNOT){
        arrId.push(t.id);
    }
    for(t of thesis1NOT){
        arrId.push(t.id);
    }
    // console.log(res.locals.userSpecialtyId)
    arrId = arrId.length === 0 ? 9999999 : arrId; // En caso no tenga ninguna tesis asignada

    const thesis = await ThesisModel.findAndCountAll({
        attributes: ['id', 'title', 'updatedAt','createdAt' ],
        where:{
            [Op.not]: { id: arrId },
            title: { [Op.like]: `%${req.query.text}%`},
            status: 'APROBADO',
            SPECIALTYId: res.locals.userSpecialtyId,
        },
        include: {
            required: true,
            model: UserModel,
            attributes: [ 'id', 'idPUCP', 'photo', 'name', 'fLastName', 'mLastName', 'email' ],
            through:{
                model: UserXThesisModel,
                attributes: [],
                where:{
                    type: 'ASESOR'
                }
                
            },
            include: {
                model: SpecialtyModel,
                attributes: [ 'id', 'name' ],
                through: {
                    attributes: []
                }
            }
        },
        distinct: true,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        limit: pageSize,
        offset: regStart
    });

    // console.log(thesis)

    return res.status(201).send(thesis);
}

const getAsesorsThesisBySpecialty = async (req, res) => {  //devuelve una lista de los temas propuestos por asesores en estado aprobado
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis-Asesors/specialty

    req.query.page = req.query.page ? req.query.page : 1;   

    let pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    let regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const thesisSearch = await ThesisModel.findAndCountAll({ 
        attributes: [ 'id', 'title', 'theme', 'status','areaName' ], 
        where: { 
            'title': {  
                    [Op.like]: '%'+req.query.text+'%',
            },
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId
            },
            "status" : "APROBADO"
        },
        include: [
            { 
                model: UserModel, 
                attributes: [ 'id', 'name', 'fLastName', 'mLastName' ], 
                include: [{   //userxThesis
                    model: UserXThesisModel,
                    attributes: [ 'type', 'id' ],
                    where: {
                        [Op.or]: {
                            "type": "ASESOR",
                        },
                    },
                }],  
                required: true,
                // separate: true,
                // distinct: true
            }, 
        ],
        
        offset: regStart,
        limit: pageSize,
        distinct: true
        // logging: console.log
    });    
    
    var idsThesis = thesisSearch.rows.map(x=> x.id);

    const AssignmentStudentPostulant = await UserXThesisModel.findAndCountAll({
        attributes: ["THESISId", "USERId"],
        where:{
            THESISId :{ [Op.in] : idsThesis},
            "type": "STUDENT_APPLICANT",
            "USERId": { [Op.eq]: res.locals.userId },
        }
    });
   
    var idsAssignmentStudentPostulant = AssignmentStudentPostulant.rows.map(x=> x.dataValues.THESISId);
    // var idsAssignmentStudentPostulantAll = AssignmentStudentPostulantAll.rows.map(x=> x.dataValues.THESISId);

    const thesis = thesisSearch.rows.filter(y => !idsAssignmentStudentPostulant.includes(y.id) )
    thesisSearch.rows = thesis;
    thesisSearch.count = thesis.length;
    
    return res.send(thesisSearch);
}

const getAsesorsStudentsThesisBySpecialty = async (req, res) => {  //devuelve una lista de los temas de asesores en estado aprobado con su lista de alumnos asociados
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis-StudentsAsesors/specialty

    req.query.page = req.query.page ? req.query.page : 1;   

    // console.log("a: " + res.locals.userSpecialtyId);
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const thesisSearch = await ThesisModel.findAndCountAll({ 
        attributes: [ 'id', 'title', 'createdAt','theme', 'status','areaName' ], 
        where: { 
            'title': {  
                    [Op.like]: '%'+req.query.text+'%',
            },
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId
            },
            "status" : "APROBADO"  
        },
        include: [
            { 
                model: UserModel, 
                attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ],
                through: {   //userxThesis
                    model: UserXThesisModel,
                    attributes: [ 'type', 'createdAt' ],
                    where: {
                        "type": "ASESOR",
                    }
                },    
            }, 
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,
    });

    var thesisSoloAsesores = thesisSearch.rows.filter( y => !(y.USERs.length == 0)); //hay tesis que no tienen type asesor, y estan en APROBADO 
    var idsThesis = thesisSoloAsesores.map(x=> x.id);
    const thesisStudent = await UserXThesisModel.findAndCountAll({
        attributes: ['THESISId', 'USERId'],
        where:{
            THESISId :{ [Op.in] : idsThesis},
            "type": "OWNER",
        },
        include:[{
            model: UserModel, 
                attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ], 
        }]
    });

    var idsTHESIStudent = thesisStudent.rows.map(x=> x.dataValues.THESISId);
    const thesis = thesisSoloAsesores.filter(y => idsTHESIStudent.includes(y.id) ) //filtro thesis si no tienen estudiantes asociados
    
    return res.status(201).send({thesis: thesis, count: thesis.length ,thesisStudent});
}

//agrega una solicitud de un estudiante sobre un tema de tesis 
const requestThesis = async (req, res) => {
    //se espera parametros  idUser, idThesis
    //http://localhost:port/thesis/request/idUser/idThesis

    // const Postulation_Period = await PostulationPeriodModel.findOne({
    //     attributes : ["id", "startDate", "endDate"],
    //     where:{
    //         SPECIALTYId: res.locals.userSpecialtyId,
    //         status : "HABILITADO",
    //         "name" : {
    //             [Op.eq]: "solicitud"
    //         }
    //     }
    // });

    // if(!Postulation_Period){
    //     return res.status(404).send({
    //         errorMessage: `No esta habilitada alguna fecha de solicitud para la especialidad.`
    //     });
    // }
    
    //verificar si la fecha actual esta entre el periodo de postulacion
    // const today = new Date();
    // console.log( Postulation_Period.startDate,Postulation_Period.endDate,  today);
    // if(!(today >= Postulation_Period.startDate && today <= Postulation_Period.endDate)){
    //     return res.status(404).send({
    //         errorMessage: `No se puede solicitar porque no se encuentra dentro del periodo.`
    //     });
    // }

    const userxThesis = UserXThesisModel.build();
    userxThesis.type= "STUDENT_APPLICANT";
    userxThesis.USERId = req.params.idUser;
    userxThesis.THESISId = req.params.idThesis;

    await userxThesis.save();

    return res.status(201).send(`Se han cambiado el estado a STUDENT_APPLICANT.`);
}

const proposeThesisStudent = async (req, res) => {
    /*
    marca ok
        Se espera un body así:
        {
            "title": "Desarrrollo",
            "areaName" : " dgd",
            "objective" : "grg",
            "description" : "description",
            "idsGrupo" : [1,2,3],
            "idProfesor" : "4",
            "files": []
        }
    */

    const idPostulation_Period = await PostulationPeriodModel.findOne({
        attributes : ["id","startDate", "endDate"],
        where:{
            SPECIALTYId: res.locals.userSpecialtyId,
            status : "HABILITADO",
            "name" : {
                [Op.eq]: "propuesta"
            }
        }
    });
    if(!idPostulation_Period){
        return res.status(404).send({
            errorMessage: `No esta habilitada alguna fecha de postulacion para la especialidad.`
        });
    }
    
    const idPostulacion_period = idPostulation_Period.dataValues.id;
    if(!idPostulacion_period){
        return res.status(404).send({
            errorMessage: `No esta habilitada alguna fecha de postulacion para la especialidad.`
        });
    }

    //verificar si la fecha actual esta entre el periodo de postulacion
    const today = new Date();
    
    if(!(today >= idPostulation_Period.startDate && today <= idPostulation_Period.endDate)){
        return res.status(404).send({
            errorMessage: `No se puede solicitar porque no se encuentra dentro del periodo.`
        });
    }

    const thesis = ThesisModel.build();
    thesis.title = req.body.title;
    thesis.areaName = req.body.areaName;
    thesis.objective =req.body.objective;
    thesis.description =req.body.description;
    thesis.status = "PENDIENTE";
    thesis.SPECIALTYId = res.locals.userSpecialtyId;
    thesis.POSTULATIONPERIODId = idPostulacion_period;
    await thesis.save();

    if(thesis.id){

        //postulante
        const userxthesis = UserXThesisModel.build();
        userxthesis.type = "STUDENT_POSTULANT";
        userxthesis.status = "PENDIENTE";
        userxthesis.USERId = res.locals.userId; 
        userxthesis.THESISId = thesis.id;
        await userxthesis.save();
        //profesor
        const userxthesisP = UserXThesisModel.build();
        // userxthesisP.type = "ASESOR_TO_BE_ACCEPTED";   //estado que indica que el asesor a sido propuesto por el alumno
        userxthesisP.type = "ASESOR_POSTULANT";   //estado que indica que el asesor pasa a ser parte de la propuesta
        userxthesisP.USERId = req.body.idProfesor; 
        userxthesisP.THESISId = thesis.id;
        await userxthesisP.save();

        var i= 0;
        while(req.body.idsGrupo && req.body.idsGrupo[i]){
            const userxthesisG = UserXThesisModel.build();
            userxthesis.status = "PENDIENTE";
            userxthesisG.type = "STUDENT_POSTULANT";
            userxthesisG.USERId = req.body.idsGrupo[i]; 
            userxthesisG.THESISId = thesis.id;
            await userxthesisG.save();
            i++;
        } 
    }
        const s3 = new AWS.S3();
        //console.log(req.files)
        for(var file of req.files){
            var newFile = FileModel.build({ USERId: res.locals.userId, THESISId: thesis.id, filename: removeAccents(file.originalname) });
            await newFile.save();
            await s3.putObject({
                Body: file.buffer,
                Bucket: process.env.S3_BUCKET,
                Key: `assignment/${newFile.id}-${removeAccents(file.originalname)}`,
                ACL:'public-read',
                ContentDisposition: contentDisposition(removeAccents(file.originalname), 
                { type: 'inline' }),
            }).promise();
        }

    return res.status(201).send({thesisId: thesis.id});
}

const proposeThesisStudentFiles = async (req, res) => {
    const s3 = new AWS.S3();
    // console.log(req.files)
    for(var file of req.files){
        var newFile = FileModel.build({ USERId: res.locals.userId, THESISId: thesis.id, filename: removeAccents(file.originalname) });
        await newFile.save();
        await s3.putObject({
            Body: file.buffer,
            Bucket: process.env.S3_BUCKET,
            Key: `assignment/${newFile.id}-${removeAccents(file.originalname)}`,
            ACL:'public-read',
            ContentDisposition: contentDisposition(removeAccents(file.originalname), 
            { type: 'inline' }),
        }).promise();
    }
    return res.status(201).send(`Se ha propuesto una nueva tesis correctamente.`);
}

//Cambio de estado
const changeStatusThesis = async (req, res) => {
    /*
        Se espera un body así:
        {
            "thesisId": "1",
            "status": "APROBADO" (o "EN OBSERVACIÓN" o "PENDIENTE")
            "originalStatus": "APROBADO" (o "EN OBSERVACIÓN" o "PENDIENTE") <Estado original> 
        }
    */
        const coordinador = await UserModel.findByPk(res.locals.userId,{
            attributes: ['name','fLastName','mLastName'],
        });
        const nombre =  coordinador.name + ' ' + coordinador.fLastName + ' ' + coordinador.mLastName;
        
        const originalStatus = req.body.originalStatus;
        const status = req.body.status;
        const thesis = await ThesisModel.findByPk(parseInt(req.body.thesisId));

        console.log(req.body);
        if (originalStatus == "APROBADO") {
            await UserXThesisModel.update({ type: 'ASESOR_POSTULANT' }, { where: { type: 'ASESOR', THESISId: req.body.thesisId }});
            // Si esta aplicando

            // await UserXThesisModel.update({ type: 'STUDENT_APPLICANT' }, { where: { type: 'OWNER', THESISId: req.body.thesisId }});

            // Si es postulacion
            await UserXThesisModel.update({ type: 'STUDENT_POSTULANT' }, { where: { type: 'OWNER', THESISId: req.body.thesisId }});
        } else if ((originalStatus == "EN OBSERVACIÓN" || originalStatus == "PENDIENTE") && status=="APROBADO") { 
            await UserXThesisModel.update({ type: 'ASESOR' }, { where: { type: 'ASESOR_POSTULANT', THESISId: req.body.thesisId }});
            // await UserXThesisModel.update({ type: 'OWNER' }, { where: { type: 'STUDENT_APPLICANT', THESISId: req.body.thesisId }});
            await UserXThesisModel.update({ type: 'OWNER' }, { where: { type: 'STUDENT_POSTULANT', THESISId: req.body.thesisId }});
        }

        if(thesis){
            const thTra = ThesisTrazabilityModel.build();
            thTra.description = `El(La) coordinador(a) ${nombre} ha cambiado el estado de la tesis ${req.body.thesisId} de ${req.body.originalStatus} a ${req.body.status}`;
            thTra.USERId = res.locals.userId;
            thTra.THESISId = req.body.thesisId;
            await thTra.save();
            
            thesis.status = req.body.status;              
            await thesis.save();
            return res.status(201).send(thesis);
        }
        else{
            return res.status(404).send({
                errorMessage: `No se encontró la thesis ${req.body.thesisId}.`
            });
        }        
}

const getThesisDetails = async (req, res) => {
    const thesis = await ThesisModel.findByPk(req.params.idThesis, {
        attributes: [ 'id', 'title', 'objective', 'theme', 'description', 'status', 'comment', 'areaName' ],
        include: [
            { model: FileModel,
              attributes: [ 'id', 'filename' ]
            }, 
            { model: UserModel,
              attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'photo' ],
              through: { model: UserXThesisModel, attributes: [ 'type' ], where: { "type": {
                [Op.eq]: "ASESOR",
            }} },
              include: [{
                model: SpecialtyModel,
                attributes: [ 'id', 'name' ],
                through: { attributes: []}
              }
             ]
            }, 
            { model: UserModel,
              attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'photo' ],
              through: { model: UserXThesisModel, attributes: [ 'type' ], where: { "type": {
                [Op.eq]: "STUDENT_APPLICANT",
            }} },
              include: [{
                model: SpecialtyModel,
                attributes: [ 'id', 'name' ],
                through: { attributes: []},
                required: true
              }
             ]
            },
            { model: UserModel,
                attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'photo' ],
                through: { model: UserXThesisModel, attributes: [ 'type' ]},
                include: [{
                  model: SpecialtyModel,
                  attributes: [ 'id', 'name' ],
                  through: { attributes: []}
                },
                {
                    model: UserXThesisModel,
                    where: {
                        THESISId: req.params.idThesis,
                    },
                    include: {
                        model: UserXTeamXThesisModel
                    }
                }
               ]
              },
            
        ]
    });
    return res.status(201).send(thesis);      
}

const getTeam = async (req, res) => {
    // /thesis/team/:idThesis

    const team = await UserXTeamXThesisModel.findOne({
        attributes: ['id', 'TEAMId'],
        include: [{
            model: UserXThesisModel,
            where: {
                "USERId": res.locals.userId,
                "THESISId": req.params.idThesis,
            },
            required: true
        }]
    });
    if (!team) {
        return res.status(400).send({
            errorMessage: "Equipo no encontrado"
        });
    }

    const teamMembers = await UserXTeamXThesisModel.findAll({
        attributes: ['id'],
        where: {
            "TEAMId": team.TEAMId
        },
        include: [{
            model: UserXThesisModel,
            attributes: ['id'],
            include: [{
                model: UserModel,
                required: true,
                where: {
                    'id': {[Op.ne]: res.locals.userId}
                }
            }],
            required: true,
        }]
    })

    return res.status(200).send(teamMembers);
}

const patchCommentProposedThesisController = async (req, res) => {
    /*
        Se espera un body así:
        {
            "thesisId": "1",
            "observacion": " observacion ejemplo"
        }
    */
    let result;
    const thesis = await ThesisModel.findByPk(req.body.thesisId, { });

    if(!thesis){
        return res.status(404).send({
            errorMessage: `No se encontró la tesis ${req.body.thesisId}`
        });
    }
    thesis.comment = req.body.observacion;
    result = await thesis.save();

    return res.status(201).send(result);   
}

const getProposalThesisByUser = async (req, res) => {  //devuelve una lista de los temas propuestos por un usuario

    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis/proposals 

    req.query.page = req.query.page ? req.query.page : 1;   

    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    var estado, estado2;

    if(res.locals.userRole == 3){ // alumno
        estado="STUDENT_POSTULANT";
        estado2="OWNER"
    } 
    if(res.locals.userRole == 5){ //asesor
        estado="ASESOR_POSTULANT";
        estado2="ASESOR"
    } 

    const thesis = await UserXThesisModel.findAndCountAll({
        attributes: [ 'id', 'type' , 'updatedAt'],
        where: {
            [Op.or]: [{
                'type': {  
                    [Op.like]: estado,
                },
            },
            {
                'type': {  
                    [Op.like]: estado2,
                },
            }
            ],

            "USERId": {
                [Op.eq]: res.locals.userId,
            }
        },
        include: [
            {
                model: UserModel, 
                attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ], 
            },
            {
                model: ThesisModel,
                attributes: [ 'id', 'title', 'theme', 'status','areaName', 
                // 'POSTULATIONPERIODId' 
            ],
                where: { 
                    title: {[Op.like]: `%${req.query.text}%`},
                    'POSTULATIONPERIODId': {[Op.not]: null},
            },
            required: true,
        }
            
        ],
        order: [
            [`updatedAt`, 'DESC'], ['createdAt', 'DESC'],
        ],
        offset: regStart,
        limit: pageSize
    })

    if(res.locals.userRole == 3){
        const asesores = Array();
        for (var t of thesis.rows) {
            const asesor = await UserXThesisModel.findOne({
                attributes: ['id'],
                where: {
                    [Op.or]: [{
                        'type': {  
                            [Op.like]: "ASESOR_POSTULANT",
                            // [Op.like]: "ASESOR_TO_BE_ACCEPTED",
                        },
                    },
                    {
                        'type': {  
                            [Op.like]: "ASESOR",
                        },
                    }
                    ],
        
                    "THESISId": {
                        [Op.eq]: t.THESIS.dataValues.id,
                    },
                },
                include: [
                    {
                        model: UserModel, 
                        attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ], 
                    }
                ]
            })

            asesores.push(asesor);
        }

        return res.status(200).send([thesis, asesores]);
    }

    if(res.locals.userRole == 5){
        const students = Array();
        for (var t of thesis.rows) {
            const student = await UserXThesisModel.findAndCountAll({
                attributes: [ ],
                where: {
                    [Op.or]: [{
                        'type': {  
                            [Op.like]: "STUDENT_APLICANT",
                        },
                    },
                    {
                        'type': {  
                            [Op.like]: "OWNER",
                        },
                    }
                    ],
        
                    "THESISId": {
                        [Op.eq]: t.THESIS.dataValues.id,
                    }
                },
                include: [
                    {
                        model: UserModel, 
                        attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ], 
                    }
                ]
            })

            students.push(student.rows);
        }

        return res.status(200).send([thesis, students]);
    }
    
}

const getStudentsProposals = async (req, res) => {  //devuelve una lista de los temas propuestos por un alumno (VISTA DE ASESOR)

    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis/proposals/students 

    req.query.page = req.query.page ? req.query.page : 1;   

    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const thesis = await ThesisModel.findAndCountAll({        
        attributes: [ 'id', 'title', 'createdAt','areaName' ],
        where: {
            title: {
                [Op.like]: `%${req.query.text}%`,
                
            },
            status: {
                [Op.not]: 'SUSTENTADA'
            },
            SPECIALTYId: res.locals.userSpecialtyId
        },
        include: [
            {
                model: UserXThesisModel,
                attributes: [ 'id', 'type' , 'updatedAt', 'createdAt' ],
                where: {
                    'type': {  
                        [Op.like]: "STUDENT_POSTULANT",
                    },
                },
                include: {
                    model: UserModel, 
                    attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ],
                }
            }, 
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,  
    })
    
    return res.status(200).send(thesis);    
    
}

const proposeThesisAsesor = async (req, res) => {
    /*
        Se espera un body así:
        {
            "title": "Desarrrollo",
            "areaName" : "dgd",
            "objective" : "grg",
            "description" : "fg"
        }
    */
   
    const idPostulation_Period = await PostulationPeriodModel.findOne({
        attributes: ["id", "status", "startDate", "endDate"],
        where:{
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId,
            },
            "status" : {
                [Op.eq]: "HABILITADO"
            },
            "name" : {
                [Op.eq]: "propuesta"
            }
        }
    });
    if(!idPostulation_Period){
        return res.status(404).send({
            errorMessage: `No esta habilitada alguna fecha de postulacion para la especialidad.`
        });
    }

     //verificar si la fecha actual esta entre el periodo de postulacion
     const today = new Date();
     if(!(today >= idPostulation_Period.startDate && today <= idPostulation_Period.endDate)){
         return res.status(404).send({
             errorMessage: `No se puede solicitar porque no se encuentra dentro del periodo.`
         });
     }

    const thesis = ThesisModel.build();
    thesis.title = req.body.title;
    thesis.objective = req.body.objective;
    thesis.description = req.body.description;
    thesis.areaName = req.body.areaName;
    thesis.status = "PENDIENTE";
    thesis.SPECIALTYId = res.locals.userSpecialtyId;
    thesis.POSTULATIONPERIODId = idPostulation_Period.dataValues.id;
    await thesis.save();

    if(thesis.id){
        //postulante
        const userxthesis = UserXThesisModel.build();
        userxthesis.type = "ASESOR_POSTULANT";
        userxthesis.USERId = res.locals.userId; 
        userxthesis.THESISId = thesis.id;
        await userxthesis.save();
    }
    const s3 = new AWS.S3();
    for(var file of req.files){
        var newFile = FileModel.build({ USERId: res.locals.userId, THESISId: thesis.id, filename: removeAccents(file.originalname) });
        await newFile.save();
        await s3.putObject({
            Body: file.buffer,
            Bucket: process.env.S3_BUCKET,
            Key: `assignment/${newFile.id}-${removeAccents(file.originalname)}`,
            ACL:'public-read',
            ContentDisposition: contentDisposition(removeAccents(file.originalname), 
            { type: 'inline' }),
        }).promise();
    }
    return res.status(201).send(`Se ha propuesto una nueva tesis correctamente.`);
}

const addThesisCoordinatorController = async (req, res) => {
    /*
    marca alonso
        Se espera un body así:
        {
            "title": "Desarrrollo",
            "areaName" : "dgd",
            "objective" : "grg",
            "description" : "fg",
            "asesorId" : 2,
            "studentIds" : [1,5,4],
             "files": [file1, file2] (ARREGLO DE ARCHIVOS)
        }
    */
    let result;
    let results = [];

    console.log(req.body);
    const thesis = ThesisModel.build();
    thesis.title = req.body.title;
    thesis.objective = req.body.objective;
    thesis.description = req.body.description;
    thesis.areaName = req.body.areaName;
    thesis.status = "APROBADO";
    thesis.SPECIALTYId = res.locals.userSpecialtyId;
    result = await thesis.save();
    results.push(result);
    
    if(thesis.id){
        if(req.body.asesorId){     
            const userxthesis = UserXThesisModel.build();
            userxthesis.type = "ASESOR";
            userxthesis.USERId = req.body.asesorId; 
            userxthesis.THESISId = thesis.id;
            result = await userxthesis.save();
            results.push(result);

        }

        if(req.body.studentIds){
            for( var idUser of req.body.studentIds){
                const uxt = UserXThesisModel.build();
                uxt.type = "OWNER";
                uxt.USERId = idUser; 
                uxt.THESISId = thesis.id;
                result =await uxt.save();
                results.push(result);
            }
        }
    }

    const s3 = new AWS.S3();
    for(var file of req.files){
        var newFile = FileModel.build({ USERId: res.locals.userId, THESISId: thesis.id, filename: removeAccents(file.originalname) });
        await newFile.save();
        await s3.putObject({
            Body: file.buffer,
            Bucket: process.env.S3_BUCKET,
            Key: `assignment/${newFile.id}-${removeAccents(file.originalname)}`,
            ACL:'public-read',
            ContentDisposition: contentDisposition(removeAccents(file.originalname), 
            { type: 'inline' }),
        }).promise();
    }

    return res.status(201).send({thesisId: thesis.id});
}


const deleteThesis = async (req, res) => {
    const thesis = await ThesisModel.findByPk(req.params.idThesis);
    if(!thesis){
        res.status(404).send({
            errorMessage: `No se encontro la tesis con id: ${req.params.idThesis}`
        })
    }
    await ThesisModel.destroy({
        where: { id: req.params.idThesis }
    })
    return res.status(201).send();
}

const deleteUserThesis = async (req, res) => {
    // console.log(req.params);
    const uxt = await UserXThesisModel.findOne({
        attributes: ['id'],
        where: { THESISId: req.params.idThesis, type: req.params.type }
    });
    
    if(!uxt){
        return res.status(404).send({
            errorMessage: `No se encontro el USUARIO X TESIS`
        })
    }
    
    if(req.params.type == 'OWNER' || req.params.type == 'STUDENT_POSTULANT' || req.params.type == 'STUDENT_APPLICANT'){
        let t;
        let team = await UserXTeamXThesisModel.findOne({
            attributes: [ 'TEAMId' ],
            where: {
                USERXTHESISId: uxt.id
            }
        });
        // console.log(team);
        if(team == null){
            return res.status(404).send({
                errorMessage: `No se encontro el EQUIPO`
            })
        }
        const teamId = team.TEAMId;
        
        team = await UserXTeamXThesisModel.findAll({
            attributes: ['id', 'USERXTHESISId'],
            where:{
                TEAMId: teamId
            }
        });
        
        for(t of team){
            await UserXThesisModel.destroy({
                where: { id: t.USERXTHESISId }
            })
            await UserXTeamXThesisModel.destroy({
                where: { id: t.id }
            })
        }
        await TeamModel.destroy({
            where:{
                id: teamId
            }
        })
        if(req.params.type == 'STUDENT_POSTULANT'){
            await UserXThesisModel.destroy({
                where: {
                    THESISId: req.params.idThesis
                }
            })
        }
    }else{
        await UserXThesisModel.destroy({
            where: { THESISId: req.params.idThesis, type: req.params.type }
        })
    }
    
    return res.status(202).send();
}

const getRequestsByUser = async (req, res) => {    
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;   

    const thesis = await ThesisModel.findAndCountAll({
        attributes: [ 'id', 'title', 'areaName', 'status' ],
        where: { status: 'APROBADO' },
        include:
        {
            model: UserModel,
            attributes: [ 'id', 'updatedAt' ],
            where: { id: res.locals.userId },   
            through: { model: UserXThesisModel, attributes: [ 'createdAt', 'type' ], 
            where: { 
                [Op.or]: [{
                    'type': {  
                        [Op.like]: "STUDENT_APPLICANT",
                    },
                },
                {
                    'type': {  
                        [Op.like]: "OWNER",
                    },
                }
                ],
                // type: 'STUDENT_APPLICANT' 
            } 
        }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,
    });
    if(!thesis){
        res.status(404).send({
            errorMessage: `No se encontraron solicitudes de tesis`
        })
    }
    // return res.send({thesis});
    let asesors = [], asesor, o, status = [];
    for(var t of thesis.rows){
        if(t.USERs[0].USER_X_THESIS.type == 'OWNER'){
            status.push('APROBADO');
        }else if(t.USERs[0].USER_X_THESIS.type == 'STUDENT_APPLICANT'){
            o = await UserXThesisModel.findOne({
                attributes: ['id'],
                where:{
                    type: 'OWNER',
                    THESISId: t.id
                }
            });
            if(o){
                status.push('DENEGADO');
            }else{
                status.push('PENDIENTE');
            }
        }
        asesor = await UserModel.findOne({
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ],
            include:{
                model: ThesisModel,
                attributes: [],
                where: { id: t.id },
                through: { attributes: [], where: { type: 'ASESOR' } }
            }
        });
        asesors.push(asesor);
    }
    return res.status(201).send({ thesis, asesors, status });
}

const getThesisAsesorBySpecialty = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/thesis/specialty/asesors
    // console.log("HI");
    // console.log(res.locals.userSpecialtyId)
    req.query.page = req.query.page ? req.query.page : 1;   
    // console.log(req.query);

    let pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    let regStart = (parseInt(req.query.page) - 1)* pageSize; 
    // console.log(pageSize, regStart);

    const thesis = await ThesisModel.findAndCountAll({ 
        attributes: [ 'id', 'title', 'theme', 'status','areaName', 'createdAt', 'updatedAt' ], 
        where: { 
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId
            },
            "status": {
                [Op.not]: "SUSTENTADA"
            }

        },
        include: 
            [
            {
                required: false,
                model: UserXThesisModel,
                    where: {
                        [Op.or]: [
                            {
                                'type': {
                                    [Op.eq]: "ASESOR",
                                },
                            },
                            {                      
                                'type': {
                                    [Op.eq]: "ASESOR_POSTULANT",
                                }
                            }
                        ]                           
                    },
                    include: [{ 
                        model: UserModel, 
                        attributes: [ 'id', 'name', 'fLastName', 'mLastName' ], 
                    },]
            }
        ],
        // subQuery: false,
        distinct: true,
        order: [
            ['status', 'DESC'],
            ['updatedAt', 'DESC'],
            ['createdAt', 'DESC'],
        ],
        offset: regStart,
        limit: pageSize, 
        }
    );

    // console.log(JSON.stringify(thesis, null, 2));
    return res.status(201).send(thesis);
}

const getRequestedThesis = async (req, res) => {
    // const text = req.query.text != "$" ? req.query.text : "";
    const text = req.query.text;
    const page = parseInt(req.query.page ? req.query.page : 1);
    const pageSize = parseInt(req.query.porPagina ? req.query.porPagina : 1000000);
    const regStart = (page - 1) * pageSize;

    const thesis = await ThesisModel.findAndCountAll({
        attributes: [ 'id', 'title', 'createdAt' , 'objective', 'description', 'areaName'],
        where: { title: { [Op.like]: `%${text}%` } },
        include: {
            model: UserXThesisModel,
            attributes: [], 
            where: { 
                type: 'ASESOR', 
                USERId: res.locals.userId 
            }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,
    });
    
    let students = [];
    let s;
    for(var t of thesis.rows){
        s = await UserXTeamXThesisModel.findAll({
            attributes: ['TEAMId'],
            include:[
                {
                    model: UserXThesisModel,
                    attributes: ['id','THESISId', 'type'],
                    where: {
                        [Op.or]: [{
                            'type': {  
                                [Op.like]: "STUDENT_APPLICANT",
                            },
                        },
                        {
                            'type': {  
                                [Op.like]: "OWNER",
                            },
                        }
                        ],
                        THESISId: t.id,
                    },
                    include: {
                        model: UserModel,
                        attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo'],
                        include: {
                            model: SpecialtyModel,
                            attributes: [ 'id', 'name' ],
                            through: { attributes: [] } 
                        }
                    }
                },{
                model: TeamModel,
                attributes: [],
                },
            ]
        })
        var studentsRow = [t,s];
        students.push(studentsRow);
    }

    return res.status(202).send({ students, count: thesis.count });
}

const getDetailRequestedThesis = async (req, res) => {
    
    // const text = req.query.text != "$" ? req.query.text : "";
    const text = req.query.text;
    

    const thesis = await ThesisModel.findAll({
        attributes: [ 'id', 'title', 'createdAt' , 'objective', 'description', 'areaName'],
        where: { title: { [Op.like]: `%${text}%` }, id: { [Op.like]: parseInt(req.params.idThesis)}},
        include: {
            model: UserXThesisModel,
            attributes: [], 
            where: { 
                type: 'ASESOR', 
                USERId: res.locals.userId 
        }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
    });
    
    let students = [];
    let s;
    for(var t of thesis){
        s = await UserModel.findAll({
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo'],
            include: [
            {
                model: UserXThesisModel,
                attributes: [],
                where: { type: 'STUDENT_APPLICANT', THESISId: t.id }
            },
            {
                model: SpecialtyModel,
                attributes: [ 'id', 'name' ],
                through: { attributes: [] }
            }]
        });
        students.push(s);
    }
    return res.status(202).send({ thesis, students });
}

const selectStudentsPostulant = async(req, res) => { //el asesor selecciona un estudiante o un grupo de estudiantes, se le cambia el estado
    /*
        Se espera un body como:
        {
            "idThesis": 10,
            "idUser": [1,2,3]
        }
    */

        var i=0;
        const len = req.body.idUser.length;
        while(req.body.idUser[i]){
            const s = await UserXThesisModel.findOne({
                where: {
                    'USERId': {
                        [Op.eq]: req.body.idUser[i],
                    },
                    'THESISId': {
                        [Op.eq]: req.body.idThesis,
                    }
                }
            })
            if(s){
                s.type = "OWNER",
                await s.save();
            }
            if(i >= len) break;
            i++;
        }

        const a = await UserXThesisModel.findOne({
            where: {
                'USERId': {
                    [Op.eq]: res.locals.userId,
                },
                'THESISId': {
                    [Op.eq]: req.body.idThesis,
                }
            }
        })
        if(a){
            a.type = "ASESOR",
            await a.save();
        }
    
        return res.status(201).send(`Se ha seleccionado el estudiante correctamente.`);
}

const linkThesisTeam = async(req, res) =>{
    const body = req.body;
    console.log(req.body)
    let e, r, results = [];
    const uxt = await UserXTeamXThesisModel.findAll({
        // attributes: ['id'],
        where:{
            TEAMId: req.body.idTeam,
            // THESISId: body.idThesis
        }
    });
    for(e of uxt){
        r = await UserXThesisModel.update({ type: 'OWNER'}, {
            where:{
                type: 'STUDENT_APPLICANT',
                THESISId: body.idThesis,
                id: e.USERXTHESISId,
            }
        });
    }

    results = {msg: "done"}
    
    return res.status(201).send(results);
}

const unselectStudentsPostulant = async(req, res) => { //el asesor deselecciona un estudiante o un grupo de estudiantes, se le cambia el estado
    /*
        Se espera un body como:
        {
            "idThesis": 10,
            "idTeam": 1
        }
    */

        // console.log(req.body);
        const s = await UserXTeamXThesisModel.findAll({
            attributes: ['id','TEAMId','USERXTHESISId'],
            where: {
                TEAMId: req.body.idTeam,
            },
            include:{
                model: UserXThesisModel,
                attributes: ['id','type','status','USERId','THESISId'],
                where: {
                    THESISId: req.body.idThesis,
                }
            }
        })
        // return res.status(201).send(s);
        
        var i=0;
        const length = s.length;
        while(1){
            if(i>=length) break;
            s[i].USER_X_THESIS.setDataValue("type","STUDENT_APPLICANT");
            await s[i].USER_X_THESIS.save();
            i++;
        }
    
        return res.status(201).send(`Se ha deseleccionado el grupo de estudiantes correctamente.`);
}

const addJuryThesisController  = async(req, res) => {
     /*
        Se espera un body como:
        {
            "idThesis": 13,
            "idJury": [1,2,3]
        }
    */
    let results = [];
    let result ;
    const body = req.body;
    const thesis = await ThesisModel.findByPk(body.idThesis);
    if(!thesis){
        res.status(404).send({
            errorMessage: `No se encontro la tesis con id: ${body.idThesis}`
        })
    }

    for(var idJurado of body.idJury){   //coloca los jurados en userxthesis    
        const uxt = await UserXThesisModel.findAll( {where: { USERId :idJurado , THESISId: body.idThesis, type: 'JURY' }});
        //console.log(uxt);
        //console.log( Object.entries(uxt).length);
        if(Object.entries(uxt).length === 0 ){ //si no hay un registro de ese jurado con esa tesis crea un registro
            var newAXSXR = UserXThesisModel.build({
                type: 'JURY',
                USERId: idJurado,
                THESISId: body.idThesis
            });
            result = await newAXSXR.save();
            results.push(result);
        }      
    }
   
    return res.status(201).send(results);

}

const deleteJuryThesisController  = async(req, res) => {
 //recibe los ids de jurados como un arreglo por req.query
    let uxtDestroy = [];
    // console.log(req.body);
    // console.log(req.body.idsJury);
    for( var idJury of req.body){
        console.log(idJury);
        const uxt = await UserXThesisModel.findAll( {where: { USERId :idJury , THESISId: req.params.idThesis, type: 'JURY' }});
        if( Object.entries(uxt).length !=0 ){
            await UserXThesisModel.destroy({
                where: { USERId :idJury , THESISId: req.params.idThesis, type: 'JURY' },
            })
            uxtDestroy.push(idJury);
        }
    }
   
    return res.status(201).send(`ids de jurados eliminados: ${uxtDestroy}`);

}

const getJurorsThesis = async(req, res, next) => { 

    const jurorsxthesis= await UserXThesisModel.findAll({
        where:{
            THESISId : req.params.idThesis,
            type : 'JURY'
        },
        include : [{
            model : UserModel,
            where: 
                Sequelize.where(
                fn("CONCAT", col("name"), ' ', col("fLastName"),  ' ' , 
                col("mLastName")),
                {
                    [Op.like]: '%'+req.query.text+'%',
                }),
        }]
    });
    return res.status(201).send(jurorsxthesis);
}

const editThesisController = async(req,res) => {
    /*
        Se espera un body como: 
        {
            "tema": ":)",
            "objective": "XD",
            "area": "¬¬",
            "description": ":o"
        }
    */

    const coordinador = await UserModel.findByPk(res.locals.userId,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombre =  coordinador.name + ' ' + coordinador.fLastName + ' ' + coordinador.mLastName;

    const thesis = await ThesisModel.findByPk(req.params.idThesis,{
        attributes: ['id','title','objective','description'],
    });

    if(thesis.title != req.body.tema){
        const thTra = ThesisTrazabilityModel.build();
        thTra.description = `El(La) coordinador(a) ${nombre} ha editado el tema de la tesis ${req.params.idThesis}`;
        thTra.USERId = res.locals.userId;
        thTra.THESISId = req.params.idThesis;
        await thTra.save();
    }
    if(thesis.objective != req.body.objective){
        const thTra = ThesisTrazabilityModel.build();
        thTra.description = `El(La) coordinador(a) ${nombre} ha editado el objetivo de la tesis ${req.params.idThesis}`;
        thTra.USERId = res.locals.userId;
        thTra.THESISId = req.params.idThesis;
        await thTra.save();
    }
    if(thesis.description != req.body.description){
        const thTra = ThesisTrazabilityModel.build();
        thTra.description = `El(La) coordinador(a) ${nombre} ha editado la descripción de la tesis ${req.params.idThesis}`;
        thTra.USERId = res.locals.userId;
        thTra.THESISId = req.params.idThesis;
        await thTra.save();
    }    
    if(thesis.areaName != req.body.area){
        const thTra = ThesisTrazabilityModel.build();
        thTra.description = `El(La) coordinador(a) ${nombre} ha editado la área de la tesis ${req.params.idThesis}`;
        thTra.USERId = res.locals.userId;
        thTra.THESISId = req.params.idThesis;
        await thTra.save();
    }
    
    thesis.title = req.body.tema;
    thesis.objective = req.body.objective;
    thesis.description = req.body.description;
    thesis.areaName = req.body.area;
    await thesis.save();

    return res.status(201).send(thesis);
}

const addAsesorController = async(req, res) => {
    const coordinador = await UserModel.findByPk(res.locals.userId,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombre =  coordinador.name + ' ' + coordinador.fLastName + ' ' + coordinador.mLastName;

    const asesor = await UserModel.findByPk(req.params.idUser,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombreAsesor =  asesor.name + ' ' + asesor.fLastName + ' ' + asesor.mLastName;

    const thTra = ThesisTrazabilityModel.build();
    thTra.description = `El(La) coordinador(a) ${nombre} ha añadido al(a la) asesor(a) ${nombreAsesor} en la tesis`;
    thTra.USERId = res.locals.userId;
    thTra.THESISId = req.params.idThesis;
    await thTra.save();

    const uXt = UserXThesisModel.build();
    uXt.type = "ASESOR";
    uXt.USERId = req.params.idUser,
    uXt.THESISId = req.params.idThesis,
    await uXt.save();

    return res.send("Se ha añadido al asesor");
}

const addStudentController = async(req, res) => {
    const coordinador = await UserModel.findByPk(res.locals.userId,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombre =  coordinador.name + ' ' + coordinador.fLastName + ' ' + coordinador.mLastName;

    const alumno = await UserModel.findByPk(req.params.idUser,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombreAlumno =  alumno.name + ' ' + alumno.fLastName + ' ' + alumno.mLastName;

    const thTra = ThesisTrazabilityModel.build();
    thTra.description = `El(La) coordinador(a) ${nombre} ha añadido al(a la) alumno(a) ${nombreAlumno} en la tesis ${req.params.idThesis}`;
    thTra.USERId = res.locals.userId;
    thTra.THESISId = req.params.idThesis;
    await thTra.save();

    const uXt = UserXThesisModel.build();
    uXt.type = "OWNER";
    uXt.USERId = req.params.idUser,
    uXt.THESISId = req.params.idThesis,
    await uXt.save();

    const t = TeamModel.build();
    await t.save();

    const utt = UserXTeamXThesisModel.build();
    utt.TEAMId = t.id;
    utt.USERXTHESISId = uXt.id;
    await utt.save();

    return res.send("Se ha añadido al alumno");
}

const unlinkAsesorController = async(req, res) => {
    const coordinador = await UserModel.findByPk(res.locals.userId,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombre =  coordinador.name + ' ' + coordinador.fLastName + ' ' + coordinador.mLastName;

    const asesor = await UserModel.findByPk(req.params.idUser,{
        attributes: [ 'id', 'name','fLastName','mLastName'],
    });
    const nombreAsesor =  asesor.name + ' ' + asesor.fLastName + ' ' + asesor.mLastName;
    
    let thTra = ThesisTrazabilityModel.build();
    thTra.description = `El(La) coordinador(a) ${nombre} ha desvinculado al(a la) asesor(a) ${nombreAsesor} en la tesis ${req.params.idThesis}`;
    thTra.USERId = res.locals.userId;
    thTra.THESISId = req.params.idThesis;
    await thTra.save();

    const thesis = await UserXThesisModel.findOne({
        where: {
            USERId: req.params.idUser,
            THESISId: req.params.idThesis,
        }
    });
    await thesis.destroy();

    return res.status(201).send("Se ha desvinculado al asesor");
}

const deleteAsesorController = async(req, res) => {
    const coordinador = await UserModel.findByPk(res.locals.userId,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombre =  coordinador.name + ' ' + coordinador.fLastName + ' ' + coordinador.mLastName;

    const asesor = await UserModel.findByPk(req.params.idUser,{
        attributes: [ 'id', 'name','fLastName','mLastName'],
    });
    const nombreAsesor =  asesor.name + ' ' + asesor.fLastName + ' ' + asesor.mLastName;

    const thesis = await ThesisModel.findAll({
        attributes: ['id'],
        include: {
            model: UserXThesisModel,
            attributes: [],
            where:{
                type: 'ASESOR',
                USERId: req.params.idUser
            },
            required: true
        }
    });
    let t, thTra;
    
    for(t of thesis){
        thTra = ThesisTrazabilityModel.build();
        thTra.description = `El(La) coordinador(a) ${nombre} ha eliminado al(a la) asesor(a) ${nombreAsesor} en la tesis ${t.id}`;
        thTra.USERId = res.locals.userId;
        thTra.THESISId = t.id;
        await thTra.save();
    }

    await asesor.destroy();

    return res.send("Se ha eliminado al asesor");
}

const unlinkStudentController = async(req, res) => {
    console.log(req.params)
    const coordinador = await UserModel.findByPk(res.locals.userId,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombre =  coordinador.name + ' ' + coordinador.fLastName + ' ' + coordinador.mLastName;

    const alumno = await UserModel.findByPk(req.params.idUser,{
        attributes: ['name','fLastName','mLastName'],
    });
    const nombreAlumno =  alumno.name + ' ' + alumno.fLastName + ' ' + alumno.mLastName;

    const thTra = ThesisTrazabilityModel.build();
    thTra.description = `El(La) coordinador(a) ${nombre} ha eliminado al(a la) alumno(a) ${nombreAlumno} en la tesis ${req.params.idThesis}`;
    thTra.USERId = res.locals.userId;
    thTra.THESISId = req.params.idThesis;
    await thTra.save();

    const thesis = await UserXThesisModel.findOne({
        where: {
            USERId: req.params.idUser,
            THESISId: req.params.idThesis,
        }
    });

    if (!thesis) {
        res.status(404).send({
            errorMessage: `No se encontro la tesis con id: ${body.idThesis}`
        })
    }
    await thesis.destroy();
    
    return res.send("Se ha desvinculado al alumno");
}

const getTrazabilityController = async(req,res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const cambios = await ThesisTrazabilityModel.findAndCountAll({
        where: {
            THESISId: req.params.idThesis,
        },
        subQuery: false,     
        order: [
            ['updatedAt', 'DESC'],
            ['createdAt', 'DESC'],
        ],
        offset: regStart,
        limit: pageSize
    })

    return res.send(cambios);
}

const changeStateSupportedThesisController = async(req,res) => {
    
    /*
    {
        "idThesis" : 1,
        "state" : "SUSTENTADA"
    }
    */
    const body = req.body;
    const thesis = await ThesisModel.findByPk({ id: body.idThesis });

    if(!thesis){
        res.status(404).send({
            errorMessage: `No se encontro la tesis con id: ${body.idThesis}`
        })
    }

    thesis.status = body.state;
    await thesis.save();

    return res.send(thesis);
}


export { getAllThesisBySpecialty , changeStatusThesis, getAllThesisBySpecialty2, getProposalThesisByUser,
    getAsesorsThesisBySpecialty, getThesisDetails, requestThesis, proposeThesisStudent, proposeThesisAsesor,
    deleteThesis, deleteUserThesis, getRequestsByUser , getThesisAsesorBySpecialty, getRequestedThesis , getAsesorThesis,
    patchCommentProposedThesisController, selectStudentsPostulant, getStudentsProposals, getDetailRequestedThesis, 
    getAsesorsStudentsThesisBySpecialty, getTeam, linkThesisTeam, getNewAsesorsThesisBySpecialty,unselectStudentsPostulant,
    addJuryThesisController,deleteJuryThesisController,getJurorsThesis , editThesisController, addAsesorController,
    addStudentController , deleteAsesorController , unlinkStudentController , getTrazabilityController, unlinkAsesorController, getListThesisByState,
    changeStateSupportedThesisController, addThesisCoordinatorController};
