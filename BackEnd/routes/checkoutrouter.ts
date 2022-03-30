import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import CheckoutController from '../controllers/checkoutcontroller';

const app = express.Router();

app.post("/pay", (req, res, next) => {           
    const body = req.body;
    const controller = CheckoutController.getInstance();
    controller.checkoutProducts(body)
        .then(() => {       
            controller.sendBill(body);
            res.json(StatusCodes.ACCEPTED);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});



export { app as checkoutrouter }