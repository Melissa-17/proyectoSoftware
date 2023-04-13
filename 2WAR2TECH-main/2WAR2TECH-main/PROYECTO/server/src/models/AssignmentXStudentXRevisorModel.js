import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const AssignmentXStudentXRevisorModel = db.define(
    'ASSIGNMENT_X_STUDENT_X_REVISOR', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        grade:              { type: DataTypes.FLOAT, allowNull: true },
        feedbackDate:       { type: DataTypes.DATE, allowNull: true }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default AssignmentXStudentXRevisorModel;