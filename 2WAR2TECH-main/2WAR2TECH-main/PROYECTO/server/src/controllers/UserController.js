import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import RoleModel from "#Models/RoleModel.js";
import SpecialtyModel from "#Models/SpecialtyModel.js";
import TeamModel from "#Models/TeamModel.js";
import ThesisModel from "#Models/ThesisModel.js";
import UserModel from "#Models/UserModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import UserXRoleModel from "#Models/UserXRoleModel.js";
import UserXSpecialtyModel from "#Models/UserXSpecialtyModel.js";
import UserXTeamXThesisModel from "#Models/UserXTeamXThesisModel.js";
import UserXThesisModel from "#Models/UserXThesisModel.js";
import {Sequelize,fn, col, Op, UUIDV4, where} from 'sequelize';
import { hash } from 'bcrypt';
import db from '#Config/db.js';
import XLSX from 'xlsx';
import AssignmentModel from "#Models/AssignmentModel.js";
import AssignmentXStudentModel from "#Models/AssignmentXStudentModel.js";
import AssignmentXRoleModel from "#Models/AssignmentXRoleModel.js";
import AssignmentXStudentXRevisorModel from "#Models/AssignmentXStudentXRevisorModel.js";
import BlockModel from "#Models/BlockModel.js";
import CourseModel from "#Models/CourseModel.js";
import RubricModel from "#Models/RubricModel.js";
import RubricCriteriaModel from "#Models/RubricCriteriaModel.js";
import LevelCriteriaModel from "#Models/LevelCriteriaModel.js";
import AssignmentScoreModel from "#Models/AssignmentScoreModel.js";

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const getUserController = async (req, res) => { //Obtiene un usuario
    const user = await UserModel.findOne({ attributes: 
        ['id', 'name', 'fLastName', 'mLastName'], 
        where: { id: res.locals.userId }, 
        include: [{model: RoleModel, attributes: ['id', 'description'], through: { attributes: [] } },
        {
            model: UserXThesisModel, attributes: ['id'], 
            include: [{
                model: TeamModel,
                required: true
            }]

    }]
    });

    if (!user) {
        return res.status(400).send({
            errorMessage: "Usuario no encontrado"
        });
    }

    return res.status(200).send(user);
}

const getAsesorByStudentController = async (req, res) => { //Obtiene el asesor de un estudiante
    // 3001/user/asesor/idUser/idCxS
    const uxt = await UserXThesisModel.findOne({ where: { USERId: req.params.idUser, type: 'OWNER' }});
    if(!uxt){
        return res.status(404).send({
            errorMessage: `No se encontró la tesis del usuario ${req.params.idUser}`
        });
    }
    const asesor = await UserXThesisModel.findOne({ attributes: ['id'], where: { THESISId: uxt.THESISId, type: 'ASESOR' },
        include: [
            {
                model: UserModel, attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ],
                include: [
                    {
                        model: UserXCourseXSemesterModel,
                        attributes: ['COURSEXSEMESTERId'],
                        include: {
                            model: CourseXSemesterModel,
                            attributes: [],
                            where: {
                                    'id':{
                                        [Op.eq]: req.params.cursoxsemesterid,
                                    }
                                }
                            }
                        },{
                            model: UserXSpecialtyModel,
                            attributes: ["SPECIALTYId"],
                            include: {
                                model: SpecialtyModel,
                                attributes: ["name"]
                            }
                        }
                    ], 
            },                  
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'], ],
      }); 

    if(!asesor){
        return res.send([]);
    } 
    else{
        if(asesor.dataValues.USER.USER_X_COURSE_X_SEMESTERs.length<=0){
            return res.send([]);
        }
        else
            return res.status(201).send(asesor);
    }
}

const postTeamController = async (req, res) => { //Agrega un equipo a una tesis
    /*
    Espera un body tal como:
    {
        "studentIds": [1,2,3],
        "thesisId": 1
    }   
    */
    const {studentIds, thesisId } = req.body;

    const newTeam = TeamModel.build();
    await newTeam.save();

    studentIds.map( async (studId) => {
        const existUser = await UserXThesisModel.findOne({
            where: {
                "USERId": studId,
                "THESISId": thesisId,
                // "type": "STUDENT_APPLICANT"
            }
        }); 

        if(!existUser){
            return res.status(404).send({
                errorMessage: `No se encontró el usuario ${studId}`
            });
        }

        await UserXTeamXThesisModel.create({ USERXTHESISId: existUser.id, TEAMId: newTeam.id });
    })

    return res.status(201).send({newTeam});
}

