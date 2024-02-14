import User from "../src/user.js"
import Account from "../src/account.js";
import Bank from "../src/bank.js";
import Transaction from "../src/transaction.js";
import TransactionHistory from "../src/transactionhistory.js";

// Access Test
describe("Access Test - ", function() {
    let user, bank, account;
    beforeEach(function() {
        // Arrange - Arranging setup for access test
        user = new User("js001", "orange4242");
        bank = new Bank();
        account = new Account(1232, "js001", "orange4242");
    });

    it("should allow a user can access an account with the correct login details", function() {
        // Act - Perform actions on setup tests
        bank.addAccount(account);
        // Assert - Checks login details matches with account 
        expect(bank.getAccount("js001", "orange4242")).toBe(account);

    });

    it("should not allow a user to access an account with the incorrect login details", function() {
       // Act - Adds an account into accounts array
        bank.addAccount(account);

        // Assert - Checks if the logins provided by the user are valid 
        expect(function() {
            bank.getAccount("js002", "orange4243");
        }).toThrowError("Invalid login details provided");

    });

})

// Deposit funds tests
describe("Deposit funds - ", function() {
    let user, bank, account, newBalance;
    beforeEach(function() {
        // Arrange - Set up tests
        user = new User("ms654", "lemon4322", 1672);
        bank = new Bank();
        account = new Account(1672, "ms654", "lemon4322", 0.00);
        newBalance = 0.00;

    });

    it("should allow a user to deposit funds into their account with the correct account Id", function() {
       // Act - Adds an account into accounts array & updates the balance of an account to 1000.00
        bank.addAccount(account);
        newBalance = bank.depositFundsRequest(1672, 1000.00);

        // Assert - Check to see if balance is updated.
        expect(newBalance).toBe(1000.00);
        
    });

    it("should not allow a user to deposit funds into their account with an incorrect account Id", function() {
        // Act - Adds an account into accounts array
        bank.addAccount(account);
      
        // Assert - Checks if the account id exists and throws an error if account id does not exist.
        expect(function() {
            bank.depositFundsRequest(1612, 200.00);
        }).toThrowError("Account ID: 1612 does not exist");

    });

    it("should update the account balance when a deposit is made", function() {
        //  Act -  Adds an account into accounts array & updates the balance of an account
        bank.addAccount(account);
        newBalance = bank.depositFundsRequest(1672, 1000.00);
        
        // Assert - Checks to see if the account balance is updated.
        expect(account.isBalanceUpdated(newBalance)).toBe(true);
    });

    it("should print an error message when a user makes a deposit of 0.00", function() {
         //  Act -  Adds an account into accounts array
         bank.addAccount(account);

         // Assert - Throws an error message if deposit amount is 0.
        expect(function() {
            bank.depositFundsRequest(1672, 0.00);
        }).toThrowError("Deposit amount must be greater than 0");

    });

    it("should print an error message when a user attempts to deposit a value that is not a number", function() {
         //  Act -  Adds an account into accounts array 
         bank.addAccount(account);

         // Assert - Thows an error message if deposit amount is not a number
        expect(function() {
            bank.depositFundsRequest(1672, "300k"); 
        }).toThrowError("Deposit amount is not a number");

    });

})

