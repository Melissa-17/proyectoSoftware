import AssignmentXStudentXRevisorModel from "#Models/AssignmentXStudentXRevisorModel.js";
import AssignmentScoreModel from "#Models/AssignmentScoreModel.js";
import UserModel from "#Models/UserModel.js";
import { Op , Sequelize, fn, col} from 'sequelize';
import LevelCriteriaModel from "#Models/LevelCriteriaModel.js";
import RubricCriteriaModel from "#Models/RubricCriteriaModel.js";
import UserXSpecialtyModel from "#Models/UserXSpecialtyModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";
import RoleModel from "#Models/RoleModel.js";
import AssignmentXStudentModel from "#Models/AssignmentXStudentModel.js";
import UserXThesisModel from "#Models/UserXThesisModel.js";
import ThesisModel from "#Models/ThesisModel.js";
import AssignmentModel from "#Models/AssignmentModel.js";
import AssignmentTaskModel from "#Models/AssignmentTaskModel.js";
import AssignmentXRoleModel from "#Models/AssignmentXRoleModel.js";
import RubricModel from "#Models/RubricModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";

//PORTAFOLIO POR CICLO Y CURSO
const listAssignmentXStudentXRevisor = async (req,res) => {
    /*
    Se espera un body como:
    {
        "ciclo": "4",
        "curso": "1"
    }
    */
    // console.log(req.query)
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    if(res.locals.userRole == 5){ // Asesor  
        console.log(req.body)
        const thesis = await UserXThesisModel.findAll({
            attributes: ['id', 'THESISId'],
            where: {
                type: "ASESOR",
                USERId: res.locals.userId
            }
        });
        
        // console.log(thesis.map((e) => e.THESISId));
        const thesisIdList = thesis.map((e) => e.THESISId);


        const aXt = await UserXThesisModel.findAndCountAll({
            attributes: ['id'],
            where: {
                type: "OWNER",
                THESISId: thesisIdList,
            },
            include: [{
                model: UserModel,
                attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'email', 'photo' ],
                where: 
                    Sequelize.where(
                    fn("CONCAT", col("USER.name"), ' ', col("fLastName"),  ' ' , col("mLastName")), 
                        {[Op.like]: '%'+req.query.text+'%',}),
                include: [
                    {
                        model: SpecialtyModel,
                        attributes: [ 'id', 'name' ],
                        through: {
                            attributes: []
                        },
                        // required: true
                    }, 
                    {
                        model: UserXCourseXSemesterModel,
                        where: {
                            COURSEXSEMESTERId: req.body.cxsid,
                        },
                    }
                ]
            },
            {
                model: ThesisModel,
                required: true,
                attributes: ['id', 'title'],
                where:{
                    // [Op.not]: { id: arrId },                
                    status: 'APROBADO',
                    SPECIALTYId: res.locals.userSpecialtyId,
                }, 
            }
        ],
            offset: regStart,
            limit: pageSize,  
        })       

        return res.status(201).send(aXt);
       
    }
    else if(res.locals.userRole == 6){ // Jurado
        const thesis = await UserXThesisModel.findAll({
            attributes: ['id', 'THESISId'],
            where: {
                type: "JURY",
                USERId: res.locals.userId
            }
        });

        const thesisIdList = thesis.map((e) => e.THESISId);
        const aXt = await UserXThesisModel.findAndCountAll({
            attributes: ['id'],
            where: {
                type: "OWNER",
                THESISId: thesisIdList,
            },
            include: [{
                model: UserModel,
                attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'email', 'photo' ],
                where: 
                    Sequelize.where(
                    fn("CONCAT", col("USER.name"), ' ', col("fLastName"),  ' ' , col("mLastName")), 
                        {[Op.like]: '%'+req.query.text+'%',}),
                include: [
                    {
                        model: SpecialtyModel,
                        attributes: [ 'id', 'name' ],
                        through: {
                            attributes: []
                        }}, 
                        {
                            model: UserXCourseXSemesterModel,
                            where: {
                                COURSEXSEMESTERId: req.body.cxsid,
                            },
                        }
                ]
            },
            {
                model: ThesisModel,
                required: true,
                attributes: ['id', 'title'],
                where:{
                    // [Op.not]: { id: arrId },                
                    status: 'APROBADO',
                    SPECIALTYId: res.locals.userSpecialtyId,
                }, 
            }],
            offset: regStart,
            limit: pageSize,  


        })
        return res.status(201).send(aXt);
        // const jurys = await UserXThesisModel.findAndCountAll({
        //     attributes: ['id','type', 'USERId', 'THESISId'],
        //     where: {
        //         'USERId': {
        //             [Op.eq]: res.locals.userId,
        //         },
        //         'type': {
        //             [Op.eq]: "JURY",
        //         },
        //     }, 
        //     include:   
        //     {
        //         model: ThesisModel,
        //         attributes: ["title","theme","description","status","areaName"]
        //     },
        //     subQuery: false,
        //     order: [ ['updatedAt', 'DESC'],
        //              ['createdAt', 'DESC'],
        //     ],
        //     offset: regStart,
        //     limit: pageSize,
        // });
        
        // console.log(JSON.stringify(jurys, null, 2));
        // var idThesis = [... new Set(jurys.rows.map( x=> parseInt(x.dataValues.THESISId)))];
        // const alumnos = await UserXThesisModel.findAll({ 
        //     attributes: ['id','type', 'USERId', 'THESISId'],
        //     where :{
        //         THESISId : {
        //             [Op.in] : idThesis,
        //         },
        //         'type': {
        //             [Op.eq]: "OWNER",
        //         }
        //     },
        //     include: [
        //         {
        //             model: UserModel,
        //             attributes: ["id", "name", "fLastName", "mLastName", "photo"],
        //             where: 
        //                 Sequelize.where(
        //                 fn("CONCAT", col("name"), ' ', col("fLastName"),  ' ' , 
        //                 col("mLastName")),
        //                 {
        //                     [Op.like]: '%'+req.query.text+'%',
        //                 }),
        //             include: [
        //                 {
        //                     model: SpecialtyModel,
        //                     attributes: ['id', 'name'],
        //                     through: { attributes: [] }
        //                 },{
        //                     model: UserXCourseXSemesterModel,
        //                     attributes: ['COURSEXSEMESTERId'],
        //                     include: {
        //                         model: CourseXSemesterModel,
        //                         attributes: [],
        //                         where: {
        //                             'COURSEId':{
        //                                 [Op.eq]: req.body.curso,
        //                             },
        //                             'SEMESTERId':{
        //                                 [Op.eq]: req.body.ciclo,
        //                             }
        //                         }
        //                     }
        //                 }
        //             ]
        //         },       
        //     ]       
        // });
        // console.log(JSON.stringify(alumnos, null, 2));
    
        // const juryXalumno = jurys.rows.map(x => x.dataValues);
        
        // juryXalumno.forEach(x => {
        //     x.alumnos = alumnos.filter(y => y.THESISId == x.THESISId && y.dataValues.USER.USER_X_COURSE_X_SEMESTERs.length>0)
        // }); 
        // console.log("Longitud: " +juryXalumno.length);
        //console.log(JSON.stringify(juryXalumno, null, 2))
    
        // const juryXalumno2 = juryXalumno.filter(x => x.alumnos.length>0);
        // console.log(JSON.stringify(juryXalumno2, null, 2));
        // return res.send(juryXalumno2);
    }
    else if(res.locals.userRole == 4){ // profesor
        const alumnos = await UserXThesisModel.findAndCountAll({ 
            attributes: ['id','type', 'USERId', 'THESISId'],
            where :{
                'type': {
                    [Op.eq]: "OWNER",
                }
            },
            include: [
                {
                    model: ThesisModel,
                    attributes: ["title","theme","description","status","areaName"]
                }     ,
                {
                    model: UserModel,
                    attributes: ["id", "name", "fLastName", "mLastName", "photo"],
                    where: 
                        Sequelize.where(
                        fn("CONCAT", col("name"), ' ', col("fLastName"),  ' ' , 
                        col("mLastName")),
                        {
                            [Op.like]: '%'+req.query.text+'%',
                        }),
                    include: [
                        {
                            model: SpecialtyModel,
                            attributes: ['id', 'name'],
                            through: { attributes: [] }
                        },{
                            model: UserXCourseXSemesterModel,
                            where: {
                                COURSEXSEMESTERId: req.body.cxsid,
                            },
                        }
                    ]
                },       
            ],
            subQuery: false,
            order: [ ['updatedAt', 'DESC'] ,
                ['createdAt', 'DESC'],
            ],
            offset: regStart,
            limit: pageSize,      
        });

        // console.log(JSON.stringify(alumnos, null, 2));
    
        // const profXalumno = alumnos.rows.filter(x => x.dataValues.USER.USER_X_COURSE_X_SEMESTERs.length>0);
    
        return res.send(alumnos);
    }
    
}

