import React from 'react';
import { Button, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

function LandingPage() {
    const history = useHistory();
    const handleClick = () => {
        history.push('/products');
    }
    return (<>
        <Box sx={{ mt: 10, textAlign: 'center', fontWeight: 600, fontSize: '2.5rem', height: '20vh' }}>Welcome to Landing Page</Box>
        <Box sx={{ mt: 2, textAlign: 'center', fontWeight: 600, fontSize: '2.5rem', height: '20vh'}}>
            <Button variant="outlined" size="large" onClick={handleClick}>
                Go To Products
            </Button>
        </Box>
    </>
    )
}

export default LandingPage