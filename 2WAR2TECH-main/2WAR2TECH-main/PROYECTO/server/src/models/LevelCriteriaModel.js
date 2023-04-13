import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const LevelCriteriaModel = db.define(
    'LEVEL_CRITERIA', 
    {
        id:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name:               { type: DataTypes.STRING, allowNull: false },
        maxScore:           { type: DataTypes.FLOAT, allowNull: false },
        description:        { type: DataTypes.TEXT('long'), allowNull: false },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);


export default LevelCriteriaModel;