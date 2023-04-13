import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const RubricCriteriaModel = db.define(
    'RUBRIC_CRITERIA', 
    {
        id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        levelQuantity:      { type: DataTypes.STRING, allowNull: false },
        name:               { type: DataTypes.TEXT('long'), allowNull: true },
        description:        { type: DataTypes.TEXT('long'), allowNull: true }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);



export default RubricCriteriaModel;