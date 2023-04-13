import AssignmentModel from '#Models/AssignmentModel.js';
import AssignmentXStudentModel from '#Models/AssignmentXStudentModel.js';
import CalificationModel from '#Models/CalificationModel.js';
import CalificationXAssignmentModel from '#Models/CalificationXAssignment.js';
import CourseXSemesterModel from '#Models/CourseXSemesterModel.js';
import UserModel from '#Models/UserModel.js';
import UserXCourseXSemesterModel from '#Models/UserXCourseXSemesterModel.js';
import UserXRoleModel from '#Models/UserXRoleModel.js';

const getReportController = async  (req, res) => { 
    const cXs = await CourseXSemesterModel.findByPk(req.params.idCxS)
    if(!cXs){
        return res.status(400).send(`No se encontró el horario ${req.params.idCxS}.`);
    }

    const alumnos = await UserModel.findAll({
        attributes: ['id','idPUCP', 'name', 'fLastName', 'mLastName'],
        include: [
            {
                model: UserXRoleModel,
                attributes: [],
                where: {
                    ROLEId: 3,
                }
            },
            {
                model: UserXCourseXSemesterModel,
                attributes: [],
                where: {
                    COURSEXSEMESTERId: cXs.id,
                }
            }
        ]        
    })
    const length = alumnos.length;

    const proms = await CalificationModel.findAll({
        attributes: ['id','name','weight'],
        where: {
            COURSEXSEMESTERId: cXs.id,
        }
    });
    var sumaPesos = 0;
    for(var p of proms){
        sumaPesos+=p.weight;
    } 

    var i = 0;
    var cantAprobados = 0;
    var cantDesaprobados = 0;
    while(1){
        if(i>=length) break;
        var sumaPF = 0;
        var estado;
        var promedios=[];
        for(var p of proms){
            const s = await CalificationXAssignmentModel.findAll({
                attributes: ['weight'],
                where: {
                    CALIFICATIONId: p.dataValues.id,
                },
                include: {
                    model: AssignmentModel,
                    required: true,
                    attributes: ['id','chapterName'],
                    include: {
                        model: AssignmentXStudentModel,
                        attributes: ['score'],
                        where: {
                            USERId: alumnos[i].id,
                        }
                    }
                }
            })
            var j=0;
            const length2 = s.length;
            var sumaDiv = 0;
            var suma = 0;
            var prom = 0;
            while(1){
                if(j>=length2){
                    prom = (suma/sumaDiv).toFixed(2);
                    break;
                }
                if(s[j].ASSIGNMENT){                 
                    suma += s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].score*s[j].weight;
                    sumaDiv += s[j].weight;  
                    s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].setDataValue("ASSIGNMENTId", s[j].ASSIGNMENT.id);
                    s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].setDataValue("chapterName", s[j].ASSIGNMENT.chapterName);
                    const aux = s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].dataValues;
                    s[j].setDataValue("ASSIGNMENT",aux);
                }
                j++;
            }
            if(length2 == 0) prom = 0;
            const titulo = p.name;
            promedios.push([{titulo: titulo},{prom: prom},{s:s}]);
            sumaPF+=prom*p.weight;
        }        
        alumnos[i].setDataValue("PROMEDIOS",promedios);
        var promFinal = Math.round(sumaPF/sumaPesos);      
        if(!promFinal) promFinal = 0;
        if(promFinal >= 11){
            estado = "APROBADO";
            cantAprobados++;
        }
        else{
            estado = "DESAPROBADO";
            cantDesaprobados++;
        }   
        const tituloFinal = "Prom Final"
        const tituloEstado = "Estado"
        alumnos[i].setDataValue("PF",{tituloFinal,promFinal,tituloEstado,estado});       
        i++;         
    }    
    
    const frecuencia = alumnos.reduce((a,d) => (a[d.dataValues.PF.promFinal] ? a[d.dataValues.PF.promFinal] += 1 : a[d.dataValues.PF.promFinal] = 1, a), {});
    
    return res.send({alumnos,cantAprobados,cantDesaprobados,frecuencia});
}

const getReportUserController = async  (req, res) => { 
    const cXs = await CourseXSemesterModel.findByPk(req.params.idCxS)
    if(!cXs){
        return res.status(400).send(`No se encontró el horario ${req.params.idCxS}.`);
    }

    const alumno = await UserModel.findByPk(req.params.idUser,
        {
            attributes: ['id','idPUCP', 'name', 'fLastName', 'mLastName'],
        }
    )

    const proms = await CalificationModel.findAll({
        attributes: ['id','name','weight'],
        where: {
            COURSEXSEMESTERId: cXs.id,
        }
    });
    var sumaPesos = 0;
    for(var p of proms){
        sumaPesos+=p.weight;
    } 

    var sumaPF = 0;
    var estado;
    var promedios=[];
    for(var p of proms){
        const s = await CalificationXAssignmentModel.findAll({
            attributes: ['weight'],
            where: {
                CALIFICATIONId: p.dataValues.id,
            },
            include: {
                model: AssignmentModel,
                attributes: ['id','chapterName'],
                include: {
                    model: AssignmentXStudentModel,
                    attributes: ['score'],
                    where: {
                        USERId: alumno.id,
                    }
                }
            }    
        })
        var j=0;
        const length2 = s.length;
        var sumaDiv = 0;
        var suma = 0;
        var prom = 0;
        while(1){
            if(j>=length2){
                prom = (suma/sumaDiv).toFixed(2);
                break;
            }
            if(s[j].ASSIGNMENT){                 
                suma += s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].score*s[j].weight;
                sumaDiv += s[j].weight;  
                s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].setDataValue("ASSIGNMENTId", s[j].ASSIGNMENT.id);
                s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].setDataValue("chapterName", s[j].ASSIGNMENT.chapterName);
                const aux = s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].dataValues;
                s[j].setDataValue("ASSIGNMENT",aux);
            }
            j++;
        }
        if(length2 == 0) prom = 0;
        const titulo = p.name;
        promedios.push([{titulo: titulo},{prom: prom},{s:s}]);
        sumaPF+=prom*p.weight;
    }        
    alumno.setDataValue("PROMEDIOS",promedios);
    var promFinal = Math.round(sumaPF/sumaPesos);      
    if(!promFinal) promFinal = 0;
    if(promFinal >= 11){
        estado = "APROBADO";
    }
    else{
        estado = "DESAPROBADO";
    }
    const tituloFinal = "Prom Final"
    const tituloEstado = "Estado"
    alumno.setDataValue("PF",{tituloFinal,promFinal,tituloEstado,estado}); 

    return res.send({alumno});
}

