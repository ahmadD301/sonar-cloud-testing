const { Given, When, Then } = require("@cucumber/cucumber");
const DB = require("../JS-Files/ourDataBase");
DB.init();

Given("the admin in admin page", function () {});

When("admin clicks {string} options", function (string) {});

Then("display all user information to the admin", function () {});

When("enter user email to delete", function () {});

When("enter unexisteing user email to delete", function () {});

When("the admin fill data to update", function () {});

When("enter unexisteing user email to update", function () {});

When("the user enters invalid integer in admin Page {int}", function (int) {});

Then("return user to admin page", function () {});

When(
  "the user enters invalid integer in admin Page {string}",
  function (string) {}
);

Then("send the admin to Starting page", function () {});
