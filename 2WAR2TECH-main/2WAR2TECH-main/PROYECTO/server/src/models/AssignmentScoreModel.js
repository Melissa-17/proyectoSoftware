import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const AssignmentScoreModel = db.define(
    'ASSIGNMENT_SCORE', 
    {
        id:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        obtainedScore:    { type: DataTypes.DOUBLE, allowNull: true },
        notes:            { type: DataTypes.TEXT('long'), allowNull: true },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default AssignmentScoreModel;