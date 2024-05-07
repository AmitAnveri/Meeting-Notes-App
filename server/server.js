import express from 'express';
import dotenv from 'dotenv';
import initialize from './app/app.js';

dotenv.config();

const app = express();
initialize(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});