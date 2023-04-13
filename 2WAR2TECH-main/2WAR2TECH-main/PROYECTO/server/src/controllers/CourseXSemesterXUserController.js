import CourseModel from "#Models/CourseModel.js";
import CourseXSemesterModel from "#Models/CourseXSemesterModel.js";
import UserXCourseXSemesterModel from "#Models/UserXCourseXSemesterModel.js";
import UserXThesisModel from "#Models/UserXThesisModel.js";
import { Op } from "sequelize";

const getCoursesXSemesterxUser = async (req, res) => {
  const studentCourses = await CourseXSemesterModel.findAll({
    where: {
      "SEMESTERId": {
        [Op.eq]: parseInt(req.params.semesterId),
      },
    },
    include: [
      {
        model: UserXCourseXSemesterModel,
        where: {
          "USERId": {
            [Op.eq]: parseInt(req.params.userId),
          },
        },
      },
      {
        attributes: ["id", "name", "credits"],
        model: CourseModel,
      }
    ],
    subQuery: false,
    order: [ ['updatedAt', 'DESC'],  ['createdAt', 'DESC'], ],
  });

  return res.send(studentCourses);
}

const addUserToCourse = async(req, res) => {
  const body = req.body;
  const result = await UserXCourseXSemesterModel.create({
    USERId: body.idU,
    COURSEXSEMESTERId: body.idCXS
  });
  return res.status(201).send(result);
}

const editAsesorStatus = async(req, res) => {
  const body = req.body;
  let results = [];
  let result;
  result = await UserXCourseXSemesterModel.update({ status: body.status }, {
    where: {
      USERId: body.idU,
      COURSEXSEMESTERId: body.idCXS
    }
  });
  results.push(result);
  if(body.status == 'D'){
    result = await UserXThesisModel.destroy({
      where: {
        type: { [Op.like]: '%ASESOR%' },
        USERId: body.idU
      }
    });
  }
  results.push(result);
  return res.status(201).send(results);
}

export { getCoursesXSemesterxUser, addUserToCourse, editAsesorStatus };
