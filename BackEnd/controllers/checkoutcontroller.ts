import { QueryResult } from 'pg';
import EmailUtil from '../utils/emailUtil';
import { checkout_data } from '../repositories/data_checkout';



export default class CheckoutController {

    private static instance: CheckoutController;
    private checkout_repo: checkout_data;

    private constructor() {
        this.checkout_repo = new checkout_data();
    }

    public static getInstance(): CheckoutController {
        if (!this.instance) {
            this.instance = new CheckoutController();
        }
        return this.instance;
    }

    public async checkoutProducts(info : any){
        return await this.checkout_repo.payment(info);
    }

    public sendBill(info : any): void {
        const email_helper = new EmailUtil();
        email_helper.sendBilling(info)
    }
    
}

