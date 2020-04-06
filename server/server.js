// const express = require('express');

// const bodyParser = require('body-parser');

import express from 'express'
import bodyParser from 'body-parser'
import commonValidations from '../client/src/shared/validations/singup'
import bcrypt from 'bcrypt';
//import our model 
import User from './models/user';
import isEmpty from 'lodash/isEmpty';
//We use json web token to authorize are login to users, uses 2 arguments, the user data, and the second argument is a secret key use to compare the json tokens
import jwt from 'jsonwebtoken';
import config from './config'
//express middleware to use to protect our routes 
import authenticated from './middlewares/authenticate'
import authenticate from './middlewares/authenticate';

import conekta from 'conekta';


const app = express();
const port = process.env.PORT || 5000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Server side validations 

function validateInput(data, otherValidations) {
    let {
        errors
    } = otherValidations(data);


    //Using bookshelf
    return User.query({
        where: {
            email: data.email
        }
        // orWhere: { username: data.username }
    }).fetch().then(user => {
        if (user) {
            if (user.get('email') === data.email) {
                errors.email = 'Ya existe un usuario con este correo';
            }
        }
        return {
            errors,
            isValid: isEmpty(errors)
        };
    })
}




// TODO: incorporate babel to use ES 2015
// import users from './routes/users';
// const users = require('./routes/users');



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

//Connects to the react front end
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, './client/public/index.html'));
// });

//user the users router 
// app.use('/api/users', users);


app.post('/api/users', (req, res) => {
    //this will return either valid data or errors and store them on respective constants.
    setTimeout(() => {
        validateInput(req.body, commonValidations).then(({
            errors,
            isValid
        }) => {
            if (!isValid) {
                res.status(400).json(errors);
            } else {
                const {
                    fname,
                    lname,
                    email,
                    password
                } = req.body;
                //encypting password
                const password_digest = bcrypt.hashSync(password, 10);

                //use user model and catch errors or return success 
                User.forge({
                        fname,
                        lname,
                        email,
                        password_digest
                    }, {
                        hasTimestamps: true
                    }).save()
                    .then(user => res.json({
                        success: true,
                        data: req.body
                    }))
                    .catch(err => res.status(500).json({
                        error: err
                    }))

            }
        })

    }, 1500);
});


//Route for authentication 

app.post('/api/auth', (req, res) => {
    const {
        password,
        email
    } = req.body;

    User.query({
        where: {
            email: email
        },
    }).fetch().then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.get('password_digest'))) {
                const token = jwt.sign({
                    id: user.get('id'),
                    email: user.get('email')
                }, config.jwtSecret);
                res.json({
                    token
                });

            } else {
                res.status(401).json({
                    errors: {
                        form: 'Credenciales no validas. Intenta de nuevo.'
                    }
                })
            }
        } else {
            res.status(401).json({
                errors: {
                    form: 'Credenciales no validas. Intenta de nuevo.'
                }
            })
        }
    })
})


app.post('/api/processPayment', (req, res) => {
    //setup conekta
    console.log("######################")
    console.log(req.body)
    console.log("######################")
    conekta.api_key = 'key_qcxP1NJhhTz94mfx4zza6w';
    conekta.locale = 'es';
    // conekta.Order.create(req.body).then(function (result) {
    //     console.log('Orden generada');
    //     console.log(result.toObject());
    //     res.status(200).json({ data: result.toObject() })
    // }, function (error) {
    //     console.log('Hubo un ERROR')
    //     console.log(error)
    //     res.status(401).json({ errors: error })
    // })

    conekta.Order.create(req.body).then(result => {
            console.log("######################");
            console.log('This is the response....');
            console.log(result.toObject());
            console.log("######################");
            res.status(200).json(result.toObject());
        })
        .catch(err => {
            console.log('Valio chit');
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

})

//Route to check uniqueness for user 

app.get('/api/users/:email', (req, res) => {
    User.query({
        select: ['email'],
        where: {
            email: req.params.email
        }
    }).fetch().then(user => {
        res.json({
            user
        });
    })
});


//route to test authenticated users 
//we will be using express middleware 

app.post('/api/users/updatePassword', authenticate, (req, res) => {
    res.status(201).json({
        user: req.currentUser
    })
})

// create a GET route
app.get('/backend', (req, res) => {
    res.send({
        express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
    });
});



// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));