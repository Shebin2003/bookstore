const fs = require('fs').promises;

async function readData(file) {
  try {
    const data = await fs.readFile(file, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

async function writeData(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
