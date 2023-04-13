import FacultyModel from "#Models/FacultyModel.js";


const getFacultiesController = async (req, res) => {
    const faculties = await FacultyModel.findAll({
        
    });
    
    return res.send(faculties);
}

export default getFacultiesController;