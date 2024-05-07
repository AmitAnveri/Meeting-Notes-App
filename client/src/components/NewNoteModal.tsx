import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ActionItem } from "../types/types";
import Box from "@mui/material/Box";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface NewNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    content: string,
    actionItems: ActionItem[],
    date: string
  ) => void;
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { task: "", done: false },
  ]);

  const handleAddActionItem = () => {
    setActionItems([...actionItems, { task: "", done: false }]);
  };

  const handleSave = () => {
    const date = new Date().toISOString();
    onSave(title, content, actionItems, date);
    setTitle("");
    setContent("");
    setActionItems([{ task: "", done: false }]);
  };

  const handleRemoveActionItem = (index: number) => {
    const filteredItems = actionItems.filter((_, i) => i !== index);
    setActionItems(filteredItems);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Note</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ "& .MuiTextField-root": { m: 1 } }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {actionItems.map((item, index) => (
            <Box key={index} display="flex" alignItems="center">
              <TextField
                label={`Task ${index + 1}`}
                fullWidth
                variant="outlined"
                value={item.task}
                onChange={(e) => {
                  const newActionItems = [...actionItems];
                  newActionItems[index].task = e.target.value;
                  setActionItems(newActionItems);
                }}
              />
              <IconButton
                onClick={() => handleRemoveActionItem(index)}
                color="error"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleAddActionItem} color="primary">
              <AddCircleIcon />
            </IconButton>
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

export default NewNoteModal;
