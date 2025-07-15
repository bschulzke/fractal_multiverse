// src/app.js
require('dotenv').config();
const express = require('express');
const nodeController = require('./controllers/reality-controller');
const relationshipController = require('./controllers/decision-controller');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello, multiverse'));

app.post('/realities', nodeController.createReality);
app.get('/realities/:key/:value', nodeController.getReality);
app.put('/realities/:key/:value', nodeController.updateReality);
app.delete('/realities/:key/:value', nodeController.deleteReality);

app.post('/decisions/:fromKey/:fromValue/:toKey/:toValue/:type', relationshipController.createDecisionPoint);
app.get('/decisions/:fromKey/:fromValue/:toKey/:toValue', relationshipController.getDecisionPoints);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// Graceful shutdown
const driver = require('./data/neo4j');
process.on('SIGINT', async () => {
  console.log('Closing Neo4j driver...');
  await driver.close();
  process.exit(0);
});
