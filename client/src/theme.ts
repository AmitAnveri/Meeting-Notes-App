import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // A strong blue
        },
        secondary: {
            main: '#dc004e', // A vibrant pink
        },
        background: {
            default: '#f0f2f5', // A light grey, good for backgrounds
            paper: '#ffffff',
        },
        error: {
            main: '#d32f2f',
        },
        warning: {
            main: '#ed6c02',
        },
        info: {
            main: '#0288d1',
        },
        success: {
            main: '#2e7d32',
        },
        text: {
            primary: '#333333', // Darker shade for text for better readability
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: [
            '"Roboto"',
            '"Helvetica"',
            '"Arial"',
            'sans-serif'
        ].join(','),
        h1: {
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '2.2rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 500,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 500,
            fontSize: '1.75rem',
            lineHeight: 1.3,
        },
        // Define other typography variants as needed
    },
    // You can extend the theme with custom properties here
    // Useful for defining reusable styles or constants
    components: {
        // Example customization of MUI Button
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Buttons use regular case, not uppercase
                    fontWeight: 'bold',
                },
            },
        },
        // Additional component customizations can go here
    },
});

export default theme;
