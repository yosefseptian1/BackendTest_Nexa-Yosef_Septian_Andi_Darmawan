import express from "express";
import db from "./config/database.js";
import Admin from "./model/AdminModel.js";
import router from "./routes/index.js";
import dotenv from "dotenv"

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log(`Database Connected`);
} catch (error) {
    console.log(error);
}


app.use(express.json());
app.use(router);

app.listen(3000, () => {
    console.log('Server running at port 3000');
});

