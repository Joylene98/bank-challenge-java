
class User {
    /**
     * The user class stores the personal information about the username, password and account id. 
     */
    
     // Properties of user:
     #username; 
     #password;
     #accountId;

     /**
     * @param {string} username The username 
     * @param {string} password The password 
     * @param {string} accountId The account Id
     *
     */

     constructor(username, password, accountId)
     {
        this.#username = username;
        this.#password = password;
        this.#accountId = accountId;
     }

     /**
     * Returns the username of a user
     * @returns The username 
     */
     getUsername()
     {
        return this.#username;
     }

     /**
      * Returns the password of a user
      * @returns The password
      */
     getPassword()
     {
        return this.#password;
     }

     /**
      * Returns the account id of an account
      * @returns The account id
      */    
     getAccountId()
     {
        return this.#accountId;
     }
    
}
export default User;