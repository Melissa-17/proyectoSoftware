import UserModel from "#Models/UserModel.js";
import AssignmentXStudentModel from "#Models/AssignmentXStudentModel.js";
import CommentModel from "#Models/CommentModel.js";

const postCommentController = async (req, res) => {
    
    /*
    Espera un body tal como:
    {
        "comment": "hola que tal",
        "USERId": "1",   // sacar del res.locals.userId
        "ASSIGNMENTXSTUDENTId": "1"  
    }   
    */
    const comment = req.body;

    const existUser = await UserModel.findByPk(res.locals.userId);    
    
    if(!existUser){
        return res.status(404).send({
            errorMessage: `No se encontró el usuario ${res.locals.userId}`
        });
    }
    comment.USERId = res.locals.userId; 

    const existAXS = await AssignmentXStudentModel.findOne( {where: { id: comment.ASSIGNMENTXSTUDENTId } } )
    if(!existAXS){
        return res.status(404).send({
            errorMessage: `No se encontró la asignacion ${comment.ASSIGNMENTXSTUDENTId}`
        });
    }
    
    const newComment = CommentModel.build(comment);
    newComment.USERId = req.body.USERId;
    await newComment.save();

    return res.status(201).send(newComment);
}

export default postCommentController;