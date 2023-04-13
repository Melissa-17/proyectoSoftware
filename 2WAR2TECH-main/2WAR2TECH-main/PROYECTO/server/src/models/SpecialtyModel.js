import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const SpecialtyModel = db.define(
    'SPECIALTY', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false}
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default SpecialtyModel;