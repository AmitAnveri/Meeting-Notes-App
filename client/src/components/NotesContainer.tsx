// NotesContainer.tsx
import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NewNoteModal from "./NewNoteModal";
import { Note, ActionItem } from "../types/types";
import { Container, Box } from "@mui/material";

const NotesContainer: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/meeting-notes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Note[] = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNoteDelete = (deletedNoteId: string) => {
    const updatedNotes = notes.filter((note) => note._id !== deletedNoteId);
    setNotes(updatedNotes);
  };

  const handleSaveNewNote = async (
    title: string,
    content: string,
    actionItems: ActionItem[],
    date: string
  ) => {
    const newNoteData = { title, content, actionItems, date };

    try {
      const response = await fetch("http://localhost:3000/meeting-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNoteData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const createdNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, createdNote]);
      handleCloseModal();
    } catch (error) {
      console.error("Could not save the new note", error);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" my={2}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add New Note
        </Button>
      </Box>
      <NewNoteModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNewNote}
      />
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note._id} xs={12} sm={6} md={4}>
            <NoteCard note={note} onDelete={handleNoteDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NotesContainer;
