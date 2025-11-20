import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const categoriesEndpointPath = import.meta.env.VITE_CATEGORIES_ENDPOINT_PATH;
const tutorialsEndpointPath = import.meta.env.VITE_TUTORIALS_ENDPOINT_PATH;

/**
 * @class PublishingApi
 * @extends BaseApi
 * @summary API class for Publishing bounded context operations, handling categories and tutorials.
 */
export class PublishingApi extends BaseApi {
    #categoriesEndpoint;
    #tutorialsEndpoint;

    /**
     * @constructor
     */
    constructor() {
        super();
        this.#categoriesEndpoint = new BaseEndpoint(this, categoriesEndpointPath);
        this.#tutorialsEndpoint = new BaseEndpoint(this, tutorialsEndpointPath);
    }

    /**
     * Fetches all categories.
     * @returns {Promise} A promise that resolves with the categories response.
     */
    getCategories() {
        return this.#categoriesEndpoint.getAll();
    }

    /**
     * Fetches a category by ID.
     * @param {number} id - The category ID.
     * @returns {Promise} A promise that resolves with the category response.
     */
    getCategoryById(id) {
        return this.#categoriesEndpoint.getById(id);
    }

    /**
     * Creates a new category.
     * @param {Object} resource - The category resource to create.
     * @returns {Promise} A promise that resolves with the creation response.
     */
    createCategory(resource) {
        return this.#categoriesEndpoint.create(resource);
    }

    /**
     * Updates an existing category.
     * @param {Object} resource - The category resource to update.
     * @returns {Promise} A promise that resolves with the update response.
     */
    updateCategory(resource) {
        return this.#categoriesEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes a category by ID.
     * @param {number} id - The category ID to delete.
     * @returns {Promise} A promise that resolves with the deletion response.
     */
    deleteCategory(id) {
        return this.#categoriesEndpoint.delete(id);
    }

    /**
     * Fetches all tutorials.
     * @returns {Promise} A promise that resolves with the tutorials response.
     */
    getTutorials() {
        return this.#tutorialsEndpoint.getAll();
    }

    /**
     * Fetches a tutorial by ID.
     * @param {number} id - The tutorial ID.
     * @returns {Promise} A promise that resolves with the tutorial response.
     */
    getTutorialById(id) {
        return this.#tutorialsEndpoint.getById(id);
    }

    /**
     * Creates a new tutorial.
     * @param {Object} resource - The tutorial resource to create.
     * @returns {Promise} A promise that resolves with the creation response.
     */
    createTutorial(resource) {
        return this.#tutorialsEndpoint.create(resource);
    }

    /**
     * Updates an existing tutorial.
     * @param {Object} resource - The tutorial resource to update.
     * @returns {Promise} A promise that resolves with the update response.
     */
    updateTutorial(resource) {
        return this.#tutorialsEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes a tutorial by ID.
     * @param {number} id - The tutorial ID to delete.
     * @returns {Promise} A promise that resolves with the deletion response.
     */
    deleteTutorial(id) {
        return this.#tutorialsEndpoint.delete(id);
    }
}