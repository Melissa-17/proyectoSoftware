import LevelCriteriaModel from "#Models/LevelCriteriaModel.js";
import RubricCriteriaModel from "#Models/RubricCriteriaModel.js";
import {Op} from "sequelize";

const addCriteriaLevelController = async(req, res) => {
    /*
        Se espera un body como:
        {
            "name": "nombre del criterio",
            "maxScore" : "20",
            "description" : "descripcion"
            "idRC": 1
        }
    */

    const RubricCriteria = await RubricCriteriaModel.findByPk(req.body.idRC);

    if(!RubricCriteria){
        return res.status(401).json({ message: `No se ha encontrado el criterio ${req.params.rubricCriteriaId} de la rúbrica ` });
    }

    const newLevel = LevelCriteriaModel.build();
    newLevel.name = req.body.name;
    newLevel.maxScore =  req.body.maxScore;
    newLevel.description = req.body.description;
    newLevel.RUBRICCRITERIumId = req.body.idRC;
    await newLevel.save();

    RubricCriteria.levelQuantity += 1;
    await RubricCriteria.save();

    return res.status(201).send(newLevel);
}

const getCriteriaLevelController = async (req,res) => {

    const level = await LevelCriteriaModel.findOne({
        attributes: ['id', 'name','maxScore', 'description'],
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.levelCriteriaId),
            },
           
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
    })
    if(!level){
        return res.status(401).json({ message: `No se ha encontrado el nivel ${req.params.levelCriteriaId} ` });
    }

    return res.status(200).send({level});
}

const editCriteriaLevelController = async(req, res) => {
     /*
        Se espera un body como:
        {
            "name": "nombre del criterio",
            "maxScore" : "20",
            "description" : "descripcion"
        }
    */

    const level = await LevelCriteriaModel.findOne({
        attributes: ['id', 'name','maxScore', 'description'],
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.levelCriteriaId),
            },
           
        }
    })
    if(!level){
        return res.status(401).json({ message: `No se ha encontrado el nivel ${req.params.levelCriteriaId} ` });
    }
    
    level.name = req.body.name;
    level.maxScore =  req.body.maxScore;
    level.description = req.body.description;
    await level.save();

    return res.status(201).send(level);
}

const deleteCriteriaLevelsController = async(req, res) => {
    /*
        Se espera un body como:
        {
            "levels": [46,47]
        }
    */
    const rubricCriteria = await RubricCriteriaModel.findOne({
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.rubricCriteriaId),
            }
        }
    })
    if(!rubricCriteria){
        return res.status(401).json({ message: `No se ha encontrado el criterio ${req.params.rubricCriteriaId}.` });
    }
    
    
    var i=0;
    console.log("body: " + JSON.stringify(req.body, null, 2));
    while(req.body.levels[i]){
        const level = await LevelCriteriaModel.findOne({
            where: {
                'id': {
                    [Op.eq]: parseInt(req.body.levels[i]),
                } 
            },
            logging: console.log})
        console.log(level);
        if(level){
            level.destroy();
            rubricCriteria.levelQuantity =   parseInt(rubricCriteria.levelQuantity) - 1;
            await rubricCriteria.save();
        }
        i++;
    }
   

    return res.status(201).send(`Se han eliminado los niveles correctamente.`);
    

}

const getAllLevelCriteriaController = async(req, res) => {
    console.log(req.query)
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;

    const lc = await LevelCriteriaModel.findAndCountAll({
        attributes: [ 'id', 'name', 'maxScore', 'description', 'updatedAt', 'createdAt' ],
        where: { RUBRICCRITERIumId: req.params.rubricCriteriaId },
        // subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        limit: pageSize,
        offset: regStart
    });
    
    return res.status(201).send(lc);
}


export {addCriteriaLevelController, getCriteriaLevelController, editCriteriaLevelController,
    deleteCriteriaLevelsController, getAllLevelCriteriaController};