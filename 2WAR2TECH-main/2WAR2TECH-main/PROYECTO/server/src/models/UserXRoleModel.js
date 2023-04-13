import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const UserXRoleModel = db.define(
    'USER_X_ROLE', 
    {
        
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default UserXRoleModel;