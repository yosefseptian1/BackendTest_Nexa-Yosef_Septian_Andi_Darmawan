import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize;
const AdminToken = db.define('admin_token', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expired_at:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL 1 HOUR')
    }
},
{
    timestamps: false,
    freezeTableName: true
})

export default AdminToken;