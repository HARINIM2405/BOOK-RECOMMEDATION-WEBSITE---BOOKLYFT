// GlobalFAB.js
import React from 'react';
import { Fab } from '@mui/material';
import { Brush } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const GlobalFAB = () => {
    return (
        <Fab
            color="secondary"
            aria-label="edit"
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 1100,
                "&:hover": {
                    backgroundColor: '#80cbc4',
                },
            }}
            component={Link}
            to="/blackboard" // Adjust this to the route you want to navigate to
        >
            <Brush />
        </Fab>
    );
};

export default GlobalFAB;