const getRegisteredStudentController = async  (req, res) => {    
    req.query.page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    // const where =  req.query.text ? 
    //     Sequelize.where(fn("CONCAT", col("name"), ' ', col("fLastName"), ' ', col("mLastName")), { [Op.like]: '%'+req.query.text+'%', }) : 
    //     undefined;

    const Students= await UserXRoleModel.findAll({ attributes:['USERId'], where:{ ROLEId : 3} })
    const StudentsIds = Students.map(x => x.USERId);
    const StudentsConTesis = await UserXCourseXSemesterModel.findAndCountAll({
        // logging: console.log,
        attributes: ['updatedAt','USERId', 'COURSEXSEMESTERId'],
        where: { 
            COURSEXSEMESTERId : req.params.CourseXSemesterId,
            USERId : {[Op.in] : StudentsIds}
        },
        include: [{
                model: UserModel,
                where: 
                Sequelize.where(
                fn("CONCAT", col("USER.name"), ' ', col("fLastName"),  ' ' , 
                col("mLastName")),
                {
                    [Op.like]: '%'+req.query.text+'%',
                }),
                include: [
                    {
                        model: UserXThesisModel,
                        where :{
                            type : 'OWNER'
                        },
                            include : { 
                                model: ThesisModel, 
                            }
                    }, 
                ],
            },
        ], 
        subQuery: false,
        order: [ ['updatedAt', 'DESC']],
        offset: regStart,
        limit: pageSize
    });   

    //anade asesor de cada thesis
   const tesisId= StudentsConTesis.rows.map(x => x.dataValues.USER.USER_X_THEses.map(x=> x.THESISId)); //USER_X_THEses
   const AsesoresThesis = await UserXThesisModel.findAndCountAll({
        attributes : ["THESISId"],
        where:{
            THESISId: { [Op.in] : tesisId},
            type : 'ASESOR'
        },
        include: {
            model: UserModel
        }
   });
   //union de students y sus asesores en un solo objeto
   const studentsConAsesor = StudentsConTesis.rows.map(student => 
        ({ ...student.dataValues,
        asesor: AsesoresThesis.rows.filter(
            x=> student.dataValues.USER.USER_X_THEses.map(y=> y.THESISId)== x.THESISId )}));

    const studentsConTesisId = StudentsConTesis.rows.map(x => x.USERId);
    const idsSinThesis= StudentsIds.filter( x=> ! (studentsConTesisId.includes(x)) );
    const studentsSinThesis = await UserXCourseXSemesterModel.findAndCountAll({
        attributes: ['USERId', 'COURSEXSEMESTERId'],
        where: { 
            COURSEXSEMESTERId : req.params.CourseXSemesterId,
            USERId: {
                     [Op.in] :  idsSinThesis, 
            }
        },
        include: [{
            model: UserModel,
            where: 
            Sequelize.where(
            fn("CONCAT", col("USER.name"), ' ', col("fLastName"),  ' ' , 
            col("mLastName")),
            {
                [Op.like]: '%'+req.query.text+'%',
            }),
        },
        ], 
    })
    const Registeredstudents = {studentsConAsesor, studentsSinThesis};
    const count = studentsConAsesor.length + studentsSinThesis.rows.length ;
    if(studentsConAsesor.length < pageSize ){
    return res.send({Registeredstudents: Registeredstudents, count: count}); 
    }
    else{ return res.send({Registeredstudents: studentsConAsesor, count: count}); }
}

const getListStudentsController = async (req,res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.text = req.query.text ? req.query.text : '';
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    const students = await UserModel.findAndCountAll({
        include:[
            {
                model: UserXRoleModel,
                attributes: [],
                where:{
                    ROLEId: 3
                }
            },
            {
                model: UserXCourseXSemesterModel,
                attributes: [],
                where:{
                    COURSEXSEMESTERId: req.params.CourseXSemesterId,
                }
            },
            {
                model: ThesisModel,
                through:{ 
                    attributes: [],
                    where:{
                        type: 'OWNER'
                    }
                },
                include:{
                    model: UserXThesisModel,
                    attributes: [ 'id' ],
                    where: {
                        type: 'ASESOR'
                    },
                    include: {
                        model: UserModel,
                        
                    }
                }
            }
        ],
        where: 
                    Sequelize.where(
                    fn("CONCAT", col("USER.name"), ' ', col("USER.fLastName"),  ' ' , col("USER.mLastName")), 
                        {[Op.like]: '%'+req.query.text+'%',}),
        subQuery: false,    
        offset: regStart,
        limit: pageSize
    });

    return res.send(students);
}

