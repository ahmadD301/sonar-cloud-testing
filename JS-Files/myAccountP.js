const readlineSync = require("readline-sync");
const DB = require("../JS-Files/ourDataBase");
const Page = require("../JS-Files/Page.js");
const Server = require("../main");
const SharedMemory = require("../JS-Files/SharedData");

class MyAccount extends Page {
  instructions = [
    "user info",
    "Create business account",
    "login business account",
    "return",
  ];

  userProfileInfo() {
    console.log("display user account info");
    console.log("|welcome " + SharedMemory.email + "|");
    console.log(DB.userMap.get(SharedMemory.email));
    DB.userMap.get(Server.UserEmail);
  }

  creatBusinessAccount() {
    this.nextPage = 9;
  }
  isNamePageExist(name) {
    let theFinalResult = false;
    if (name == undefined || name == null || name.trim() == "") return false;
    DB.BussinessAccountMap.forEach((value, key) => {
      if (name.trim() == value.PageName.trim()) {
        theFinalResult = true;
      }
    });
    return theFinalResult;
  }
  loginBusinessAccount(pageName) {
    this.loginAccount = true;
    console.log(pageName);
    console.log(this.isNamePageExist(pageName));
    if (this.isNamePageExist(pageName)) {
      this.nextPage = 10;
    } else if (pageName != null && pageName != undefined && pageName != "") {
      console.log("user enter: " + pageName);
      console.log("sorry ,we could not found your page");
      SharedMemory.bussinessID = SharedMemory.email;
    } else {
      console.log("invalid name input");
    }
  }
  returnBack() {
    this.nextPage = 6;
  }

  printMenu() {
    console.log(`
        select the button by enter the number: 
            0: user info
            1: Create business account
            2: login business account
            3: return
        `);
  }

  run(theAction) {
    switch (theAction.trim()) {
      case "user info":
        this.userProfileInfo();
        break;
      case "Create business account":
        this.creatBusinessAccount();
        break;
      case "login business account":
        let pageName;
        if (SharedMemory.readFromMain) {
          pageName = readlineSync.question("Enter page Name: ");
        } else {
          pageName = "Asem-Hesham";
        }

        this.loginBusinessAccount(pageName);
        break;
      case "return":
        this.returnBack();
        break;
      default:
        console.log("invalid input");
    }
  }
  readOption() {
    this.nextPage = 0;
    const option = readlineSync.question("Enter option number: ");
    if (option < 4) this.run(this.instructions[option]);
    return this.nextPage;
  }
}

module.exports = MyAccount;