const getAllCalReportUserController = async (req, res) => {
    const cXs = await CourseXSemesterModel.findByPk(req.params.idCxS)
    if(!cXs){
        return res.status(400).send(`No se encontró el horario ${req.params.idCxS}.`);
    }   

    const alumno = await UserModel.findByPk(req.params.idUser,
        {
            attributes: ['id','idPUCP', 'name', 'fLastName', 'mLastName'],
        }
    )

    const notasAdvance = await AssignmentModel.findAll({
        attributes: ['assignmentName','chapterName'],
        where: {
            type: 'ADVANCE',
            COURSEXSEMESTERId: cXs.id,
        },
        include: {
            model: AssignmentXStudentModel,
            attributes: ['score'],
            where: {
                USERId: req.params.idUser,
            }
        }
    });    
    alumno.setDataValue("Notas de advance",notasAdvance);

    const notasPartial = await AssignmentModel.findAll({
        attributes: ['assignmentName','chapterName'],
        where: {
            type: 'PARTIAL ASSIGN',
            COURSEXSEMESTERId: cXs.id,
        },
        include: {
            model: AssignmentXStudentModel,
            attributes: ['score'],
            where: {
                USERId: req.params.idUser,
            }
        }
    }); 
    alumno.setDataValue("Notas parciales",notasPartial);

    const notasFinal= await AssignmentModel.findAll({
        attributes: ['assignmentName','chapterName'],
        where: {
            type: 'FINAL ASSIGN',
            COURSEXSEMESTERId: cXs.id,
        },
        include: {
            model: AssignmentXStudentModel,
            attributes: ['score'],
            where: {
                USERId: req.params.idUser,
            }
        }
    }); 
    alumno.setDataValue("Notas finales",notasFinal);

    const notasExpo = await AssignmentModel.findAll({
        attributes: ['assignmentName','chapterName'],
        where: {
            type: 'EXPOSITION',
            COURSEXSEMESTERId: cXs.id,
        },
        include: {
            model: AssignmentXStudentModel,
            attributes: ['score'],
            where: {
                USERId: req.params.idUser,
            }
        }
    });
    alumno.setDataValue("Notas de exposiciones",notasExpo);   

    const proms = await CalificationModel.findAll({
        attributes: ['id','name','weight'],
        where: {
            COURSEXSEMESTERId: cXs.id,
        }
    });
    var sumaPesos = 0;
    for(var p of proms){
        sumaPesos+=p.weight;
    } 

    var sumaPF = 0;
    var estado;
    var promedios = [];
    for(var p of proms){
        const s = await CalificationXAssignmentModel.findAll({
            attributes: ['weight'],
            where: {
                CALIFICATIONId: p.dataValues.id,
            },
            include: {
                model: AssignmentModel,
                attributes: ['id','chapterName'],
                include: {
                    model: AssignmentXStudentModel,
                    attributes: ['score'],
                    where: {
                        USERId: alumno.id,
                    }
                }
            }    
        })
        var j=0;
        const length2 = s.length;
        var sumaDiv = 0;
        var suma = 0;
        var prom = 0;
        while(1){
            if(j>=length2){
                prom = (suma/sumaDiv).toFixed(2);
                break;
            }
            if(s[j].ASSIGNMENT){                 
                suma += s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].score*s[j].weight;
                sumaDiv += s[j].weight;  
                s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].setDataValue("ASSIGNMENTId", s[j].ASSIGNMENT.id);
                s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].setDataValue("chapterName", s[j].ASSIGNMENT.chapterName);
                const aux = s[j].ASSIGNMENT.ASSIGNMENT_X_STUDENTs[0].dataValues;
                s[j].setDataValue("ASSIGNMENT",aux);
            }
            j++;
        }
        if(length2 == 0) prom = 0;
        const titulo = p.name;
        promedios.push([{titulo: titulo},{prom: prom},{s:s}]);
        sumaPF+=prom*p.weight;
    }        
    alumno.setDataValue("PROMEDIOS",promedios);
    var promFinal = Math.round(sumaPF/sumaPesos);      
    if(!promFinal) promFinal = 0;
    if(promFinal >= 11){
        estado = "APROBADO";
    }
    else{
        estado = "DESAPROBADO";
    }
    const tituloFinal = "Prom Final"
    const tituloEstado = "Estado"
    alumno.setDataValue("PF",{tituloFinal,promFinal,tituloEstado,estado}); 

    return res.send({alumno});
}

export { getReportController , getReportUserController , getAllCalReportUserController}