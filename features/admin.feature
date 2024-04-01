Feature: Admin User Management

  Scenario: show all user
    Given the admin in admin page
    When admin clicks "show all user" options
    Then display all user information to the admin

  Scenario: delete user
    Given the admin in admin page
    When admin clicks "delete user" options
    And enter user email to delete
    Then display message "user deleted successfully"

  Scenario: delete unexisted user
    Given the admin in admin page
    When admin clicks "delete user" options
    And enter unexisteing user email to delete
    Then display message "Error: this email unexiste"

  Scenario: update user
    Given the admin in admin page
    When admin clicks "update user" options
    And the admin fill data to update
    Then display message "user updated successfully"

  Scenario: update unexisted user
    Given the admin in admin page
    When admin clicks "update user" options
    And enter unexisteing user email to update
    Then display message "Error: this email unexiste"

  Scenario Outline: Invalid input
    Given the admin in admin page
    When the user enters invalid integer in admin Page <input>
    Then display this message "invalid input enterd, plase inter again"
    And return user to admin page

    Examples: 
      | input |
      |    15 |
      | 's'   |
      |   -15 |

  Scenario: admin Logout
    Given the admin in admin page
    When admin clicks "logout" options
    Then send the admin to Starting page
