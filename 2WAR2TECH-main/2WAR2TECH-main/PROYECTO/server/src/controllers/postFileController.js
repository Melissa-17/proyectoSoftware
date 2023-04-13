import FileModel from '#Models/FileModel.js';
import AWS from 'aws-sdk';
import { config } from 'dotenv';

const postFileController = async (req, res) => {
    //ESPERA UN ARCHIVO DENTRO DE 'file'
    //Espera un body como:
    //{
    //    "idUser": 1,
    //    "idAXS": 1 (nulificable)
    //    "idAXSXR": 1 (nulificable)
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
    if(body.idAXS > 0 || body.idAXSXR > 0){
        for(var file of files){
            var newFile = FileModel.build({ USERId: body.idUser, ASSIGNMENTXSTUDENTId: body.idAXS, ASSIGNMENTXSTUDENTREVISORId: body.idAXSXR, filename: file.originalname });
            await newFile.save();
            results.push(newFile);
            await s3.putObject({
                Body: file.buffer,
                Bucket: process.env.S3_BUCKET,
                Key: `assignment/${newFile.id}-${file.originalname}`
            }).promise();
        }
    }else{
        return res.status(401).send({
            errorMessage: 'No se envió un idAXS o idAXSXR'
        })
    }
    return res.status(201).send(results);
}

export default postFileController;