const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');
const contactPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactPath);
  const allContacts = JSON.parse(data);
  if (!allContacts) { return null };
  return allContacts;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contactByID = data.find(elem => elem.id === contactId);
  if (!contactByID) { return null };
  return contactByID;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contactByID = data.find(elem => elem.id === contactId);
  if (!contactByID) return null;
  const removedContact = data.filter(el => el.id !== contactId);
  await fs.writeFile(contactPath, JSON.stringify(removedContact));
  return contactByID;
}

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(data));
  return newContact;
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};