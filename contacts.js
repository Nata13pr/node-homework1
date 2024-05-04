const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  // const newContacts=contacts.filter((_,index)=>index!==idx);
  // await fs.writeFile(contactsPath,JSON.stringify(newContacts))
  // return contacts[idx]
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

async function addContact(email, phone, name) {
  const contactData = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactData);
  const newContact = { email, phone, name, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
