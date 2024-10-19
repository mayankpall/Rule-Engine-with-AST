const mongoose = require('mongoose');
const { createRule, combineRules, evaluateRule } = require('../services/ruleService');
const Node = require('../models/Node');
const Rule = require('../models/Rule');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ruleEngineTestDB');
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Node.deleteMany({});
    await Rule.deleteMany({});
});

describe('Rule Engine Tests', () => {
    test('should create a valid AST from a rule string', async () => {
        const ruleString = "age > 30 AND department = 'Sales'";
        const ast = await createRule(ruleString);

        expect(ast.type).toBe('operator');
        expect(ast.operator).toBe('AND');

        const leftNode = await Node.findById(ast.left);
        const rightNode = await Node.findById(ast.right);

        expect(leftNode.type).toBe('operand');
        expect(leftNode.condition).toBe('age > 30');

        expect(rightNode.type).toBe('operand');
        expect(rightNode.condition).toBe("department = 'Sales'");
    });

    test('should combine two rules into a single AST', async () => {
        const rule1 = await createRule("age > 30 AND department = 'Sales'");
        const rule2 = await createRule("salary > 50000 OR experience > 5");
        const combinedAST = await combineRules([rule1, rule2]);

        expect(combinedAST.type).toBe('operator');
        expect(combinedAST.operator).toBe('AND');

        const leftNode = await Node.findById(combinedAST.left);
        const rightNode = await Node.findById(combinedAST.right);

        expect(leftNode.type).toBe('operator');
        expect(rightNode.type).toBe('operator');
    });

    test('should evaluate a rule against user data', async () => {
        const rule = await createRule("age > 30 AND department = 'Sales'");
        const data = { age: 35, department: 'Sales' };
        const result = await evaluateRule(rule, data);
        expect(result).toBe(true);
    });
});
