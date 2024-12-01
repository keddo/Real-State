import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import isOnline from 'is-online'
dotenv.config();
const app = express();

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