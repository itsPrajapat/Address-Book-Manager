const prompt = require('prompt-sync')({sigint: true});
const chalk = require("chalk")

function isValidPhoneNumber(phoneNumber) {
    const phonePattern = /^[1-9]\d{9}$/; 
    return phonePattern.test(phoneNumber);
}

class Contact {
    constructor(name, mobileNumber) {
      this.name = name;
      this.mobileNumber = mobileNumber;
    }
  }

  
  class AddressBook {
    constructor() {
      this.contacts = [];
    }
  
    addContact() {
        let name = prompt(chalk.blue("Enter the name of the user you want to add : "));
        name = name.trim();
        if(name.length<3){
            console.log(chalk.red("\nName should contain at least 3 characters"));
            return;
        }
        let mobileNumber = prompt(chalk.blue("Enter the mobile number of the user you want to add : "));
        if(!isValidPhoneNumber(mobileNumber)){
            console.log(chalk.red("\nPlease enter the valid phone number"));
            return;
        }
      const isDuplicate = this.contacts.some(
        (contact) => contact.mobileNumber === mobileNumber
      );
      if (!isDuplicate) {
        const newContact = new Contact(name, mobileNumber);
        this.contacts.push(newContact);
        console.log(chalk.green(`\nContact ${chalk.bold(name)} added successfully!!!`));
      } else {
        console.log(chalk.red(`Mobile number ${chalk.bold(mobileNumber)} already exists!`));
      }
    }
  
    viewAllContacts() {
        if(this.contacts.length==0){
            console.log(chalk.yellow("There is no user in the Address Book"));
            return;
        }
        const sortedContacts = this.contacts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        console.log(chalk.rgb(255,165,0)("All Contacts : "));
        sortedContacts.forEach((contact) => console.log("    ",chalk.bold(contact.name), chalk.bold(contact.mobileNumber)));
    }
  
    filterContactsByName() {
        if(this.contacts.length==0){
            console.log(chalk.yellow("There is no user in the Address Book"));
            return;
        }
        const name = prompt(chalk.blue("Enter the name you want to filter with : "))
        const filteredContacts = this.contacts.filter((contact) =>
            contact.name.toLowerCase().includes(name.toLowerCase())
        );
        console.log(chalk.rgb(255,165,0)(`Filtered Contacts with name '${chalk.bold(name)}':`));
        filteredContacts.forEach((contact) => console.log("    ",chalk.bold(contact.name), chalk.bold(contact.mobileNumber)));
    }
  
    filterContactsByMobileNumber() {
        if(this.contacts.length==0){
            console.log(chalk.yellow("There is no user in the Address Book"));
            return;
        }
        const mobileNumber = prompt(chalk.blue("Enter the mobile number you want to filter with : "))
        const filteredContacts = this.contacts.filter(
            (contact) => contact.mobileNumber.includes(mobileNumber)
        );
        console.log(chalk.rgb(255,165,0)(`Filtered Contacts with mobile number '${chalk.bold(mobileNumber)}':`));
        filteredContacts.forEach((contact) => console.log("    ",chalk.bold(contact.name), chalk.bold(contact.mobileNumber)));
    }
  
    editContact() {
        let name = prompt(chalk.blue('Enter the name of the user whose details you want to update : '))
        name = name.trim()
        const newMobileNumber = prompt(chalk.blue('Enter the new mobile number : '))
        if(!isValidPhoneNumber(newMobileNumber)){
            console.log(chalk.red("\nPlease enter the valid phone number"));
            return;
        }
        const contactIndex = this.contacts.findIndex(
            (contact) => contact.name === name
        );
        if (contactIndex !== -1) {
            const isDuplicate = this.contacts.some(
            (contact) => contact.mobileNumber === newMobileNumber
            );
            if (!isDuplicate) {
            this.contacts[contactIndex].mobileNumber = newMobileNumber;
            console.log(chalk.green(`Contact ${chalk.bold(name)} updated successfully!`));
            } else {
            console.log(chalk.red(`Mobile number ${chalk.bold(newMobileNumber)} already exists!`));
            }
        } else {
            console.log(chalk.red(`Contact ${chalk.bold(name)} not found!`));
        }
    }
  
    deleteContact() {
        let name = prompt(chalk.blue("Enter the name of the user you want to delete : "))
        name = name.trim()
        const contactIndex = this.contacts.findIndex(
            (contact) => contact.name === name
        );
        if (contactIndex !== -1) {
            this.contacts.splice(contactIndex, 1);
            console.log(chalk.green(`Contact ${chalk.bold(name)} deleted successfully!`));
        } else {
            console.log(chalk.red(`Contact ${chalk.bold(name)} not found!`));
        }
    }
  }
  

  const addressBook = new AddressBook();

let isRunning = true;

while (isRunning) {
    console.log("\n");
  console.log(chalk.bold("Enter a choice (1-7): \n1. Add a new user\n2. View All contacts\n3. Filter contacts by name\n4. Filter contacts by mobile number\n5. Edit the user\n6. Delete user\n7. Exit\n"));

  const choice = prompt();

  switch (choice) {
    case "1":
        addressBook.addContact();
        break;

    case "2":
        addressBook.viewAllContacts();
        break;

    case "3":
        addressBook.filterContactsByName();
        break;

    case "4":
        addressBook.filterContactsByMobileNumber();
        break;

    case "5":
        addressBook.editContact();
        break;

    case "6":
      addressBook.deleteContact();
      break;

    case "7":
        console.log(chalk.rgb(40, 55, 71)(chalk.bold("Thanks :)")))
        isRunning = false;
        break;

    default:
        console.log(chalk.red("Enter the number between 1 to 7 only !!"));
        break;
  }
}
