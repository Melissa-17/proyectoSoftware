import db from '#Config/db.js';

import { DataTypes } from 'sequelize';

const BlockModel = db.define(
    'BLOCK', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name:           { type: DataTypes.STRING, allowNull: true },
        // tipo:           { type: DataTypes.STRING, allowNull: true },
        // description:    { type: DataTypes.STRING, allowNull: true },
        // weight:         { type: DataTypes.FLOAT, allowNull: false }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);

//CalificationModel.belongsToMany(Entrega, {through: 'CALIFICATION_X_ENTREGA'});
//CalificationModel.hasOne(CURSO_X_SEMESTRE);

export default BlockModel;