import RoleModel from "#Models/RoleModel.js";
import UserModel from "#Models/UserModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import { Op , Sequelize, fn, col} from 'sequelize';
import AssignmentModel from "#Models/AssignmentModel.js";
import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import CourseModel from "#Models/CourseModel.js";
import FacultyModel from "#Models/FacultyModel.js";
import UserXSpecialtyModel from "#Models/UserXSpecialtyModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";

const searchBySpecialtyAndRolController = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;       

    const tipo = req.query.tipo;
    var idTipo = 0;
    switch(tipo){
        case "Administrador": 
            idTipo = 1;
            break;
        case "Usuario":
            idTipo = 2;
            break;
        case "Alumno":
            idTipo = 3;
            break;
        case "Profesor":
            idTipo = 4;
            break;
        case "Asesor":
            idTipo = 5;
            break;
        case "Jurado":
            idTipo = 6;
            break;
        case "Coordinador":
            idTipo = 7;
            break;
        default:
            break;
    }
    if(!idTipo)
        return res.status(401).send(`Ingrese un tipo válido.`);

        
    const courses = await UserModel.findAndCountAll({
        attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'photo','email' ],
        where: 
            Sequelize.where(
            fn("CONCAT", col("USER.name"), ' ', col("fLastName"),  ' ' , 
            col("mLastName")),
            {
                [Op.like]: '%'+req.query.text+'%',
            }),
        include: [ 
            { 
                model: RoleModel,
                attributes: [],
                where: {
                    id: idTipo,
                },
            },
            {
                model: SpecialtyModel,
                // attributes: [],
                where: {
                    id: res.locals.userSpecialtyId
                }

            }
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,
    })

    return res.send(courses);
}

const searchBySpecialtyAndNameController = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;    

    const tipo = req.query.tipo;
    var idTipo = 0;
    switch(tipo){
        case "Administrador": 
            idTipo = 1;
            break;
        case "Usuario":
            idTipo = 2;
            break;
        case "Alumno":
            idTipo = 3;
            break;
        case "Profesor":
            idTipo = 4;
            break;
        case "Asesor":
            idTipo = 5;
            break;
        case "Jurado":
            idTipo = 6;
            break;
        case "Coordinador":
            idTipo = 7;
            break;
        default:
            break;
    }
    if(!idTipo)
        return res.status(401).send(`Ingrese un tipo válido.`);

    const people = await UserModel.findAndCountAll({
        attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'photo','email' ],
        where: 
            Sequelize.where(
            fn("CONCAT", col("USER.name"), ' ', col("fLastName"),  ' ' , 
            col("mLastName")),
            {
                [Op.like]: '%'+req.query.text+'%',
            }),
        
        include: [ 
            { 
                model: RoleModel,
                attributes: [],
                where: {
                    id: idTipo,
                },
            },
            {
                model: SpecialtyModel,
                // attributes: [],
                where: {
                    id: res.locals.userSpecialtyId
                }

            }
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,
    })

    return res.send(people);
}

const searchBySpecialtyAndRolAndCourseController = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;       

    const tipo = req.query.tipo;
    var idTipo = 0;
    switch(tipo){
        case "Administrador": 
            idTipo = 1;
            break;
        case "Usuario":
            idTipo = 2;
            break;
        case "Alumno":
            idTipo = 3;
            break;
        case "Profesor":
            idTipo = 4;
            break;
        case "Asesor":
            idTipo = 5;
            break;
        case "Jurado":
            idTipo = 6;
            break;
        case "Coordinador":
            idTipo = 7;
            break;
        default:
            break;
    }
    if(!idTipo)
        return res.status(401).send(`Ingrese un tipo válido.`);

    const courses = await UserModel.findAndCountAll({
        attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'photo' ],
        where: 
            Sequelize.where(
            fn("CONCAT", col("name"), ' ', col("fLastName"),  ' ' , 
            col("mLastName")),
            {
                [Op.like]: '%'+req.query.text+'%',
            }),
        include: [ 
            { 
                model: RoleModel,
                attributes: [],
                where: {
                    id: idTipo,
                },
            },
            {
                model: SpecialtyModel,
                attributes: [],
                where: {
                    id: res.locals.userSpecialtyId
                }

            },
            {
                model: CourseXSemesterModel,
                attributes: ['COURSEId', 'SEMESTERId'],
                include: {
                    model: CourseModel,
                    attributes: ['name'],
                    where: {
                        id: {
                            [Op.eq]: req.params.idCurso
                        }
                    }
                }
            }
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,
    })

    return res.send(courses);
}

