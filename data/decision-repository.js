const driver = require('./neo4j');

async function createDecisionPoint(fromKey, fromValue, toLabel, toKey, toValue, type, props = {}) {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (a:Reality {${fromKey}: $fromValue}), (b:${toLabel} {${toKey}: $toValue})
      CREATE (a)-[r:${type} $props]->(b)
      RETURN r
      `,
      { fromValue, toValue, props }
    );
    return result.records[0].get('r').properties;
  } finally {
    await session.close();
  }
}

async function getDecisionPoints(fromKey, fromValue, toLabel, toKey, toValue) {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (a:Reality {${fromKey}: $fromValue})-[r]->(b:${toLabel} {${toKey}: $toValue})
      RETURN type(r) as type, r
      `,
      { fromValue, toValue }
    );

    if (result.records.length === 0) return [];

    return result.records.map(record => ({
      type: record.get('type'),
      properties: record.get('r').properties,
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  createDecisionPoint,
  getDecisionPoints,
};
