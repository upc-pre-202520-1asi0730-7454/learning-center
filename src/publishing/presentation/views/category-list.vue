<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useConfirm} from "primevue";
import usePublishingStore from "../../application/publishing.store.js";
import {onMounted} from "vue";

const {t} = useI18n();
const router = useRouter();
const confirm = useConfirm();
const store = usePublishingStore();
const {categories, categoriesLoaded, errors, fetchCategories, deleteCategory} = store;

onMounted(() => {
  if (!categoriesLoaded) fetchCategories();
  console.log(categories);
});

const navigateToNew = () => {
  router.push({name: 'publishing-category-new'});
};

const navigateToEdit = (id) => {
  router.push({name: 'publishing-category-edit', params: {id}});
};

const confirmDelete = (category) => {
  confirm.require({
    message: t('categories.confirm-delete', {name: category.name}),
    header: t('categories.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteCategory(category);
    },
  });
};
</script>

<template>
  <div class="p-4">
    <h1>{{ t('categories.title') }}</h1>
    <pv-button :label="t('categories.new')" class="mb-3" icon="pi pi-plus" @click="navigateToNew"/>
    <pv-data-table
        :loading="!categoriesLoaded"
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        :value="categories"
        paginator
        striped-rows
        table-style="min-width: 50rem">
      <pv-column :header="t('categories.id')" field="id" sortable/>
      <pv-column :header="t('categories.name')" field="name" sortable/>
      <pv-column :header="t('categories.actions')">
        <template #body="slotProps">
          <pv-button icon="pi pi-pencil" rounded text @click="navigateToEdit(slotProps.data.id)"/>
          <pv-button icon="pi pi-trash" rounded severity="danger" text @click="confirmDelete(slotProps.data)"/>
        </template>
      </pv-column>
    </pv-data-table>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
    <pv-confirm-dialog/>
  </div>
</template>

<style scoped>

</style>