import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert, Box, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

const CreateRule = () => {
    const [ruleString, setRuleString] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/rules/create', { ruleString, name });
            setResponse({ 
                message: `Rule created successfully! You can copy this Rule ID for evaluation or find it in the home section.`, 
                ruleId: res.data._id 
            });
        } catch (error) {
            setResponse({ error: 'Error creating rule' });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(response.ruleId);
        alert('Rule ID copied to clipboard!');
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Create a New Rule
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Rule Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Rule String"
                        value={ruleString}
                        onChange={(e) => setRuleString(e.target.value)}
                        fullWidth
                        margin="normal"
                        placeholder="e.g. age > 30 AND department = 'Sales'"
                        required
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Create Rule
                    </Button>
                </form>
                
                {response && (
                    <Alert severity={response.error ? 'error' : 'success'} sx={{ mt: 2 }}>
                        {response.error || (
                            <Box>
                                <Typography variant="body1">
                                    {response.message}
                                </Typography>
                                <Typography variant="h6" sx={{ mt: 1, display: 'inline' }}>
                                    Rule ID: {response.ruleId}
                                </Typography>
                                <IconButton onClick={copyToClipboard} sx={{ ml: 1 }}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

export default CreateRule;
