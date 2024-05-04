const fs = require("fs/promises");

const filePath = require("./filePath");

async function listContacts() {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
}

module.exports = listContacts;
