const { Given, When, Then } = require("@cucumber/cucumber");
const LoginP = require("../JS-Files/loginP");
let login = new LoginP();

Given("the user is on the login page", function () {
  login.openPage();
});

When("the user enters valid data {string} and {int}", function (string, int) {
  login.checkEmailAndPassword(string, int);
});

When(
  "the user enters valid data {string} and {string}",
  function (string, string2) {
    login.checkEmailAndPassword(string, string2);
  }
);

When(
  "the user enters incorrect {string} or {string}",
  function (string, string2) {
    login.checkEmailAndPassword(string, string2);
  }
);

Then("redirect him to user or admin home page", function () {
  login.clicks("go to user page");
});

Then("display an message {string}", function (string) {
  console.log(string);
});

Then("refresh login page", function () {
  login.clicks("go to login page");
});

Then("back to starting page", function () {
  login.clicks("return to starting page");
});



When("user select {string} options in login page", function (string) {
  login.clicks("return to starting page");
});


Then("return him to login page", function () {
  login.openPage();
});
When("the user enters invalid integer in login Page {int}", function (int) {
  login.clicks(String(int));
});

When(
  "the user enters invalid integer in login Page {string}",
  function (string) {
    login.clicks(string);
  }
);



Then("display message {string}", function (string) {
  console.log(string);
});
