import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize;
const Admin = db.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
    freezeTableName: true
})

export default Admin;