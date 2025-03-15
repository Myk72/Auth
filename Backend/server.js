import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './Database/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true, 
}));
const PORT = process.env.PORT || 5000;  
app.use(express.json());

app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
    });
};


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
    });