const getDetailAssignmentxStudentxRevisor = async (req, res) => {  
    const detailAssigmentRubric = await AssignmentXStudentXRevisorModel.findAll({
        logging: console.log,
        where: {
            'ASSIGNMENTXSTUDENTId' :{   
                [Op.eq]: parseInt(req.params.assignmentStudentId),
            } ,
            'USERId' : { //revisor
                [Op.eq]: parseInt(req.params.revisorId),
            }
        },
        include: [ 
            { 
                model: AssignmentScoreModel,
                include: {
                    model: LevelCriteriaModel,
                    attributes: ["id", "description", "name", "maxScore"],
                    include: {
                        model: RubricCriteriaModel,
                        attributes: ["id", "description", "name"],
                        required: true
                    },
                    required: true,
                }
            },{
                model: UserModel,
                attributes: ['id', 'name', 'fLastName', 'mLastName', 'photo'],
            }
        ]
    });
    
    return res.send(detailAssigmentRubric);
}

//pantalla de la rubrica y correccion del revisor :  recibe el asiggmentxStudentId y AssigmentStudentXRevisorId
const getAssignmentScoreDetailController = async (req, res) => { 
    const scoresDetail = await AssignmentScoreModel.findAll({
        where: {
            'ASSIGNMENTXSTUDENTId': {
                [Op.eq]: parseInt(req.params.axsid),
            },
            'ASSIGNMENTXSTUDENTXREVISORId': {
                [Op.eq]: parseInt(req.params.axsxrid),
            },
        },
        include: [
            {
                model : LevelCriteriaModel,
                attributes: [ 'maxScore', 'description'], //descripcion del criterio

                include:{
                    model: RubricCriteriaModel,
                    attributes: [ 'description'],  //nombre del criterio
                }
            },
        ]

    }); 

    const detailRevisor = await AssignmentXStudentXRevisorModel.findOne({  
        where: {
            'id': {
                [Op.eq]: parseInt(req.params.axsxrid),
            }
        },
        include:[
            {
                model: UserModel,
                attributes: ['id', 'name', 'fLastName', 'mLastName', 'photo'],
                include:[{
                    model: UserXSpecialtyModel,
                    attributes: ['USERId', 'SPECIALTYId'],
                    include:{ model: SpecialtyModel, attributes: ['name']}
                },
                {
                    model: UserXRoleModel,
                    attributes: ['USERId', 'ROLEId'],
                    include:{ model: RoleModel, attributes: ['description']}
                }]
            }, 

        ]
        
    });
    
    return res.send({scoresDetail,detailRevisor});
}

