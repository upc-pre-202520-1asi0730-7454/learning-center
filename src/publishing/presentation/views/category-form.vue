<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import usePublishingStore from "../../application/publishing.store.js";
import {computed, onMounted, ref} from "vue";
import {Category} from "../../domain/model/category.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = usePublishingStore();
const {errors, addCategory, updateCategory} = store;

const form = ref({name: ''});
const isEdit = computed(() => !!route.params.id);

onMounted(() => {
  console.log(route.params.id);
  if (isEdit.value) {
    const category = getCategoryById(route.params.id);
    console.log(category);
    if (category) form.value.name = category.name; else router.push({name: 'publishing-categories'});
  }
});

function getCategoryById(id) {
  return store.getCategoryById(id);
}

const saveCategory = () => {
  const category = new Category({
    id: isEdit.value ? route.params.id : null,
    name: form.value.name,
  });
  if (isEdit.value) updateCategory(category); else addCategory(category);
  navigateBack();
};

const navigateBack = () => {
  router.push({name: 'publishing-categories'});
};
</script>

<template>
  <div class="p-4">
    <h1>{{ isEdit ? t('category.edit-title') : t('category.new-title') }}</h1>
    <form @submit.prevent="saveCategory">
      <div class="field mb-3">
        <label for="name">{{ t('category.name') }}</label>
        <pv-input-text id="name" v-model="form.name" class="w-full" required/>
      </div>
      <pv-button :label="t('category.save')" icon="pi pi-save" type="submit"/>
      <pv-button :label="t('category.cancel')" class="ml-2" severity="secondary" @click="navigateBack"/>
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>