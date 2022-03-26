import * as express from 'express';
import FoodController from '../controllers/foodcontroller';

const app = express.Router();

app.get("/list", (req, res, next) => {              
    FoodController.getInstance().listFoods()
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.get("/:foodId", (req, res, next) => {              
    FoodController.getInstance().findFood(req.params.foodId)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

export { app as foodrouter }