const getRegisteredAsesorsController = async  (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    req.query.text = req.query.text ? req.query.text : '';
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    let users;
    if(req.params.cursoxsemesterid.toString() != '-1'){
        users = await UserModel.findAndCountAll({
            attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'email', 'photo', 'telephone' ],
            include: [
                {
                    model: UserXRoleModel,
                    attributes: [],
                    where:{
                        ROLEId: 5
                    },
                },
                {
                    model: SpecialtyModel,
                    attributes:[ 'id', 'name' ],
                    through: { attributes: [] },
                    where: {
                        id: res.locals.userSpecialtyId
                    }
                },
                {
                    model: UserXCourseXSemesterModel,
                    attributes: [ 'id', 'status' ],
                    // where:{
                    //     COURSEXSEMESTERId : req.params.cursoxsemesterid,
                    // }
                }
            ],
            where: {
                [Op.or]: [
                    { name:      { [Op.like]: `%${req.query.text}%` }},
                    { fLastName: { [Op.like]: `%${req.query.text}%` }},
                    { mLastName: { [Op.like]: `%${req.query.text}%` }},
                ]
            },
            subQuery: false,
            order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'], ],
            offset: regStart,
            limit: pageSize
        });
    }else{
        users = await UserModel.findAndCountAll({
            attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'email', 'photo', 'telephone' ],
            include: [
                {
                    model: UserXRoleModel,
                    attributes: [],
                    where:{
                        ROLEId: 5
                    },
                },
                {
                    model: SpecialtyModel,
                    attributes:[ 'id', 'name' ],
                    through: { attributes: [] },
                    where: {
                        id: res.locals.userSpecialtyId
                    }
                },
                {
                    model: UserXCourseXSemesterModel,
                    attributes: [ 'id', 'status' ],
                    where:{
                        COURSEXSEMESTERId : req.params.cursoxsemesterid,
                    }
                }
            ],
            where: {
                [Op.or]: [
                    { name:      { [Op.like]: `%${req.query.text}%` }},
                    { fLastName: { [Op.like]: `%${req.query.text}%` }},
                    { mLastName: { [Op.like]: `%${req.query.text}%` }},
                ]
            },
            subQuery: false,
            order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'], ],
            offset: regStart,
            limit: pageSize
        });
    }

    return res.send(users); 
}

const getStudentsAsesorsController = async  (req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;

    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 
    console.log(req.query);

    const datosAsesors = await UserModel.findByPk(req.params.asesorId);
    
    const RegisteredUsers = await UserXThesisModel.findAll({
        // logging: console.log,
        where: { 
            USERId : parseInt(req.params.asesorId),
            type: 'ASESOR'
        },           
    });    



    const idsAsesors =  RegisteredUsers.map(x=> x.THESISId);
    const StudentsAsesor = await UserXThesisModel.findAndCountAll({
        // logging: console.log,
        where: { 
            THESISId :{
                [Op.in]: idsAsesors,
            },
            type: 'OWNER'
        },   
        include:[
            {
                model: UserModel,
                include:[ {
                    model: UserXSpecialtyModel,
                    include : [{model: SpecialtyModel}]
                }]
            },
            {
                model: ThesisModel
            },
        ],
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'], ],  
        offset: regStart,
        limit: pageSize,   
    }); 


    return res.send({datosAsesors, StudentsAsesor}); 
}

const getFreeUsersController = async (req, res) => {
    
    const foundUsers = await UserXCourseXSemesterModel.findAll({
        attributes: ['USERId'],
    });
    let arrId = [], fu;
    for(fu of foundUsers){
        arrId.push(fu.USERId);
    }

    const users = await UserModel.findAll({
        attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'telephone', 'photo', 'email' ],
        where: {
            [Op.not]: {id: arrId}
        },
        include: {
            model: UserXRoleModel,
            attributes: [],
            where: {
                ROLEId: 3
            }
        }
    });

    return res.status(200).send(users);
}

const getUsersNoThesisController = async (req, res) => {

    const ThesisUsers = await UserXThesisModel.findAll({
        attributes: ['USERId'],
        where:{
            [Op.or]: [
                { type: 'OWNER' },
                { type: 'STUDENT_APPLICANT' },
                { type: 'STUDENT_POSTULANT' }
            ]
        }
    });
    let arrId = [], tu;

    for(tu of ThesisUsers){
        arrId.push(tu.USERId);
    }

    const users = await UserModel.findAll({
        attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'telephone', 'photo', 'email' ],
        where: {
            [Op.not]: {id: arrId}
        },
        include: {
            model: UserXRoleModel,
            attributes: [],
            where: {
                ROLEId: 3
            }
        }
    });

    return res.status(200).send(users);
}


const deleteUserController = async (req, res) => {
    /*
    Espera un body tal como:
    {
        "ids": [1,2,3]
    }   
    */
   console.log(req.params);
   if (req.params.idCxS != '-1') {
    // console.log("Hi")
    let result;
    let results = [];
     const ids = req.body.ids;
     for ( var idStudent of ids){
         const existId = await UserModel.findByPk(idStudent);
         await UserXCourseXSemesterModel.destroy({
             where: {USERId: idStudent, COURSEXSEMESTERId: req.params.idCxS},
         });
     }
     return res.status(201).send(results);
   } else {
    let result;
    let results = [];
     const ids = req.body.ids;
     for ( var idStudent of ids){
         const existId = await UserModel.findByPk(idStudent);
        //  await UserXCourseXSemesterModel.destroy({
        //      where: {USERId: idStudent, COURSEXSEMESTERId: req.params.idCxS},
        //  })
         if(existId){
             result =await existId.destroy();  
             results.push(result);
         }  
     }
     return res.status(201).send(results);
   }
   
    
}

const deleteJuryRoleController = async (req, res) => {
    /*
    Espera un body tal como:
    {
        "ids": [1,2,3]
    }   
    */
   let result;
   let results = [];
    const ids = req.body.ids;
    for ( var idUser of ids){
        result = await UserXRoleModel.destroy({
            where: {USERId:idUser, ROLEId: 6  },
        })
        results.push(result);
    }
    return res.status(201).send(results);
    
}

