const Node = require('../models/Node');
const Rule = require('../models/Rule');

// Function to create an AST from a rule string
const createRule = async (ruleString) => {
    try {
        const ast = parseRuleString(ruleString);  // Parse the rule string

        // Save the left and right operands (leaf nodes)
        const leftNode = await Node.create({
            type: 'operand',
            condition: ast.left.condition
        });

        const rightNode = await Node.create({
            type: 'operand',
            condition: ast.right.condition
        });

        // Save the parent operator node with references to the left and right ObjectIds
        const rootNode = await Node.create({
            type: 'operator',
            operator: ast.operator,
            left: leftNode._id,
            right: rightNode._id
        });

        return rootNode;
    } catch (error) {
        throw new Error('Invalid rule format. Please check your input.');
    }
};

// Utility function to parse the rule string into an AST structure
const parseRuleString = (ruleString) => {
    const tokens = ruleString.split(/\s+/);  // Tokenize the rule string
    if (tokens.length < 7) throw new Error('Invalid rule format');  // Basic validation

    const leftOperand = { type: 'operand', condition: `${tokens[0]} ${tokens[1]} ${tokens[2]}` };
    const operator = tokens[3];
    const rightOperand = { type: 'operand', condition: `${tokens[4]} ${tokens[5]} ${tokens[6]}` };

    return {
        type: 'operator',
        operator: operator,
        left: leftOperand,
        right: rightOperand
    };
};

// Combine two rules into a single AST
const combineRules = async (rules) => {
    const leftNode = await Node.findById(rules[0]._id);
    const rightNode = await Node.findById(rules[1]._id);

    const combinedNode = await Node.create({
        type: 'operator',
        operator: 'AND',
        left: leftNode._id,
        right: rightNode._id
    });

    return combinedNode;
};

// Function to update an existing rule
const updateRule = async (ruleId, updates) => {
    const rule = await Rule.findById(ruleId).populate('root');
    if (!rule) throw new Error('Rule not found');

    if (updates.operator) {
        rule.root.operator = updates.operator;
    }
    if (updates.leftCondition) {
        const leftNode = await Node.findById(rule.root.left);
        leftNode.condition = updates.leftCondition;
        await leftNode.save();
    }
    if (updates.rightCondition) {
        const rightNode = await Node.findById(rule.root.right);
        rightNode.condition = updates.rightCondition;
        await rightNode.save();
    }

    await rule.save();
    return rule;
};

// Helper function to validate allowed attributes
const validAttributes = ['age', 'department', 'salary', 'experience'];
const validateAttributes = (attribute) => {
    if (!validAttributes.includes(attribute)) {
        throw new Error(`Invalid attribute: ${attribute}. Allowed attributes: ${validAttributes.join(', ')}`);
    }
};

// Function to evaluate a rule against user data
const evaluateRule = async (node, data) => {
    const currentNode = await Node.findById(node._id).populate('left right');

    if (currentNode.type === 'operator') {
        const leftEval = await evaluateRule(currentNode.left, data);
        const rightEval = await evaluateRule(currentNode.right, data);

        if (currentNode.operator === 'AND') return leftEval && rightEval;
        if (currentNode.operator === 'OR') return leftEval || rightEval;
    } else if (currentNode.type === 'operand') {
        return evalCondition(currentNode.condition, data);
    }

    return false;
};

// Helper function to evaluate a condition
const evalCondition = (condition, data) => {
    let [attribute, operator, value] = condition.split(' ');

    // Remove any extra quotes around the attribute and value
    attribute = attribute.replace(/['"]+/g, '');  // Clean up quotes from the attribute
    value = value.replace(/['"]+/g, '');  // Clean up quotes from the value

    const userValue = data[attribute];

    if (userValue === undefined) {
        throw new Error(`Invalid attribute: ${attribute}. Allowed attributes: age, department, salary, experience`);
    }

    switch (operator) {
        case '>': return userValue > parseFloat(value);
        case '<': return userValue < parseFloat(value);
        case '=': return userValue == value;
        default: throw new Error(`Unsupported operator: ${operator}`);
    }
};

module.exports = { createRule, combineRules, updateRule, evaluateRule };
