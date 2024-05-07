import express from 'express';
import meetingNoteRouter from './meeting-note-route.js';

const appRouter = express.Router();

// Mount the meeting notes router under a specific path
appRouter.use('/meeting-notes', meetingNoteRouter);

export default appRouter;