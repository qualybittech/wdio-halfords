Feature: Halfords application tests

  @Halfords  @1
  Scenario Outline: Check for product added in basket

    Given I am on the halfords website home page
    When I select the product and added to cart <product>,<size>,<color>,<location>
    Then I check in Basket <product>
    Examples:
       | size | color | product                  |location|
       |  L   |  Black| Halfords Transfer Helmet |Tw20 9dp|

  
  @Halfords  @1
  Scenario Outline: Check for pressure washer

    Given I am on the halfords website home page
    When I check for pressure washer and add to cart via pdp <product>,<location>,<locationCode>
    Then I check in Basket <product>
    Examples:
       | product                                 |location|locationCode                   |
       | Karcher K4 Power Control Pressure Washer|WD5 0TL| Halfords Store Hemel Hempstead |
 
  @Halfords 
  Scenario Outline: Check for product added in basket via Pdp

    Given I am on the halfords website home page
    When I add the product to cart via pdp <product>,<size>,<color>,<location>
    Then I check in Basket <product>
    Examples:
       | size | color | product                  |location|
       |  L   |  Black| Halfords Transfer Helmet |Tw20 9dp|

  @Halfords @2
  Scenario Outline: Check for VRN option

    Given I am on the halfords website home page
    When I add the VRN and add to cart via pdp <product>,<vrn>,<code>,<location>
    Then I check in Basket <product>
    Examples:
       | product                                              |       vrn  |    code            |location|
       | Yuasa HSB096 Silver 12V Car Battery 5 Year Guarantee |   RJ08UHX  |VOLKSWAGEN GOLF PLUS|WD5 0TL|
