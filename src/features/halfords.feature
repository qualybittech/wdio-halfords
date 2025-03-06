Feature: webtrends application tests for login
@Login
  Scenario Outline: As a customer user I can log into the webtrends application

    Given I am on the halfords website home page
    When I login with halfords <email>, <password>
    Then I check dashboard Booking orders contents
    Examples:
      | email                 | password    | 
      | premloyalty@gmail.com | Loyalty@1   | 