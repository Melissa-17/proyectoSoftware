import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const UserXThesisModel = db.define(
    'USER_X_THESIS', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: true },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default UserXThesisModel;