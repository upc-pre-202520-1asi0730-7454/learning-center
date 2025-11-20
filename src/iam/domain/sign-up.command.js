/**
 * Sign up Command
 * @summary
 * Represents a sign-up command. This is used to register a user.
 */
export class SignUpCommand {
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