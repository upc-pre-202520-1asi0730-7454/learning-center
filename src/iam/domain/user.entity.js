/**
 * @class User
 * @summary Represents a user entity.
 */
export class User {
    /**
     * @param {Object} params - The user parameters.
     * @param {string|number} params.id - The user ID.
     * @param {string} params.username - The username.
     */
    constructor({id, username}) {
        this.id = id;
        this.username = username;
    }
}