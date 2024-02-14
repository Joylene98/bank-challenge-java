class Transaction {
    /**
     * The transaction class contains the details about each transaction such as
     * the date, the amount credited into the account, the amount removed from the account
     * and the balance of the account.
     */

     // The transaction properties: 
     #date; 
     #credit;
     #debit;
     #balance; 

     /**
     * The constructor of transaction
     * @param {Date} date The date of transaction
     * @param {double} credit The amount credited into the account
     * @param {double} debit The amount debited from the account
     * @param {double} balance The balance of the account
     */
     constructor(date, credit, debit, balance) {
        this.#date = date;
        this.#credit = credit;
        this.#debit = debit;
        this.#balance = balance;
     }
   
     /**
     * Returns the transaction date
     * @returns Date of transaction
     */
     getDate() {
        return this.#date;
     }

     /**
     * Returns the credited amount
     * @returns The amount credited into the account
     */
     getCredit() {
        return this.#credit;
     }

     /**
     * Returns the amount removed from the account
     * @returns The amount debited from the account
     */
     getDebit() {
        return this.#debit;
     } 
     /**
      * Returns the balance of an account
      * @returns The balance of an account
      */
     getBalance() {
        return this.#balance;
     }

}
export default Transaction;