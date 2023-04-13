import AssignmentModel from '#Models/AssignmentModel.js';
import AssignmentXRoleModel from '#Models/AssignmentXRoleModel.js';
import AssignmentXStudentModel from '#Models/AssignmentXStudentModel.js';
import AssignmentXStudentXRevisorModel from '#Models/AssignmentXStudentXRevisorModel.js';
import SpecialtyModel from '#Models/SpecialtyModel.js';
import ThesisModel from '#Models/ThesisModel.js';
import UserModel from '#Models/UserModel.js';
import UserXSpecialtyModel from '#Models/UserXSpecialtyModel.js';
import UserXThesisModel from '#Models/UserXThesisModel.js';
import { Op } from 'sequelize';



const getListProgrammedExpositionController = async  (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;

    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const programmedExposition = await AssignmentXStudentModel.findAndCountAll({
        // logging: console.log,
        attributes: ['id', 'score', 'registerDate', 'status'],
        where: {
            status: {[Op.like]: '%'+req.query.status +'%'} 
        },
        include: [{
                model: AssignmentModel,
                where: {
                    type: {
                        [Op.like]: '%PROGRAMMED_EXPOSITION%'
                    },
                    'COURSEXSEMESTERId' : {
                        [Op.eq]: parseInt(req.params.cursoxsemesterid),
                    }
                },
                required: true
            
            },
            {
                model: UserModel,
                    where : { 
                        [Op.or]: [
                            { name:      { [Op.like]: `%${req.query.text}%` }},
                            { fLastName: { [Op.like]: `%${req.query.text}%` }},
                            { mLastName: { [Op.like]: `%${req.query.text}%` }},
                        ]
                    },
                    include: [{
                        model: UserXSpecialtyModel,
                            include : { attributes:["name"], model: SpecialtyModel }
                    }],

                           
            }
        ],
        subQuery: false,
        order: [
            [AssignmentModel, 'updatedAt', 'DESC'],
            [AssignmentModel, 'createdAt', 'DESC'],
        ],
        offset: regStart,
        limit: pageSize,
    });

    return res.send(programmedExposition);
}

const getListByUserIdProgrammedExpositionController = async  (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;

    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const programmedExposition = await AssignmentXStudentModel.findAndCountAll({
        // logging: console.log,
        attributes: ['id', 'score', 'registerDate', 'status'],
        where: {
            USERId: req.params.uid,
            status: {[Op.like]: '%'+req.query.status +'%'} 
        },
        include: [{
                model: AssignmentModel,
                where: {
                    type: {
                        [Op.like]: '%PROGRAMMED_EXPOSITION%'
                    },
                    'COURSEXSEMESTERId' : {
                        [Op.eq]: parseInt(req.params.cursoxsemesterid),
                    }
                },
            
            },
            {
                model: UserModel,
                    where : { 
                        [Op.or]: [
                            { name:      { [Op.like]: `%${req.query.text}%` }},
                            { fLastName: { [Op.like]: `%${req.query.text}%` }},
                            { mLastName: { [Op.like]: `%${req.query.text}%` }},
                        ]
                    },
                    include: [{
                        model: UserXSpecialtyModel,
                            include : { attributes:["name"], model: SpecialtyModel }
                    }],

                           
            }
        ],
        subQuery: false,
        order: [
            [AssignmentModel, 'updatedAt', 'DESC'],
            [AssignmentModel, 'createdAt', 'DESC'],
        ],
        offset: regStart,
        limit: pageSize,
    });

    return res.send(programmedExposition);
}

