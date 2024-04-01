const { Given, When, Then } = require("@cucumber/cucumber");
const LoginP = require("../JS-Files/loginP");
let login = new LoginP();

Given("the user is on the login page", function () {
  login.openPage();
  login.printMenu();
  login.clicks("return")
});

When(
  "the user enters valid data {string} and {string}",
  function (string, string2) {
    login.printSubmitManu();
    login.setEmail(string);
    login.setPassword(string2);
    login.submitManu('0');

  }
);

When(
  "the user enters incorrect {string} or {string}",
  function (string, string2) {
    login.printSubmitManu();
    login.setEmail(string);
    login.setPassword(string2);
    login.checkEmailAndPassword(login.cache.email, login.cache.password);
  }
);

Then("redirect him to user or admin home page", function () {
  login.goToUserPage();
});

Then("display an message {string}", function (string) {
  console.log(string);
});

Then("refresh login page", function () {
  login.goToLoginPage();
});

Then("back to starting page", function () {
  login.goToStartingPage();
});

When("user select {string} options in login page", function (string) {
  login.goToStartingPage();
  login.submitManu("1");
});

Then("return him to login page", function () {
  login.goToLoginPage();
});
When("the user enters invalid integer in login Page {int}", function (int) {
  login.clicks(String(int));
});

When(
  "the user enters invalid integer in login Page {string}",
  function (string) {
    login.clicks(string);
    login.submitManu("3");
  }
);

Then("display message {string}", function (string) {
  console.log(string);
});
