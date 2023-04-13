import AssignmentModel from '#Models/AssignmentModel.js';
import AssignmentScoreModel from '#Models/AssignmentScoreModel.js';
import AssignmentXStudentModel from '#Models/AssignmentXStudentModel.js';
import AssignmentXStudentXRevisorModel from '#Models/AssignmentXStudentXRevisorModel.js';
import LevelCriteriaModel from '#Models/LevelCriteriaModel.js';
import RoleModel from '#Models/RoleModel.js';
import UserModel from '#Models/UserModel.js';
import UserXRoleModel from '#Models/UserXRoleModel.js';
import { and, Op } from 'sequelize';

//agregar las notas a los apartados de la rúbrica
const editQualifyAssignmentScoreController = async (req, res) => {
    /*
    Espera un body tal como:
    {
        "rubricas": [
            {"id": "12","obtainedScore": "1","notes": "Algun comentario X"},
            {"id": "13", "obtainedScore": "2","notes": "Otro comentario X"}
        ]         
    }  
    */
    const qualification = req.body;
    console.log(req.body);

    const existASR = await AssignmentXStudentXRevisorModel.findByPk(req.params.assignmentStudentRevisorid);
    if(!existASR){
        return res.status(404).send({
            errorMessage: `No se encontró la asignación ${req.params.assignmentStudentRevisorid} vinculada a dicho alumno y asesor`
        });
    }

    const existAS = await AssignmentXStudentModel.findByPk(req.params.assignmentStudentid);
    if(!existAS){
        return res.status(404).send({
            errorMessage: `No se encontró la asignacion ${req.params.assignmentStudentid} vinculada a dicho alumno`
        });
    }

    var i=0;
    while(qualification.rubricas[i]){
        const existAssignmentScore = await AssignmentScoreModel.findByPk(qualification.rubricas[i].id, {
            include: {
                model: LevelCriteriaModel,
            }
        });

        if(!existAssignmentScore){
            return res.status(404).send({
                errorMessage: `No se encontró la asignación de rúbrica ${qualification.rubricas[i].id}`
            }); 
        }    

        if(qualification.rubricas[i].obtainedScore > existAssignmentScore.LEVEL_CRITERIum.maxScore){
            return res.status(404).send({
                errorMessage: `El puntaje obtenido no puede ser mayor a ${existAssignmentScore.LEVEL_CRITERIum.maxScore}`
            }); 
        }
        else{
            if(existAssignmentScore.ASSIGNMENTXSTUDENTId == req.params.assignmentStudentid &&
                existAssignmentScore.ASSIGNMENTXSTUDENTXREVISORId == req.params.assignmentStudentRevisorid){
                    const notaPrevia = existAssignmentScore.obtainedScore ? existAssignmentScore.obtainedScore: 0;
                    const nota = parseInt(qualification.rubricas[i].obtainedScore);
                    existASR.grade = existASR.grade ? existASR.grade : 0;
                    existASR.grade -= notaPrevia;
                    existASR.grade += nota;
                    existASR.feedbackDate = Date.now();

                    console.log("Assignment: " + JSON.stringify(existASR, null, 2));
                    await existASR.save();

                    existAssignmentScore.obtainedScore = qualification.rubricas[i].obtainedScore;
                    existAssignmentScore.notes = qualification.rubricas[i].notes;
                    await existAssignmentScore.save();
                }
        }
        i++;
    }

    existAS.status = "Calificado";
    await existAS.save();
    const assignment = await AssignmentModel.findByPk(existAS.ASSIGNMENTId);
    //calculo de nota en assignment
    const existASR1 = await AssignmentXStudentXRevisorModel.findAll({
        include:{
            model: UserModel,
            include: {
                model: UserXRoleModel
            }
        },
        where:{ 
            ASSIGNMENTXSTUDENTID: req.params.assignmentStudentid,
            grade: { [Op.ne]: null }
        }
    });
    if(!existASR1){
        return res.status(404).send({
            errorMessage: `No se encontró la asignación ${req.params.assignmentStudentid} vinculada a dicho alumno `
        });
    }
    console.log(existASR1);
    var suma = 0;
    let weight, promedio;
    if(assignment.type == 'EXPOSITION'){
        for(var e of existASR1){
            switch (e.USER.USER_X_ROLEs[0].ROLEId){
                case 5: weight = 0.2; break;
                case 6: weight = 0.4; break;
                default: weight = 0
            }
            suma += weight * e.grade;
        }
        promedio = suma;
    }else{
        for(var e of existASR1){
            suma += e.grade;
        }
        promedio = Math.round(suma/existASR1.length);
    }
    existAS.score = promedio;
    await existAS.save();
    console.log(existAS);
    return res.status(200).send({});
}

const getAssignmentScoreDetailController = async (req, res) => {
    const scoreDetail = await AssignmentScoreModel.findOne({
        where: {
            'ASSIGNMENTXSTUDENTId': {
                [Op.eq]: parseInt(req.params.axsid),
            },
            'ASSIGNMENTXSTUDENTXREVISORId': {
                [Op.eq]: parseInt(req.params.axsxrid),
            },
        },
    });
    
    return res.send(scoreDetail);
}


export { editQualifyAssignmentScoreController, getAssignmentScoreDetailController }