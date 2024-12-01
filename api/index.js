import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import isOnline from 'is-online'
import userRoutes from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import morgan from 'morgan';
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRouter);

// Error middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 5000;

let online
const main = async () => {
    online = await isOnline()
    const DB_URL = online ? process.env.MONGO_DB_URL_REMOTE : process.env.MONGO_DB_URL_LOCAL;
    await mongoose.connect(DB_URL,);
}

main().then(() => console.log(`Connected to MongoDB to ${online ? 'Remote' : 'Local'}`)).catch(error => console.error("Error: ", error))
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});