import AssignmentModel from "#Models/AssignmentModel.js";
import CourseModel from "#Models/CourseModel.js";
import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import RoleModel from "#Models/RoleModel.js";
import SemesterModel from "#Models/SemesterModel.js";
import UserModel from "#Models/UserModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import { Op , Sequelize, fn, col} from 'sequelize';

const getCoursesController = async (req, res) => {
    const courses = await CourseXSemesterModel.findAll({
        where: {
            'SEMESTERId': {
                [Op.eq]: parseInt(req.params.semesterId),
            }
        },
        include : {
                model: CourseModel
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'], ],
    });
    

    return res.send(courses);
}

const getCoursesBySpecialtyController = async (req, res) => {
    const courses = await CourseModel.findAll({
        attributes: ['id','name'],
        where: {
            SPECIALTYId: res.locals.userSpecialtyId
        },
        include:{
            model: CourseXSemesterModel
        },
        subQuery: false,
        order: [ ['name', 'ASC'],
        [CourseXSemesterModel,'name','ASC'] ],
    });
    return res.send(courses);
}

const getProfesorsAndAssignmentsCoursexSemesterController = async (req, res) => {
    const profesors = await UserModel.findAll(
        { 
            attributes: ['USER.name', 'fLastName', 'mLastName', 'photo'], 
            include: [
                {
                    model: RoleModel, 
                    attributes: ['id', 'description'], 
                    through: { 
                        attributes: [] 
                    } ,
                    where :{
                        id : 4,
                    },
                },
                {
                    model : CourseXSemesterModel,
                    where :{
                        COURSEId:  req.params.CourseId, 
                        SEMESTERId:  req.params.SemesterId,       
                    },
                    through: { attributes: []},                
                }],
            subQuery: false,
            order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'], ],
        });

    const assignments = await AssignmentModel.findAll({  
        include: [{
            model : CourseXSemesterModel,
            where :{
                COURSEId:  req.params.CourseId, 
                SEMESTERId:  req.params.SemesterId,       
            },    
        }],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'], ],
   });

    return res.send({profesors,assignments});

}

//AGREGAR SEMESTRE Y CURSOS
const registerCoursesXSemesterController = async(req, res) => {
    /*
    Espera un body tal como:
    {
        "cursos": [{"id": "1", "users": [1,2,3,4,5]},
            {"id": "2", "users": [1,2,3]}]
    }     
    */
    // console.log(JSON.stringify(req.body, null, 2));

    const existSem = await SemesterModel.findByPk(req.params.semesterId);
    if(!existSem){
        return res.status(404).send({
            errorMessage: `No se encontró el semestre ${req.params.semesterId}.`
        });
    }

    var i=0;
    while(req.body.cursos[i]){
        const newCourseXSem = CourseXSemesterModel.build();
        newCourseXSem.numberOfThesis = 0;
        newCourseXSem.COURSEId = req.body.cursos[i].id;
        newCourseXSem.SEMESTERId = req.params.semesterId;
        newCourseXSem.beginDateApproval = '0000-00-00 00:00:00';
        newCourseXSem.endDateApproval = '0000-00-00 00:00:00';
        await newCourseXSem.save();
        var j=0;
        while(req.body.cursos[i].users[j]){
            const newUserXCourseXSem = UserXCourseXSemesterModel.build();
            newUserXCourseXSem.COURSEXSEMESTERId = newCourseXSem.id;
            newUserXCourseXSem.USERId = req.body.cursos[i].users[j];
            await newUserXCourseXSem.save();
            j++;
        }
        i++;
    }    

    return res.status(201).send(`Se han agregado los cursos correctamente.`);
}

//EDITAR SEMESTRE Y CURSOS
const editRegisterCoursesXSemesterController = async(req, res) => {
    /*
    Espera un body tal como:
    {
        "cursos": [{"id": "1", "users": [1,2,3,4,5], "tipo": "INSERT"},
            {"id": "2", "users": [1,2,3], "tipo": "UPDATE"},
            {"id": "3", "users": [1,2], "tipo": "DELETE"},
            {"id": "4", "users": [1], "tipo": "NONE"}]
    }     
    */
    const existSem = await SemesterModel.findByPk(req.params.semesterId);
    if(!existSem){
        return res.status(404).send({
            errorMessage: `No se encontró el semestre ${req.params.semesterId}.`
        });
    }

    var i=0;
    while(req.body.cursos[i]){
        if(req.body.cursos[i].tipo == "INSERT"){
            const newCourseXSem = CourseXSemesterModel.build();
            newCourseXSem.numberOfThesis = 0;
            newCourseXSem.COURSEId = req.body.cursos[i].id;
            newCourseXSem.SEMESTERId = req.params.semesterId;
            await newCourseXSem.save();
            var j=0;
            while(req.body.cursos[i].users[j]){
                const newUserXCourseXSem = UserXCourseXSemesterModel.build();
                newUserXCourseXSem.COURSEXSEMESTERId = newCourseXSem.id;
                newUserXCourseXSem.USERId = req.body.cursos[i].users[j];
                await newUserXCourseXSem.save();
                j++;
            }
        }
        if(req.body.cursos[i].tipo == "DELETE"){
            var k=0;
            while(req.body.cursos[i].users[k]){
                const lim = req.body.cursos[i].users.length;
                const listaUxCxS = await UserXCourseXSemesterModel.findAndCountAll({
                    where: {
                        'USERId': {
                            [Op.eq]: parseInt(req.body.cursos[i].users[k]),
                        }
                    },
                    include: [
                        {
                            model: CourseXSemesterModel,
                            where: {
                                "COURSEId":{
                                    [Op.eq]: parseInt(req.body.cursos[i].id),
                                } ,
                                "SEMESTERId": {
                                    [Op.eq]: parseInt(req.params.semesterId),
                                }
                            }
                        }
                    ]
                })
                for(var m=0; m<listaUxCxS.count; m++) listaUxCxS.rows[m].destroy();
                if(k>=lim) break;
                k++;
            }
            const existcXs = await CourseXSemesterModel.findAndCountAll({
                where: {
                    "COURSEId":{
                        [Op.eq]: parseInt(req.body.cursos[i].id),
                    } ,
                    "SEMESTERId": {
                        [Op.eq]: parseInt(req.params.semesterId),
                    }
                }
            })
            for(var j=0; j<existcXs.count; j++) existcXs.rows[j].destroy();
            if(existcXs.count <= 0) return res.status(404).send({
                errorMessage: `No se encontró la relación curso ${req.body.cursos[i].id} y semestre ${req.params.semesterId}.`
            });
        }

        if(req.body.cursos[i].tipo == "UPDATE"){
            const existcXs = await CourseXSemesterModel.findAndCountAll({
                where: {
                    "COURSEId":{
                        [Op.eq]: parseInt(req.body.cursos[i].id),
                    } ,
                    "SEMESTERId": {
                        [Op.eq]: parseInt(req.params.semesterId),
                    }
                }
            })
            if(existcXs.count <= 0) return res.status(404).send({
                errorMessage: `No se encontró la relación curso ${req.body.cursos[i].id} y semestre ${req.params.semesterId}.`
            });
            for(var j=0; j<existcXs.count; j++){
                var k=0;
                const profPrevios = await UserXCourseXSemesterModel.findAll({
                    where: {
                        "COURSEXSEMESTERId": {
                            [Op.eq]: existcXs.rows[j].dataValues.id,   
                        },
                    }
                })
                while(req.body.cursos[i].users[k]){    
                    const lim = req.body.cursos[i].users.length;

                    const uXcXs = await UserXCourseXSemesterModel.findOne({
                        where: {
                            "COURSEXSEMESTERId": {
                                [Op.eq]: existcXs.rows[j].id,   
                            },
                            "USERId": {
                                [Op.eq]: req.body.cursos[i].users[k],
                            }
                        }
                    })

                    if(!uXcXs){
                        const newUserXCourseXSem = UserXCourseXSemesterModel.build();
                        newUserXCourseXSem.COURSEXSEMESTERId = existcXs.rows[j].id;
                        newUserXCourseXSem.USERId = req.body.cursos[i].users[k];
                        await newUserXCourseXSem.save();
                    }
                    if(k>=lim) break;                                   
                    k++;
                }
                var profQuitados = Array();             
                profPrevios.map(x => {                          
                        var z=0;
                        var flag=0;  
                        while(1){
                            const lim = req.body.cursos[i].users.length;
                            if(x.dataValues.USERId == req.body.cursos[i].users[z]){
                                flag = 1;
                                break;
                            } 
                            z++; 
                            if(z>= lim) break;
                        }        
                        if(!flag) profQuitados.push(x);
                })
                
                const cant = profQuitados.length;
                for(var i=0; i<cant; i++){
                    await profQuitados[i].destroy();
                }
            }
        }
        i++;
    }    

    return res.status(201).send(`Se ha actualizado el semestre correctamente.`);
}

const createCourseController = async(req, res) => {
    /*
    Espera un body tal como:
    {
        "name": "Proyecto de Tesis 5",
        "code": "INF123"
        "credits": "3.5"        
    }   
    */
    const course = req.body;

    const existSpec = SpecialtyModel.findByPk(res.locals.userSpecialtyId);
    if(!existSpec){
        return res.status(404).send({
            errorMessage: `No se encontró la especialidad ${res.locals.userSpecialtyId}.`
        });
    }

    const newCourse = CourseModel.build(course);
    newCourse.SPECIALTYId = res.locals.userSpecialtyId;
    await newCourse.save();

    return res.status(201).send(newCourse);
}

const listProfesorsxSpecialtyController = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;   

    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;    

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
                    id: 4 //Role profesor
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
        order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'], ],
        offset: regStart,
        limit: pageSize,
    })

    return res.send(courses);
}

