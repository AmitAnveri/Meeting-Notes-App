import mongoose from 'mongoose';

const ActionItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

const MeetingNoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    actionItems: [ActionItemSchema],
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const MeetingNote = mongoose.model('MeetingNote', MeetingNoteSchema);

export default MeetingNote;