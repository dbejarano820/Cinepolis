import * as express from 'express';
import UserController from '../controllers/usercontroller';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

const app = express.Router();

app.post("/login", (req, res, next) => {         
    UserController.getInstance().login(req.body)
        .then((data: any) => {       
            //data.rows brings the dataset array with all objects inside.   
            res.json(data.rows[0]);
        })
        .catch((err: any) => {
            res.status(StatusCodes.UNAUTHORIZED).json({Error : err});
        });
});

app.post("/signUp", (req, res, next) => {        
    UserController.getInstance().register(req.body)
        .then((data: any) => {       
            //data.rows brings the dataset array with all objects inside.
            const userEmail = req.body.email;
            const token = jwt.sign({
                data: userEmail},
                "cinepolis_secret_key", 
                { expiresIn: 60 * 60 }
            );
            const linkPath = req.protocol + '://' + req.get('host') + `/updatePassword/${token}`
            UserController.getInstance().sendEmail(req.body, linkPath);
            res.status(StatusCodes.CREATED).send(ReasonPhrases.OK);
        })
        .catch((err: any) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Error : err});
        });
});

app.get("/list", (req, res, next) => {              
  UserController.getInstance().list()
      .then((data) => {       
          //data.rows brings the dataset array with all objects inside.   
          res.json(data.rows);
      })
      .catch((err) => {
          res.json(err)
          return "";
      });
});

app.get("/:email", (req, res, next) => {              
  UserController.getInstance().findUser(req.params.email)
      .then((data) => {       
          //data.rows brings the dataset array with all objects inside.   
          res.json(data.rows[0]);
      })
      .catch((err) => {
          res.json(err)
          return "";
      });
});

app.put("/delete", (req, res, next) => {          
  UserController.getInstance().delete(req.body)
      .then((data) => {       
          //data.rows brings the dataset array with all objects inside.   
          res.json(data.rows);
      })
      .catch((err) => {
          res.json(err)
          return "";
      });
});

export { app as userrouter }