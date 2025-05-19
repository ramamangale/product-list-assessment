import React from 'react';
import NavBar from './NavBar';
import {Container} from '@mui/material';

interface Props {
    children?: React.ReactNode
}

function AppLayout(props: Props) {
    const { children } = props;
    return (
        <>
            <NavBar />
            <Container sx={{mt: 15}}>
                <main>
                    {children}
                </main>
            </Container>

        </>
    )
}

export default AppLayout;