const AddStudentController = async (req, res) => {
     /*
    Espera un body tal como:
    {
        "names": "Eduardo Andre",
        "fLastName":"Rodriguez",
        "mLastName":"Gonzalez",
        "idSpecialty" : "1",
        "codigo": "20185478",
        "email": "20185478@pucp.edu.pe",  
        "password" : "1234"
    }   
    */
    const body = req.body;
    const existUser = await UserModel.findOne({
        where:{
            idPUCP : body.codigo,
        }
    });

    if(existUser){
        return res.status(404).send({
            errorMessage: `El usuario con codigo ${body.codigo} ya se encuentra registrado.`
        });
    }
    const existingUserByEmail = await UserModel.findOne({ where :{email : body.email} });
    if(existingUserByEmail) return res.status(409).send({ errors: ["Ya existe un usuario con ese email asociado"]});


    const hashedPassword = await hash (body.password, 12);
    const newUser = UserModel.build({
        idPUCP: body.codigo,
        name: body.names,
        fLastName: body.fLastName,
        mLastName: body.mLastName,
        email: body.email,
        password: hashedPassword
    });
    await newUser.save();

    const newUserxSpecialty = UserXSpecialtyModel.build({
        USERId : newUser.id,
        SPECIALTYId: body.idSpecialty
    });
    await newUserxSpecialty.save();
    
    const newUserxRol = UserXRoleModel.build({
        USERId : newUser.id,
        ROLEId: 3 //alumno
    });
    await newUserxRol.save();


    return res.status(200).send({newUser,newUserxSpecialty,newUserxRol});
}

const postTestImport = async (req, res) => {
    let team1 = [], uxts = [], t, uxt, users = [], u;
    const u1 = await UserModel.create({
        idPUCP: '20221151',
        name: 'Jeff',
        fLastName: 'Bezos',
        email: 'a20220001@pucp.edu.pe',
        password: '1234'
    });
    users.push(u1);
    const u2 = await UserModel.create({
        idPUCP: '20221152',
        name: 'Bill',
        fLastName: 'Gates',
        email: 'a20220002@pucp.edu.pe',
        password: '1234'
    });
    team1.push(u1);
    team1.push(u2);
    users.push(u2);
    const u3 = await UserModel.create({
        idPUCP: '20221153',
        name: 'Elon',
        fLastName: 'Musk',
        email: 'a20220003@pucp.edu.pe',
        password: '1234'
    });
    users.push(u3);
    const teacher = await UserModel.create({
        idPUCP: '20221154',
        name: 'Todd',
        fLastName: 'Howard',
        email: 'a20220004@pucp.edu.pe',
        password: '1234'
    });
    users.push(teacher);
    const jury = await UserModel.create({
        idPUCP: '20221155',
        name: 'Sean',
        fLastName: 'Murray',
        email: 'a20220005@pucp.edu.pe',
        password: '1234'
    });
    users.push(jury);
    const professor = await UserModel.create({
        idPUCP: '20221156',
        name: 'Masahiro',
        fLastName: 'Sakurai',
        email: 'a20220006@pucp.edu.pe',
        password: '1234'
    });
    users.push(professor);
    const t1 = await ThesisModel.create({
        title: 'TESIS IMPORTAR 1',
        theme: 'TESIS IMPORTAR 1',
        description: 'TESIS IMPORTAR 1',
        status: 'APROBADO',
        areaName: 'SOFTWARE IMPLEMENTACION',
        SPECIALTYId: 13
    });
    const t2 = await ThesisModel.create({
        title: 'TESIS IMPORTAR 2',
        theme: 'TESIS IMPORTAR 2',
        description: 'TESIS IMPORTAR 2',
        status: 'APROBADO',
        areaName: 'SOFTWARE IMPLEMENTACION',
        SPECIALTYId: 13
    });
    for(t of team1){
        uxt = await UserXThesisModel.create({
            type: 'OWNER',
            USERId: t.id,
            THESISId: t1.id
        });
        uxts.push(uxt);
    }
    await UserXThesisModel.create({
        type: 'ASESOR',
        USERId: teacher.id,
        THESISId: t1.id
    })
    await UserXThesisModel.create({
        type: 'JURY',
        USERId: jury.id,
        THESISId: t1.id
    })
    await UserXThesisModel.create({
        type: 'ASESOR',
        USERId: teacher.id,
        THESISId: t2.id
    })
    await UserXThesisModel.create({
        type: 'JURY',
        USERId: jury.id,
        THESISId: t2.id
    })
    uxt = await UserXThesisModel.create({
        type: 'OWNER',
        USERId: u3.id,
        THESISId: t2.id
    });
    const team_1 = await TeamModel.create({
        name: 'EQUIPO 1'
    });
    const team_2 = await TeamModel.create({
        name: 'EQUIPO 2'
    });
    await UserXTeamXThesisModel.create({
        TEAMId: team_2.id,
        USERXTHESISId: uxt.id
    })
    for(uxt of uxts){
        await UserXTeamXThesisModel.create({
            TEAMId: team_1.id,
            USERXTHESISId: uxt.id
        })
    };
    for(u of users){
        await UserXSpecialtyModel.create({
            USERId: u.id,
            SPECIALTYId: 13
        })
    }
    await UserXRoleModel.create({
        USERId: professor.id,
        ROLEId: 4
    })
    await UserXRoleModel.create({
        USERId: teacher.id,
        ROLEId: 5
    })
    await UserXRoleModel.create({
        USERId: jury.id,
        ROLEId: 6
    })
    return res.status(201).send();
}