const getAssignmentStudentRevisor = async (req, res) => {  
    const idsaxsxr = await AssignmentXStudentXRevisorModel.findOne({       
        attributes  : ['id'],
        where: {
            ASSIGNMENTXSTUDENTId: req.params.axsid,
            USERId: res.locals.userId
        }
    });
    return res.send(idsaxsxr);
}

const getAssignmentStudentStatus = async (req, res) => {  
    const status = await AssignmentXStudentModel.findByPk(req.params.axsid, {
        attributes  : ['status']
    });
    return res.status(201).send(status);
}

const getAssignmentByCourseSemesterType = async (req, res) => {
    let assignments;
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    
    if(req.params.type == 'TODOS'){
        assignments = await AssignmentModel.findAndCountAll({
            // attributes: [ 'id', 'assignmentName', 'chapterName', 'limitCompleteDate', 'limitCalificationDate', 'type' ,'createdAt'],
            where: { COURSEXSEMESTERId: req.params.idCXS },
            // subQuery: false,
            order: [[ 'createdAt', 'DESC' ]],
            include: [
                {
                model: AssignmentTaskModel
            },
            {
                model: AssignmentXRoleModel,
                include: {
                    model: RoleModel
                }
            }],        
            distinct: true,
            limit: pageSize,
            offset: regStart,
        });
    }else{
        assignments = await AssignmentModel.findAndCountAll({
            // attributes: [ 'id', 'assignmentName', 'chapterName', 'limitCompleteDate', 'limitCalificationDate', 'type' ,'createdAt'],
            where: { 
                COURSEXSEMESTERId: req.params.idCXS,
                type: req.params.type
            },
            // subQuery: false,
            order: [[ 'createdAt', 'DESC' ]],
            include: [
                {
                model: AssignmentTaskModel
            },
            {
                model: AssignmentXRoleModel,
                include: {
                    model: RoleModel
                }
            }],       
            distinct: true,
            limit: pageSize,
            offset: regStart,
        });
    }
    return res.status(201).send(assignments);
}

