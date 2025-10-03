<script setup>
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import usePublishingStore from "../../application/publishing.store.js";
import {computed, onMounted, ref} from "vue";
import {Tutorial} from "../../domain/model/tutorial.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = usePublishingStore();
const {errors, categories, addTutorial, updateTutorial, fetchCategories} = store;

const form = ref({title: '', summary: '', categoryId: null});
const isEdit = computed(() => !!route.params.id);

onMounted(() => {
  if (!categories.length) fetchCategories();
  if (isEdit.value) {
    const tutorial = getTutorialById(route.params.id);
    if (tutorial) {
      form.value.title = tutorial.title;
      form.value.summary = tutorial.summary;
      form.value.categoryId = tutorial.categoryId;
    } else router.push({name: 'publishing-tutorials'});
  }
});

function getTutorialById(id) {
  return store.getTutorialById(id);
}

const saveTutorial = () => {
  const tutorial = new Tutorial({
    id: isEdit.value ? route.params.id : null,
    title: form.value.title,
    summary: form.value.summary,
    categoryId: form.value.categoryId,
  });
  if (isEdit.value) updateTutorial(tutorial); else addTutorial(tutorial);
  navigateBack();
};

const navigateBack = () => {
  router.push({name: 'publishing-tutorials'});
};
</script>

<template>
  <div class="p-4">
    <h1>{{ isEdit ? t('tutorial.edit-title') : t('tutorial.new-title') }}</h1>
    <form @submit.prevent="saveTutorial">
      <div class="field mb-3">
        <label for="title">{{ t('tutorial.title') }}</label>
        <pv-input-text id="title" v-model="form.title" required class="w-full" />
      </div>
      <div class="field mb-3">
        <label for="summary">{{ t('tutorial.summary') }}</label>
        <pv-textarea id="summary" v-model="form.summary" rows="4" class="w-full" />
      </div>
      <div class="field mb-3">
        <label for="category">{{ t('tutorial.category') }}</label>
        <pv-select
            id="category"
            v-model="form.categoryId"
            :options="categories"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a category"
            class="w-full"
        />
      </div>
      <pv-button type="submit" :label="t('tutorial.save')" icon="pi pi-save" />
      <pv-button :label="t('tutorial.cancel')" severity="secondary" class="ml-2" @click="navigateBack" />
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>