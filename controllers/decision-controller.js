const relationshipRepository = require('../data/decision-repository');

async function createDecisionPoint(req, res) {
  const { fromKey, fromValue, toLabel, toKey, toValue, type } = req.params;
  const props = req.body;
  try {
    const relationship = await relationshipRepository.createDecisionPoint(
      fromKey, fromValue,
      toLabel, toKey, toValue,
      type, props
    );
    res.status(201).json(relationship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDecisionPoints(req, res) {
  const { fromKey, fromValue, toLabel, toKey, toValue } = req.params;
  try {
    const relationships = await relationshipRepository.getDecisionPoints(
      fromKey, fromValue,
      toLabel, toKey, toValue
    );
    if (!relationships || relationships.length === 0) {
      return res.status(404).json({ error: 'Relationship not found' });
    }
    res.json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createDecisionPoint,
  getDecisionPoints,
};