const searchByDifferentsRolsController = async(req, res) => {
    /*
        Se espera un body como:
        {
            "tipos": ["Profesor", "Asesor"],
        }
    */
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;

    var i = 0;
    const len = req.body.tipos.length;

    var users = Array();
    while(1){
        if(i >= len) break;
        const tipo = req.body.tipos[i];
        var idTipo = 0;
        switch(tipo){
            case "Administrador": 
                idTipo = 1;
                break;
            case "Usuario":
                idTipo = 2;
                break;
            case "Alumno":
                idTipo = 3;
                break;
            case "Profesor":
                idTipo = 4;
                break;
            case "Asesor":
                idTipo = 5;
                break;
            case "Jurado":
                idTipo = 6;
                break;
            case "Coordinador":
                idTipo = 7;
                break;
            default:
                break;
        }
        if(!idTipo)
            return res.status(401).send(`Ingrese un tipo válido.`);
        i++;

        const people = await UserModel.findAndCountAll({
            attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'photo' , 'email'],
            where: 
                Sequelize.where(
                fn("CONCAT", col("name"), ' ', col("fLastName"),  ' ' , 
                col("mLastName")),
                {
                    [Op.like]: '%'+req.query.text+'%',
                }),
            
            include: [ 
                { 
                    model: RoleModel,
                    attributes: [],
                    where: {
                        id: idTipo,
                    },
                },
                {
                    model: SpecialtyModel,
                    // attributes: [],
                    where: {
                        id: res.locals.userSpecialtyId
                    }
    
                }
            ],
            subQuery: false,
            order: [ ['updatedAt', 'DESC'] ],
            offset: regStart,
            limit: pageSize,
        })

        users.push(people);
    }

    return res.send(users);
}

const searchByTypeAndNameAssignmentController = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;  

    const cxs = await CourseXSemesterModel.findOne({
        attributes: [ 'id' ],
        where: {
            COURSEId: req.params.idC,
            SEMESTERId: req.params.idS
        }
    });

    if(!cxs){
        return res.status(404).send(`No se encontró el horario`);
    }

    const assignments = await AssignmentModel.findAndCountAll({
        attributes: [ 'id', 'assignmentName'],
        where: {
            'assignmentName': {
                [Op.like]: '%'+req.query.text+'%',
            },
            'type': {
                [Op.eq]: req.query.tipo,
            },
            COURSEXSEMESTERId : cxs.id,
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'] ],
        offset: regStart,
        limit: pageSize,
    })

    return res.send(assignments);
}

const searchByFacEspRolController = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;
    const text = req.query.text ? req.query.text : '';

    if(req.query.idRol){
        const users = await UserModel.findAndCountAll({
            attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'updatedAt', 'photo', 'email','idPUCP' ], // 'photo',
            where: {
                [Op.or]: [
                    { name:      { [Op.like]: `%${req.query.text}%` }},
                    { fLastName: { [Op.like]: `%${req.query.text}%` }},
                    { mLastName: { [Op.like]: `%${req.query.text}%` }},
                ]
            },
            include: [ 
                { 
                    model: UserXSpecialtyModel,
                    attributes: [],
                    where: {
                        SPECIALTYId: req.query.idEsp,
                    },
                    include: {
                        model: SpecialtyModel,
                        where: {
                            FACULTYId: req.query.idFac,
                        }
                    }
                },
                {
                    model: UserXRoleModel,
                    attributes: [],
                    where: {
                        ROLEId: req.query.idRol,
                    }
                }
            ],
            subQuery: false,
            order: [ ['updatedAt', 'DESC'] ],
            limit: pageSize,
            offset: regStart
        })
        return res.send(users);
    }
    else{
        const users = await UserModel.findAndCountAll({
            attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'updatedAt' ], // 'photo',
            include: [ 
                { 
                    model: UserXSpecialtyModel,
                    attributes: [],
                    where: {
                        SPECIALTYId: req.query.idEsp,
                    },
                    include: {
                        model: SpecialtyModel,
                        where: {
                            FACULTYId: req.query.idFac,
                        }
                    }
                }
            ],
            subQuery: false,
            order: [ ['updatedAt', 'DESC'] ],
            limit: pageSize,
            offset: regStart
        })
        return res.send(users);
    }
}

export { searchBySpecialtyAndRolController , searchBySpecialtyAndRolAndCourseController, searchBySpecialtyAndNameController, 
    searchByDifferentsRolsController, searchByTypeAndNameAssignmentController, searchByFacEspRolController}