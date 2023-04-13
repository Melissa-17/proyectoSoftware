import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const FacultyModel = db.define(
    'FACULTY', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default FacultyModel;