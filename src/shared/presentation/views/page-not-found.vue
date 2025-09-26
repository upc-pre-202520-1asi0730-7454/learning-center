<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const { t } = useI18n();
const router = useRouter();
const unavailableRoute = router.currentRoute.value.fullPath;
</script>

<template>
  <div class="align-content-start justify-content-start m-4">
    <h1>{{ t('page-not-found.title')}}</h1>
    <p>{{ t('page-not-found.content', { 'unavailable-router': unavailableRoute})}}</p>
    <router-link to="/home">{{t('page-not-found.go-home')}}</router-link>
  </div>
</template>

<style scoped>

</style>