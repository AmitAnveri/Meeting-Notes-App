// App.tsx
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Adjust the import path as needed if your theme is defined elsewhere
import NotesContainer from "./components/NotesContainer";
import CssBaseline from "@mui/material/CssBaseline"; // Helps to normalize the styling across browsers
import Typography from "@mui/material/Typography"; // For styled text according to the theme

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply baseline CSS */}
      <div style={{ padding: "20px" }}>
        {" "}
        {/* Optionally, add some padding around your app */}
        <Typography variant="h1" color="primary" gutterBottom>
          Meeting Notes
        </Typography>
        <NotesContainer />
      </div>
    </ThemeProvider>
  );
};

export default App;
