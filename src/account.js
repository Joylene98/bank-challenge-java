class Account {
    /**
     * The account class stores information about each account such as the account id, 
     * the username & password for the account, balance and many more.
     */
     // Properties of the account class:
        #accountId; 
        #username;
        #password;
        #balance;
        #overdraftEnabled;
        #overdraftLimit;     
     /**
     * 
     * @param {int} accountId The accountID of the account  
     * @param {string} username The username of the account
     * @param {string} password The password of the account
     * @param {double} balance The balance of the account
     * @param {boolean} overdraftEnabled The overdraft status
     * @param {double} overdraftLimit The overdraft limit
     */       
     constructor(accountId, username, password, balance, overdraftEnabled, overdraftLimit)
     {
        this.#accountId = accountId;
        this.#username = username;
        this.#password = password;
        this.#balance = balance;
        this.#overdraftEnabled = overdraftEnabled;
        this.#overdraftLimit = overdraftLimit;
     }

     /**
     * Takes a deposit value and increases the balance of the account by its deposit value 
     * @param {double} depositVal The value of the deposit 
     * @returns The updated balance
     */
     increaseBalance(depositVal)
     {
        let oldBalance = Number(this.#balance);
        let depositValue = Number(depositVal); 
        this.#balance = oldBalance + depositValue;
        return this.#balance ;
     }

     /**
      * Takes a withdraw amount and decreases the balance of the account by the withdraw amount
      * @param {double} withdrawVal The withdraw amount
      * @returns The updated balance
      */ 
     decreaseBalance(withdrawVal)
     {
        this.#balance -= withdrawVal;
        return this.#balance ;
     }

     /**
     * Checks whether account balance is updated when a deposit or a withdraw is made
     * @param {double} newBalance The updated balance of the account
     * @returns True or false if account is updated
     */
     isBalanceUpdated(newBalance)
     {
        if(newBalance == this.#balance)
        {
            return true;
        }
        else {
            return false;
        }
     }

     /**
     * Returns the current state of the overdraft facility
     * @returns True or false if overdraft facility is enabled
     */
     isOverdraftFacilityEnabled()
     {
        return this.#overdraftEnabled;
     }

     /**
     *  Sets the overdraft facility to true when called
     */
     enableOverdraft()
     {
        this.#overdraftEnabled = true;
     }

     /**
     * Sets the overdraft limit specified by the parameter
     * @param {double} overdraftLimit The overdraft limit
     * @returns The overdraft limit
     */
     setOverdraftLimit(overdraftLimit)
     {
        this.#overdraftLimit = overdraftLimit;
        return this.#overdraftLimit;
     }
    
     /**
     * Returns the overdraft limit
     * @returns The overdraft limit
     */
     getOverdraftLimit()
     {   
        return this.#overdraftLimit;
     }
    
     /**
     * Returns the balance of the account
     * @returns The account balance
     */
     getBalance()
     {
        return this.#balance;
     }
    
     /**
     * Returns the account id 
     * @returns The account id
     */
     getAccountId()
     {
        return this.#accountId;
     }
     /**
     * Returns the username of the account
     * @returns The username of the account
     */
     getUsername()
     {
        return this.#username;
     }
    
     /**
     * Returns the password of the account
     * @returns The password of the account
     */
     getPassword()
     {
        return this.#password;
     }

    /**
     * Prints out information about account 
     */

      getAccountInformation()
      {
        console.log("Your username is  " + this.getUsername());
        console.log("Your password is  " + this.getPassword());
        console.log("Your account id is " + this.getAccountId());
        console.log("Your balance is " + this.getBalance());
      }
}
export default Account;