// Imports classes needed to run the program
import User from "../src/user.js";
import Account from "../src/account.js";
import Bank from "../src/bank.js";
import Transaction from "../src/transaction.js";
import TransactionHistory from "../src/transactionhistory.js";
class Index {
   
   /**
    * Runs the banking console application and demonstrates the user stories by using npm start
    */
   runProgram()
   {
        let user = new User("js001", "orange4242", 1232);
        let account = new Account(1232, "js001", "orange4242", 0.00);
        let bank = new Bank();
        let date1 = new Date("2012/01/10");
        let date2 = new Date("2012/01/13");
        let date3 = new Date("2012/01/14");
        let transactionHistory = new TransactionHistory();

        console.log("User wants to access an account");
        bank.addAccount(account);
        console.log("Bank requests for username and password for account");
        console.log("User provides username and password for account");
        console.log("Bank is fetching account requested...");
        bank.getAccount(user.getUsername(), user.getPassword());
        console.log("Bank confirms login details are valid, user is granted access");
        console.log("Welcome user " + user.getUsername() + " please find the account information about your account below");
        account.getAccountInformation();
        
        console.log("\n");

        console.log("User wants to deposit funds into an account");
        console.log("Bank requests for account id and the amount to deposit");
        console.log("User confirms the account id is " + user.getAccountId() + " and the amount is for " + 1000.00);
        bank.depositFundsRequest(user.getAccountId(), 1000.00);
        console.log("Bank is processing request...");
        console.log("Deposit request granted");
        console.log("Your balance is now: " + account.getBalance());


        let transaction1 = new Transaction(date1.toLocaleDateString('en-GB'), 1000.00, 0.00, 1000.00);
        transactionHistory.addTransaction(transaction1);



        console.log("\n");
        console.log("User wants to make another deposit into an account");
        console.log("Bank requests for account id and the amount to deposit");
        console.log("User confirms the account id is " + user.getAccountId() + " and the amount is for " + 2000.00);
        bank.depositFundsRequest(user.getAccountId(), 2000.00);
        console.log("Bank is processing request...");
        console.log("Deposit request granted");
        console.log("Your balance is now: " + account.getBalance());

        
        let transaction2 = new Transaction(date2.toLocaleDateString('en-GB'), 2000.00, 0.00, 3000.00);
        transactionHistory.addTransaction(transaction2);

        console.log("\n");
        console.log("User wants to withdraw funds from an account");
        console.log("Bank requests for account id and the amount to withdraw");
        console.log("User confirms the account id is " + user.getAccountId() + " and the amount is for " + 500.00);
        bank.withdrawFundsRequest(user.getAccountId(), 500.00);
        console.log("Bank is processing request...");
        console.log("Withdraw funds request granted");
        console.log("Your balance is now: " + account.getBalance());


        let transaction3 = new Transaction(date3.toLocaleDateString('en-GB'), 0.00, 500.00, 2500.00);
        transactionHistory.addTransaction(transaction3);

        console.log("\n");
        console.log("User wants to print out a statement");
        console.log("Bank is processing request...");
        console.log("Print request granted");
        transactionHistory.printTransactionHistory();

    

   }

}

let app = new Index();
app.runProgram();