import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const ThesisTrazabilityModel = db.define(
    'THESIS_TRAZABILITY', 
    {
      id: { type: DataTypes.INTEGER, primaryKey: true,  autoIncrement: true },
      description: { type: DataTypes.TEXT('long') },
    //   status: { type: DataTypes.STRING }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default ThesisTrazabilityModel;