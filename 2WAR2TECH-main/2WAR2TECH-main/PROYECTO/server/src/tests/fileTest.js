import multer from 'multer';
import FileModel from '#Models/FileModel.js';

const fileTest = async (req, res) => {
    console.log(req.file);
    //const newFile = FileModel.build({ idAXS: '1', idAXSXR: '1', file: req.files.avatar[0] });
    //await newFile.save();
    return res.send( { messsage: 'Hola'} );
}

export default fileTest;