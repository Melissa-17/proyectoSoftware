import FileModel from '#Models/FileModel.js';
import  { Op } from "sequelize";
import AWS from 'aws-sdk';
import { config } from 'dotenv';

const getFileController = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/files/:idAXS/:idAXSXR (RELLENAR CON 0 SI NO APLICA)
    const obj = req.params;
    const s3 = new AWS.S3();
    let retFiles = [];
    var s3obj;
    if(!(obj.idAXS > 0 || obj.idAXSXR > 0)){
        return res.status(401).send({
            errorMessage: 'Se necesita al menos una id de AXS o AXSXR'
        })
    }
    const files = await FileModel.findAll({ where: {[Op.or]: [{ ASSIGNMENTXSTUDENTId: obj.idAXS }, { ASSIGNMENTXSTUDENTREVISORId: obj.idAXSXR }]}});
    if(!files){
        res.status(404).send({
            errorMessage: 'No se encontraron archivos'
        })
    }
    for(var file of files){
        s3obj = s3.getObject({
            Bucket: process.env.S3_BUCKET,
            Key: `assignment/${file.id}-${file.filename}`
        });
        retFiles.push(s3obj);
    }
    return res.status(201).send(retFiles);
}

export default getFileController;