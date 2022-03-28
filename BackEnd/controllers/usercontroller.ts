import handlebars = require('handlebars');
import path = require('path');
import { QueryResult } from 'pg';
import { user_data } from '../repositories/data_user';
import EmailUtil from '../utils/emailUtil';

export default class UserController {

    private static instance: UserController;
    private user_repo: user_data;

    private constructor() {
        this.user_repo = new user_data();
    }

    public static getInstance(): UserController {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    public async login(data : any): Promise<QueryResult<any>> {
        return this.user_repo.login(data);
    }

    public async register(data : any): Promise<QueryResult<any>> {
        return this.user_repo.register(data);
    }

    public sendEmail(data : any, linkPath : string){
        const emailUtil = new EmailUtil();
        const content = {link : linkPath};
        const subject = "Cinepolis - Crear Nueva Contraseña";
        emailUtil.sendEmail(data.email, subject, content)
    }
}
