import {User} from "../domain/user.entity.js";

/**
 * @class UserAssembler
 * @summary Assembler for converting user resources to entities.
 */
export class UserAssembler {
    /**
     * @static
     * @param {Object} resource - The user resource.
     * @returns {User} The User entity.
     */
    static toEntityFromResource(resource) {
        return new User({...resource});
    }
    
    /**
     * @static
     * @param {Object} response - The API response object.
     * @param {number} response.status - The HTTP status code.
     * @param {string} response.statusText - The status text.
     * @param {Array|Object} response.data - The response data.
     * @returns {User[]} Array of User entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['users'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}