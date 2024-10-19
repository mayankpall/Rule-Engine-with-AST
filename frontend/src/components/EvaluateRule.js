import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';
import axios from 'axios';

const EvaluateRule = () => {
    const [ruleId, setRuleId] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userData;
            try {
                // Attempt to parse the user data as JSON
                userData = JSON.parse(data);
            } catch (jsonError) {
                setResult({ error: 'Invalid JSON format. Please check your input.' });
                return;
            }

            // Log the parsed user data for debugging purposes
            console.log('User data:', userData);

            // Make the POST request to evaluate the rule
            const res = await axios.post(`/api/rules/evaluate/${ruleId}`, { data: userData });

            // Log the response for debugging purposes
            console.log('API response:', res.data);

            setResult(res.data.result);
        } catch (error) {
            console.error('Error during rule evaluation:', error);
            setResult({ error: 'Error evaluating rule' });
        }
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Evaluate a Rule
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Rule ID"
                        value={ruleId}
                        onChange={(e) => setRuleId(e.target.value.replace(/['"]+/g, ''))}  // Remove any quotes from input
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="User Data (JSON)"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        fullWidth
                        margin="normal"
                        placeholder='e.g. { "age": 35, "department": "Sales" }'
                        required
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Evaluate Rule
                    </Button>
                </form>
                {result !== null && (
                    <Alert severity={result.error ? 'error' : 'info'} sx={{ mt: 2 }}>
                        {result.error ? result.error : `Result: ${result ? 'Valid' : 'Invalid'}`}
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

export default EvaluateRule;
