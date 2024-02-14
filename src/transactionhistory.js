class TransactionHistory
{
    /**
     * The transaction history class collects all the transaction made by a user and adds
     * it into a list so that it can be printed.
     */
    
     // Properties of transaction history class: 
     #transactions;

     /**
      * The constructor creates an array to store transactions.
      */
     constructor()
     {
        this.#transactions = [];
     }

     /**
     * Adds a transaction into the transactions list 
     * @param {Transaction} transaction A transaction object
     */
     addTransaction(transaction)
     {
        this.#transactions.push(transaction);
     }

    /**
     * Returns a transaction
     * @returns The transaction 
     */
     getTransactions()
     {
        return this.#transactions;
     }
    
    /**
     * Checks to see if there is a value for a specifc transaction.
     * If there is no value, it doesn't include anything in the transaction.
     * Otherwise, it prints all the details of the transaction.  
     * Positive balance should be printed in green and negative 
     * and debits are printed in red
     * The code is written with the assistance of GitHub Copilot
     */
     printTransactionHistory()
    {
        console.log("date       || credit  || debit   || balance");
        for(let i=this.#transactions.length -1; i>=0; i--)
        {
          
           if(this.#transactions[i].getCredit() == 0.00 && this.#transactions[i].getBalance() > 0)
           {
             console.log(this.#transactions[i].getDate() + ' || ' + '   '  + '     || ' +  '\x1b[31m' + this.#transactions[i].getDebit().toFixed(2) + '\x1b[0m'  + "  || " +  '\x1b[32m' +  this.#transactions[i].getBalance().toFixed(2)) + '\x1b[0m';
           }
           else {
            console.log(this.#transactions[i].getDate() + ' || ' + '\x1b[32m'   + this.#transactions[i].getCredit().toFixed(2)  + '\x1b[0m' + ' ||' +  '       ' + '  || ' +  this.#transactions[i].getBalance().toFixed(2));
           }
            
        }
    }
}

export default TransactionHistory;