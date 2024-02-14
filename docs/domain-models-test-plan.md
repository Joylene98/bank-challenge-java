# Domain Models and Test Plan

### User Stories and Domain Models

User Story 1: As a user, I want to access my account so that I can view my account.

Domain Model for User Story 1:
| Objects              | Properties                 | Messages               | Outputs    |
| -------------------- | -------------------------- | ---------------------- |----------- |
| User                 | username @String           | getUsername()          | @String    |
|                      | password @String           | getPassword()          | @String    |
| Account              | username @String           | getUsername()          | @String    |
|                      | password @String           | getPassword()          | @String    |
|                      | accountId @String          | getAccountId()         | @Int       |
|                      | balance @Double            | getBalance()           | @Double    |
|                      |                            | getAccountInformation()| @Void      |
| Bank                 | accounts @Array[@Account]  | addAccount(@Account)   | @Void      |
|                      |                            | getAccount(@Account)   | @Account   |                             

User Story 2: As a user, I want to deposit funds into my account so that my balance can increase.

Domain Model for User Story 2:
| Objects              | Properties                 | Messages                          |  Outputs   |
| -------------------- | -------------------------- | --------------------------------- | ---------- |
| User                 | accountId @Int             | getAccountId()                    | @Int       |
| Account              | accountId @Int             | getAccountId()                    | @Int       |
|                      | balance @Double            | getBalance()                      | @Double    |
|                      |                            | increaseBalance(@Double)          | @Double    |
| Bank                 |                            | depositFundsRequest(@Int, @Double)| @Double    |



User Story 3: As a user, I want to withdraw an amount from my account so that I can use it.

Domain Model for User Story 3:
| Objects              | Properties                 | Messages                           | Outputs    |
| -------------------- | -------------------------- | ---------------------------------- | ---------- |
| User                 | accountId @Int             | getAccountId()                     | @Int       |
| Account              | accountId @Int             | getAccountId()                     | @Int       |
|                      | balance @Double            | getBalance()                       | @Double    |
|                      | overdraftEnabled @Boolean  | isOverdraftFacilityEnabled()       | @Boolean   |
|                      |                            | enableOverdraft()                  | @Void      |   
|                      | overdraftLimit @Double     | setOverdraftLimit(@Double)         | @Double    |
|                      |                            | getOverdraftLimit()                | @Double    |
|                      |                            | decreaseBalance(@Double)           | @Double    |
| Bank                 |                            | withdrawFundsRequest(@Int, @Double)| @Double    |


User Story 4: As a user, I want to print my statement so that I can view all my transaction on my account.

Domain Model for User Story 4:
| Objects              | Properties                       | Messages                    | Outputs    |
| -------------------- | -------------------------------  | --------------------------  | ---------- |
| Account              | balance @Double                  | getBalance()                | @Double    |
| Transaction          | date @Date                       | getDate()                   | @Date      |
|                      | credit @Double                   | getCredit()                 | @Double    |
|                      | debit @Double                    | getDebit()                  | @Double    |
|                      | balance @Double                  | getBalance()                | @Double    |
| Transaction History  | transactions @Array[@Transaction]| addTransaction(@Transaction)| @Void      |
|                      |                                  | printTransactionHistory()   | @Void      |     


### Test Cases
Test Cases for User Story 1:
- It should allow a user can access an account with the correct login details 
- It should not allow a user to access an account with the incorrect login details

Test Cases for User Story 2:
- It should allow a user to deposit funds into their account with the correct account Id
- It should not allow a user to deposit funds into their account with an incorrect account Id
- It should update the account balance when a deposit is made
- It should print an error message when a user makes a deposit of 0.00
- It should print an error message when a user attempts to deposit a value that is not a number

Test Cases for User Story 3:
- It should allow a user to withdraw an amount that is more than 0.00
- It should not a user to withdraw 0.00
- It should not allow a user to withdraw an amount less than 0.00
- It should allow a user to withdraw an amount that is less than their balance
- It should allow a user to withdraw an amount that is equal to their balance
- It should not allow a user to withdraw an amount that is greater than their balance
- It should not allow a user to withdraw an amount that is greater than their balance without overdraft facility applied on their account
- It should allow a user to withdraw an amount that is greater than their balance with overdraft facility applied on their account
- It should allow a user to withdraw an amount that is less than their overdraft limit
- It should not allow a user to withdraw an amount that is more than their overdraft limit

Test Cases for User Story 4:
- It should allow a user to print their statement

### Code Review

I did a code review of the production code provided on the account class, bank class and test class with the help of GitHub Copilot

<ins> **Account class - Using Math.floor method to set random values for overdraft limit:** </ins>

![overdraft method-before](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/633e2f17-3687-4991-a359-6bea964f0d98)



