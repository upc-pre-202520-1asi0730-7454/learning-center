/**
* SignInCommand
* @summary
* Represents a sign-in request. This is used to authenticate a user.
*/
export class SignInCommand {
    /**
     * Constructor
     * @param {string} username The username of the user.
     * @param {string} password The password of the user.
     */
    constructor({username, password}) {
        this.username = username;
        this.password = password;
    }
}