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

app.get("/:name", (req, res, next) => {              
    FoodController.getInstance().findFood(req.params.name)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows[0]);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/addFood", (req, res, next) => {          
    FoodController.getInstance().addFood(req.body)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/deleteFood", (req, res, next) => {          
    FoodController.getInstance().deleteFood(req.body)
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