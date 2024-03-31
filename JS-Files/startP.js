const readlineSync = require("readline-sync");
const Page = require("./Page.js");

const RegisitionPage = require("../JS-Files/regP");
const LoginPage = require("../JS-Files/loginP");
let process = require("process");

class StartP extends Page {
  nextPage = 0;
  instructions = ["Register", "Login", "Exit"];
  printMenu() {
    console.log(`Options:
                    0. Register To Your Account.
                    1. Login to Your Acount.
                    2. Exit`);
  }

  goToReg() {
    this.nextPage = 2;
  }
  goToLogin() {
    this.nextPage = 3;
  }
  goToExit() {
    this.nextPage = -1;
  }
  readOption() {
    const option = readlineSync.question("Enter option number: ");
    if (option < 3) this.run(this.instructions[option]);
    return this.nextPage;
  }
  run(theAction) {
    console.log(theAction);
    switch (theAction) {
      case "Register":
        this.goToReg();
        break;
      case "Login":
        this.goToLogin();
        break;
      case "Exit":
        this.goToExit();
        break;
      default:
        this.nextPage = 0;
        break;
    }
  }
}

module.exports = StartP;
