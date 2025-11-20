/**
 * @class SignInResource
 * @summary Resource representing sign-in data.
 */
export class SignInResource {
    /**
     * @param {string|number} id - The user ID.
     * @param {string} username - The username.
     * @param {string} token - The authentication token.
     */
    constructor({id, username, token}) {
        this.id = id;
        this.username = username;
        this.token = token;
    }
}