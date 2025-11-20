import axios from "axios";
import {iamInterceptor} from "../../iam/infrastructure/iam.interceptor.js";

const platformApi = import.meta.env.VITE_LEARNING_PLATFORM_API_URL;

/**
 * @class BaseApi
 * @summary Base API class in the Shared bounded context, providing common HTTP client setup with authentication.
 */
export class BaseApi {
    #http;

    /**
     * @constructor
     */
    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        this.#http.interceptors.request.use(iamInterceptor);
    }

    /**
     * Gets the HTTP client instance.
     * @returns {Object} The Axios HTTP client.
     */
    get http() {
        return this.#http;
    }
}