import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const CourseXSemesterModel = db.define(
    'COURSE_X_SEMESTER', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: true },
        abbreviation: { type: DataTypes.STRING, allowNull: true },
        numberOfThesis: { type: DataTypes.INTEGER, allowNull: false },
        beginDateApproval: { type: DataTypes.DATE, allowNull: true },
        endDateApproval: { type: DataTypes.DATE, allowNull: true },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default CourseXSemesterModel;