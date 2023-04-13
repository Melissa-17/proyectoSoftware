import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const SemesterModel = db.define(
    'SEMESTER', 
    {
        id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        abbreviation:   { type: DataTypes.STRING, allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default SemesterModel;
