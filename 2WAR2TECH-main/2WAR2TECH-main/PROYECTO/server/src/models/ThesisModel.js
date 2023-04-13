import db from '#Config/db.js';
import { DataTypes } from 'sequelize';

const ThesisModel = db.define(
    'THESIS', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title:           { type: DataTypes.TEXT('long'), allowNull: true },
        objective:           { type: DataTypes.TEXT('long'), allowNull: true },
        theme:         { type: DataTypes.TEXT('long'), allowNull: true },
        description: { type: DataTypes.TEXT('long'), allowNull: true},
        status: { type: DataTypes.STRING, allowNull: true},
        comment:         { type: DataTypes.TEXT('long'), allowNull: true },
        areaName: { type: DataTypes.TEXT('long'), allowNull: true }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);


export default ThesisModel;