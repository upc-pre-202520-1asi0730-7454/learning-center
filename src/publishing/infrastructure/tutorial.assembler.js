import {Tutorial} from "../domain/model/tutorial.entity.js";

/**
 * @class TutorialAssembler
 * @summary Assembler for converting tutorial API responses to entities in the Publishing bounded context.
 */
export class TutorialAssembler {

    /**
     * Converts a tutorial resource to a Tutorial entity.
     * @static
     * @param {Object} resource - The tutorial resource from the API.
     * @returns {Tutorial} The Tutorial entity.
     */
    static toEntityFromResource(resource) {
        return new Tutorial({...resource});
    }

    /**
     * Converts an API response to an array of Tutorial entities.
     * @static
     * @param {Object} response - The API response object.
     * @param {number} response.status - The HTTP status code.
     * @param {string} response.statusText - The status text.
     * @param {Array|Object} response.data - The response data.
     * @returns {Tutorial[]} Array of Tutorial entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}: ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['tutorials'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}