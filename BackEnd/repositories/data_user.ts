const jwt =  require("jsonwebtoken")
const bcrypt = require("bcrypt")
import { User, UserModel } from '../models/user';

export class user_data {
    public constructor() {

    }
    public async create(data: any): Promise<any>  {
        let statusCode = 409
        const user = data
        const takenEmail = await UserModel.findOne({email: user.email})
        if(takenEmail){
            return statusCode //"Email has already been taken"
        } else {
            user.password = await bcrypt.hash(data.password, 10)
            const newUser = new UserModel(user);
            newUser.save();
            statusCode = 201
            return statusCode //"User created successfully"
        }
    }

    public async login(data: any): Promise<any> {
        let statusCode = 409
        let user = { }
        const userData = data
        const exists = await UserModel.findOne({email: userData.email})
        if (exists) {
            const correctPassword = await bcrypt.compare(userData.password, exists.password)
            if(correctPassword) {
                statusCode = 204 // Correct login
                user = exists
            }
        }
        return {statusCode, user}
    }


    public update(user: any, data: any) {
        return UserModel.updateOne(user, data)
    }

    public addPaymentMethod(user:any, data:any) {
        return UserModel.updateOne(user, {"$push" : {"paymentmethods" : data}})
    }

    public buyItem(user:any, data:any) {
        return UserModel.updateOne(user, {"$push" : {"purchases" : data}})
    }

    public getUserInfo(useremail:any) {
        return UserModel.find({email : useremail})
    }

    

}

