import {PublishingApi} from "../infrastructure/publishing-api.js";
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {CategoryAssembler} from "../infrastructure/category.assembler.js";
import {TutorialAssembler} from "../infrastructure/tutorial.assembler.js";

const publishingApi = new PublishingApi();

/**
 * Pinia store for managing Publishing bounded context state.
 * Handles categories and tutorials data fetching, creation, update, and deletion.
 * @returns {Object} The store object with state and actions.
 */
const usePublishingStore = defineStore('publishing', () => {
    /** @type {import('vue').Ref<Array<Category>>} Array of category entities. */
    const categories = ref([]);
    /** @type {import('vue').Ref<Array<Tutorial>>} Array of tutorial entities. */
    const tutorials = ref([]);
    /** @type {import('vue').Ref<Array<Error>>} Array of error messages. */
    const errors = ref([]);
    /** @type {import('vue').Ref<boolean>} Flag indicating if categories have been loaded. */
    const categoriesLoaded = ref(false);
    /** @type {import('vue').Ref<boolean>} Flag indicating if tutorials have been loaded. */
    const tutorialsLoaded = ref(false);
    /** @type {import('vue').ComputedRef<number>} Computed count of loaded categories. */
    const categoriesCount = computed(() => categoriesLoaded.value ? categories.value.length : 0);
    /** @type {import('vue').ComputedRef<number>} Computed count of loaded tutorials. */
    const tutorialsCount = computed(() => tutorialsLoaded.value ? tutorials.value.length : 0);

    /**
     * Fetches all categories from the API.
     * @returns {Promise} A promise that resolves when categories are fetched.
     */
    function fetchCategories() {
        return publishingApi.getCategories().then(response => {
            categories.value = CategoryAssembler.toEntitiesFromResponse(response);
            categoriesLoaded.value = true;
            console.log(categoriesLoaded.value);
            console.log(categories.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Fetches all tutorials from the API.
     * @returns {Promise} A promise that resolves when tutorials are fetched.
     */
    function fetchTutorials() {
        return publishingApi.getTutorials().then(response => {
            tutorials.value = TutorialAssembler.toEntitiesFromResponse(response);
            tutorialsLoaded.value = true;
            console.log(tutorialsLoaded.value);
            console.log(tutorials.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Gets a category by its ID.
     * @param {number} id - The category ID.
     * @returns {Category|null} The category entity or null if not found.
     */
    function getCategoryById(id) {
        let idNum = parseInt(id);
        return categories.value.find(category => category["id"] === idNum);
    }

    /**
     * Adds a new category.
     * @param {Category} category - The category to add.
     */
    function addCategory(category) {
        publishingApi.createCategory(category).then(response => {
            const resource = response.data;
            const newCategory = CategoryAssembler.toEntityFromResource(resource);
            categories.value.push(newCategory);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing category.
     * @param {Category} category - The category to update.
     */
    function updateCategory(category) {
        publishingApi.updateCategory(category).then(response => {
            const resource = response.data;
            const updatedCategory = CategoryAssembler.toEntityFromResource(resource);
            const index = categories.value.findIndex(cat => cat['id'] === updatedCategory.id);
            if (index !== -1) categories.value[index] = updatedCategory;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a category by ID.
     * @param {number} id - The category ID to delete.
     */
    function deleteCategory(id) {
        publishingApi.deleteCategory(id).then(() => {
            const index = categories.value.findIndex(cat => cat['id'] === id);
            if (index !== -1) categories.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Gets a tutorial by its ID.
     * @param {number} id - The tutorial ID.
     * @returns {Tutorial|null} The tutorial entity or null if not found.
     */
    function getTutorialById(id) {
        let idNum = parseInt(id);
        return tutorials.value.find(tutorial => tutorial["id"] === idNum);
    }

    /**
     * Adds a new tutorial.
     * @param {Tutorial} tutorial - The tutorial to add.
     */
    function addTutorial(tutorial) {
        publishingApi.createTutorial(tutorial).then(response => {
            const resource = response.data;
            const newTutorial = TutorialAssembler.toEntityFromResource(resource);
            tutorials.value.push(newTutorial);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing tutorial.
     * @param {Tutorial} tutorial - The tutorial to update.
     */
    function updateTutorial(tutorial) {
        publishingApi.updateTutorial(tutorial).then(response => {
            const resource = response.data;
            const updatedTutorial = TutorialAssembler.toEntityFromResource(resource);
            const index = tutorials.value.findIndex(tut => tut['id'] === updatedTutorial.id);
            if (index !== -1) tutorials.value[index] = updatedTutorial;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a tutorial by ID.
     * @param {number} id - The tutorial ID to delete.
     */
    function deleteTutorial(id) {
        publishingApi.deleteTutorial(id).then(() => {
            const index = tutorials.value.findIndex(tut => tut['id'] === id);
            if (index !== -1) tutorials.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        categories,
        tutorials,
        errors,
        categoriesLoaded,
        tutorialsLoaded,
        categoriesCount,
        tutorialsCount,
        fetchCategories,
        fetchTutorials,
        getCategoryById,
        addCategory,
        updateCategory,
        deleteCategory,
        getTutorialById,
        addTutorial,
        updateTutorial,
        deleteTutorial
    };
});

export default usePublishingStore;