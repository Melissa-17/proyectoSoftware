import db from '#Config/db.js';

import { DataTypes } from 'sequelize';


const UserModel = db.define(
    'USER', 
    {
        id: { type: DataTypes.INTEGER, primaryKey: true,  autoIncrement: true },
       // idSpecialty: { type: DataTypes.INTEGER },
        idPUCP: { type: DataTypes.STRING },
        name: { type: DataTypes.STRING },
        fLastName: { type: DataTypes.STRING },
        mLastName: { type: DataTypes.STRING },
        telephone: { type: DataTypes.STRING },
        photo: { type: DataTypes.BLOB('long')},
        email: { type: DataTypes.TEXT('long')},
        password: { type: DataTypes.STRING }
    },
    {
      freezeTableName: true,
      paranoid: true
    }
);


export default UserModel;