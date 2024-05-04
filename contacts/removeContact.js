const listContacts = require("./listContacts");
const getAll = require("./listContacts");
const updateContacts = require("./updateContacts");

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  // const newContacts=contacts.filter((_,index)=>index!==idx);
  //  await updateContacts(newContacts)
  // return contacts[idx]
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
}

module.exports = removeContact;
