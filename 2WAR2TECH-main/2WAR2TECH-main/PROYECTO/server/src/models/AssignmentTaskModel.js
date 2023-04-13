import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const AssignmentTaskModel = db.define(
    'ASSIGNMENT_TASK', 
    {
        id:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name:                { type: DataTypes.STRING, allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default AssignmentTaskModel;