const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
const contactPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactPath);
  const allContacts = JSON.parse(data);
  return allContacts ? allContacts : null;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactPath);
  const allContacts = JSON.parse(data);
  const contactByID = await allContacts.find(elem => elem.id === contactId);
  return contactByID ? contactByID : null;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactPath);
  const allContacts = JSON.parse(data);
  const contactByID = allContacts.find(elem => elem.id === contactId);
  if (!contactByID) return null;
  const spliseContacts = allContacts.filter(el => el.id !== contactId);
  await fs.writeFile(contactPath, JSON.stringify(spliseContacts));
  return contactByID;
}

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  const data = await fs.readFile(contactPath);
  const allContacts = JSON.parse(data);
  allContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(allContacts));
  return newContact;
}

const contactsOperation = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsOperation;