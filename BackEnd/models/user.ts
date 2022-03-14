import * as mongoose from 'mongoose'

interface User {
    usertype: string,
    firstname : string,
    lastname : string,
    email : string,
    password : string,
    store: string,
    address : {
        firstline : string,
        secondline : string,
        zipcode : number,
        city : string,
        state :string,
        country : string
    },
    paymentmethods : [
        {
            merchant : string,
            user : string
        }
    ],
    purchases : [
        {
            itemname : string,
            itemStore: string,
            itempicture : string,
            price : number,
            timestamp : Date
        }
    ]
}


const userSchema = new mongoose.Schema<User>({
    usertype: String,
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    store: String,
    address : {
        firstline : String,
        secondline : String,
        zipcode : Number,
        city : String,
        state :String,
        country : String
    },
    paymentmethods : [
        {
            merchant : String,
            user : String
        }
    ],
    purchases : [
        {
            itemname : String,
            itemstore: String,
            itempicture : String,
            price : Number,
            timestamp : Date
        }
    ]
})

const UserModel = mongoose.model<User>("User", userSchema);
export { UserModel, User }