import express from "express";
import { InsertKaryawan, Login, getAdmin, register, getKaryawan, UpdateKaryawan, UpdateStatusKaryawan } from "../controller/AdminController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/getAllAdmin', verifyToken, getAdmin);
router.post('/insertKaryawan', verifyToken, InsertKaryawan);
router.post('/login', Login);
router.post('/register', register)
router.get('/getAllKaryawan', verifyToken, getKaryawan);
router.put('/updateKaryawan', verifyToken, UpdateKaryawan);
router.put('/updateStatusKaryawan', verifyToken, UpdateStatusKaryawan);




export default router;