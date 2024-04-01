const readlineSync = require("readline-sync");
const DB = require("../JS-Files/ourDataBase");
const SharedData = require("../JS-Files/SharedData.js");
const Page = require("./Page.js");


class RegP extends Page {
  username = null;
  email = null;
  password = null;
  option = 0;

  goToLogin = 0;

  cache = {
    email: "",
    username: "",
    password: "",
  };

  nextPage = 0;
  instructions = ["Start Reg", "go to login page", "return to start page"];

  usernameValidity(username) {
    if (username.length > 3) {
      return true;
    } else {
      console.log("Try to enter a username with more than 3 characters.");
      return false;
    }
  }
  emailAlreadyTaken(email) {
    return DB.userMap.get(email) == undefined;
  }

  emailValidity(email) {
    if (
      email.includes("@") &&
      email.endsWith(".com") &&
      this.emailAlreadyTaken(email)
    ) {
      return true;
    } else if (this.emailAlreadyTaken(email)) {
      console.log("Error: this email already taken");
      return false;
    } else {
      console.log("Error: invalid data input");
      return false;
    }
  }
  passwordValidity(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      return true;
    } else{
      console.log(`"Warning: Your password is weak!
                   For a stronger password:
                   - Use a combination of uppercase and lowercase letters.
                   - Include numbers and special characters (e.g., !@#$%^&*()).
                   - Aim for at least 8 characters in length.`);
      return false;
    }
  }

  fillData() {
    this.email = this.cache.email;
    this.username = this.cache.username;
    this.password = this.cache.password;
    if (this.password != "" && this.username != "" && this.email != "") {
      DB.insertUser(this.email, this.username, this.password, "user");
      this.nextPage = 1;
    }
    this.nextPage = 0;
  }
  setName(username) {
    this.cache.username = username;
    return this.usernameValidity(username);
  }
  setPassword(password) {
    this.cache.password = password;
    return this.passwordValidity(password);
  }
  setEmail(email) {
    this.cache.email = email;
    return this.emailValidity(email);
  }

  readTheData() {

    let email ;
    let username;
    let password;
    if(SharedData.readFromMain){
      email = readlineSync.question("Enter Your Email: ");
      username = readlineSync.question("Enter Your Name: ");
      password = readlineSync.question("Enter Your Password: ");
    }else{
      email = "ahmad301@gmail.com";
      username = "ahamdD";
      password = "123Ss@@123";
    }
    if (
      this.emailValidity(email) &&
      this.usernameValidity(username) &&
      this.passwordValidity(password)
    ) {
      this.setName(username);
      this.setPassword(password);
      this.setEmail(email);
      this.printSubmitManu();
      const submit = readlineSync.question("Enter submit to complete: ");
      this.submitMenu(submit);
    }

  }

  submitMenu(option) {
    switch (String(option)) {
      case "0":
        this.fillData();
        break;
      case "1":
        console.clear();
        break;
      default:
        break;
    }
  }
  printSubmitManu() {
    console.log(`Options:
                  0. submit.
                  1. cancel`);
  }

  goToLoginPage() {
    this.goToLogin = 1;
    this.nextPage = 3;
  }

  goToStartPage() {
    this.goToLogin = 0;
    this.nextPage = 1;
  }

  clicks(scenario) {
    switch (scenario.toLowerCase().trim()) {
      case "start reg":
        this.readTheData();
        break;
      case "go to login page":
        this.goToLoginPage();
        break;
      case "return to start page":
        this.goToStartPage();
        break;
      default:
        console.log("Invalid option. Please choose an existed option");
    }
  }

  readOption() {
    const option = readlineSync.question("Enter option number: ");
    if (option < 3) this.clicks(this.instructions[option]);
    return this.nextPage;
  }
  printMenu() {
    console.log(`Options:
                  0. Start Reg
                  1. Go to login page
                  2. Go to start page`);
  }
}

module.exports = RegP;
