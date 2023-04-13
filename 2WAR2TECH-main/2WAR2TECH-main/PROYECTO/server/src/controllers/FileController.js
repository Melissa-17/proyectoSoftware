import FileModel from '#Models/FileModel.js';
import AWS from 'aws-sdk';
import { config } from 'dotenv';
import AssignmentXStudentXRevisorModel from '#Models/AssignmentXStudentXRevisorModel.js';
import AssignmentXStudentModel from '#Models/AssignmentXStudentModel.js';
import { Op } from 'sequelize';
import contentDisposition from 'content-disposition';

const removeAccents = (str) => {
    // return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

const getAllFileController = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/file/all/:idAXS
    const obj = req.params;
    if(!(obj.idAXS > 0 || obj.idAXSXR > 0)){
        return res.status(401).send({
            errorMessage: 'Se necesita al menos una id de AXS o AXSXR'
        })
    }
    let filesR = [];
    let listR = [];
    const axsxr = await AssignmentXStudentXRevisorModel.findAll({ where: {ASSIGNMENTXSTUDENTId: obj.idAXS}});
    const filesS = await FileModel.findAll({ where: { ASSIGNMENTXSTUDENTId: obj.idAXS }});
    for (var a of axsxr){
        filesR.push(await FileModel.findAll({ where: { ASSIGNMENTXSTUDENTXREVISORId: a.id }}));
    }
    for(var array of filesR){
        listR = listR.concat(array);
    }
    return res.status(201).send({filesS, listR});
}

const getOneFileController = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/file/one/:key
    //key tiene que ser: "{idFile}-{filename}"
    const obj = req.params;
    const s3 = new AWS.S3();
    const file = await s3.getObject({
        Bucket: process.env.S3_BUCKET,
        Key: `assignment/${obj.key}`
    }).promise();
    return res.status(201).send(file.Body);
}

const getFileThesisController = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/file/thesis/:idThesis
    const obj = req.params;
    const files = await FileModel.findAll({ where: { ASSIGNMENTXSTUDENTId: obj.idThesis }});
    return res.status(201).send({ files });
}


const postFileController = async (req, res) => {
    //ESPERA UN ARCHIVO DENTRO DE 'file'
    //Espera un body como:
    //{
    //    "idUser": 1,
    //    "idAXS": 1 (nulificable)
    //    "idAXSXR": 1 (nulificable)
    //    "idThesis": 1 (nulificable)
    //    "files": [archivos]
    //}
    //Almenos AXS o AXSXR tiene que ser no nulo, no enviar el que se quiera nulo
    const s3 = new AWS.S3();
    const files = req.files;
    const body = req.body;
    let results = [];
    if(!files){
        return res.status(401).send({
            errorMessage: 'No se han pasado archivos'
        })
    }
    if(body.idAXS || body.idAXSXR || body.idThesis){
        for(var file of files){
            console.log(file.originalname);
            var newFile = FileModel.build({ USERId: res.locals.userId, ASSIGNMENTXSTUDENTId: body.idAXS, ASSIGNMENTXSTUDENTXREVISORId: body.idAXSXR, THESISId: body.idThesis, filename: removeAccents(file.originalname) });
            await newFile.save();
            results.push(newFile);
            await s3.putObject({
                Body: file.buffer,
                Bucket: process.env.S3_BUCKET,
                Key: `assignment/${newFile.id}-${removeAccents(file.originalname)}`,
                ACL:'public-read',
                ContentDisposition: contentDisposition(removeAccents(file.originalname), {
                    type: 'inline'
                  }),
            }).promise();
        }
    }else{
        return res.status(401).send({
            errorMessage: 'No se envió un idAXS o idAXSXR o idThesis'
        })
    }

    //cambia el estado de entregaxusuario 
    if (body.idAXS) {
        await AssignmentXStudentModel.update({ status: 'Entregado' }, { where: { id: body.idAXS }});
    }


    return res.status(201).send(results);
}

const patchFileController = async (req, res) => {
    //ESPERA UN ARCHIVO DENTRO DE 'file'
    //ESPERA UN BODY TAL COMO:
    //{
    //  "id": [1, 2, 3, 4, 5]
    //  "files": [archivos]    
    //}
    let i = 0;
    let results = [];
    for (var file of req.files){
        var oldFile = await FileModel.findByPk(req.body.id[i]);
        if(!oldFile){
            res.status(404).send({
                errorMessage: 'No se encontró el archivo'
            })
        }
        var result = await s3.putObject({
            Body: file.buffer,
            Bucket: process.env.S3_BUCKET,
            Key: `assignment/${req.body.id[i]}-${file.originalname}`
        }).promise();
        results.push(result);
        i++;
    }
    
    return res.status(201).send(results);
}

const deleteFileController = async (req, res) => {
    //ESPERA UN ID DE LA TABLA FILE DE LA BD EN LA URL, TAL COMO:
    //http://localhost:port/file/:id
    const file = FileModel.findByPk(req.params.id);
    if(!file){
        res.status(404).send({
            errorMessage: 'No se encontró el archivo'
        })
    }
    await FileModel.destroy({ where: { id: req.params.id }});
    return res.status(201).send();
}

const modifyFileController = async (req, res) => {
    //ESPERA UN ARCHIVO DENTRO DE 'file'
    //ESPERA UN BODY TAL COMO:
    //{
    //  id: [1, 2, 3, 4, 5]
    //  action: [INSERT, INSERT, UPDATE, INSERT, DELETE]
    //  idAXS: 1
    //  idAXSXR: 1
    //  idUser: 1
    //  "files": [archivos]    
    //}
    //MANDAR LOS ARCHIVOS PARA INSERT Y UPDATE PRIMERO
    //MANDAR LOS IDS DE DELETE AL FINAL
    //SI ES INSERT, RELLENAR id CON 0
    //idAXS y idAXSXR pueden ser nulificables, al menos uno tieneq que existir, no enviar el que no
    let i = 0;
    let results = [];
    let body = req.body;
    for (var file of req.files){
        if(req.body.action[i] == 'INSERT'){
            body.id[i] = await FileModel.build({ USERId: body.idUser, ASSIGNMENTXSTUDENTId: body.idAXS, ASSIGNMENTXSTUDENTREVISORId: body.idAXSXR, filename: file.originalname });
        }
        var result = await s3.putObject({
            Body: file.buffer,
            Bucket: process.env.S3_BUCKET,
            Key: `assignment/${body.id[i]}-${file.originalname}`
        }).promise();
        results.push(result);
        i++;
    }
    for(let j=i; j < body.id.lenght(); j++){
        result = await FileModel.destroy({ where: { id: body.id[j] }});
        results.push(result);
    }
    return res.status(201).send(results);
}

export { getAllFileController, getOneFileController, getFileThesisController, postFileController, patchFileController, deleteFileController, modifyFileController };
