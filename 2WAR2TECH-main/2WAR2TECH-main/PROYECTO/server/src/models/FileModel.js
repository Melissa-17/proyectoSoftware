import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const FileModel = db.define(
    'FILE', 
    {
        id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        filename: { type: DataTypes.TEXT('long'), allowNull: false}
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default FileModel;