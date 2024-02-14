
class Bank {
     /**
     * The bank class is responsible for managing the user accounts in an array. 
     * It also executes request of depositing funds into an account and withdrawing funds 
     * from an account 
     */

     // The accounts property holds an array of accounts.
     #accounts;

     /**
      * Defines an array of accounts
      */
     constructor()
     {
        this.#accounts = [];
     }

     /**
      * Adds an account object into an array
      * @param {Object} account The account object
      */
     addAccount(account)
     {
        this.#accounts.push(account);
     }
     /**
     * Validates the login provided by the user. 
     * If the login doesn't match with the login in the account.
     * The method throws an error message. Otherwise, it returns an account.
     * @param  {string} username The username 
     * @param {string} password The password 
     * @returns An account object 
     */
     getAccount(username, password) 
     {
        for(let i=0; i<this.#accounts.length; i++)
        {
            if(this.#accounts[i].getUsername() == username && this.#accounts[i].getPassword() == password)
            {
                return this.#accounts[i];
            }
            else {
                throw new Error("Invalid login details provided");
            }
        }
     }
     /**
      * The method throws an error if amount entered is not a double. 
      * If the amount entered is less than or equal to 0. It will throws an error.
      * Otherwise, it increases the balance of the account when the previous conditions 
      * are false.
      * @param {int} accountId The account id of an account
      * @param {double} amount The deposit value
      * @returns The updated balance of the account
      */
     depositFundsRequest(accountId, amount)
     {
        const account = this.#accounts.find(accObj => accObj.getAccountId() == accountId);

        if(!account)
        {
            throw new Error("Account ID: " + accountId + " does not exist");
        }
        if(isNaN(amount))
        {
            throw new Error("Deposit amount is not a number");
        }
        else if(account && amount <= 0.00)
        {
            throw new Error("Deposit amount must be greater than 0");
        }
        else 
        {
            return account.increaseBalance(amount);
        }
     }

     /**
     * The method checks where there is an account id first. It throws 
     * an error message if account id does not exist. 
     * The method also throws an error when the amount entered is less than 0.00, 
     * not a double. 
     * Only allows the grants the withdraw request if the account has an overdraft,
     * facility enabled, if the account has sufficient funds and if the account's 
     * overdraft limit is not exceeded. Otherwise, the withdraw request cannot
     * be granted.
     * This code is written with the assistance of Generative AI.
     * @param {int} accountId The account Id
     * @param {double} amount The amount of the withdraw
     * @returns The value of the updated balance
     */
     withdrawFundsRequest(accountId, amount)
     {
        const account = this.#accounts.find(accObj => accObj.getAccountId() == accountId);
        
        if(!account)
        {
            throw new Error("Account ID: " + accountId + " does not exist");
        }

        if(amount <= 0.00)
        {
            throw new Error("Withdraw amount must be greater than 0");
        }

        if(isNaN(amount))
        {
             throw new Error("Withdraw amount must be a number ");
        }

        if(account.getBalance() >= amount)
        {
            return account.decreaseBalance(amount);
        }
        else if(account.getBalance() < amount && account.isOverdraftFacilityEnabled() == false)
        {
            throw new Error("Insufficient funds");
        }
        else 
        {
            const overdraftAmount = account.getOverdraftLimit();
            if(amount <= overdraftAmount)
            {
                return account.decreaseBalance(amount);
            }
            else {
                throw new Error("You have exceeded your overdraft limit");
            }
        }
        
}
}

export default Bank;
