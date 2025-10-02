import {Category} from "./category.entity.js";

export class Tutorial {
    constructor({ id = null, title = '', summary = '', categoryId = null, category = null }) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.categoryId = categoryId;
        this.category = category instanceof Category ? category : null;
    }
}