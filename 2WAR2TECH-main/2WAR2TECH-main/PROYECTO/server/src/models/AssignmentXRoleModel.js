import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const AssignmentXRoleModel = db.define(
    'ASSIGNMENT_X_ROLE', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default AssignmentXRoleModel;