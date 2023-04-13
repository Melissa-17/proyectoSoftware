import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

import UserModel from '#Models/UserModel.js';
import AssignmentModel from '#Models/AssignmentModel.js';

const AssignmentXStudentModel = db.define(
    'ASSIGNMENT_X_STUDENT', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        score: { type: DataTypes.FLOAT, allowNull: true },
        linkVirtualSession: { type: DataTypes.STRING, allowNull: true },
        location: { type: DataTypes.STRING, allowNull: true },
        meetingDate: { type: DataTypes.DATE, allowNull: true },
        registerDate: { type: DataTypes.DATE, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default AssignmentXStudentModel;