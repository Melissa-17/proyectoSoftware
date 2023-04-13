import AssignmentModel from "#Models/AssignmentModel.js";
import CalificationModel from "#Models/CalificationModel.js";
import CalificationXAssignmentModel from "#Models/CalificationXAssignment.js";
import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import { Op } from "sequelize";

const getCalificationsCriteriaController = async (req, res) => {    
    //http://localhost:port/calification/:idCurso/:idSemester
    req.query.page = req.query.page ? req.query.page : 1;   
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const CourseXSem = await CourseXSemesterModel.findOne({
        attributes: ['id'],
        where: {
            COURSEId: req.params.idCurso,
            SEMESTERId: req.params.idSemester
        }
    })
    if(!CourseXSem){
        return res.status(404).send({
            errorMessage: `No se encontró el horario del curso ${req.params.idCurso} del semestre ${req.params.idSemester}.`
        });
    }
    const criterias = await CalificationModel.findAndCountAll({
        attributes: [ 'id', 'name', 'weight' ], 
        where: { 
            'COURSEXSEMESTERId': {  
                    [Op.like]: CourseXSem.id,
            },
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'], ],
        offset: regStart,
        limit: pageSize,
    })

    return res.status(201).send(criterias);    
}

const addCalificationsCriteriaController = async (req, res) => {   
    //http://localhost:port/calification/:idCurso/:idSemester
    /*
        Se espera un body como:
        {
            "name": "Nuevo Criterio",
            "peso": 1, 
            "description": "Descripcion xD"
        }
    */
        const CourseXSem = await CourseXSemesterModel.findOne({
            attributes: ['id'],
            where: {
                COURSEId: req.params.idCurso,
                SEMESTERId: req.params.idSemester
            }
        })
        if(!CourseXSem){
            return res.status(404).send({
                errorMessage: `No se encontró el horario del curso ${req.params.idCurso} del semestre ${req.params.idSemester}.`
            });
        }

    const newCriteria = await CalificationModel.build();
    newCriteria.name = req.body.name;
    newCriteria.weight = parseFloat(req.body.peso);
    newCriteria.description = req.body.description;
    newCriteria.COURSEXSEMESTERId = CourseXSem.id;
    await newCriteria.save();

    return res.status(201).send(newCriteria);     
}

const getCalificationDetailController = async (req, res) => {    
    //http://localhost:port/calification/detail/:idCalification

    req.query.page = req.query.page ? req.query.page : 1;   
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const criteria = await CalificationModel.findOne({
        attributes: [ 'id','name', 'description'], 
        where: { 
            'id': {  
                    [Op.eq]: parseInt(req.params.idCalification),
            },
        },
    });

    const evaluaciones = await CalificationXAssignmentModel.findAndCountAll({
        attributes: [ 'id', 'weight'], 
        where: { 
            'CALIFICATIONId': {  
                    [Op.eq]: parseInt(req.params.idCalification),
            },
        },
        include: [
            {
                model: AssignmentModel,
                attributes: [ 'assignmentName'],
            }
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'], ],
        offset: regStart,
        limit: pageSize,
    })

    return res.status(201).send({criteria , evaluaciones});    
}

const editDescriptionCalificationController = async (req, res) => {   
    //http://localhost:port/calification/detail/:idCalification
    /*
        Se espera un body como:
        {
            "name": "name"
            "description": "Descripcion xD"
        }
    */

        const criterias = await CalificationModel.findByPk(req.params.idCalification);
        
        criterias.name = req.body.name;
        criterias.description = req.body.description;
        await criterias.save();

        return res.status(201).send(criterias);    
}

const addAssignmentCalificationController = async (req, res) => {    
    //http://localhost:port/calification/detail/:idCalification
    /*
        Se espera un body como:
        {
            "idAssignment": 30,
            "weight": 2    
        }
    */

    const newCxA = await CalificationXAssignmentModel.build();
    newCxA.weight = req.body.weight;
    newCxA.CALIFICATIONId = req.params.idCalification;
    newCxA.ASSIGNMENTId = req.body.idAssignment;
    await newCxA.save();    

    return res.status(201).send(newCxA);    
}

const editWeightEvaluationController = async (req, res) => {   
    //http://localhost:port/calification/detail/evaluation/:idCalificationXAssignment
    /*
        Se espera un body como:
        {
            "weight": 2
        }
    */

        const cXa = await CalificationXAssignmentModel.findByPk(req.params.idCalificationXAssignment);
        if(!cXa){
            return res.status(400).send("No existe ese CalificationXAssignment");
        }
        cXa.weight = req.body.weight;
        await cXa.save();

        return res.status(201).send(cXa);    
}

const deleteCalificationsCriteriaController = async (req, res) => {   
    const calification = await CalificationModel.findByPk(req.params.idCalification);
    if(!calification){
        return res.status(404).send({
            errorMessage: `No se encontró el calification ${req.params.idCalification}.`
        });
    }
    await calification.destroy();
    return res.status(201).send(); 
}

const deleteEvaluationController = async (req, res) => {   
    await CalificationXAssignmentModel.destroy({
        where: {
            id: req.query.idE
        }
    });
    return res.status(201).send(); 
}

const addEvaluationController = async (req, res) => {
    const body = req.body;
    const evaluation= await CalificationXAssignmentModel.create({
        weight: body.weight,
        CALIFICATIONId: body.idC,
        ASSIGNMENTId: body.idA
    });
    return res.status(201).send(evaluation); 
}

export { getCalificationsCriteriaController , addCalificationsCriteriaController , getCalificationDetailController , 
        editDescriptionCalificationController, addAssignmentCalificationController, editWeightEvaluationController,
        deleteCalificationsCriteriaController, deleteEvaluationController, addEvaluationController};