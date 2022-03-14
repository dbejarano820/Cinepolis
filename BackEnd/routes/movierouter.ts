import * as express from 'express';
import { MovieController } from '../controllers/moviecontroller';

const app = express.Router();


app.put("/create", (req, res, next) => {                   //requerimiento de cargar prenda
    console.log(req.body)
    MovieController.getInstance().createMovie(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});


app.get("/list", (req, res, next) => {                   //no es un requerimiento filtar prendas
    MovieController.getInstance().listMovies(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err)
            return "Error returning list of movies";
        });
});

export { app as movierouter }