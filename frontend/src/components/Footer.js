import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main',   // Use theme's primary color
                color: 'white',
                p: 3,
                mt: 4,
                textAlign: 'center',
                position: 'relative',
                bottom: 0,
                width: '100%',
            }}
        >
            <Typography variant="body1" component="p">
                &copy; 2024 Rule Engine.
                
                <Link href="https://www.linkedin.com/in/mayankpall/" color="inherit" sx={{ ml: 1 }}>
                    LinkedIn
                </Link>, 
                <Link href="https://github.com/mayankpall" color="inherit" sx={{ ml: 1 }}>
                    GitHub
                </Link>,
                <Link href="https://portfolio.mayankpal.co.in/" color="inherit" sx={{ ml: 1 }}>
                    Portfolio
                </Link>.
            </Typography>
        </Box>
    );
};

export default Footer;
