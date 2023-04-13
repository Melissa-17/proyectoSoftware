import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const CalificationXAssignmentModel = db.define(
    'CALIFICATION_X_ASSIGNMENT', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        weight: { type: DataTypes.DOUBLE, allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default CalificationXAssignmentModel;