const insertProgrammedExposition1= async (req, res) => {  
    /*
    Se espera un body como:
    {
        "startDate": "2022-08-15T00:00:00.000Z",
        "endDate": "2022-08-22T00:00:00.000Z",
        "idAlumno": "1",
        "idsJurados": [1,2,3,4,5]
    }
    */
    let result;
    let results = [];
   

    const body = req.body;
    const newExposition = AssignmentModel.build({
        assignmentName: "Exposición", //campo inutilizable
        chapterName: "-", //campo inutilizable
        startDate:  new Date(body.startDate),
        endDate: new Date(body.endDate), 
        limitCompleteDate : '0000-00-00 00:00:00',  //campo inutilizable
        limitCalificationDate : '0000-00-00 00:00:00', //campo inutilizable
        additionalComments : "-" ,//campo inutilizable
        maxScore : 20,
        type: "PROGRAMMED_EXPOSITION",
        deletedAt : null,
        COURSEXSEMESTERId: req.params.cursoxsemesterid
    });
    result =await newExposition.save();
    results.push(result);

    const newAXS = AssignmentXStudentModel.build();
    newAXS.USERId = body.idAlumno;
    newAXS.ASSIGNMENTId = newExposition.id;
    newAXS.score = 0;
    newAXS.status = "Asignado";
    newAXS.deletedAt= null;
    result = await newAXS.save();
    results.push(result);

    //roles
    var newRev = await AssignmentXRoleModel.build({
        name: 'Revisor',
        ASSIGNMENTId: newExposition.id,
        ROLEId: 4  //rol de profesor
    });
    result = await newRev.save();
    results.push(result);   

    const Thesis = await UserXThesisModel.findOne({
        where  :{
            "USERId": parseInt(body.idAlumno),
            "type": "OWNER"
        }
    });
    if(!Thesis){
        return res.status(404).send({
            errorMessage: `No se encontró la thesis asociada al alumno ${body.idAlumno}.`
        });
    }
    const Asesor = await UserXThesisModel.findOne({
        where  :{
            "THESISId": Thesis.THESISId,
            "type": "ASESOR"
        }
    });
    if(!Asesor){
        return res.status(404).send({
            errorMessage: `No se encontró un asesor asociado al alumno ${body.idAlumno}.`
        });
    }
   
    newRev = AssignmentXRoleModel.build({
        name: 'Revisor',
        ASSIGNMENTId: newExposition.id,
        ROLEId: 5  //rol de asesor
    });
    result = await newRev.save();
    results.push(result);
    
    if(body.idsJurados){
        var newJurado = AssignmentXRoleModel.build({
            name: 'Evaluador',
            ASSIGNMENTId: newExposition.id,
            ROLEId: 6  //rol de evaluador
        });
        result = await newJurado.save();
        results.push(result);
    }
   
    for(var idJurado of body.idsJurados){
        var newAXSXR = AssignmentXStudentXRevisorModel.build({
            grade: 0,
            feedbackDate: '0000-00-00 00:00:00',  //campo inutilizable
            ASSIGNMENTXSTUDENTId: newAXS.id,
            ROLEId: idJurado
        });
        result = await newAXSXR.save();
        results.push(result);
    }
   
    return res.status(201).send(results);
}

const insertProgrammedExposition= async (req, res) => {  
    /*
    Se espera un body como:
    {
        "startDate": "2022-08-15T00:00:00.000Z",
        "endDate": "2022-08-22T00:00:00.000Z",
        "idThesis": "1",
        "idsJurados": [1,2,3,4,5]
    }
    */ 
    let result;
    let results = [];
   
    const body = req.body;
    const newExposition = AssignmentModel.build({
        assignmentName: "Exposición", //campo inutilizable
        chapterName: "-", //campo inutilizable
        startDate:  new Date(body.startDate),
        endDate: new Date(body.endDate), 
        limitCompleteDate : '0000-00-00 00:00:00',  //campo inutilizable
        limitCalificationDate : '0000-00-00 00:00:00', //campo inutilizable
        additionalComments : "-" ,//campo inutilizable
        maxScore : 20,
        type: "PROGRAMMED_EXPOSITION",
        deletedAt : null,
        COURSEXSEMESTERId: req.params.cursoxsemesterid
    });
    result =await newExposition.save();
    results.push(result);

    console.log(body.idThesis);
    //busqueda del estudiante de la tesis
    const students = await UserXThesisModel.findAll({
        logging: console.log,
        attributes : ['USERId'],
        where  :{
            "THESISId": parseInt(body.idThesis),
            "type": "OWNER"
        }
    });

    if(Object.entries(students).length === 0 ){
        return res.status(404).send({
            errorMessage: `No se encontró estudiantes asociados a la tesis ${body.idThesis}.`
        });
    }
    var idsStudents = students.map(x=> x.USERId);
    

    //agrega relacion de estudiantes con assignment
    for(var idAlumno of idsStudents){
        const newAXS = AssignmentXStudentModel.build({
            USERId : idAlumno,
            ASSIGNMENTId : newExposition.id,
            score : 0,
            status : "Asignado",
            deletedAt: null,
        });
        result = await newAXS.save();
        results.push(result);
    }
    //roles
    var newRev = await AssignmentXRoleModel.build({
        name: 'Revisor',
        ASSIGNMENTId: newExposition.id,
        ROLEId: 4  //rol de profesor
    });
    result = await newRev.save();
    results.push(result);   

    const Asesor = await UserXThesisModel.findOne({
        where  :{
            "THESISId": body.idThesis,
            "type": "ASESOR"
        }
    });
    if(Object.entries(Asesor).length === 0){
        return res.status(404).send({
            errorMessage: `No se encontró un asesor asociado al alumno ${body.idAlumno}.`
        });
    }
    newRev = AssignmentXRoleModel.build({
        name: 'Revisor',
        ASSIGNMENTId: newExposition.id,
        ROLEId: 5  //rol de asesor
    });
    result = await newRev.save();
    results.push(result);
    
    if(body.idsJurados){
        var newJurado = AssignmentXRoleModel.build({
            name: 'Evaluador',
            ASSIGNMENTId: newExposition.id,
            ROLEId: 6  //rol de evaluador
        });
        result = await newJurado.save();
        results.push(result);
    }
   
    for(var idJurado of body.idsJurados){   //coloca los jurados en userxthesis
        var newAXSXR = UserXThesisModel.build({
            type: 'JURY',
            USERId: idJurado,
            THESISId: body.idThesis
        });
        result = await newAXSXR.save();
        results.push(result);
    }
   
    return res.status(201).send(results);
}

