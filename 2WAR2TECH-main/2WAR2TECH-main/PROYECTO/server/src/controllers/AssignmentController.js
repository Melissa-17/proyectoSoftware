import AssignmentModel from "#Models/AssignmentModel.js";
import AssignmentTaskModel from "#Models/AssignmentTaskModel.js";
import UserModel from "#Models/UserModel.js";

const getAssignmentListController = async (req, res) => {

    // assignment/list/:type/:cursoxsemesterid

    req.query.page = req.query.page ? req.query.page : 1;

    const pageSize = req.query.porPagina ? parseInt(req.query.porPagina) : 1000;
    const regStart = (parseInt(req.query.page) - 1)* pageSize; 

    const studentAssignments = await AssignmentModel.findAndCountAll({
        attributes: ['id', 'assignmentName', 'chapterName', 'startDate', 'endDate', 'limitCompleteDate', 'limitCalificationDate'],
        where: {
            'type': {  //where type == req.params.userid
                [Op.eq]: req.params.type,
            },
            'COURSEXSEMESTERId' : {
                [Op.eq]: parseInt(req.params.cursoxsemesterid)
            }
        },
        include: { //puede recibir una matriz para obtener varios modelos asociados a la vez.
            model: AssignmentTaskModel,
            attributes: ['id', 'name'],
        },        
        order: [
            ['id', 'ASC'],
        ],
        offset: regStart,
        limit: pageSize
    });

    res.status(200).send(studentAssignments);
}

export default getAssignmentListController;