const deleteAssignment = async (req, res) => {
    console.log(req.query.idAssignment);
    const a = await AssignmentModel.findByPk(req.query.idAssignment);
    if(a) await a.destroy();
    // for(var id of req.query.idAssignment){
    //     console.log("El id es:",id);
    //     const a = await AssignmentModel.findByPk(id);
    //     console.log(a);
    //     if(a) await a.destroy();
    // }
    
    return res.status(201).send(`Eliminados`);
}

const getDetailAssignment = async (req, res) => {  
    
    const a = await AssignmentModel.findByPk(req.params.idAssignment, 
    {
        //attributes: [ 'id', 'assignmentName', 'type', 'chapterName', 'limitCompleteDate', 'limitCalificationDate', 'limitRepositoryUploadDate', 'startDate', 'endDate' ],
        include: [
        {
            model: AssignmentTaskModel,
            attributes: [ 'id', 'name' ]
        },
        {
            model: RoleModel,
            attributes: [ 'description' ],
            through: { attributes: [ 'name' ]}
        },
        {
            model: RubricModel,
            attributes: [ 'id' ]
        }
        ]
    });
    return res.status(201).send(a);
}

const insertAssignment = async (req, res) => {  
    const body = req.body;
    let result = 0;
    let results = [];
    var newRubric = RubricModel.build({
        objective: '',
        annotations: '',
        criteriaQuantity: 0,
        description: '',
    });
    result = await newRubric.save();
    results.push(result);

    // #endregion
    const newA = AssignmentModel.build({
        assignmentName: body.aName,
        chapterName: body.cName,
        startDate: body.sDate,
        endDate: body.eDate,
        maxScore: 20,
        limitCompleteDate: body.cmDate,
        limitCalificationDate: body.clDate,
        limitRepositoryUploadDate: body.rDate,
        type: body.type,
        additionalComments: body.aComments,
        COURSEXSEMESTERId: body.idCXS,
        RUBRICId: newRubric.id,
    });    
    result = await newA.save();
    results.push(result);
    for(var task of body.tasks){
        var newT = AssignmentTaskModel.build({
            name: task,
            ASSIGNMENTId: newA.id
        });
        result = await newT.save();
        results.push(result);
    }
    // #region Roles
    for(var role of body.revisor){
        var newR = AssignmentXRoleModel.build({
            name: 'Revisor',
            ASSIGNMENTId: newA.id,
            ROLEId: role
        });
        result = await newR.save();
        results.push(result);
    }
    for(var role of body.evaluador){
        var newR = AssignmentXRoleModel.build({
            name: 'Evaluador',
            ASSIGNMENTId: newA.id,
            ROLEId: role
        });
        result = await newR.save();
        results.push(result);
    }
    for(var role of body.responsable){
        var newR = AssignmentXRoleModel.build({
            name: 'Responsable',
            ASSIGNMENTId: newA.id,
            ROLEId: role
        });
        result = await newR.save();
        results.push(result);
    }
    
    return res.status(201).send(results);
}