const editCourseController = async(req, res) => {
    /*
    Espera un body tal como:
    {
        "name": "Proyecto de Tesis 5",
        "code": "INF123"
        "credits": "3.5"        
    }   
    */

    const existSpec = SpecialtyModel.findByPk(res.locals.userSpecialtyId);
    if(!existSpec){
        return res.status(404).send({
            errorMessage: `No se encontró la especialidad ${res.locals.userSpecialtyId}.`
        });
    }

    const course = await CourseModel.findByPk(req.params.idCurso);
    if(!course){
        return res.status(404).send({
            errorMessage: `No se encontró el curso a editar.`
        }); 
    }

    course.name = req.body.name; 
    course.code = req.body.code;
    course.credits = req.body.credits;
    await course.save();

    return res.status(201).send(course);
}

const getCourseDetailController = async (req, res) => {
    const course = await CourseModel.findByPk(req.params.idCurso,{
        attributes: ['id','name','code','credits'],
    });
    if(!course){
        return res.status(404).send({
            errorMessage: `No se encontró el curso a editar.`
        }); 
    }

    return res.send(course);
}

const deleteCourseController = async(req, res) => {
    const existCourse = await CourseModel.findByPk(req.params.idCurso);
    if(!existCourse){
        return res.status(404).send({
            errorMessage: `No se encontró el curso ${req.params.idCurso}.`
        });
    }

    await existCourse.destroy();

    return res.status(200).send("Borrado exitoso.");
}

const getListCourseController = async (req, res) => {
    const courses = await CourseModel.findAll({
        attributes: [ 'id', 'name', 'code', 'credits' ],
        where: {
            SPECIALTYId: res.locals.userSpecialtyId
        },
        order: [ ['code', 'ASC'] ]
    });
    res.status(201).send(courses);
}

const getListSchedulesController = async (req, res) => {
    const schedules = await CourseXSemesterModel.findAll({
        attributes: [ 'id', 'name', 'abbreviation' ],
        where:{
            COURSEId: req.params.idC,
            SEMESTERId: req.params.idS,
        },
        order: [ ['abbreviation', 'ASC'] ]
    });
    res.status(201).send(schedules);
}

export { getCoursesController,getProfesorsAndAssignmentsCoursexSemesterController,
    registerCoursesXSemesterController, createCourseController, listProfesorsxSpecialtyController,
    editRegisterCoursesXSemesterController, getCoursesBySpecialtyController , editCourseController ,
    getCourseDetailController , deleteCourseController, getListCourseController, getListSchedulesController};