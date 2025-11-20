/**
 * @class SignUpResource
 * @summary Resource representing sign-up response data.
 */
export class SignUpResource {
    /**
     * @param {string} message - The response message.
     */
    constructor({message}) {
        this.message = message;
    }
}