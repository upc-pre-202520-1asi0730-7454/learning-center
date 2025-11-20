<script setup>
import useIamStore from "../../application/iam.store.js";
import {reactive} from "vue";
import {SignUpCommand} from "../../domain/sign-up.command.js";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useIamStore();
const {signUp} = store;
const form = reactive({
  username: '',
  password: ''
})
/**
 * Performs the sign-up action by creating a SignUpCommand
 * with the provided username and password and then calling
 * the signUp method from the store.
 */
function performSignUp() {
  let signUpCommand = new SignUpCommand(form);
  signUp(signUpCommand, router);
}
</script>

<template>
  <div>
    <h3>Sign Up</h3>
  </div>
  <p class="p-fluid mb-5">Please enter the required information to sign in.</p>
  <div>
    <form @submit.prevent="performSignUp">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="username">Username</label>
            <pv-input-text id="username" v-model="form.username" :class="{'p-invalid': !form.username}"/>
            <small v-if="!form.username" class="p-invalid">Username is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="password">Password</label>
            <pv-input-text id="password" v-model="form.password" :class="{'p-invalid': !form.password}" type="password"/>
            <small v-if="!form.password" class="p-invalid">Password is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-button type="submit">Sign Up</pv-button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>