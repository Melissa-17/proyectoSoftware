import FacultyModel from "#Models/FacultyModel.js";
import RoleModel from "#Models/RoleModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import UserModel from "#Models/UserModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";
import build from "@date-io/date-fns";


const getFacultiesController = async (req, res) => {
    const faculties = await FacultyModel.findAll({
        
    });
    
    return res.send(faculties);
}

const getPaginationFacultiesController = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;   
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (page - 1) * pageSize; 
    const faculties = await FacultyModel.findAndCountAll({
        attributes: [ 'id', 'name' ],
        order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'],],
        limit: pageSize,
        offset: regStart
    });
    return res.send(faculties);
}

const getFacultyDetails = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;   
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (page - 1) * pageSize; 
    const faculty = await FacultyModel.findByPk(req.params.idF, {
        attributes: [ 'id', 'name' ]
    });
    const specialty = await SpecialtyModel.findAndCountAll({
        where:{
            FACULTYId: req.params.idF
        },
        include: {
            model: UserModel,
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'idPUCP', 'updatedAt', 'createdAt' ],
            through: { attributes: []},
            include: {
                model: UserXRoleModel,
                attributes: [],
                where: { ROLEId: 7 }
            }
        },
        subQuery: false,
        limit: pageSize,
        offset: regStart,
        order: [['updatedAt', 'DESC'],  ['createdAt', 'DESC'],],
    })
    return res.status(201).send({faculty, specialty});
}

const patchModifyFaculty = async (req, res) => {
    const actions = req.body.actions;
    const faculty = req.body.faculty;
    const specialties = req.body.specialties;
    let results = [];
    let nf, ns, r, s, nc, c, a, sa;
    let i = 0;
    for(a of actions){
        switch(a){
            case 'INSERT':{
                if(i == 0){
                    nf =  await FacultyModel.create({ name: faculty.name });
                    results.push(nf);
                    for(s of specialties){
                        ns = await SpecialtyModel.create({ name: s.name });
                        results.push(ns);
                        for(c of s.coordinators){
                            nc = await UserXRoleModel.create({ USERId: c.idC, ROLEId: 7 });
                            results.push(nc);
                        }
                    }
                }
                break;
            }
            case 'UPDATE':{
                if(i == 0){
                    r = await FacultyModel.update({ name: faculty.name }, { where: { id: faculty.idF }});
                }else{
                    for(sa of specialties[i-1].actions){
                        switch(sa.action){
                            case 'NEW_SPECIALTY':{
                                r = await SpecialtyModel.create({ name: specialties[i-1].name, FACULTYId: faculty.idF });
                                for(c of specialties[i-1].coordinators){
                                    nc = await UserXRoleModel.create({ USERId: c.idC, ROLEId: 7 });
                                    results.push(nc);
                                }
                                break;
                            }
                            case 'EDIT_SPECIALTY':{
                                r = await SpecialtyModel.update({ name: specialties[i-1].name }, { where: { id: specialties[i-1].idS }});
                                break;
                            }
                            case 'NEW_COORDINATOR':{
                                r = await UserXRoleModel.create({ USERId: sa.idC, ROLEId: 7 });
                                break;
                            }
                            case 'DELETE_COORDINATOR':{
                                r = await UserXRoleModel.destroy({ where: { USERId: sa.idC, ROLEId: 7 }});
                                break;
                            }
                            default:{
                                r = 'NO ACTION';
                            }
                            results.push(r);
                        }
                    }
                }
                results.push(r);
                break;
            }
            case 'DELETE':{
                if(i == 0){
                    ns = SpecialtyModel.findAll({
                        where:{ FACULTYId: faculty.idF },
                        include: {
                            model: UserModel,
                            attributes: [ 'id' ],
                            through: { attributes: []},
                            include: {
                                model: UserXRoleModel,
                                attributes: [],
                                where: { ROLEId: 7 }
                            }
                        }
                    });
                    r = await FacultyModel.destroy({ where: {id: faculty.idF }});
                    results.push(r);
                    r = await SpecialtyModel.destroy({ where: { FACULTYId: faculty.idF }});
                    results.push(r);
                    for(s of ns){
                        r = await UserXRoleModel.destroy({ where: { USERId: s.USER.id, ROLEId: 7 }});
                    }
                }else{
                    ns = await SpecialtyModel.findByPk(specialties[i-1].id, {
                        attributes: [ 'id' ],
                        include: {
                            model: UserModel,
                            attributes: [ 'id' ],
                            through: { attributes: []},
                            include: {
                                model: UserXRoleModel,
                                attributes: [],
                                where: { ROLEId: 7 }
                            }
                        }
                    });
                    r = await SpecialtyModel.destroy({ where: { id: specialties[i-1].id }});
                    results.push(r);
                    r = await UserXRoleModel.destroy({ where: { USERId: ns.USER.id, ROLEId: 7 }});
                }
                results.push(r);
                break;
            }
            default:{
                r = 'NO ACTION'
                results.push(r);
            }
        }
        i++;
    }
    return res.status(201).send(results);
}

const getFacultySpecialty = async (req, res) => {
    const faculties = await FacultyModel.findAll({
        attributes: [ 'id', 'name' ],
        order: [ [ 'name', 'ASC' ]],
        include: {
            model: SpecialtyModel,
            attributes: [ 'id', 'name'],
            order: [ [ 'name', 'ASC' ]],
        }
    });
    return res.status(201).send(faculties);
}

const deleteFaculty = async (req, res) => {
    await FacultyModel.destroy({
        where: {
            id: req.query.idF
        }
    });
    return res.status(201).send();
}

const postFaculty = async (req, res) =>{
    const faculty = await FacultyModel.create({
        name: req.body.name
    })
    return res.status(201).send(faculty);
}

const patchFaculty = async (req, res) =>{
    const faculty = await FacultyModel.update({ name: req.body.name },{
       where: {
        id: req.body.idF
       } 
    });
    return res.status(201).send(faculty);
}

export { getFacultiesController, getPaginationFacultiesController, getFacultyDetails, patchModifyFaculty,
         getFacultySpecialty, deleteFaculty, postFaculty, patchFaculty };