const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const StartP = require("../JS-Files/startP");
let Start = new StartP();

Given("the user is in the startng page", function () {
  Start.openPage();
});
When("the user enters {string} option", function (string) {

  Start.run(string);
});

Then("transfere him to the registerion page with option", function () {
  Start.goToReg();
});


Then("transfere him to the login page with option {int}", function (int) {
  console.log(int)
  assert.equal(Start.nextPage , 3);
});


Then("exit the program with option {int}", function (int) {
    console.log('Exit from the system')
});

When('the user enters invalid integer {int}', function (int) {

  Start.run(String(int));
});
When('the user enters invalid integer {string}', function (string) {
  Start.run(string);
});

Then("display message to warn him", function () {
  console.log("invalid input");
});

Then("reture to the staring page", function () {
  Start.openPage();
  assert.equal(Start.nextPage , 0);

});