const deleteImports = async (req, res) => {
    /*
    await UserXCourseXSemesterModel.destroy({
        where: {
            USERId: [97, 98, 99]
        },
        force: true
    });
    */
    await UserXCourseXSemesterModel.update(
        {
            status: null
        },
        {
            where:{
                USERId: [ 7, 8 ]
            }
        }
    );
    await TeamModel.update(
        {
            BLOCKId: null
        },
        {
            where: {
                id: [5]
            }
        }
    );
    await BlockModel.destroy({
        where:{
            USERId: [3]
        },
        force: true
    });
    await AssignmentXStudentModel.destroy({
        where:{
            USERId: [7,8]
        },
        force: true
    });
    return res.status(201).send();
}

const postImportStudentsController = async (req, res) => {
    const worksheet = XLSX.read(req.files[0].buffer);
    let range = XLSX.utils.decode_range(worksheet.Sheets.Sheet1['!ref']);
    range.s.r = 6;
    worksheet.Sheets.Sheet1['!ref'] = XLSX.utils.encode_range(range);
    const obj = XLSX.utils.sheet_to_json(worksheet.Sheets.Sheet1);
    let a, student, scs, results = [], existSCS,
        errors = [], uxs, uxr, hashedPassword;
    
    for(a of obj){
        // console.log(a.Alumno, typeof(a.Alumno))
        student = await UserModel.findOne({
            // logging: console.log,
            attributes: [ 'id' ],
            where:{
                idPUCP: a.Alumno.toString()
            }
        });
        if(!student){
            var email = a["E-mail"];
            hashedPassword = await hash (a.Alumno.toString(), 12);
            student = await UserModel.create({
                idPUCP: a.Alumno,
                name: a.Nombre.split(',')[1].toProperCase(),
                fLastName: a.Nombre.split(',')[0].toProperCase(),
                mLastName: '',
                email: email.split(',')[0],
                password: hashedPassword
            });
            uxs = await UserXSpecialtyModel.create({
                USERId: student.id,
                SPECIALTYId: res.locals.userSpecialtyId
            });
            uxr = await UserXRoleModel.create({
                USERId: student.id,
                ROLEId: 3
            })
            results.push(student);
            results.push(uxs);
            results.push(uxr);
        };
        existSCS = await UserXCourseXSemesterModel.findOne({
            attributes: [ 'id' ],
            where: {
                USERId: student.id,
                COURSEXSEMESTERId: req.body.idCXS
            }
        });
        if(existSCS){
            errors.push(`El alumno ${student.id} ya se encuentra en el horario ${req.body.idCXS}`);
            continue;
        }
        scs = await UserXCourseXSemesterModel.create({
            USERId: student.id,
            COURSEXSEMESTERId: req.body.idCXS
        });
        results.push(scs);
    }
    return res.status(201).send({results, errors});
}

const postGenericUserController = async(req, res) =>{
    const body = req.body;
    const existUser = await UserModel.findOne({
        attributes: [ 'id' ],
        where: {
            idPUCP: body.idPUCP
        }
    });
    if(existUser){
        return res.status(401).send({
            errorMessage: `Ya existe un usuario con código PUCP ${body.idPUCP}`
        });
    }    
    const password = body.idPUCP;
    const hashedPassword = await hash (password, 12);

    const user = await UserModel.create({
        name: body.name,
        fLastName: body.fLastName,
        mLastName: body.mLastName,
        email: body.email,
        idPUCP: body.idPUCP,
        password: hashedPassword
    });
    if(res.locals.userRole == 1){
        await UserXRoleModel.create({
            USERId: user.id,
            ROLEId: 7
        });
        await UserXCourseXSemesterModel.create({
            USERId: user.id,
            COURSEXSEMESTERId: body.idCXS
        })
    }else if(res.locals.userRole == 7){
        let idRole = body.idR ? body.idR : 4
        await UserXRoleModel.create({
            USERId: user.id,
            ROLEId: idRole
        });
        await UserXSpecialtyModel.create({
            USERId: user.id,
            SPECIALTYId: res.locals.userSpecialtyId
        })
    }else if(res.locals.userRole == 4){
        let idRole = body.idR ? body.idR : 6
        await UserXRoleModel.create({
            USERId: user.id,
            ROLEId: idRole
        });
        await UserXSpecialtyModel.create({
            USERId: user.id,
            SPECIALTYId: res.locals.userSpecialtyId
        })
    }
    return res.status(201).send(user);
}

