const Page = require("../JS-Files/Page.js");
const DB = require("../JS-Files/ourDataBase.js");
const readlineSync = require("readline-sync");
const Server = require("../main");
const PrintData = require("../JS-Files/printData.js");
const sharedD = require("../JS-Files/SharedData.js");
DB.init();
let printData = new PrintData();

class AdminP extends Page {
  username = null;
  email = null;
  password = null;
  userType = null;
  nextPage = 0;
  instructions = ["delete user", "update user", "show user data", "logout"];
  printMenu() {
    console.log(`options:
                            0. Show User Data 
                            1. Update User
                            2. Delete User
                            3. Return`);
  }
  isValidInput(value) {
    return value != null && value != undefined && value.toString().trim() != "";
  }

  checkUser(eventID) {
    if (eventID != "" && eventID != undefined && eventID != null) {
      return DB.userMap.get(eventID) == undefined;
    }
    return false;
  }
  readData() {
    let email;
    let username;
    let password;
    let type;
    if (sharedD.readFromMain) {
      username = readlineSync.question("Enter user Name: ");
      password = readlineSync.question("Enter user password: ");
      type = readlineSync.question("Enter user type: ");
    } else {
      username = "patata";
      password = "211333";
      type = "user";
    }
    this.setName(username);
    this.setPassword(password);
    this.setType(type);
    this.editUser(this.email, username, password, type);
  }
  setName(username) {
    this.username = username;
  }
  setEmail(email) {
    this.email = email;
  }
  setPassword(password) {
    this.password = password;
  }
  setType(type) {
    this.userType = type;
  }
  deleteChecker(id) {
    if (!this.checkUser(id) && this.isValidInput(id)) {
      DB.userMap.delete(id);
      console.log("*User Deleted*");
    } else if (this.isValidInput(id)) {
      console.log("Error: this User dose not exist");
    } else {
      console.log("Error: try to delete user doesnt exist");
    }
  }
  deleteUser() {
    printData.printUserData(DB.userMap);
    let enterID;
    if (sharedD.readFromMain) {
      enterID = readlineSync.question("Enter user email to delete: ");
    } else {
      enterID = "asemhesham@gmail.com";
    }
    this.deleteChecker(enterID);
  }
  updateUser() {
    printData.printUserData(DB.userMap);
    let ID;
    if (sharedD.readFromMain) {
      ID = readlineSync.question("Enter user email to update: ");
    } else {
      ID = "ssm@gmail.com";
    }
    this.setEmail(ID);
    if (this.isValidInput(ID)) {
      this.readData();
    } else {
      console.log("Error: Invalid email");
    }
  }
  allInputsValidPase(email, username, password, type) {
    return (
      this.isValidInput(email) &&
      this.isValidInput(username) &&
      this.isValidInput(password) &&
      this.isValidInput(type)
    );
  }
  editUser(email, username, password, type) {
    if (!this.checkUser(email)) {
      DB.updateUser(email, username, password, type);
      console.log("*User Updated*");
    } else if (
      this.checkUser(email) &&
      this.allInputsValidPase(email, username, password, type)
    ) {
      console.log("Error: this user dose not exist");
    } else {
      console.log("Error: invalid data input, please check on your input");
    }
  }
  showUserData() {
    printData.printUserData(DB.userMap);
  }
  logout() {
    this.nextPage = 1;
  }
  clicks(scenario) {
    switch (scenario.trim()) {
      case "delete user":
        this.deleteUser();
        break;
      case "update user":
        this.updateUser();
        break;
      case "show user data":
        this.showUserData(); 
        break;
      case "logout":
        this.logout();
        break;
      default:
        console.log("Invalid option. Please choose an existed option");
    }
  }
  
  readOption() {
    const option = readlineSync.question("Enter option number: ");
    if (option < 4) this.run(this.instructions[option]);
    return this.nextPage;
  }
}

module.exports = AdminP;