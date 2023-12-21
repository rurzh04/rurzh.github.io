import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Spinner = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: '300px' }}>
            <CircularProgress color="inherit" />
        </Box>
    );
};

export default Spinner;
