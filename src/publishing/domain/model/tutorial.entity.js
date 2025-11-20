import {Category} from "./category.entity.js";

/**
 * @class Tutorial
 * @summary Represents a tutorial entity in the Publishing bounded context.
 */
export class Tutorial {
    /**
     * @param {Object} params - The tutorial parameters.
     * @param {number|null} params.id - The tutorial ID.
     * @param {string} params.title - The tutorial title.
     * @param {string} params.summary - The tutorial summary.
     * @param {number|null} params.categoryId - The category ID.
     * @param {Category|null} params.category - The associated category entity.
     */
    constructor({ id = null, title = '', summary = '', categoryId = null, category = null }) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.categoryId = categoryId;
        this.category = category instanceof Category ? category : null;
    }
}