const changeAssignmentXStudentStatus = async (req, res) => {  
    const body = req.body;
    const axs = await AssignmentXStudentModel.findByPk(body.idAXS);
    if(!axs){
        return res.status(404).send({
            errorMessage: `No se encontró el AXS con id: ${body.idAXS}`
        })
    }
    axs.status = body.status;
    await axs.save();
    return res.status(201).send(axs);
}

const getAssignmentRevisors = async (req, res) => {
    const revisors = await AssignmentXStudentXRevisorModel.findAll({
        attributes: [],
        where: {
            ASSIGNMENTXSTUDENTId: req.params.idAXS
        },
        include: {
            model: UserModel,
            attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ],
            include:{
                model: SpecialtyModel,
                attributes: [ 'id', 'name' ],
                through: { attributes: []}
            }
        }
    });
    return res.status(201).send(revisors);
}

const patchAssignment = async(req, res) =>{
    const body = req.body
    let t, u, results = [],
    r = await AssignmentModel.update({
        assignmentName: body.aName,
        chapterName: body.cName,
        type: body.type,
        startDate: body.sDate,
        endDate: body.eDate,
        limitCompleteDate: body.cmDate,
        limitCalificationDate: body.clDate,
        limitRepositoryUploadDate: body.rDate
    }, { where: { id: body.idA }});
    results.push(r);
    r = await AssignmentTaskModel.destroy({
        where:{
            ASSIGNMENTId: body.idA
        }
    });
    results.push(r);
    r = await AssignmentXRoleModel.destroy({
        where:{
            name: 'Evaluador',
            ASSIGNMENTId: body.idA
        }
    });
    results.push(r);
    for(t of body.tasks){
        r = await AssignmentTaskModel.create({
            name: t,
            ASSIGNMENTId: body.idA
        });
        results.push(r);
    }
    for(u of body.responsables){
        r = await AssignmentXRoleModel.create({
            name: 'Evaluador',
            ASSIGNMENTId: body.idA,
            ROLEId: u
        });
        results.push(r);
    }
    return res.status(201).send(results);
}

const getThesisGroupByAsesor = async (req,res) => {
    /*
    Se espera un body como:
    {
        "ciclo": "4",
        "curso": "1"
    }
    */
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    
    const thesis = await ThesisModel.findAndCountAll({
        attributes: ['id', 'title','description','updatedAt'],            
        where:{                
            status: 'APROBADO',
            SPECIALTYId: res.locals.userSpecialtyId,
        },
        include: {
            model: UserModel,
            attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'email', 'photo' ],
            required: true,
            where: 
                Sequelize.where(
                fn("CONCAT", col("name"), ' ', col("fLastName"),  ' ' , 
                col("mLastName")),
                {
                    [Op.like]: '%'+req.query.text+'%',
                }),
            through:{
                model: UserXThesisModel,
                attributes: [],
                where:{
                    type: 'OWNER'
                }                    
            },
            include: [
                {
                    model: UserXSpecialtyModel,
                    attributes: ["SPECIALTYId"],
                    include: {
                        model: SpecialtyModel,
                        attributes: ["name"]
                    }
                },{
                    model: UserXCourseXSemesterModel,
                    required: true,
                    attributes: ['COURSEXSEMESTERId'],
                    include: {
                        model: CourseXSemesterModel,
                        attributes: [],
                        where: {
                            'COURSEId':{
                                [Op.eq]: req.body.curso,
                            },
                            'SEMESTERId':{
                                [Op.eq]: req.body.ciclo,
                            }
                        }
                    }
                },{
                    model: ThesisModel,
                    attributes: ['id'],
                    include: {
                        model: UserXThesisModel,
                        required: true,
                        where: {
                            type: "ASESOR",
                        },
                        include: {
                            model: UserModel,
                        }
                    }
                }
            ]         
        },
        order: [ ['title', 'ASC'] ],
        limit: pageSize,
        offset: regStart
    });
    return res.status(201).send(thesis);
}

export { getDetailAssignmentxStudentxRevisor, getAssignmentScoreDetailController, listAssignmentXStudentXRevisor, getAssignmentStudentRevisor, getAssignmentStudentStatus,
         getAssignmentByCourseSemesterType, deleteAssignment, getDetailAssignment, insertAssignment,
         changeAssignmentXStudentStatus, getAssignmentRevisors, patchAssignment , getThesisGroupByAsesor}