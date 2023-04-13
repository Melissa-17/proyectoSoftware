import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const UserXSpecialtyModel = db.define(
    'USER_X_SPECIALTY', 
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },   
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default UserXSpecialtyModel;