import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const CourseModel = db.define(
    'COURSE', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name:     { type: DataTypes.STRING, allowNull: false },
        code:     { type: DataTypes.STRING, allowNull: true },
        credits:  { type: DataTypes.FLOAT, allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default CourseModel;