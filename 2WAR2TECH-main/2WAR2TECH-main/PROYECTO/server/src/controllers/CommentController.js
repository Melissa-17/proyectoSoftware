import UserModel from "#Models/UserModel.js";
import AssignmentXStudentModel from "#Models/AssignmentXStudentModel.js";
import CommentModel from "#Models/CommentModel.js";

const getCommentController = async (req, res) => {    
    //http://localhost:port/comment/:idAXS
    
    const idAXS = req.params.idAXS;
    const comments = await CommentModel.findAll(
        { 
            attributes: [ 'id', 'comment' ], 
            where: { 
                ASSIGNMENTXSTUDENTId: idAXS 
            },
             include: { 
                model: UserModel, 
                attributes: [ 'id', 'name', 'fLastName', 'mLastName', 'photo' ]
            }
        }); 

    return res.status(201).send(comments);
}

const postCommentController = async (req, res) => {    
    /*
    Espera un body tal como:
    {
        "comment": "hola que tal",
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

    const existAXS = await AssignmentXStudentModel.findOne( {where: { id: comment.ASSIGNMENTXSTUDENTId } } )
    if(!existAXS){
        return res.status(404).send({
            errorMessage: `No se encontró la asignacion ${comment.ASSIGNMENTXSTUDENTId}`
        });
    }
    
    const newComment = CommentModel.build(comment);
    newComment.USERId = res.locals.userId;
    await newComment.save();

    return res.status(201).send(newComment);
}

export { postCommentController, getCommentController};