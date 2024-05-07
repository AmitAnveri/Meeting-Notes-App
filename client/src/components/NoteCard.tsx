// NoteCard.tsx
import React, { useState } from "react";
import { Note } from "../types/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteEditModal from "./NoteEditModal";
import { styled } from "@mui/material/styles";

interface NoteCardProps {
  note: Note;
  onDelete: (noteId: string) => void;
}

// Custom styling for the Card component
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
  backgroundColor: theme.palette.background.paper, // Using theme for background color
}));

// Style for the CardContent when expanded
const ExpandedCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100], // Lighter background when expanded
  transition: "background-color 0.3s",
}));

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [localNote, setLocalNote] = useState<Note>(note);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleNoteSave = async (updatedNote: Note) => {
    // Prepare the note for saving by removing _id from new action items
    const noteForSave = {
      ...updatedNote,
      actionItems: updatedNote.actionItems.map((item) => {
        // Assuming new action items have an empty string as _id
        if (item._id === "") {
          // Return a new object without the _id property
          const { _id, ...rest } = item;
          return rest;
        }
        return item;
      }),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/meeting-notes/${updatedNote._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteForSave),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setLocalNote(updatedNote);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Could not save the note", error);
    }
  };

  const handleNoteDelete = async (noteId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/meeting-notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      onDelete(note._id);
    } catch (error) {
      console.error("Could not delete the note", error);
    }
  };

  const handleActionItemChange = (index: number) => {
    const updatedActionItems = [...localNote.actionItems];
    updatedActionItems[index].done = !updatedActionItems[index].done;

    setLocalNote({ ...localNote, actionItems: updatedActionItems });

    updateNote(localNote._id, updatedActionItems);
  };

  const updateNote = async (
    noteId: string,
    actionItems: typeof note.actionItems
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/meeting-notes/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...localNote,
            actionItems,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not update note");
      }
    } catch (error) {
      console.error("Failed to update action item", error);
    }
  };

  const truncateContent = (content: string, wordLimit: number): string => {
    const words = content.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  const truncatedContent = truncateContent(localNote.content, 10);

  return (
    <StyledCard variant="outlined">
      <CardContent>
        {/* Note title */}
        <Typography variant="h5" component="div" gutterBottom>
          {localNote.title}
        </Typography>
        {/* Truncated or full content based on `expanded` state */}
        <Typography
          variant="body2"
          onClick={handleExpandClick}
          sx={{
            cursor: "pointer",
            transition: "color 0.3s",
            "&:hover": { color: "primary.main" },
          }}
        >
          {expanded ? localNote.content : truncatedContent}
        </Typography>
        {/* Show action items and creation date when expanded */}
        {expanded && (
          <ExpandedCardContent>
            {localNote.actionItems.map((item, index) => (
              <FormControlLabel
                key={item._id}
                control={
                  <Checkbox
                    checked={item.done}
                    onChange={() => handleActionItemChange(index)}
                  />
                }
                label={item.task}
              />
            ))}
            <Typography variant="caption" display="block">
              Created on: {new Date(localNote.date).toLocaleDateString()}
            </Typography>
          </ExpandedCardContent>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => handleNoteDelete(note._id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <NoteEditModal
        open={editModalOpen}
        note={localNote}
        onClose={handleEditModalClose}
        onSave={handleNoteSave}
      />
    </StyledCard>
  );
};

export default NoteCard;
