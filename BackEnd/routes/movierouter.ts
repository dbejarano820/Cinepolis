import * as express from 'express';
import MovieController from '../controllers/moviecontroller';

const app = express.Router();

app.get("/list", (req, res, next) => {              
    MovieController.getInstance().listMovies()
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.get("/cartelera", (req, res, next) => { 
    MovieController.getInstance().getListing()
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.get("/asientos", (req, res, next) => { 
    MovieController.getInstance().getSeats(req.body)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/reservacion", (req, res, next) => { 
    MovieController.getInstance().createReservation(req.body)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});


//
app.put("/reservarAsiento", (req, res, next) => { 
    MovieController.getInstance().reserveSeat(req.body)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/reservarComida", (req, res, next) => { 
    MovieController.getInstance().reserveFood(req.body)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});

app.put("/addCartelera", (req, res, next) => { 
    MovieController.getInstance().addChart(req.body)
        .then((data) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows);
        })
        .catch((err) => {
            res.json(err)
            return "";
        });
});



export { app as movierouter }