// Withdraw funds tests
describe("Withdraw funds - ", function() {
    let user, bank, account;
    beforeEach(function() {
        // Arrange - Set up tests
        user = new User("rh2123", "a9@Pslds", 2561);
        bank = new Bank();
        account = new Account(2561, "rh2123", "a9@Pslds", "0.00", false, 0.00);
    });

    it("should allow a user to withdraw an amount that is more than 0.00", function() {
         //  Act -  Adds an account into accounts array & deposit the 1000.00 and 2000.00 into the account
         bank.addAccount(account);
         bank.depositFundsRequest(2561, 1000.00);
         bank.depositFundsRequest(2561, 2000.00);

         // Assert - Checks to see if user is able to withdraw 500.00 from the account
         expect(bank.withdrawFundsRequest(2561, 500.00)).toBe(2500.00);

    });

     it("should not a user to withdraw 0.00", function() {
         //  Act -  Adds an account into accounts array & deposit the 1000.00 and 2000.00 into the account
         bank.addAccount(account);
         bank.depositFundsRequest(2561, 1000.00);
         bank.depositFundsRequest(2561, 2000.00);

         // Assert - Checks to see if user is able to withdraw 0.00 from the account
         expect(function() {
            bank.withdrawFundsRequest(2561, 0.00);
         }).toThrowError("Withdraw amount must be greater than 0");

    });

     it("should not allow a user to withdraw an amount less than 0.00", function() {
         //  Act -  Adds an account into accounts array & deposit the 1000.00 and 2000.00 into the account
         bank.addAccount(account);
         bank.depositFundsRequest(2561, 1000.00);
         bank.depositFundsRequest(2561, 2000.00);

         // Assert - Checks to see if user is able to withdraw -1.00 from the account
         expect(function() { 
            bank.withdrawFundsRequest(2561, -1.00);
         }).toThrowError("Withdraw amount must be greater than 0");

    });

    it("should allow a user to withdraw an amount that is less than their balance", function() {
         //  Act -  Adds an account into accounts array & deposit the 1000.00 into the account
         bank.addAccount(account);
         bank.depositFundsRequest(2561, 1000.00);

         // Assert - Checks to see if the user is able to withdraw 500.00 from the account
         expect(bank.withdrawFundsRequest(2561, 500.00)).toBe(account.getBalance());

    });

    it("should allow a user to withdraw an amount that is equal to their balance", function() {
         //  Act -  Adds an account into accounts array & deposit the 1000.00 into the account
         bank.addAccount(account);
         bank.depositFundsRequest(2561, 100.00);

         // Assert - Checks to see if the user is able to withdraw 100.00 from the account
         expect(bank.withdrawFundsRequest(2561, 100.00)).toBe(0.00);

    });

    it("should not allow a user to withdraw an amount that is greater than their balance", function() {
        // Act - Adds an account into the accounts array & deposit the 70.00 into the account
        bank.addAccount(account);
        bank.depositFundsRequest(2561, 70.00);

        // Assert - Throws an error when the user attempts to withdraw 100.00 from their account
        expect(function() {
        bank.withdrawFundsRequest(2561, 100.00); 
        }).toThrowError("Insufficient funds");

    });

    it("should not allow a user to withdraw an amount that is greater than their balance without overdraft facility applied on their account", function() {
        // Act - Adds an account into the accounts array & deposit the 50.00 into the account 
        bank.addAccount(account);
        bank.depositFundsRequest(2561, 50.00);

        //Assert - Throws an error when the user attempts to withdraw 100.00 from the account
        expect(function() {
            bank.withdrawFundsRequest(2561, 100.00);
        }).toThrowError("Insufficient funds");
    });

    it("should allow a user to withdraw an amount that is greater than their balance with overdraft facility applied on their account", function() {
        // Act - Adds an account into the accounts array, deposit the 100.00 into the account, enables the overdraft facility and assigns an overdraft limit of 300.00 
        bank.addAccount(account);
        bank.depositFundsRequest(2561, 100.00);
        account.enableOverdraft();
        account.setOverdraftLimit(300.00);

        //Assert - Checks to see if the user is able to withdraw 200.00 from the account with overdraft facility applied
        expect(bank.withdrawFundsRequest(2561, 200.00)).toBe(-100.00);
    });


    it("should allow a user to withdraw an amount that is less than their overdraft limit", function() {
        // Act - Adds an account into the accounts array, deposit the 80.00 into the account, enables the overdraft facility and assigns an overdraft limit of 100.00 
        bank.addAccount(account);
        bank.depositFundsRequest(2561, 80.00);
        account.enableOverdraft();
        account.setOverdraftLimit(100.00);

        //Assert - Checks to see if the user is able to withdraw 90.00 from the account when overdraft limit is 100.00
        expect(bank.withdrawFundsRequest(2561, 90.00)).toBe(-10.00);
    });

    it("should not allow a user to withdraw an amount that is more than their overdraft limit", function() {
        // Act - Adds an account into the accounts array, deposit the 200.00 into the account, enables the overdraft facility and assigns an overdraft limit of 100.00 
        bank.addAccount(account);
        bank.depositFundsRequest(2561, 200.00);
        account.enableOverdraft();
        account.setOverdraftLimit(100.00);

        //Assert - Throws an error when the user attempts to withdraw 320.00 from the account when overdraft limit is 100.00
        expect(function() {
            bank.withdrawFundsRequest(2561, 320.00);
        }).toThrowError("You have exceeded your overdraft limit");
    });
});

// Print tests
 describe("Print tests - ", function() {
    let user, bank, account, date, newDate, credit, debit, balance, transaction, transactionHistory, spyA, spyB;
    beforeEach(function() {
        // Arrange - Set up tests
        user = new User("rh2123", "a9@Pslds", 2561);
        bank = new Bank();
        account = new Account(2561, "rh2123", "a9@Pslds", "0.00", false, 0.00);
        date = new Date('2012/01/14');
        newDate = date.toLocaleDateString('en-GB');
        credit = 0.00;
        debit = 500.00;
        balance = 2500.00;
        transaction = new Transaction(newDate, credit, debit, balance);
        transactionHistory = new TransactionHistory();

    });
    
    // GitHub Copilot is used to help write this test
    it("should allow a user to print a statement", function() {
       // Act - adds transaction into transaction history & spies on transaction history method in print transaction history
        transactionHistory.addTransaction(transaction);
        spyOn(transactionHistory, 'printTransactionHistory');

        // Calls method 
        transactionHistory.printTransactionHistory();
        // Assert - Checks whether the print statement method is called
        expect(transactionHistory.printTransactionHistory).toHaveBeenCalled();
    });

 });


