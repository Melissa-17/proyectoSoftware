import SpecialtyModel from "#Models/SpecialtyModel.js";


const getSpecialtiesController = async (req, res) => {
    const specialties = await SpecialtyModel.findAll({});
    
    return res.send(specialties);
}

export default getSpecialtiesController;