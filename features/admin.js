const { Given, When, Then } = require("@cucumber/cucumber");
const DB = require("../JS-Files/ourDataBase");
const AdminPage = require("../JS-Files/adminP");
const { email } = require("../JS-Files/SharedData");
let admin = new AdminPage();
DB.init();

Given("the admin in admin page", function () {
  admin.openPage();
});

When("admin clicks {string} options", function (string) {
  admin.printMenu();
  admin.clicks(string);
});

Then("display all user information to the admin", function () {
    admin.showUserData();
});

When("enter user email to delete", function () {
    admin.deleteUser();
});

When("enter unexisteing user email to delete", function () {
    emailData = 'ase@gmail.com';
    admin.setEmail(emailData);
    admin.deleteUser()
});

When("the admin fill data to update", function () {
    emailData = 'sayed@gmail.com';
    username = 'Soso Qa';
    password = "dddd";
    type = 'user'
    admin.setEmail(emailData);
    admin.setName(username);
    admin.setPassword(password);
    admin.setType(type);
});

When("enter unexisteing user email to update", function () {
    admin.updateUser();
});

When("the user enters invalid integer in admin Page {int}", function (int) {
    admin.clicks(String(int));
});

Then("return user to admin page", function () {
    admin.openPage();
});

When(
  "the user enters invalid integer in admin Page {string}",
  function (string) {
    admin.clicks(string);
  }
);

Then("send the admin to Starting page", function () {});
