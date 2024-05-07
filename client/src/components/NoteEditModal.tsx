import React, { useState } from "react";
import { Note, ActionItem } from "../types/types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

interface NoteEditModalProps {
  open: boolean;
  note: Note;
  onClose: () => void;
  onSave: (note: Note) => void;
}

const NoteEditModal: React.FC<NoteEditModalProps> = ({
  open,
  note,
  onClose,
  onSave,
}) => {
  const [editedNote, setEditedNote] = useState<Note>(note);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNote({ ...editedNote, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNote({ ...editedNote, content: event.target.value });
  };

  const handleActionItemTaskChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedActionItems = editedNote.actionItems.map((item, i) => {
      if (i === index) {
        return { ...item, task: event.target.value };
      }
      return item;
    });
    setEditedNote({ ...editedNote, actionItems: updatedActionItems });
  };

  const handleActionItemDoneChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedActionItems = editedNote.actionItems.map((item, i) => {
      if (i === index) {
        return { ...item, done: event.target.checked };
      }
      return item;
    });
    setEditedNote({ ...editedNote, actionItems: updatedActionItems });
  };

  const handleActionItemDelete = (index: number) => {
    const updatedActionItems = editedNote.actionItems.filter(
      (_, i) => i !== index
    );
    setEditedNote({ ...editedNote, actionItems: updatedActionItems });
  };

  const handleActionItemAdd = () => {
    const newActionItem: ActionItem = { _id: "", task: "", done: false };
    setEditedNote({
      ...editedNote,
      actionItems: [...editedNote.actionItems, newActionItem],
    });
  };

  const handleSave = () => {
    onSave(editedNote);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ "& .MuiTextField-root": { m: 1, width: "calc(100% - 48px)" } }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={editedNote.title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={editedNote.content}
            onChange={handleContentChange}
          />
          {editedNote.actionItems.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <Checkbox
                checked={item.done}
                onChange={(e) => handleActionItemDoneChange(index, e)}
              />
              <TextField
                fullWidth
                variant="outlined"
                value={item.task}
                onChange={(e) =>
                  handleActionItemTaskChange(
                    index,
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
              <IconButton
                onClick={() => handleActionItemDelete(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box mt={2} display="flex" justifyContent="flex-start">
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleActionItemAdd}
            >
              Add Action Item
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteEditModal;
