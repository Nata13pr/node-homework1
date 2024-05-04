const listContacts = require("./listContacts");
const getContactById = require("./listContacts");

async function getContactById(contactId) {
  const data = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

module.exports = getContactById;
