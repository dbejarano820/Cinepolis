import { item_data } from '../repositories/data_item';
// import { item_data } from '../repositories/data_offer';

export class ItemController {

    private static instance: ItemController;
    private item_repo: any;
    private user_repo: any;

    private constructor() {
        this.item_repo = new item_data();
        // this.data_repo = new offer_data();
    }

    public static getInstance(): ItemController {
        if (!this.instance) {
            this.instance = new ItemController();
        }
        return this.instance;
    }

    public async createItem(info: any): Promise<any> {
        const response = await this.item_repo.create(info);
        return Promise.resolve("Todo gucci")
    }

    public async listItems(info: any): Promise<any> {
        return this.item_repo.list();
    }

    public async infoItem(info: any): Promise<any> {
        return this.item_repo.info(info);
    }

    public async writeReview(info: any): Promise<any> {

        const infoItem = {
            "name": info.name,
            "store": info.store
        }
        const reviewInfo = {
            "firstname": info.firstname,
            "lastname": info.lastname,
            "timestamp": new Date(),
            "rating": info.rating,
            "comment": info.comment
        }
        return this.item_repo.review(infoItem, reviewInfo);
    }
}
