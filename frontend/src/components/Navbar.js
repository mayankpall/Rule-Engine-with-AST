import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Rule Engine
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/create-rule">
                    Create Rule
                </Button>
                <Button color="inherit" component={RouterLink} to="/evaluate-rule">
                    Evaluate Rule
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
