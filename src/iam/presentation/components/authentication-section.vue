<script setup>
import useIamStore from "../../application/iam.store.js";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useIamStore();
const {signOut} = store;

/**
 * Navigate to the sign-in page.
 * @function performSignIn
 */
function performSignIn() {
  router.push({name: 'iam-sign-in'});
}

/**
 * Navigate to the sign-up page.
 * @function performSignUp
 */
function performSignUp() {
  router.push({name: 'iam-sign-up'});
}

/**
 * Sign out the current user and navigate to the appropriate page.
 * @function performSignOut
 */
function performSignOut() {
  signOut(router);
}
</script>

<template>
  <div>
    <div v-if="store.isSignedIn">
      <span class="p-button-text bg-primary"> Welcome, {{ store.currentUsername }}</span>
      <pv-button class="bg-primary" text @click="performSignOut">Sign-Out</pv-button>
    </div>
    <div v-else>
      <pv-button class="bg-primary" text @click="performSignIn">Sign-In</pv-button>
      <pv-button class="bg-primary" text @click="performSignUp">Sign-Up</pv-button>
    </div>
  </div>
</template>

<style scoped>

</style>