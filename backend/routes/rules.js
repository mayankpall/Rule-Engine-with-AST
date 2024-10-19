const express = require('express');
const router = express.Router();
const { createRuleController, combineRulesController, updateRuleController, evaluateRuleController } = require('../controllers/ruleController');
const Rule = require('../models/Rule');  // Import Rule model

// Route to create a rule
router.post('/create', createRuleController);

// Route to combine rules
router.post('/combine', combineRulesController);

// Route to update a rule
router.patch('/update-rule/:id', updateRuleController);

// Route to evaluate a rule
router.post('/evaluate/:id', evaluateRuleController);

router.get('/', async (req, res) => {
  try {
      // Populate 'root', and also populate the 'left' and 'right' fields of the root
      const rules = await Rule.find()
          .populate({
              path: 'root',
              populate: [
                  { path: 'left' },  // Populate 'left' node
                  { path: 'right' }  // Populate 'right' node
              ]
          });

      res.json(rules);  // Send the populated rules to the frontend
  } catch (error) {
      res.status(500).json({ error: 'Error fetching rules' });
  }
});

module.exports = router;
