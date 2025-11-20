const signInForm = () => import('./views/sign-in-form.vue')
const signUpForm = () => import('./views/sign-up-form.vue')

/**
 * Routes for the IAM (Identity and Access Management) bounded context.
 * Includes sign-in and sign-up forms.
 */
const iamRoutes = [
    { path: 'sign-in', name: 'iam-sign-in', component: signInForm, meta: { title: 'Sign-In' } },
    { path: 'sign-up', name: 'iam-sign-up', component: signUpForm, meta: { title: 'Sign-Up' } }
];

export default iamRoutes;