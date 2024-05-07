import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import appRouter from './routes/index.js';

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    // Initialize routes from the appRouter
    app.use('/', appRouter);

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => {
            console.error('Could not connect to MongoDB:', error);
            process.exit(1);
        });
};

export default initialize;