const driver = require('./neo4j');

async function createReality(props) {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (n:Reality $props) RETURN n`,
      { props }
    );
    return result.records[0].get('n').properties;
  } finally {
    await session.close();
  }
}

async function getReality(key, value) {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (n:Reality {${key}: $value}) RETURN n`,
      { value }
    );
    if (result.records.length === 0) return null;
    return result.records[0].get('n').properties;
  } finally {
    await session.close();
  }
}

async function updateReality(key, value, newProps) {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (n:Reality {${key}: $value}) SET n += $newProps RETURN n`,
      { value, newProps }
    );
    if (result.records.length === 0) return null;
    return result.records[0].get('n').properties;
  } finally {
    await session.close();
  }
}

async function deleteReality(key, value) {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (n:Reality {${key}: $value}) DELETE n RETURN count(n) AS deletedCount`,
      { value }
    );
    return result.records[0].get('deletedCount').toInt() > 0;
  } finally {
    await session.close();
  }
}

module.exports = {
  createReality,
  getReality,
  updateReality,
  deleteReality,
};