In my Account class, I had a method called setOverdraftLimit which is responsible for setting the overdraft limit of an account. When the method is called, it generates a random value between 100 to 500 for the overdraft limit using Math.floor method. Then it assigns the newly generated random overdraft value to the private overdraftLimit property in the account class. However, by doing this I realized that it wasn’t a good idea to use a random value for the overdraft as it can affect the outcome of the tests carried out. For instance, in the test class, I have a withdraw funds test that states, “it should allow a user to withdraw an amount that is less than their overdraft limit”. If the Math.floor method returns an overdraft value that is less than the withdrawal amount, this means that the test would fail, and the user would not be allowed to withdraw an amount. I also doubled checked with GitHub Copilot and asked:

![overdraft-question](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/dc5702bd-2939-45d3-902f-6d3f2981332f)

GitHub Copilot responded with:

![copilot-response1](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/3744cafe-f342-4ca8-bd60-432f443aac54)

I followed my instinct and took the advice of GitHub Copilot and got rid of the Math.floor method. Then I refactored the setOverdraftLimit method so that the overdraft limit would be set to the value passed into the parameter when called:

![refactored-code-overdraft2](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/5809f117-7a0e-48e4-b4fd-b844eb2dbb24)

The revised version of the setOverdraftLimit method sets the overdraft limit to be fixed to the value that is passed into the parameter. This ensures consistency for the overdraft tests; it means that the same value will be set for the overdraft which will not influence the outcome of any overdraft tests.

<ins> **Account class - Single responsibility** </ins>

![account-class-before1](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/aefe1d97-b802-43a0-b8f4-a01d7d114e3e)

In my Account class, initially I had account properties such as such as accountId, username, password, balance, overdraftEnabled bankName, and overdraftLimit. Also, I had user properties such as userFullName, userAddress and userTelephoneNumber. I thought that it would be helpful to have the user information on each account because then it would be easier to map each account to each user. However, the user properties were not used inside and outside of the Account class. Even Javascript indicated that that the user properties were unused. Additionally, it made the Account class to appear untidy and this version of the account class didn’t adhere to the Single Responsibility Principle. To ensure that the Account class followed the principle of Single Responsibility, I refactored the Account class to include properties that belonged to the class. This is the refactored version of the Account class:

![account-class-after2](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/3c780835-2f9b-4f0e-af2b-bf3ab0456651)


![account-class-gettermethods](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/e89da526-a793-407e-9f88-2296fbb58312)


This version of the Account class is an improvement over the unrevised version. This version only contains properties of an account. Also, each of the properties in the class is being used both within and outside the class. Also, it has getter methods for each of the properties. By refactoring the Account class, the class adheres to the Single Responsibility Principle. During the process, I removed properties that didn’t belong to the Account class to make the class to appear simple and less complicated. 

<ins> **Bank class** </ins>

![bank-class-before 1png](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/6a323d42-d60f-4eb3-8ec4-7c8a3d9323e2)

In my Bank class, I had a method called withdrawFundsRequest which takes a username, password, and the withdrawal amount. This method includes a forloop that iterates around the accounts array and checks if the username and password provided by the user matches for an account. If there is a match found, it processes the withdraw funds request and calls the decreaseBalance method to withdraw the amount from the account. If there is no match found, then it returns an error message. The loop contains a condition that deals with the overdraft facility by checking if an account has an overdraft and assigns an overdraft limit to an account if true. When reviewing the method, I noticed that the withdrawFundsRequest has multiple responsibilities such as validating the user and returning error messages. I aimed to simplify the code in the method so that it can make the code more efficient. I also considered, reordering the if statements, and reducing the use of nested if statement to reduce complexity. The order of the if statements was causing one of my tests to fail: 

![testfailed1](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/e57b0549-d764-4c10-9389-08f2a8524abd)

This test failed because I have an if statement which returns an error message when a user attempts to withdraw an amount greater than their balance. This test is supposed to permit the user to withdraw an amount from their account when they have the overdraft facility enabled. However, the second if statement which checks if the account has sufficient funds prevents the overdraft facility condition from being executed.
So, I asked GitHub Copilot:

![copilot-response2](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/61e3a3a0-1e49-4cdb-a1a0-4ced529fd10d)

GitHub Copilot responded with:

![copilot-response3](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/2f2ccd59-60c3-4fe5-b7af-377efc3000dc)

So, I refactored the code in the withdrawFundsRequest to adhere to the principles of clean code. Here is the refactored version of withdrawFundsRequest:

![refactored-code-withdrawrequest](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/1ebb412f-8648-42c2-aeb2-24ddc3844771)

I removed unnecessary code that wasn’t being used such as the loginValid property and the error message property. This helped to reduce the number of lines in my code. I also modified the values of the parameter to accept an account id and a withdrawal amount, thereby removing method’s responsibility of validating the user. The previous version of the method didn’t have a condition to check if the account Id entered exist and if the amount entered is a number. This version of the method helps to validate the user input as the user is restricted to the values they can enter for amount and accountId. Also, for the error messages, instead of returning a string for the error messages. I used the throw new Error code, as it is a good practice for me to throw error in a clean and conventional manner. Although, I couldn’t reduce the nested if statements however, I ensured that I organised the if statements in the correct order. This allowed the branch that checks for accounts with an overdraft facility to function which resulted to my test passing.

