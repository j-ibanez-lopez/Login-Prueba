import { DataTypes } from 'sequelize'
import sequelize from '../db/keys'

export const Product = sequelize.define('product', 
{
    id: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING
    }, 

    description: {
        type: DataTypes.STRING
    }
})