import FileModel from '#Models/FileModel.js';

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

export default patchFileController;