const readlineSync = require("readline-sync");
const DB = require("../JS-Files/ourDataBase");
const Page = require("../JS-Files/Page.js");
const VenuePage = require("../JS-Files/venue.js");
const SharedData = require("../JS-Files/SharedData");

class ProfilePage extends Page {
  nextPage = 0;

  instructions = [
    "Reservation",
    "my account",
    "notification",
    "Logout",
    "return",
  ];

  isDateInRange(dateToCheck, startDate, endDate) {
    const dateToCheckMs = new Date(dateToCheck).getTime();
    const startDateMs = new Date(startDate).getTime();
    const endDateMs = new Date(endDate).getTime();

    return dateToCheckMs >= startDateMs && dateToCheckMs <= endDateMs;
  }

  readOption() {
    const option = readlineSync.question("Enter option number: ");
    if (option < 5) this.run(this.instructions[option]);
    return this.nextPage;
  }
  logout() {
    this.nextPage = 1;
  }
  displayRevelation(email) {
    DB.reservationMap.forEach((value, key) => {
      if (
        value != undefined &&
        value.email != undefined &&
        email != undefined &&
        value.email == email
      ) {
        console.log(
          `${VenuePage.makeCol(key)}  | ${VenuePage.makeCol(
            value.email
          )} | ${VenuePage.makeCol(value.id)} | ${VenuePage.makeCol(
            value.startTime
          )} | ${VenuePage.makeCol(value.endTime)} | ${VenuePage.makeCol(
            value.startDate
          )} |  ${VenuePage.makeCol(value.endDate)} |`
        );
      }
    });
  }
  myAccount() {
    this.nextPage = 8;
  }
  displayNotification() {
    DB.reservationMap.forEach((value, key) => {
      let emailChecker;
      if (SharedData.readFromMain) {
        emailChecker = SharedData.email;
      } else {
        emailChecker = "asemhesham@gmail.com";
      }

      if (value.email == emailChecker) {
        let date1 = value.startDate;
        let date2 = value.endDate;
        let time1 = value.startTime;
        let time2 = value.endTime;

        const [year1, month1, day1] = date1.split("-").map(Number);
        const [year2, month2, day2] = date2.split("-").map(Number);

        const [hours1, minutes1] = time1.split(":").map(Number);
        const [hours2, minutes2] = time2.split(":").map(Number);

        const date1Obj = new Date(year1, month1 - 1, day1, hours1, minutes1);
        const date2Obj = new Date(year2, month2 - 1, day2, hours2, minutes2);

        let currentTime = new Date();
        let oneDayLater = new Date();

        oneDayLater.setDate(currentTime.getDate() + 1);

        if (this.isDateInRange(currentTime, date1Obj, oneDayLater)) {
          console.log(
            `the reverition will start soon ${VenuePage.makeCol(
              key
            )}  | ${VenuePage.makeCol(value.email)} | ${VenuePage.makeCol(
              value.id
            )} | ${VenuePage.makeCol(value.startTime)} | ${VenuePage.makeCol(
              value.endTime
            )} | ${VenuePage.makeCol(value.startDate)} |  ${VenuePage.makeCol(
              value.endDate
            )} |\n`
          );
        } else if (this.isDateInRange(currentTime, oneDayLater, date2Obj)) {
          console.log(
            `the reverition will finish soon ${VenuePage.makeCol(
              key
            )}  | ${VenuePage.makeCol(value.email)} | ${VenuePage.makeCol(
              value.id
            )} | ${VenuePage.makeCol(value.startTime)} | ${VenuePage.makeCol(
              value.endTime
            )} | ${VenuePage.makeCol(value.startDate)} |  ${VenuePage.makeCol(
              value.endDate
            )} |\n`
          );
        }
      }
    });
  }

  returnBack() {
    this.nextPage = 4;
  }
  printMenu() {
    console.log(`
        select the button by enter the number: 
            0: Revelation
            1: my account
            2: notifycation
            3: logout
            4: return
        `);
  }

  run(theButton) {
    switch (theButton.trim()) {
      case "Reservation":
        this.displayRevelation(SharedData.email);
        break;
      case "my account":
        this.myAccount();
        break;
      case "notification":
        this.displayNotification();
        break;
      case "Logout":
        this.logout();
        break;
      case "return":
        this.returnBack();
        break;
      default:
        console.log("in invalid input case");
    }
  }
}

module.exports = ProfilePage;
