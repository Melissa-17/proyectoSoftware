import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const UserXTeamXThesisModel = db.define(
    'USER_X_TEAM_X_THESIS', 
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default UserXTeamXThesisModel;