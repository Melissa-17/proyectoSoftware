import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const AssignmentModel = db.define(
    'ASSIGNMENT', 
    {
        id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        assignmentName:         { type: DataTypes.TEXT('long'), allowNull: false },
        chapterName:            { type: DataTypes.TEXT('long'), allowNull: false },
        startDate:              { type: DataTypes.DATE, allowNull: true },
        endDate:                { type: DataTypes.DATE, allowNull: true },
        maxScore:                { type: DataTypes.FLOAT, allowNull: true },
        limitCompleteDate:      { type: DataTypes.DATE, allowNull: true },
        limitCalificationDate:      { type: DataTypes.DATE, allowNull: true },
        limitRepositoryUploadDate:      { type: DataTypes.DATE, allowNull: true },
        type:                           { type: DataTypes.STRING, allowNull: false },
        additionalComments:             { type: DataTypes.TEXT('long'), allowNull: false },
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

export default AssignmentModel;
