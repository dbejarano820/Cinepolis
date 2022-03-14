import * as express from 'express';
import { UserController } from '../controllers/usercontroller';
const requireNotLoggedin = require('../helpers/requireNotLoggedin.js');
const requireLoggedin = require('../helpers/requireLoggedin.js');


const app = express.Router();

app.put("/register", requireNotLoggedin, (req, res, next) => {                   //requerimiento de crear usuario
    UserController.getInstance().createUser(req.body)
        .then((data) => {
            res.status(data).end();
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/login", requireNotLoggedin, async (req, res, next) => {                   //requerimiento de crear usuario
     UserController.getInstance().loginUser(req.body)
        .then((data) => {

            const{
                statusCode, 
                user: {usertype, firstname, lastname, email, store, paymentmethods, purchases},
            } = data

            const {firstline, secondline, zipcode, city, state, country} = data.user.address
            const loggedInUser = {usertype, firstname, lastname, email, store, firstline, secondline, zipcode, city, state, country, paymentmethods, purchases}
            if(statusCode == 204) {
                req.session.user = loggedInUser
            }
            console.log(loggedInUser)
            res.json({user: loggedInUser, statusCode});
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/logout", requireLoggedin, async (req, res, next) => {                  //requerimiento de crear usuario
    req.session.destroy(() => {
        res.status(200).end();
    })
});

app.get("/verify", (req, res, next) => {                  //requerimiento de crear usuario
    req.session.user
        ? res.json({user: req.session.user })
        : res.json({loggedIn: false})
});

app.put("/update", (req, res, next) => {                   //parte de requerimiento de crear usuario
    UserController.getInstance().updateUser(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
            
        });
});

app.put("/addPaymentMethod", requireLoggedin, (req, res, next) => {                   //agregar payment
    UserController.getInstance().addPaymentMethodUser(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/buyitem", requireLoggedin, (req, res, next) => {                   //requerimiento de comprar item
    UserController.getInstance().buyItem(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.get("/getUserInfo/:email", (req, res, next) => {                   //requerimiento de comprar item
    UserController.getInstance().getUserInfo(req.params.email)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});


export { app as userrouter }