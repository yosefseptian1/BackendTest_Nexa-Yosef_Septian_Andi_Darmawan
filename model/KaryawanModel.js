import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize;
const KaryawanModel = db.define('karyawan', {
    nip: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gend:{
        type: DataTypes.STRING,
        allowNull: false
    },
    photo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tgl_lahir:{
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    insert_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL 1 HOUR')
    },
    insert_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    update_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL 1 HOUR')
    },
    update_by: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
    freezeTableName: true
})

export default KaryawanModel;