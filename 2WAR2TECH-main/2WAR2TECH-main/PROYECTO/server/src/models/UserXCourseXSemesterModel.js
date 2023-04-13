import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const UserXCourseXSemesterModel = db.define(
    'USER_X_COURSE_X_SEMESTER', 
    {
      id: { type: DataTypes.INTEGER, primaryKey: true,  autoIncrement: true },
      status: { type: DataTypes.STRING }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default UserXCourseXSemesterModel;