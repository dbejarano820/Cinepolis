import { QueryResult } from 'pg';
import { food_data } from '../repositories/data_food';

export default class FoodController {

    private static instance: FoodController;
    private food_repo: food_data;

    private constructor() {
        this.food_repo = new food_data();
    }

    public static getInstance(): FoodController {
        if (!this.instance) {
            this.instance = new FoodController();
        }
        return this.instance;
    }

    public async listFoods(): Promise<QueryResult<any>> {
        return this.food_repo.list();
    }

    public async findFood(foodId : any): Promise<QueryResult<any>> {
        return this.food_repo.find(foodId);
    }

    
}