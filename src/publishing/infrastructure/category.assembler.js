import {Category} from "../domain/model/category.entity.js";

/**
 * @class CategoryAssembler
 * @summary Assembler for converting category API responses to entities in the Publishing bounded context.
 */
export class CategoryAssembler {
    /**
     * Converts a category resource to a Category entity.
     * @static
     * @param {Object} resource - The category resource from the API.
     * @returns {Category} The Category entity.
     */
    static toEntityFromResource(resource) {
        return new Category({...resource});
    }

    /**
     * Converts an API response to an array of Category entities.
     * @static
     * @param {Object} response - The API response object.
     * @param {number} response.status - The HTTP status code.
     * @param {string} response.statusText - The status text.
     * @param {Array|Object} response.data - The response data.
     * @returns {Category[]} Array of Category entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}: ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['categories'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}