const getDetailProgrammedExpositionController= async (req, res) => {  
    const studentExposition = await AssignmentXStudentModel.findByPk(req.params.axsid,
        {   
            include: [
                {
                   attributes : [ 'assignmentName', 'chapterName', 'maxScore', 'startDate', 'endDate'],
                    model: AssignmentModel,
                    where: {
                        type: {
                            [Op.like]: '%PROGRAMMED_EXPOSITION%'
                        }
                    }
                },   
                {
                    model : UserModel,  //datos alumno
                    attributes: ["id","name", "fLastName", "mLastName","photo" ],
                    include: [{
                        model: UserXThesisModel,
                        where : {
                            type: 'OWNER',
                        },
                        include: [{
                            model: ThesisModel,
                            attributes: ["title", "areaName", "description", "createdAt" ],
                        }]
                    },{
                        model: UserXSpecialtyModel,
                        include: [{
                            model: SpecialtyModel,
                            attributes: ["name"],
                        }]
                    }]
                }
            ]
        });

        const idThesis = studentExposition.dataValues.USER.USER_X_THEses.map(x=>x.THESISId);
        const idStudent = studentExposition.dataValues.USER.id;
        //agrega asesor 
        const asesor  = await UserXThesisModel.findOne({
            where : {
                THESISId : idThesis,
                type: 'ASESOR',
            },
            include :[
                {
                    attributes: ["name", "fLastName", "mLastName","photo" ],
                    model : UserModel,
                    include:[{
                        model: UserXSpecialtyModel,
                        include: [{
                            attributes: ["name"],
                            model: SpecialtyModel,
                        }]
                    }]
                }
            ]
        });
        //jurados 
        const jurors  = await UserXThesisModel.findAll({
            where : {
                THESISId : idThesis,
                type: 'JURY',
            },
            include :[
                {
                    attributes: ["name", "fLastName", "mLastName","photo" ],
                    model : UserModel,
                    include:[{
                        model: UserXSpecialtyModel,
                        include: [{
                            attributes: ["name"],
                            model: SpecialtyModel,
                        }]
                    }]
                }
            ]
        });
        // compañeros
        const team  = await UserXThesisModel.findAll({
            where : {
                THESISId : idThesis,
                type: 'OWNER',
                USERId : {
                    [Op.ne] : idStudent
                }
            },
            include :[
                {
                    attributes: ["name", "fLastName", "mLastName","photo" ],
                    model : UserModel,
                    include:[{
                        model: UserXSpecialtyModel,
                        include: [{
                            attributes: ["name"],
                            model: SpecialtyModel,
                        }]
                    }]
                }
            ]
        });

    return res.status(201).send({studentExposition, asesor,jurors, team});
}

const editProgrammedExpoController = async (req, res) => {
     /*
    Espera un body tal como:
    {
        "startDate": "2022-08-15T05:00:00.000Z",
        "endDate": "2022-08-15T05:30:00.000Z"
    }   
    */

    const body = req.body;

    const existExpo = await AssignmentModel.findByPk(req.params.expoId);
    if(!existExpo){
        return res.status(404).send({
            errorMessage: `No se encontró la exposicion ${req.params.expoId}.`
        });
    }

    existExpo.startDate = body.startDate;
    existExpo.endDate = body.endDate;
    await existExpo.save();
   
    return res.status(201).send(existExpo);

}

export { getListProgrammedExpositionController, insertProgrammedExposition,
     getDetailProgrammedExpositionController,editProgrammedExpoController,
     getListByUserIdProgrammedExpositionController }