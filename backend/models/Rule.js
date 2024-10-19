const mongoose = require('mongoose');

// Define the rule schema
const ruleSchema = new mongoose.Schema({
    root: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },  // Root node of the AST
    name: { type: String, required: true },  // Name of the rule
    createdAt: { type: Date, default: Date.now }
});

const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;
