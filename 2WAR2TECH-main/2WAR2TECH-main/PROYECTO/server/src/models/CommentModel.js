import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const CommentModel = db.define(
    'COMMENT', 
    {
        id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        comment:            { type: DataTypes.TEXT('long'), allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);



export default CommentModel;