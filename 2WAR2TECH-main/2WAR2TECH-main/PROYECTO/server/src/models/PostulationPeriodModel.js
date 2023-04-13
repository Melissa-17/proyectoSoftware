import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const PostulationPeriodModel = db.define(
    'POSTULATION_PERIOD', 
    {
        id:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name:               { type: DataTypes.STRING, allowNull: true },
        startDate:           { type: DataTypes.DATE, allowNull: true },
        endDate:           { type: DataTypes.DATE, allowNull: true },
        status:               { type: DataTypes.STRING, allowNull: true },
        additional:        { type: DataTypes.TEXT('long'), allowNull: true },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);


export default PostulationPeriodModel;