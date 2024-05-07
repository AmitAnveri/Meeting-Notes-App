// Defines routes specific to meeting notes
import express from 'express';
import {
    getAllMeetingNotes,
    addMeetingNote,
    updateMeetingNote,
    deleteMeetingNote,
} from '../controllers/meeting-note-controller.js';

const router = express.Router();

router.get('/', getAllMeetingNotes);
router.post('/', addMeetingNote);
router.put('/:id', updateMeetingNote);
router.delete('/:id', deleteMeetingNote);

export default router;