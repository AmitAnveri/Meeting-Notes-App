import * as MeetingNoteService from '../services/meeting-note-service.js';
import {
    sendSuccess,
    sendError
} from './response-handler.js';

// Fetch or filter  meeting notes
const getAllMeetingNotes = async (req, res) => {
    try {
        // Check if there are query parameters for filtering
        const filterOptions = req.query;
        const meetingNotes = Object.keys(filterOptions).length ?
            await MeetingNoteService.getFilteredMeetingNotes(filterOptions) :
            await MeetingNoteService.getAllMeetingNotes();

        sendSuccess(res, meetingNotes);
    } catch (error) {
        sendError(res, error);
    }
};

// Add a MeetingNote
const addMeetingNote = async (req, res) => {
    try {
        const meetingNote = await MeetingNoteService.addMeetingNote(req.body);
        sendSuccess(res, meetingNote, 201);
    } catch (error) {
        sendError(res, error, 400);
    }
};

// Update a MeetingNote
const updateMeetingNote = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const meetingNote = await MeetingNoteService.updateMeetingNote(id, req.body);
        if (!meetingNote) {
            return sendError(res, new Error('MeetingNote not found.'), 404);
        }
        sendSuccess(res, meetingNote);
    } catch (error) {
        sendError(res, error, 400);
    }
};

// Delete a MeetingNote
const deleteMeetingNote = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        await MeetingNoteService.deleteMeetingNote(id);
        res.status(204).send();
    } catch (error) {
        sendError(res, error);
    }
};

export {
    getAllMeetingNotes,
    addMeetingNote,
    updateMeetingNote,
    deleteMeetingNote
};