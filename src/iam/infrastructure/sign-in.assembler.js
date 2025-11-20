import {SignInResource} from "./sign-in.resource.js";

/**
 * @class SignInAssembler
 * @summary Assembler for converting sign-in API responses to resources.
 */
export class SignInAssembler {
    /**
     * @static
     * @param {Object} response - The API response object.
     * @param {number} response.status - The HTTP status code.
     * @param {string} response.statusText - The status text.
     * @param {Object} response.data - The response data.
     * @returns {SignInResource|null} The assembled SignInResource or null if error.
     */
    static toResourceFromResponse(response) {
        console.log(response);
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return null;
        }
        return new SignInResource(response.data);
    }
}