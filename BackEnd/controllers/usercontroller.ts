import handlebars = require('handlebars');
import path = require('path');
import { QueryResult } from 'pg';
import { user_data } from '../repositories/data_user';
import EmailUtil from '../utils/emailUtil';
var crypto = require("crypto");

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

    public genPassword() : String {
      return crypto.randomBytes(20).toString('hex');
    }

    public async login(data : any): Promise<QueryResult<any>> {
        return this.user_repo.login(data);
    }

    public async register(data : any): Promise<QueryResult<any>> {
        return this.user_repo.register(data);
    }

    public sendEmail(data : any){
        const emailUtil = new EmailUtil();
        const content = {pass : this.genPassword()};
        const subject = "Cinepolis - Contraseña";
        emailUtil.sendEmail(data.email, subject, content)
    }

    public async list(): Promise<QueryResult<any>> {
      return this.user_repo.list();
    }

    public async findUser(email : any): Promise<QueryResult<any>> {
      return this.user_repo.find(email);
  }

  public async delete(data : any): Promise<QueryResult<any>> {  
    return this.user_repo.delete(data);
  }

  public async add(data : any): Promise<QueryResult<any>> {  
    return this.user_repo.add(data);
  }

  public async update(user_id : any, data : any): Promise<QueryResult<any>> {  
    return this.user_repo.update(user_id, data);
  }
    
}
