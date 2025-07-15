const nodeRepository = require('../data/reality-repository');

async function createReality(req, res) {
  const props = req.body;
  try {
    const node = await nodeRepository.createReality(props);
    res.status(201).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getReality(req, res) {
  const { key, value } = req.params;
  try {
    const node = await nodeRepository.getReality(key, value);
    if (!node) return res.status(404).json({ error: 'Not found' });
    res.json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateReality(req, res) {
  const { key, value } = req.params;
  const newProps = req.body;
  try {
    const node = await nodeRepository.updateReality(key, value, newProps);
    if (!node) return res.status(404).json({ error: 'Not found' });
    res.json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteReality(req, res) {
  const { key, value } = req.params;
  try {
    const deleted = await nodeRepository.deleteReality(key, value);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createReality,
  getReality,
  updateReality,
  deleteReality,
};
