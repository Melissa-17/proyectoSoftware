import db from '#Config/db.js';
import { DataTypes } from 'sequelize';

const TeamModel = db.define(
    'TEAM', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name:           { type: DataTypes.TEXT('long'), allowNull: true },
        additional:           { type: DataTypes.TEXT('long'), allowNull: true },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);


export default TeamModel;