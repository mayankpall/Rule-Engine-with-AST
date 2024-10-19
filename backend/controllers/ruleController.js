const { createRule, combineRules, updateRule, evaluateRule } = require('../services/ruleService');
const Rule = require('../models/Rule');

const createRuleController = async (req, res) => {
    try {
        const { ruleString } = req.body;
        const ruleNode = await createRule(ruleString);
        const newRule = await Rule.create({ root: ruleNode, name: req.body.name });
        res.json(newRule);
    } catch (error) {
        console.error('Error in createRuleController:', error);
        res.status(400).json({ error: error.message });
    }
};

const combineRulesController = async (req, res) => {
    try {
        const rules = await Rule.find({ _id: { $in: req.body.ruleIds } }).populate('root');
        const combinedNode = await combineRules(rules.map(r => r.root));
        res.json(combinedNode);
    } catch (error) {
        console.error('Error in combineRulesController:', error);
        res.status(400).json({ error: error.message });
    }
};

const updateRuleController = async (req, res) => {
    try {
        const updatedRule = await updateRule(req.params.id, req.body);
        res.json(updatedRule);
    } catch (error) {
        console.error('Error in updateRuleController:', error);
        res.status(400).json({ error: error.message });
    }
};

const evaluateRuleController = async (req, res) => {
    try {
        const ruleId = req.params.id;
        const userData = req.body.data;

        // Log incoming Rule ID and user data for debugging
        console.log('Evaluating Rule ID:', ruleId);
        console.log('User Data received:', userData);

        // Fetch the rule from the database
        const rule = await Rule.findById(ruleId).populate('root');

        if (!rule) {
            console.log('Rule not found:', ruleId);
            return res.status(404).json({ error: 'Rule not found' });
        }

        // Log the rule being evaluated
        console.log('Rule found:', rule);

        // Evaluate the rule using the user data
        const result = await evaluateRule(rule.root, userData);

        // Log the evaluation result
        console.log('Evaluation Result:', result);

        res.json({ result });
    } catch (error) {
        console.error('Error in evaluateRuleController:', error);
        res.status(400).json({ error: error.message });
    }
};


module.exports = { createRuleController, combineRulesController, updateRuleController, evaluateRuleController };