const EditStudentController = async (req, res) => {
    /*
   Espera un body tal como:
   {
       "names": "Eduardo Andre",
       "fLastName":"Rodriguez",
       "mLastName":"Gonzalez",
       "codigo": "20185478",
       "email": "20185478@pucp.edu.pe"
   }   
   */
   const body = req.body;
   const existUser = await UserModel.findOne({
       where:{
           [Op.or]: {
                idPUCP : body.codigo,
                email: body.email,
           }
       }
   });

   if(!existUser){
       return res.status(404).send({
           errorMessage: `El usuario con codigo ${body.codigo} no se encuentra registrado.`
       });
   }

   existUser.name = body.names,
   existUser.fLastName = body.fLastName,
   existUser.mLastName = body.mLastName,
   existUser.idPUCP = body.codigo,
   existUser.email = body.email,
   await existUser.save();

   return res.status(200).send(existUser);
}

const AddTeacherScheduleController = async(req, res) =>{
/*
    {
        "profesorId" : 102,
        "courseXsemesterId" : 37
    }
*/ 
    const body = req.body;
    const existCoursexSemester = await CourseXSemesterModel.findByPk(body.courseXsemesterId );
    if(!existCoursexSemester){
        return res.status(404).send({
            errorMessage: `No existe el coursexsemestre ${body.courseXsemesterId}.`
        });
    }
    const uxcxs = await UserXCourseXSemesterModel.create({
        USERId : body.profesorId,
        COURSEXSEMESTERId : body.courseXsemesterId
    });

    return res.status(201).send(uxcxs);
}

const DeleteTeacherScheduleController = async(req, res) =>{
    
    console.log(req.query.idHorarios, req.query.idTeacher);
    const a = await UserXCourseXSemesterModel.destroy({
        where:{
            COURSEXSEMESTERId :{
                [Op.in] : req.query.idHorarios
            },
            USERId :  req.query.idTeacher
        }
    });
    return res.status(201).send(`Eliminados: `);
}

