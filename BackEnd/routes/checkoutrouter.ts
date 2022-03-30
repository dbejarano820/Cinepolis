import * as express from 'express';
import CheckoutController from '../controllers/checkoutcontroller';

const app = express.Router();

app.post("/pay", (req, res, next) => {           
    const body = req.body;
    console.log("Checkout pay route has body:");
    console.log(body);
    const controller = CheckoutController.getInstance();
    controller.checkoutProducts(body)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.
            controller.sendBill(body);
            res.json(data.rows);

        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});



export { app as checkoutrouter }