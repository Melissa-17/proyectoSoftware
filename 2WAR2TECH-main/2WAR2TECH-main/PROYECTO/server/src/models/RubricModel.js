import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const RubricModel = db.define(
    'RUBRIC', 
    {
        id:               { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        objective:              { type: DataTypes.TEXT('long'), allowNull: false },
        annotations:            { type: DataTypes.TEXT('long'), allowNull: false },
        criteriaQuantity:       { type: DataTypes.INTEGER, allowNull: false },
        description:    { type: DataTypes.TEXT('long'), allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

//RubricModel.belongsTo(Entrega);

export default RubricModel;