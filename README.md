# Meeting Notes Application

A React application designed to create, view, edit, and delete meeting notes, utilizing Material-UI for styling and smooth user experience. This project demonstrates the use of React hooks, context, Material-UI components, and interaction with a backend server via REST API.

## Features

- **View Notes**: All notes are displayed in a grid layout with the ability to expand each note to view detailed content and action items.
- **Add Note**: Users can add new notes by entering the title, content, and action items.
- **Edit Note**: Each note can be edited, including its title, content, and action items, through an intuitive modal interface.
- **Delete Note**: Notes can be deleted directly from the main interface.
- **Responsive Design**: Leveraging Material-UI's grid system, the layout is responsive and adapts to different screen sizes.

## Technologies

- **React**: For building the user interface.
- **Material-UI**: Used for styling and implementing the UI components.
- **TypeScript**: For adding static type definitions.
- **Fetch API**: For making HTTP requests to the REST API.

## Project Structure

- `src/`
  - `components/`: Contains all the React components.
    - `NotesContainer.tsx`: The main container for displaying all notes.
    - `NoteCard.tsx`: Represents a single note card in the grid.
    - `NewNoteModal.tsx`: Modal for adding a new note.
    - `NoteEditModal.tsx`: Modal for editing an existing note.
  - `types/`: Type definitions for TypeScript.
    - `types.ts`: Defines the types used across the application.
  - `theme.ts`: Defines the Material-UI theme for the app.
  - `App.tsx`: The root React component.
  - `index.tsx`: Entry point for the React application.