const postSetAssignments = async(req, res) => {
    let ucs, axs, j, t, b, blocks = [], teams = [], tm, found = false, team, uxt, counter = 0,
        jury, asesor, a, e, axsxr, results = [], errors = [], i = 0, s, rc, existUXCXS, newUXCXS, asc;
    const students = await UserModel.findAll({
        attributes: ['id'],
        include:[
            {
                model: UserXRoleModel,
                attributes: [],
                where: {
                    ROLEId: 3
                }
            },
            {
                model: UserXCourseXSemesterModel,
                attributes: [],
                where:{
                    COURSEXSEMESTERId: req.body.idCXS,
                    status: null
                }
            }
        ]
    });
    // console.log(students);
    const teachers = await UserModel.findAll({
        attributes: ['id'],
        include:[
            {
                model: UserXSpecialtyModel,
                attributes: [],
                where:{
                    SPECIALTYId: res.locals.userSpecialtyId
                }
            },
            {
                model: UserXRoleModel,
                attributes: [],
                where:{
                    ROLEId: 4
                }
            }
        ]
    });
    if(!teachers){
        return res.status(404).send({
            errorMessage: `No hay profesores en la especialidad`
        });
    }
    for(s of students){
        uxt = await UserXThesisModel.findOne({
            attributes: ['id'],
            where:{
                USERId: s.id
            }
        });
        if(!uxt) continue;
        team = await UserXTeamXThesisModel.findOne({
            attributes: ['TEAMId'],
            where:{
                USERXTHESISId: uxt.id
            }
        });
        if(!team) continue;
        for(t of teams){
            if(t.idT == team.TEAMId){
                t.members.push(s.id);
                found = true;
                break;
            }
        }
        if(!found){
            teams.push({
                idT: team.TEAMId,
                members: [s.id]
            });
        }else{
            found = false;
        }   
    }
    const blockSize = Math.ceil(teams.length, teachers.length);
    for(t of teachers){
        b = await BlockModel.create({
            COURSEXSEMESTERId: req.body.idCXS,
            USERId: t.id
        });
        blocks.push(b);
    }
    for(tm of teams){
        await TeamModel.update({
            BLOCKId: blocks[i].id
        },
        {
            where:{
                id: tm.idT
            }
        });
        counter++;
        if(counter == blockSize){
            counter = 0;
            i++;
        }
    }
    const assignments = await AssignmentModel.findAll({ 
        attributes: ['id'], 
        where: {
            COURSEXSEMESTERId: req.body.idCXS
        },
        include: [
            {
                model: AssignmentXRoleModel,
                attributes: ['ROLEId'],
                where: {
                    name: 'Evaluador'
                }
            },
            {
                model: RubricModel,
                attributes: [ 'id' ],
                include: {
                    model: RubricCriteriaModel,
                    attributes: [ 'id' ],
                    include: {
                        model: LevelCriteriaModel,
                        attributes: [ 'id' ]
                    }
                }
            }
        ]
    });
    for(s of students){
        uxt = await UserXThesisModel.findOne({
            attributes: ['id', 'THESISId'],
            where:{
                USERId: s.id
            }
        });
        if(!uxt){
            errors.push(`El usuario ${s.id} no tiene un USER_X_THESIS`);
            continue;
        }
        team = await UserXTeamXThesisModel.findOne({
            attributes: ['TEAMId'],
            where:{
                USERXTHESISId: uxt.id
            }
        });
        if(!team){
            errors.push(`El usuario ${s.id} no se encuentra en un equipoS`);
            continue;
        }
        asesor = await UserModel.findOne({
            attributes: ['id'],
            include:{
                model: UserXThesisModel,
                attributes: [],
                where: {
                    type: 'ASESOR',
                    THESISId: uxt.THESISId
                }
            }
        });
        if(!asesor){
            errors.push(`El usuario ${s.id} no se tiene un asesor`);
            continue;
        }
        existUXCXS = await UserXCourseXSemesterModel.findOne({
            attributes: [ 'id' ],
            where: {
                COURSEXSEMESTERId: req.body.idCXS,
                USERId: asesor.id
            }
        });
        if(!existUXCXS){
            newUXCXS = await UserXCourseXSemesterModel.create({
                COURSEXSEMESTERId: req.body.idCXS,
                USERId: asesor.id,
                status: 'H'
            })
        }
        jury = await UserModel.findAll({
            attributes: ['id'],
            include:{
                model: UserXThesisModel,
                attributes: [],
                where: {
                    type: 'JURY',
                    THESISId: uxt.THESISId
                }
            }
        });
        for(j of jury){
            existUXCXS = await UserXCourseXSemesterModel.findOne({
                attributes: [ 'id' ],
                where: {
                    COURSEXSEMESTERId: req.body.idCXS,
                    USERId: j.id
                }
            });
            if(!existUXCXS){
                newUXCXS = await UserXCourseXSemesterModel.create({
                    COURSEXSEMESTERId: req.body.idCXS,
                    USERId: j.id
                })
            }
        }
        for(a of assignments){
            axs = await AssignmentXStudentModel.create({
                USERId: s.id,
                ASSIGNMENTId: a.id,
                status: 'Asignado'
            });
            results.push(axs);
            if(!a.ASSIGNMENT_X_ROLEs){
                errors.push(`El assignment ${a.id} no tiene roles asignados para ser evaluadores`);
                continue;
            }
            for(e of a.ASSIGNMENT_X_ROLEs){
                if(e.ROLEId == 5){ //ASESOR
                    axsxr = await AssignmentXStudentXRevisorModel.create({
                        ASSIGNMENTXSTUDENTId: axs.id,
                        USERId: asesor.id
                    });
                    if(!a.RUBRIC){
                        errors.push(`El assignment ${a.id} no tiene rubrica`);
                        continue;
                    }else if(!a.RUBRIC.RUBRIC_CRITERIA){
                        errors.push(`El assignment ${a.id} no tiene criterios en su rubrica`);
                        continue;
                    }
                    for(rc of a.RUBRIC.RUBRIC_CRITERIA){
                        if(rc.LEVEL_CRITERIA.length == 0){
                            errors.push(`El criterio ${rc.id} no tiene niveles`);
                            continue;
                        }
                        // console.log(rc);
                        asc = await AssignmentScoreModel.create({
                            ASSIGNMENTXSTUDENTId: axs.id,
                            ASSIGNMENTXSTUDENTXREVISORId: axsxr.id,
                            LEVELCRITERIumId: rc.LEVEL_CRITERIA[0].id
                        });
                    }
                }else if(e.ROLEId == 6){ //JURADO
                    for(j of jury){
                        axsxr = await AssignmentXStudentXRevisorModel.create({
                            ASSIGNMENTXSTUDENTId: axs.id,
                            USERId: j.id
                        });
                        for(rc of a.RUBRIC.RUBRIC_CRITERIA){
                            if(rc.LEVEL_CRITERIA.length == 0){
                                errors.push(`El criterio ${rc.id} no tiene niveles`);
                                continue;
                            }
                            asc = await AssignmentScoreModel.create({
                                ASSIGNMENTXSTUDENTId: axs.id,
                                ASSIGNMENTXSTUDENTXREVISORId: axsxr.id,
                                LEVELCRITERIumId: rc.LEVEL_CRITERIA[0].id
                            });
                        }
                    }
                }else if(e.ROLEId == 4){ //PROFESOR
                    for(t of teachers){
                        axsxr = await AssignmentXStudentXRevisorModel.create({
                            ASSIGNMENTXSTUDENTId: axs.id,
                            USERId: t.id
                        });
                        for(rc of a.RUBRIC.RUBRIC_CRITERIA){
                            if(rc.LEVEL_CRITERIA.length == 0){
                                errors.push(`El criterio ${rc.id} no tiene niveles`);
                                continue;
                            }
                            asc = await AssignmentScoreModel.create({
                                ASSIGNMENTXSTUDENTId: axs.id,
                                ASSIGNMENTXSTUDENTXREVISORId: axsxr.id,
                                LEVELCRITERIumId: rc.LEVEL_CRITERIA[0].id
                            });
                        }
                    }
                }
                results.push(axsxr);
            }
        }
        ucs = await UserXCourseXSemesterModel.update(
            {
                status: 'A'
            },
            {
                where:{
                    USERId: s.id,
                    COURSEXSEMESTERId: req.body.idCXS
                }
            }
        );
        results.push(ucs);
            
    }
    return res.status(201).send({ results, errors });
}

