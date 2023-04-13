import FileModel from '#Models/FileModel.js';

const deleteFileController = async (req, res) => {
    //ESPERA UN ID DE LA TABLA FILE DE LA BD EN LA URL, TAL COMO:
    //http://localhost:port/files/:id
    const file = FileModel.findByPk(req.params.id);
    if(!file){
        res.status(404).send({
            errorMessage: 'No se encontró el archivo'
        })
    }
    await FileModel.destroy({ where: { id: req.params.id }});
    return res.status(204).send();
}

export default deleteFileController;