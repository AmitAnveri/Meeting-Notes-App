import MeetingNote from '../models/meeting-note.js';

// Fetch all meeting notes
const getAllMeetingNotes = async () => {
  try {
    const meetingNotes = await MeetingNote.find();
    return meetingNotes;
  } catch (error) {
    throw error;
  }
};

//Fetch notes with filtering
const getFilteredMeetingNotes = async (filterOptions) => {
  try {
    let query = {};
    const {
      keyword,
      startDate,
      endDate
    } = filterOptions;
    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      query.$or = [{
          title: regex
        },
        {
          content: regex
        },
        {
          'actionItems.task': regex
        },
      ];
    }

    // Filter by createDate range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate + "T00:00:00.000Z");
      }
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
        query.date.$lte = endOfDay;
      }
    }

    const meetingNotes = await MeetingNote.find(query);
    return meetingNotes;
  } catch (error) {
    throw error;
  }
};

// Add a MeetingNote
const addMeetingNote = async (meetingNoteData) => {
  try {
    const meetingNote = new MeetingNote(meetingNoteData);
    await meetingNote.save();
    return meetingNote;
  } catch (error) {
    throw error;
  }
};

// Update a MeetingNote
const updateMeetingNote = async (id, meetingNoteData) => {
  try {
    const meetingNote = await MeetingNote.findByIdAndUpdate(id, meetingNoteData, {
      new: true
    });
    return meetingNote;
  } catch (error) {
    throw error;
  }
};

// Delete a MeetingNote
const deleteMeetingNote = async (id) => {
  try {
    await MeetingNote.findByIdAndDelete(id);
    return {
      message: 'MeetingNote deleted successfully.'
    };
  } catch (error) {
    throw error;
  }
};

export {
  getAllMeetingNotes,
  getFilteredMeetingNotes,
  addMeetingNote,
  updateMeetingNote,
  deleteMeetingNote
};