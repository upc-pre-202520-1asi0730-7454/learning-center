/**
 * @class SignInCommand
 * @summary Represents a sign-in command in the IAM bounded context. Used to authenticate a user.
 */
export class SignInCommand {
    /**
     * @param {Object} params - The sign-in parameters.
     * @param {string} params.username - The username of the user.
     * @param {string} params.password - The password of the user.
     */
    constructor({username, password}) {
        this.username = username;
        this.password = password;
    }
}