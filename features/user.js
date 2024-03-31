const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const UserP = require("../JS-Files/userP");
let user = new UserP();

Given("the User navicates into User page", function () {
  user.openPage();
});

When("user enters {string} option", function (string) {
  user.run(string);
});

Then("transfere him to the Event Management page", function () {
  assert.equal(user.nextPage, 5);
});

Then("send User to Profile page", function () {
  assert.equal(user.nextPage, 6);
});

Then("redirect him from user page to Start Page", function () {
  assert.equal(user.nextPage, 1);
});

When("user enters invalid integer {int}", function (int) {
  user.run(String(int));
});

When("user enters invalid integer {string}", function (string) {
  user.run(string);
});

Then("the system display message to warn him", function () {
  console.log("invalid input");
});

Then("reture user to the user page", function () {
  user.reopenPage();
});
