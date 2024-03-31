Feature: User home page

    Scenario: going to event management page
        Given the User navicates into User page 
        When user enters "event management page" option
        Then transfere him to the Event Management page

    Scenario: open profile page
        Given the User navicates into User page 
        When user enters "profile page" option
        Then send User to Profile page

    Scenario: return to Start Page
        Given the User navicates into User page 
        When user enters "return" option
        Then redirect him from user page to Start Page

    Scenario Outline: Invalid input
        Given the User navicates into User page 
        When user enters invalid integer <input>
        Then the system display message to warn him
        And reture user to the user page
        Examples:
            | input |
            | 9     |
            | 'b'   |
            | -9    |


