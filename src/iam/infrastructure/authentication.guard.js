import useIamStore from "../application/iam.store.js";

/**
 * Vue Router navigation guard for authentication in the IAM bounded context.
 * Redirects unauthenticated users to the sign-in page for protected routes.
 * @param {Object} to - The target route object.
 * @param {Object} from - The current route object.
 * @param {Function} next - The function to call to proceed with navigation.
 */
export const authenticationGuard = (to, from, next) => {
    const store = useIamStore();
    const isAnonymous = !store.isSignedIn;
    const publicRoutes = ['/iam/sign-in', '/iam/sign-up', '/about', '/page-not-found'];
    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);
    if (isAnonymous && routeRequiresToBeAuthenticated) return next({ name: 'iam-sign-in'});
    else next();
}