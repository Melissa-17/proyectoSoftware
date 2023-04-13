import FileModel from '#Models/FileModel.js';

const fileGetTest = async (req, res) => {
    console.log(req.files);
    const files = await FileModel.findAll();
    return res.send( files );
}

export default fileGetTest;