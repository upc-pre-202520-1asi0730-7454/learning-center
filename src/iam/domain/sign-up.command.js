/**
 * @class SignUpCommand
 * @summary Represents a sign-up command in the IAM bounded context. Used to register a new user.
 */
export class SignUpCommand {
    /**
     * @param {Object} params - The sign-up parameters.
     * @param {string} params.username - The username of the user.
     * @param {string} params.password - The password of the user.
     */
    constructor({username, password}) {
        this.username = username;
        this.password = password;
    }
}