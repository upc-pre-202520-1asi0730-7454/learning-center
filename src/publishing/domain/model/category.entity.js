/**
 * @class Category
 * @summary Represents a category entity in the Publishing bounded context.
 */
export class Category {
    /**
     * @param {Object} params - The category parameters.
     * @param {number|null} params.id - The category ID.
     * @param {string} params.name - The category name.
     */
    constructor({ id = null, name = '' }) {
        this.id = id;
        this.name = name;
    }
}