import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import RoleModel from "#Models/RoleModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import UserModel from "#Models/UserModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";
import UserXSpecialtyModel from "#Models/UserXSpecialtyModel.js";
import { hash } from "bcrypt";


const getSpecialtiesController = async (req, res) => {
    const specialties = await SpecialtyModel.findAll({
        attributes: [ 'id', 'name' ],
        include: {
            model: UserModel,
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'idPUCP' ],
            through: { attributes: []},
            include: {
                model: UserXRoleModel,
                attributes: [],
                where: { ROLEId: 7 }
            },
            order: [['updatedAt', 'DESC'], ['createdAt', 'DESC']]
        }
    });
    
    return res.send(specialties);
}

const getSpecialtyDetails = async (req, res) => {
    const specialty = await SpecialtyModel.findByPk(req.params.idS, {
        attributes: [ 'id', 'name' ],
        include: {
            model: UserModel,
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'idPUCP' ],
            through: { attributes: []},
            include: {
                model: UserXRoleModel,
                attributes: [],
                where: { ROLEId: 7 }
            }
        }
    });
    return res.status(201).send(specialty);
}

const getToBeCoordinator = async (req, res) => {
    const users = await UserModel.findAll({
        attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'idPUCP' ],
        include: [{
            model: UserXSpecialtyModel,
            where: {
                SPECIALTYId: req.params.idS
            }
        },{
            model: UserXRoleModel,
            where:{
                ROLEId: 4
            }
        }]
    })
    return res.status(201).send(users);
}

const deleteSpecialty = async (req, res) => {
    await SpecialtyModel.destroy({
        where:{
            id: req.params.idS
        }
    });
    return res.status(201).send();
}

const postSpecialty = async (req, res) => {
    const specialty = await SpecialtyModel.create({
        name: req.body.name,
        FACULTYId: req.body.idF
    });
    return res.status(201).send(specialty);
}

const patchSpecialty = async (req, res) => {
    const specialty = await SpecialtyModel.update({ name: req.body.name }, { where: { id: req.body.idS }})
    return res.status(201).send(specialty);
}

const getListCoordinators = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;   
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (page - 1) * pageSize; 

    const coordinators = await UserModel.findAndCountAll({
        attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo', 'email', 'idPUCP' ],
        include: [{
            model: SpecialtyModel,
            attributes: [ 'id', 'name' ],
            through: { attributes: [] }
        },
        {
            model: UserXRoleModel,
            attributes: [],
            where:{
                ROLEId: 7
            }
        }],
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
        subQuery: false,
        limit: pageSize,
        offset: regStart
    });
    return res.status(201).send(coordinators);
}

const postCoordinator = async (req, res) => {
    const body = req.body;
    const password = body.idPUCP;
    const hashedPassword = await hash (password, 12);
    const coordinator = await UserModel.create({
        name: body.name,
        fLastName: body.fLastName,
        mLastName: body.mLastName,
        email: body.email,
        idPUCP: body.idPUCP,
        password: hashedPassword
    });
    const uxr = await UserXRoleModel.create({
        USERId: coordinator.id,
        ROLEId: 7
    });
    return res.status(201).send({coordinator, uxr})
}

const patchGenericUser = async (req, res) => {
    const body = req.body;
    const user = await UserModel.update({
        name: body.name,
        fLastName: body.fLastName,
        mLastName: body.mLastName,
        email: body.email,
        idPUCP: body.idPUCP
    },
    {
        where: {
            id: body.idU
        }
    });
    return res.status(201).send(user);
}

const postCordinatorToSpecialty = async (req, res) => {
    const body = req.body;
    const existUxS = await UserXSpecialtyModel.findOne({
        where: {
            USERId: body.idU,
        }
    })
    if(!existUxS){
        const uxs = await UserXSpecialtyModel.create({
            USERId: body.idU,
            SPECIALTYId: body.idS
        });
        return res.status(201).send(uxs);
    }
    else{
        existUxS.SPECIALTYId = body.idS,
        await existUxS.save();
        return res.status(201).send(existUxS);
    }    
    
}

const deleteCoordinator = async (req, res) => {
    await UserModel.destroy({
        where:{
            id: req.query.idU
        }
    });
    return res.status(201).send();
}

const getDetailGenericUser = async (req, res) => {
    let user;
    if(res.locals.userRole == 7){
        if(req.query.idS){
            user = await UserModel.findByPk(req.params.idU, {
                attributes: ['id', 'name', 'fLastName', 'mLastName', 'email', 'idPUCP', 'photo'],
                include: {
                    required: false,
                    attributes: ['id', 'name', 'abbreviation'],
                    model: CourseXSemesterModel,
                    where: {
                        SEMESTERId: req.query.idS
                    },
                    through: { attributes: [] }
                }
            });
        }else{
            user = await UserModel.findByPk(req.params.idU, {
                attributes: ['id', 'name', 'fLastName', 'mLastName', 'email', 'idPUCP', 'photo'],
                include: {
                    required: false,
                    attributes: ['id', 'name', 'abbreviation'],
                    model: CourseXSemesterModel,
                    through: { attributes: [] }
                }
            });
        }
    }else if (res.locals.userRole == 1){
        user = await UserModel.findByPk(req.params.idU, {
            attributes: ['id', 'name', 'fLastName', 'mLastName', 'email', 'idPUCP', 'photo'],
            include: {
                attributes: ['id', 'name'],
                model: SpecialtyModel,
                through: { attributes: [] }
            }
        });
    }
    return res.status(201).send(user)
}

const disableSpecialtyController = async (req,res) => {
    const uXs = await UserXSpecialtyModel.findOne({
        where: {
            USERId: req.params.idU,
            SPECIALTYId: req.params.idEsp,
        }
    })
    if(uXs){
        await uXs.destroy();
        return res.send(`Se ha deshabilitado la especialidad ${req.params.idEsp} del coordinador ${req.params.idU}`);
    }
    return res.status(402).send("No existe esta relación");
}

export { getSpecialtiesController, getSpecialtyDetails, getToBeCoordinator,
     deleteSpecialty, postSpecialty, patchSpecialty, getListCoordinators, postCoordinator,
     patchGenericUser, postCordinatorToSpecialty, deleteCoordinator, getDetailGenericUser , disableSpecialtyController};