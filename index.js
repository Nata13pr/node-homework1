const { Command } = require("commander");
const program = new Command();
program
  .option("-c, --action <list>", "all contacts")
  .option("-i, --id <get>", "contact id")
  .option("-n, --name <add>", "user name")
  .option("-e, --email <add>", "user email")
  .option("-p, --phone <add>", "user phone")
  .option("-r, --remove <remove>", "contact remove");

program.parse(process.argv);

const argv = program.opts();

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with ${id} not fount`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        email,
        phone,
        name
      );
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
