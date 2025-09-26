<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n();

</script>

<template>
  <div class="align-content-start justify-content-start m-4">
    <h1>{{ t('home.title')}}</h1>
    <p>{{ t('home.content')}}</p>
  </div>
</template>

<style scoped>

</style>