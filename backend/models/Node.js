const mongoose = require('mongoose');

// Define the AST node schema
const nodeSchema = new mongoose.Schema({
    type: { type: String, enum: ['operator', 'operand'], required: true },  // 'operator' or 'operand'
    operator: { type: String, enum: ['AND', 'OR'], default: null },  // Operator (if type is 'operator')
    condition: { type: String, default: null },  // Condition (if type is 'operand')
    left: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', default: null },  // Left child for operators
    right: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', default: null },  // Right child for operators
});

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;
