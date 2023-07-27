import Admin from "../model/AdminModel.js";
import AdminToken from "../model/AdminTokenModel.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../config/database.js"
import { QueryTypes } from "sequelize";
import KaryawanModel from "../model/KaryawanModel.js";

export const getAdmin = async(req, res) =>{
    try {
        const getAllAdmin = await Admin.findAll();
        res.status(200).json({
            data : getAllAdmin
        });
    } catch (error) {
        res.status(400).json({
            message: 'Data Admin tidak ditemukan'
        })
    }
}

export const register = async(req, res) => {
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      await Admin.create({
        username : username,
        password : hashPassword
      })
      res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(400).json({ message: 'Registration failed' });
    }
}

export const Login = async(req, res) => {
    try {
        const admin = await Admin.findAll({
            where: {
                username: req.body.username
            }
        });
        const hashPass = admin[0].password.toString('utf8');
        console.log('Hashed password from DB:', hashPass);
        const cekPassword = await bcrypt.compare(req.body.password, hashPass);
        if (!cekPassword) {
            return res.status(400).json({ message: 'Wrong password' });
        }
        const userId = admin[0].id;
        const username = admin[0].username;

        const accessToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : '1d',
        });
        const refreshToken = jwt.sign({userId, username}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn : '1d',
        });

        await AdminToken.create({
            id_admin : userId,
            token : accessToken,
        });
        res.status(200).json({ message: 'Login successful', data: accessToken });
    } catch (error) {
        res.status(404)
        console.log(error);
    }
}

export const InsertKaryawan = async(req, res) => {
    const transaction = await db.transaction();
    try {
        const {
            nip,
            nama,
            alamat,
            gend,
            photo,
            tgl_lahir
          } = req.body;

        let user = 'select * from admin';
        const cekUser = await db.query(user , {
            type: QueryTypes.SELECT
        })

        let nipQuery = `
          select * from karyawan where nip=:nip
        `
        const cekNip = await db.query(nipQuery , {
            replacements: {nip},
            type: QueryTypes.SELECT
        })
        if(cekNip.length != 0){
            return res.status(400).json({ 
                message: 'NIP sudah terdaftar',
                data: []
             });
        }
        let insertKaryawan = await db.query("CALL sp_add_kary_YOSEF_SEPTIAN_ANDI_DARMAWAN(:_nip, :_nama, :_alamat, :_gend, :_photo, :_tgl_lahir, :_insert_by)", 
        {
            replacements:{
                _nip  : nip, 
                _nama : nama, 
                _alamat : alamat,
                _gend : gend,
                _photo : photo,
                _tgl_lahir : tgl_lahir,
                _insert_by : cekUser[0].username
            },
            transaction
        });
        transaction.commit();
      return res.status(200).json({
        message: 'Insert successful' 
    });
    } catch (error) {
        transaction.rollback();
      res.status(400).json({ 
        message: 'Insert failed',
        data: []
     });
      console.log(error);
    }
}

export const getKaryawan = async(req, res) =>{
    try {
        const { nama } = req.query;

        let query = `
        SELECT 
            ROW_NUMBER() OVER () AS No,
            nip AS Nip,
            nama AS Nama,
            alamat AS Alamat,
            CASE
            WHEN gend = 'L' THEN 'Laki-Laki'
            WHEN gend = 'P' THEN 'Perempuan'
            ELSE ''
            END AS Gend,
            DATE_FORMAT(tgl_lahir, '%e %M %Y') AS 'Tanggal Lahir'
        FROM karyawan
        where nama=:nama
        limit 10
        `
        const result = await db.query(query , {
            replacements: {nama},
            type: QueryTypes.SELECT
        });
        if(result.length == 0){
            res.status(200).json({
                message: 'Nama karyawan tidak ditemukan',
                data: [],
            })
        }
        res.status(200).json({
            message: '',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
}

export const UpdateKaryawan = async(req, res) => {
    try {
        const {
            nip,
            nama,
            alamat,
            gend,
            photo,
            tgl_lahir
          } = req.body;

        let user = 'select * from admin';
        const cekUser = await db.query(user , {
            type: QueryTypes.SELECT
        });

        let update = await KaryawanModel.update({
            nama,
            alamat,
            gend,
            photo,
            tgl_lahir,
            update_by : cekUser[0].username
          },{
            where : {
                nip
            }
          })
        if(!update){
            res.status(400).json({
                message: 'Update Gagal',
                data: []
            });
        }
        res.status(200).json({
            message: 'Update successful' 
        });
    } catch (error) {
      res.status(400).json({ 
        message: 'Update failed',
        data: []
     });
      console.log(error);
    }
}


export const UpdateStatusKaryawan = async(req, res) => {
    try {

        const { nip } = req.query;

        let user = 'select * from admin';
        const cekUser = await db.query(user , {
            type: QueryTypes.SELECT
        });

        let update = await KaryawanModel.update({
            status : 9,
            update_by : cekUser[0].username
          },{
            where : {
                nip
            }
          })
        if(!update){
            res.status(400).json({
                message: 'Update Status Gagal',
                data: []
            });
        }
        res.status(200).json({
            message: 'Update Status successful' 
        });
    } catch (error) {
      res.status(400).json({ 
        message: 'Insert failed',
        data: []
     });
      console.log(error);
    }
}