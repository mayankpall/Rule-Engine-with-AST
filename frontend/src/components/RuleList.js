import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const RuleList = () => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        // Fetch rules from the API when the component is mounted
        const fetchRules = async () => {
            try {
                const res = await axios.get('/api/rules');
                setRules(res.data);  // Update state with fetched rules
            } catch (error) {
                console.error('Error fetching rules', error);
            }
        };
        fetchRules();
    }, []);

    // Helper function to build the condition string
    const buildConditionString = (root) => {
        if (root.type === 'operator') {
            // If it's an operator (AND/OR), recursively get the left and right conditions
            const leftCondition = root.left.condition || buildConditionString(root.left);
            const rightCondition = root.right.condition || buildConditionString(root.right);
            return `(${leftCondition} ${root.operator} ${rightCondition})`;
        }
        // If it's an operand, return the condition directly
        return root.condition;
    };

    return (
        <div className="rule-list">
            <Typography variant="h4" gutterBottom>
                Existing Rules
            </Typography>
            {rules.length ? (
                <List>
                    {rules.map((rule) => (
                        <ListItem key={rule._id}>
                            <ListItemText
                                primary={`${rule.name} (ID: ${rule._id})`}  // Display Rule Name and Rule ID
                                secondary={buildConditionString(rule.root) || 'Complex Rule'}  // Use helper to build condition string
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No rules available. Create one!</Typography>
            )}
        </div>
    );
};

export default RuleList;
