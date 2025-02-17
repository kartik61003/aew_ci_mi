import express from 'express';
import dotenv from 'dotenv';
import connection from '../database/connection';
import cors from 'cors';
import route from "../routes/route";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
connection();

app.use('/', route);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});