const getListAsesorsBySpecialty = async(req, res) => {
    req.query.page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;
    const text = req.query.text ? req.query.text : '';

    const asesors = await UserModel.findAndCountAll({
        attributes: [ 'id', 'idPUCP', 'name', 'fLastName', 'mLastName', 'email', 'photo' ],
        where:{
            [Op.or]: [
                { name: { [Op.like]: '%' + text + '%' }},
                { fLastName: { [Op.like]: '%' + text + '%' }},
                { mLastName: { [Op.like]: '%' + text + '%' }}
            ],
        },
        include:[
            {
                model: UserXSpecialtyModel,
                attributes: [],
                where: {
                    SPECIALTYId: res.locals.userSpecialtyId
                }
            },
            {
                model: UserXRoleModel,
                attributes: [],
                where:{
                    ROLEId: 5
                }
            }
        ],
        limit: pageSize,
        offset: regStart
    })

    return res.status(201).send(asesors);
}

const getSchedulesUserController = async (req, res) => {

    // console.log(res.locals.userId);
    const cxs = await CourseXSemesterModel.findAll({
        where:{
            SEMESTERId : req.params.semesterId,
        },
        include :[{
            model : UserXCourseXSemesterModel,
            required: true,
            //attributes: [],
            where:{
                USERId: res.locals.userId,
            },
            

        }, {
            model: CourseModel
        }]
    });
    

    return res.status(200).send(cxs);
}


const getListJurys = async (req,res) => {
    req.query.page = req.query.page ? req.query.page : 1; 
    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize;
    
    const jurados = await UserModel.findAndCountAll({
        attributes: [ 'id', 'idPUCP', 'name','fLastName','mLastName','photo', 'email' ],
        include: [
            {
                model: UserXRoleModel,
                attributes: [],
                where: {
                    ROLEId: 6,
                }
            },
            {
                model: UserXSpecialtyModel,
                attributes: [],
                where: {
                    SPECIALTYId: res.locals.userSpecialtyId,
                }
            },
            {
                model: CourseXSemesterModel,
                attributes: [ 'id', 'name', 'abbreviation' ],
                through: { attributes: [] }
            }
        ],
        offset: regStart,
        limit: pageSize,
    })

    return res.status(201).send(jurados);
}

const deleteJuryController = async(req, res) => {
    const existJury = await UserModel.findByPk(req.params.idJury);
    if(!existJury){
        return res.status(404).send({
            errorMessage: `No se encontró el jurado ${req.params.idJury}.`
        });
    }

    await existJury.destroy();

    const uXcXs = await UserXCourseXSemesterModel.findAll({
        where: {
            USERId: req.params.idJury,
        }
    });
    uXcXs.forEach(x => x.destroy());

    return res.status(200).send("Borrado exitoso.");
}


const EditEmailController = async (req, res) => {
    /*
   Espera un body tal como:
   {
       "email": "20185478@pucp.edu.pe"
   }   
   */
   const body = req.body;
   const User = await UserModel.findByPk(  res.locals.userId );
   User.email = body.email,
   await User.save();

   return res.status(200).send(User);
}

const EditPasswordController = async (req, res) => {
    /*
   Espera un body tal como:
   {
       "password": "54521"
   }   
   */
   const body = req.body;
   const hashedPassword = await hash (body.password, 12);
   const User = await UserModel.findByPk(  res.locals.userId );
   User.password = hashedPassword,
   await User.save();

   return res.status(200).send(User);
}

const patchUserPhoto = async (req, res) => {
    const file = req.files[0];

    if(file.size >= 2097152){
        return res.status(401).send({
            errorMessage: "El archivo debe pesar menos de 2 MiB"
        });
    }
    
    const user = UserModel.update({ photo: req.files[0].buffer },{
        where: {
            id: res.locals.userId
        }
    })
    return res.status(201).send(user);
}



export { getUserController, getAsesorByStudentController,getRegisteredStudentController ,getRegisteredAsesorsController,
         getStudentsAsesorsController,deleteUserController, postTeamController, getFreeUsersController,AddStudentController,
         postImportStudentsController, postGenericUserController, postTestImport , EditStudentController, deleteImports,
         AddTeacherScheduleController, DeleteTeacherScheduleController , getListStudentsController, postSetAssignments,
         getUsersNoThesisController, getListAsesorsBySpecialty,deleteJuryRoleController, getSchedulesUserController ,
         getListJurys , deleteJuryController, EditEmailController, EditPasswordController, patchUserPhoto };
 