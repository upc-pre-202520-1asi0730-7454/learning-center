import {Category} from "../domain/model/category.entity.js";

export class CategoryAssembler {
    static toEntityFromResource(resource) {
        return new Category({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}: ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['categories'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}