const readlineSync = require("readline-sync");
const DB = require("../JS-Files/ourDataBase");
const Page = require("../JS-Files/Page");
const Server = require("../main");
const SharedMemory = require("../JS-Files/SharedData");

class LoginP extends Page {
  state = "admin";

  password = null;
  email = null;

  userObject = "";

  cache = {
    email: "",
    password: "",
  };

  nextPage = 0;
  systemMsg = "";

  printSubmitManu() {
    console.log(`Options: 
                  0. submit.
                  1. cancel`);
  }
  printMenu(){
    console.log(`Options: 
        0. Login to your account
        1. return to start page`);
  }

  submitManu(option) {
    switch (String(option)) {
      case "0":
        this.checkEmailAndPassword(this.cache.email, this.cache.password);
        break;
      case "1":
        console.clear();
        break;
      default:
        console.log("invalid data input");
        break;
    }
  }

  enterEmailAndPassword() {
    this.cache.email = readlineSync.question("Enter Your Email:");
    this.cache.password = readlineSync.question("Enter Your Password:");
    this.userObject = DB.userMap.get(this.cache.email);
    this.setEmail(this.cache.email);
    this.setPassword(this.cache.password);
    this.printSubmitManu();
    let option = readlineSync.question();
    this.submitManu(option);
  }
  instructions = ["login", "return"];

  clicks(scenario) {
    switch (scenario.trim()) {
      case "login":
        this.enterEmailAndPassword();
        break;
      case "return":
        this.goToStartingPage();
        break;
      default:
        console.log("Invalid option. Please choose an existed option");
    }
  }

  checkEmailAndPassword(email, password) {
    this.cache.email = email;
    this.cache.password = password;
    let user = DB.userMap.get(this.cache.email);
    if (user != undefined) {
      if (this.cache.password == user.password) {
        let tempState = this.getState();
        this.email = this.cache.email;
        this.password = this.cache.password;
        SharedMemory.email = email;
        switch (tempState) {
          case "admin":
            this.systemMsg = "Admin Successfully Login\n";
            this.goToAdminPage();
            break;
          case "user":
            this.systemMsg = "User Successfully Login\n";
            this.goToUserPage();
            break;
          default:
            w;
            break;
        }
      } else {
        this.systemMsg = "incorrect password\n";
      }
    } else {
      this.systemMsg = "this email doesnt exist\n";
    }
    console.log(this.systemMsg);
  }

  goToStartingPage() {
    this.nextPage = 1;
    Server.username = this.email;
  }

  goToUserPage() {
    this.nextPage = 4;
    Server.username = this.email;
  }
  goToAdminPage() {
    this.nextPage = 7;
    Server.username = this.email;
  }
  goToLoginPage() {
    this.nextPage = 3;
  }

  getState() {
    return DB.userMap.get(this.cache.email).type;
  }
  setPassword(password) {
    this.cache.password = password;
  }
  setEmail(email) {
    this.cache.email = email;
  }
  getEmail() {
    return this.email;
  }

  readOption() {
    const option = readlineSync.question("Enter option number: ");
    if (option < 2) this.clicks(this.instructions[option]);
    return this.nextPage;
  }
}

module.exports = LoginP;
