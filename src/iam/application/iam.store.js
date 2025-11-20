import {IamApi} from "../infrastructure/iam-api.js";
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {SignInAssembler} from "../infrastructure/sign-in.assembler.js";
import {UserAssembler} from "../infrastructure/user.assembler.js";
import {SignUpAssembler} from "../infrastructure/sign-up.assembler.js";
import {SignInCommand} from "../domain/sign-in.command.js";
import {SignUpCommand} from "../domain/sign-up.command.js";

const iamApi = new IamApi();
/**
 * Pinia store for managing Identity and Access Management (IAM) state.
 * Handles user authentication, registration, and user data fetching.
 * @returns {Object} The store object with state and actions.
 */
const useIamStore = defineStore('iam', () => {
    /** @type {import('vue').Ref<Array<User>>} Array of user entities. */
    const users = ref([]);
    /** @type {import('vue').Ref<Array<Error>>} Array of error messages. */
    const errors = ref([]);
    /** @type {import('vue').Ref<boolean>} Flag indicating if users have been loaded. */
    const usersLoaded = ref(false);
    /** @type {import('vue').Ref<boolean>} Flag indicating if a user is signed in. */
    const isSignedIn = ref(false);
    /** @type {import('vue').Ref<string|null>} The currently signed-in user entity. */
    const currentUsername = ref(null);
    /** @type {import('vue').Ref<number|null>} The currently signed-in user entity. */
    const currentUserId = ref(0);
    /** @type {import('vue').ComputedRef<string|null>} The current authentication token. */
    const currentToken = computed(() => isSignedIn.value ? localStorage.getItem('token') : null);

    /**
     * Signs in a user with the provided credentials.
     * @param {SignInCommand} signInCommand - The sign-in command object.
     * @param router - The Vue router instance for navigation.
     * @param {string} signInCommand.username - The username.
     * @param {string} signInCommand.password - The password.
     * @throws {Error} If the sign-in fails.
     */
    function signIn(signInCommand, router) {
        // Implementation for sign-in action
        console.log(signInCommand);
        iamApi.signIn(signInCommand)
            .then(response => {
                let signInResource = SignInAssembler.toResourceFromResponse(response);
                if (signInResource) {
                    let currentUser = UserAssembler.toEntityFromResource(signInResource);
                    currentUsername.value = currentUser.username;
                    currentUserId.value = currentUser.id;
                    localStorage.setItem('token', signInResource.token);
                    isSignedIn.value = true;
                    console.log(`User signed in: ${currentUsername.value}`);
                    errors.value = [];
                    router.push({name: 'home'});
                } else {
                    isSignedIn.value = false;
                    console.log('Sign-in failed');
                    errors.value.push(new Error('Sign-in failed'));
                    router.push({name: 'iam-sign-in'});
                }

            })
            .catch(error => {
                isSignedIn.value = false;
                currentUsername.value = error.name;
                console.log(error);
                errors.value.push(error);
                router.push({name: 'iam-sign-in'});
            });
    }

    /**
     * Signs up a new user with the provided details.
     * @param {SignUpCommand} signUpCommand - The sign-up command object.
     * @param router - The Vue router instance for navigation.
     * @param {string} signUpCommand.username - The username.
     * @param {string} signUpCommand.password - The password.
     * @param {string} signUpCommand.email - The email.
     * @throws {Error} If the sign-up fails.
     */
    function signUp(signUpCommand, router) {
        // Implementation for sign-up action
        iamApi.signUp(signUpCommand)
            .then(response => {
                let signUpResource = SignUpAssembler.toResourceFromResponse(response);
                if (signUpResource) {
                    console.log(signUpResource.message);
                    errors.value = [];
                    router.push({name: 'iam-sign-in'});
                } else {
                    console.log('Sign-up failed');
                    errors.value.push(new Error('Sign-up failed'));
                    router.push({name: 'iam-sign-up'});
                }
            })
            .catch(error => {
                console.log(error);
                errors.value.push(error);
                router.push({name: 'iam-sign-up'});
            });
    }

    /**
     * Signs out the current user.
     */
    function signOut(router) {
        currentUsername.value = null;
        currentUserId.value = 0;
        localStorage.removeItem('token');
        isSignedIn.value = false;
        console.log('User signed out');
        errors.value = [];
        router.push({name: 'iam-sign-in'});
    }

    /**
     * Fetches all users from the API.
     * @throws {Error} If fetching users fails.
     */
    function fetchUsers() {
        iamApi.getUsers().then(response => {
            users.value = UserAssembler.toEntitiesFromResponse(response);
            usersLoaded.value = true;
            console.log(`Loaded ${users.value.length} users.`);
            errors.value = [];
        }).catch(error => {
            console.error('Error fetching users:', error);
            errors.value.push(error);
        });
    }

    return {
        users,
        errors,
        usersLoaded,
        currentUsername,
        currentUserId,
        currentToken,
        isSignedIn,
        signIn,
        signUp,
        signOut,
        fetchUsers
    };
});

export default useIamStore;