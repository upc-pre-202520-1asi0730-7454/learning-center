import axios from "axios";
import {iamInterceptor} from "../../iam/infrastructure/iam.interceptor.js";

const platformApi = import.meta.env.VITE_LEARNING_PLATFORM_API_URL;
export class BaseApi {
    #http;
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
    get http() {
        return this.#http;
    }
}