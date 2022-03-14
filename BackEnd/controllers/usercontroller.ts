import { item_data } from '../repositories/data_item';
import { user_data } from '../repositories/data_user';

export class UserController {

    private static instance: UserController;
    private item_repo: any;
    private user_repo: any;

    private constructor() {
        this.item_repo = new item_data();
        this.user_repo = new user_data();
    }

    public static getInstance(): UserController {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    public async createUser(info: any): Promise<any> {
        const response = await this.user_repo.create(info);
        return Promise.resolve(response)
    }

    public async updateUser(info: any): Promise<any> {
        const userInfo = {
            "email": info.email
        }

        const userUpdate = {
            "firstname" : info.firstname,
            "lastname" : info.lastname,
            "address" : {
                "firstline" : info.firstline,
                "secondline" : info.secondline,
                "zipcode" : info.zipcode,
                "city" : info.city,
                "state" :info.state,
                "country" : info.country
            }
        }
        return this.user_repo.update(userInfo, userUpdate)
    }

    public async loginUser(info: any): Promise<any> {  //hace falta? parte del requerimiento de crear usuario?
        const response = await this.user_repo.login(info);
        return Promise.resolve(response)
    }

    public async addPaymentMethodUser(info: any): Promise<any> {
        const userInfo = {
            "email": info.email
        }
        const paymentInfo = {
            "merchant" : info.merchant,
            "user" : info.user
        }
        return this.user_repo.addPaymentMethod(userInfo,paymentInfo)
    }

    public async buyItem(info: any): Promise<any> {
        const userInfo = {
            "email": info.email
        }
        const itemInfo = {              //use item_repo to get info?
            "name" : info.itemname,
            "store" : info.itemstore,
        }

        const tmpItem = await this.item_repo.info(itemInfo)
        
        const purchaseInfo = {
            "itemname" : tmpItem[0].name,
            "itemstore" : tmpItem[0].store,
            "itempicture" : tmpItem[0].pictures[0],
            "price" : tmpItem[0].price,
            "timestamp" : new Date()
        }
        
        return this.user_repo.buyItem(userInfo, purchaseInfo)
    }

    public async getUserInfo(info: any): Promise<any> {
        return this.user_repo.getUserInfo(info)
    }


}
