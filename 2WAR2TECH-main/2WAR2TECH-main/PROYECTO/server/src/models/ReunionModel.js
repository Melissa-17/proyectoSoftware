import db from '#Config/db.js';
import { DataTypes } from 'sequelize';

const ReunionModel = db.define(
    'REUNION', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        urlSesion:  { type: DataTypes.TEXT('long'), allowNull: false },
        type: { type: DataTypes.STRING }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);


export default ReunionModel;