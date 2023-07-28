import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize;
const LogModel = db.define('log_trx_api', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    api: {
        type: DataTypes.STRING,
        allowNull: false
    },
    request:{
        type : DataTypes.STRING,
        allowNull : false
    },
    response:{
        type : DataTypes.STRING,
        allowNull : false
    },
    insert_at:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL 1 HOUR')
    }
},
{
    timestamps: false,
    freezeTableName: true
})

export default LogModel;