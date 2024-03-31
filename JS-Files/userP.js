const readlineSync = require("readline-sync");
const Page = require("../JS-Files/Page");
class UserP extends Page {
  nextPage = 0;
  instructions = ["event management page", "profile page", "return"];
  constructor() {
    super();
    this.openPage();
  }
  printMenu() {
    console.log(`Options: 
                  0. event management page
                  1. profile page
                  2. return to Start Page`);
  }

  goToEventPage() {
    this.nextPage = 5;
  }
  goToProfilePage() {
    this.nextPage = 6;
  }
  goToStartingPage() {
    this.nextPage = 1;
  }
  run(theAction) {
    switch (theAction) {
      case "event management page":
        this.goToEventPage();
        break;
      case "profile page":
        this.goToProfilePage();
        break;
      case "return":
        this.goToStartingPage();
        break;
      default:
        this.reopenPage();
        break;
    }
  }

  readOption() {
    const option = readlineSync.question("Enter option number: ");
    if (option < 3) this.run(this.instructions[option]);
    return this.nextPage;
  }

  reopenPage() {
    this.nextPage = 0;
  }
}

module.exports = UserP;
