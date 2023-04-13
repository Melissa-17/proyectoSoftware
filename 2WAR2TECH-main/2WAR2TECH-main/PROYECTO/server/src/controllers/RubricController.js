import AssignmentModel from '#Models/AssignmentModel.js';
import CourseModel from '#Models/CourseModel.js';
import CourseXSemesterModel from '#Models/CourseXSemesterModel.js';
import LevelCriteriaModel from '#Models/LevelCriteriaModel.js';
import RubricCriteriaModel from '#Models/RubricCriteriaModel.js';
import RubricModel from '#Models/RubricModel.js';
import SpecialtyModel from '#Models/SpecialtyModel.js';
import { Op } from 'sequelize';

const getRubricInformationController = async(req, res) => {
    const specialty = await SpecialtyModel.findByPk(res.locals.userSpecialtyId);
    if(!specialty){
        return res.status(401).json({ message: `No se ha encontrado la especialidad ${res.locals.userSpecialtyId}.` });
    }

    const rubric = await RubricModel.findOne({
        attributes: ['id','objective', 'annotations', 'criteriaQuantity', 'description'],
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        },
    })
    if(!rubric){
        return res.status(401).json({ message: `No se ha encontrado la rúbrica ${req.params.rubricId}.` });
    }

    const assignment = await AssignmentModel.findByPk(req.params.assignmentId,{
        attributes: ['assignmentName'],
        include: {
            model: CourseXSemesterModel,
            attributes: ['name'],
            include: {
                model: CourseModel,
                attributes: ['name'],
                where: {
                    SPECIALTYId: {
                        [Op.eq]: parseInt(res.locals.userSpecialtyId),
                    }
                }
            }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
    })
    

    // const criteria = await RubricCriteriaModel.findAll({
    //     attributes: ['name'],
    //     where: {
    //         'RUBRICId': {
    //             [Op.eq]: req.params.rubricId,
    //         }
    //     }
    // })

    return res.status(200).send({specialty, rubric , assignment
        // criteria 
    });
}

const editRubricInformationController = async(req, res) => {
    /*
        Se espera un body como:
        {
            "objetivo": "Aquí colocas algun objetivo",
            "anotaciones": "Aquí colocas alguna anotación"
        }
    */

    const rubric = await RubricModel.findOne({
        attributes: ['id','objective', 'annotations', 'criteriaQuantity', 'description'],
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        }
    })
    if(!rubric){
        return res.status(401).json({ message: `No se ha encontrado la rúbrica ${req.params.rubricId}.` });
    }

    rubric.annotations = req.body.anotaciones,
    rubric.objective = req.body.objetivo
    await rubric.save();

    return res.status(201).send(rubric);
}

const getCriteriaInformationController = async (req,res) => {
    const rubric = await RubricModel.findOne({
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        }
    })
    if(!rubric){
        return res.status(401).json({ message: `No se ha encontrado la rúbrica ${req.params.rubricId}.` });
    }

    const criteria = await RubricCriteriaModel.findOne({
        // attributes: ['name','description'],
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricCriteriaId),
            },
            'RUBRICId': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        }
    })
    if(!criteria){
        return res.status(401).json({ message: `No se ha encontrado el criterio ${req.params.rubricCriteriaId} de la rúbrica ${req.params.rubricId}.` });
    }

    // const levels = await LevelCriteriaModel.findAll({
    //     attributes: ['name','maxScore'],
    //     where: {
    //         'RUBRICCRITERIumId': {
    //             [Op.eq]: req.params.rubricCriteriaId,
    //         }
    //     }
    // })

    return res.status(200).send({criteria,
        // levels
    });
}

const listCriteriaController = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;

    const rubric = await RubricModel.findOne({
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        }
    });

    if(!rubric){
        return res.status(401).json({ message: `No se ha encontrado la rúbrica ${req.params.rubricId}.` });
    }

    const criteriaList = await RubricCriteriaModel.findAndCountAll({
        // attributes: ['name','description'],
        where: {
            'RUBRICId': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        limit: pageSize,
        offset: regStart
    })

    return res.status(200).send(criteriaList);   
}


const editCriteriaInformationController = async(req, res) => {
    /*
        Se espera un body como:
        {
            "name": "Nombre XD",
            "description": "Aquí colocas alguna descripcion"
        }
    */

    const rubric = await RubricModel.findOne({
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        }
    })
    if(!rubric){
        return res.status(401).json({ message: `No se ha encontrado la rúbrica ${req.params.rubricId}.` });
    }
    
    const criteria = await RubricCriteriaModel.findOne({
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricCriteriaId),
            },
            'RUBRICId': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        }
    })
    if(!criteria){
        return res.status(401).json({ message: `No se ha encontrado el criterio ${req.params.rubricCriteriaId} de la rúbrica ${req.params.rubricId}.` });
    }
    criteria.description = req.body.description,
    criteria.name = req.body.name,  
    await criteria.save();

    return res.status(201).send(criteria);
}

const addCriteriaController = async(req, res) => {
    /*
        Se espera un body como:
        {
            "name": "Estudios Primarios"
            "idR": 1
        }
    */

    const rubric = await RubricModel.findByPk(req.body.idR);
    if(!rubric){
        return res.status(401).json({ message: `No se ha encontrado la rúbrica ${req.body.idR}.` });
    }

    const newCriteria = RubricCriteriaModel.build();
    newCriteria.name = req.body.name;
    newCriteria.description = '';
    newCriteria.levelQuantity = 0;
    newCriteria.RUBRICId = req.body.idR;
    await newCriteria.save();

    rubric.criteriaQuantity += 1;
    await rubric.save();

    return res.status(201).send( newCriteria );
}

const deleteCriteriasController = async(req, res) => {
    /*
        Se espera un body como:
        {
            "criterios": [1,2,3,4]
        }
    */

    const rubric = await RubricModel.findOne({
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricId),
            }
        }
    })
    if(!rubric){
        return res.status(401).json({ message: `No se ha encontrado la rúbrica ${req.params.rubricId}.` });
    }
    
    var i=0;
    
    while(req.body.criterios[i]){
        const lim = req.body.criterios.length;
        const criteria = await RubricCriteriaModel.findOne({
            where: {
                'id': {
                    [Op.eq]: parseInt(req.body.criterios[i]),
                },
                'RUBRICId': {
                    [Op.eq]: parseInt(req.params.rubricId),
                }
            },
        })
        if(criteria){
            criteria.destroy();
            rubric.criteriaQuantity -= 1;
            await rubric.save();
        }
        
        if(i>=lim) break;
        i++;
    }

    return res.status(201).send(`Se han eliminado los criterios correctamente.`);
}

export { getRubricInformationController , editRubricInformationController, getCriteriaInformationController, 
    editCriteriaInformationController, addCriteriaController, deleteCriteriasController,
    listCriteriaController};
