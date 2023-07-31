import { DataTypes } from 'sequelize';
import sequelize from '../db/keys';


export const Cliente = sequelize.define('cliente',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: 
    {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
    apellido: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:
    {
        type: DataTypes.STRING,
        allowNull: false
    }

})