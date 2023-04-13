import CourseXSemesterModel from '#Models/CourseXSemesterModel.js';
import SemesterModel from '#Models/SemesterModel.js';
import SpecialtyModel from '#Models/SpecialtyModel.js';
import UserXCourseXSemesterModel from '#Models/UserXCourseXSemesterModel.js';
import { Op } from 'sequelize';

const getListSemesterByUserIdController = async (req, res) => {
    const ucs = await UserXCourseXSemesterModel.findAll({
        where: {
            USERId: {
                [Op.eq]: parseInt(res.locals.userId),
            }
        },
        include: {
            model: CourseXSemesterModel,
            include:{
                model: SemesterModel,                
                attributes: ["id", "abbreviation"],
        }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
    });

    const semesters = new Array(0);
    ucs.map(sem => {
        semesters.push(sem.COURSE_X_SEMESTER.SEMESTER);
    })

    return res.send(semesters);
}

const addSemesterController = async (req, res) => {
    /*
    Espera un body tal como:
    {
        "abbreviation": "2023-1"
    }   
    */
    const semester = req.body;

    const newSemester = SemesterModel.build(semester);
    await newSemester.save();

    return res.status(201).send(newSemester);
}

const editSemesterController = async (req, res) => {
    /*
    Espera un body tal como:
    {
        "id": "6",
        "abbreviation": "2023-1"
    }   
    */
    const semester = req.body;

    const existSemester = await SemesterModel.findByPk(semester.id);
    if(!existSemester){
        return res.status(404).send({
            errorMessage: `No se encontró el semestre ${semester.id}`
        }); 
    }

    if(existSemester){
        existSemester.abbreviation = semester.abbreviation;
        await existSemester.save();
        return res.status(201).send(existSemester);
    }
    else{
        return res.status(404).send({
            errorMessage: `No se encontró la especialidad ${req.params.specialtyId}`
        });
    }
}

const deleteSemesterController = async (req, res) => {
    let id, existSemester, courses, c;
    for(id of req.query.idS){
        existSemester = await SemesterModel.findByPk(id);
        if(!existSemester){
            return res.status(404).send({
                errorMessage: `No se encontró el semestre ${id}`
            }); 
        }
        await existSemester.destroy();
        courses = await CourseXSemesterModel.findAll({ attributes:['id'], where: { SEMESTERId: existSemester.id }})
        await CourseXSemesterModel.destroy({where: { SEMESTERId: existSemester.id }})
        for(c of courses){
            await UserXCourseXSemesterModel.destroy({where: { COURSEXSEMESTERId: c.id }})
        }
    }
    return res.status(201).send();
}

const getListAllSemesters = async (req, res) => {
    const semesters = await SemesterModel.findAll({
        attributes: ['id', 'abbreviation'],
        order: [['abbreviation','ASC']],
    });
    return res.status(201).send(semesters);
}

const getListAllSemestersPagination = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;   
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (page - 1) * pageSize; 
    const semesters = await SemesterModel.findAndCountAll({
        attributes: ['id', 'abbreviation', 'updatedAt', 'createdAt'],
        order: [[ 'updatedAt', 'DESC' ], [ 'createdAt', 'DESC' ]],
        limit: pageSize,
        offset: regStart
    });
    return res.status(201).send(semesters);
}

const getSemesterDetail = async (req, res) => {
    const semester = await SemesterModel.findByPk(req.params.idS, {
        attributes: [ 'id', 'abbreviation' ]
    });
    return res.status(201).send(semester);
}

export { getListSemesterByUserIdController , addSemesterController, editSemesterController, deleteSemesterController, getListAllSemesters,
         getSemesterDetail, getListAllSemestersPagination}