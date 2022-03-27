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

    public async findFood(name : any): Promise<QueryResult<any>> {
        return this.food_repo.find(name);
    }

    public async addFood(data : any): Promise<QueryResult<any>> {  
        return this.food_repo.addFood(data);
    }

    public async deleteFood(data : any): Promise<QueryResult<any>> {  
        return this.food_repo.deleteFood(data);
    }
    
}

