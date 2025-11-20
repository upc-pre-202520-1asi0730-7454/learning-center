import useIamStore from "../application/iam.store.js";

/**
 * Axios interceptor to add IAM authentication token to request headers.
 * @param {Object} config - Axios request configuration object.
 * @returns {Object} Modified Axios request configuration with Authorization header if signed in.
 */
export const iamInterceptor = (config) => {
    const store = useIamStore();
    const { isSignedIn, currentToken} = store;
    if (isSignedIn) {
        config.headers.Authorization = `Bearer ${currentToken}`;
        console.log(config);
    }
    return config;
}