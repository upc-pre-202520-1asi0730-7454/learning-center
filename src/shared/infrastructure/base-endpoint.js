/**
 * @class BaseEndpoint
 * @summary Base endpoint class in the Shared bounded context, providing common CRUD operations for API endpoints.
 */
export class BaseEndpoint {
    /**
     * @constructor
     * @param {BaseApi} baseApi - The base API instance.
     * @param {string} endpointPath - The endpoint path.
     */
    constructor(baseApi, endpointPath) {
        this.http = baseApi.http;
        this.endpointPath = endpointPath;
    }

    /**
     * Fetches all resources from the endpoint.
     * @returns {Promise} A promise that resolves with the response.
     */
    getAll() {
        return this.http.get(this.endpointPath);
    }

    /**
     * Fetches a resource by ID.
     * @param {number} id - The resource ID.
     * @returns {Promise} A promise that resolves with the response.
     */
    getById(id) {
        return this.http.get(`${this.endpointPath}/${id}`);
    }

    /**
     * Creates a new resource.
     * @param {Object} resource - The resource to create.
     * @returns {Promise} A promise that resolves with the response.
     */
    create(resource) {
        return this.http.post(this.endpointPath, resource);
    }

    /**
     * Updates an existing resource.
     * @param {number} id - The resource ID.
     * @param {Object} resource - The resource data to update.
     * @returns {Promise} A promise that resolves with the response.
     */
    update(id, resource) {
        return this.http.put(`${this.endpointPath}/${id}`, resource);
    }

    /**
     * Deletes a resource by ID.
     * @param {number} id - The resource ID to delete.
     * @returns {Promise} A promise that resolves with the response.
     */
    delete(id) {
        return this.http.delete(`${this.endpointPath}/${id}`);
    }
}