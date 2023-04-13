import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const RoleModel = db.define(
    'ROLE', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        description: { type: DataTypes.STRING, allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);



export default RoleModel;