<ins>**The bank-test.spec.js file – throwError function**</ins> 

In my test file I had a test that returns an error message when a user attempts to withdraw an amount less than 0.00 from the account. This test passes as the method withdrawFundsRequest returns the error message “Invalid amount provided” specified in the toBe method. Upon reviewing the code, I aimed to modify the method so that it can throw an error message instead than returning a string that contains an error message. I needed clarity on how to modify the method, so I consulted GitHub Copilot.

![testbefore-refactoring3](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/e79c8457-8d05-4000-ba6b-f1361185e2de)

 
I asked GitHub Copilot:

![askquestion1](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/fdafc3e1-ee33-4bbb-a6a7-f305283e580d)


GitHub Copilot responded with:

![response1](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/999e94ec-f1f2-411d-b15f-a6bb7df54b85)

Then I implemented the toThrowError function onto my test to check whether the withdrawFundsRequest method throws an error of “Invalid amount provided”. After implementing the toThowError function, it returned an error of “Invalid amount provided” when a user tries to enter a negative amount.

![throwerror](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/476e0543-1ab4-4734-ada1-1435f57405c7)


I refactored this code from the previous version because the error message did not output the right error message. It does not inform the user that the withdraw amount needs to be greater than 0. Here is the updated version of the test:

![revisedversionoftest](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/cbddd541-1961-4047-bd5a-ecf760db43c4)


In this revised version, the test passes when an error message of “withdraw amount must be greater than 0” is thrown by the withdrawFundsRequest method when a user enters a value less than 0. 



### Kanban Board

**Backlog:**

![backlog-challenge2](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/0a9f26e6-3851-4e89-94c3-1ff2136c5f6b)

The screenshot shows the image of the board where I have created a card for a user story. The card has a start date and a end date which indicates when the implementation of the user story will begin and end.  This helped me to ensure that I completed the user story implementation on time. I also created two checklists: the test case checklist and the done checklist. This helped me to ensure that I implement tests for the test cases, and after doing so, I went through the done checklist to ensure that I have completed all the tasks necessary for this user story.

**To-do List:**

![todolist-challenge2](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/9e37ee0e-1eda-4648-a2fa-3ae79da2a668)

![activity](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/c26e3e39-f6ae-4b04-8917-277cfb5a41d3)


The screenshot shows the card I had in my to-do list. I had updated the deadline date for this card because I was slightly behind on providing the implementation for the tests. As I have been focusing on the other user stories and I wanted to ensure that I provided the tests for the core features of the application firstly. By moving the deadline date backward, it gave me more time to focus on this user story as well. 

**Doing List**

![doinglist-challenge2](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/8a20eab0-693c-4fea-9580-91f4ac130552)


![checklist-challenge2](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/9a628211-6146-439c-8ee5-77da24759b97)


The screenshot shows two cards in the doing list. It shows that I have completed some of the tasks within the test and done checklist. I updated the checklists regularly so that I know which tasks I have completed so far and which other tasks I had remaining to complete. Also, I updated the deadline date when I need to especially if I am not close to completing the tasks so that I have more time to complete it.

**Code Review List**

![codereview](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/2768eabc-a89d-4891-902f-dbd94b85f504)

The screenshot shows the code review list. It shows that I have completed most of the task associated with the user story. I conducted a code review on this user story to ensure that the code fulfils the needs of the requirements. Also, I ensured that my tests covers the areas of functionality and also removing any methods and properties that are not needed to execute this user story.

**Testing List**

![testingscreenshot](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/922c696e-cd5d-4d21-abec-332df761007c)

The screenshot shows the user stories that I will be testing. From the checklist, it shows that I have passed majority of the tests. I always ensure that I update the test checklist regularly so that it helps me to know which tests I have passed. That way I would not have to repeat a test again. I have pushed back the deadline date for the user stories so that I have enough time to complete them.

**Done List**

![done-checklist](https://github.com/digital-futures-academy-se-challenges/challenge-2-bank-Joylene98/assets/58665450/a5dc570b-ba13-4f72-a12b-77342776299c)

This screenshot shows all of the user stories I have completed. For each user story, I ensured that I went through the done checklist to verify that I have completed all the tasks. Also, I ensured that I doubled checked each tests making sure they provide functionality for the requirements before completing the user story. The done checklist helped me to ensure I stay on track on the implementation of the user stories and to ensure I provide tests that meets the needs of the test cases.

Link to Kanban board: https://trello.com/b/Xjs06yjm/challenge-2-bank-software-board
