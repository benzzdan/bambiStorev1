import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

//The idea of this is to protect our api server routes

// This is an arrow function tht takes the 2 regular parameters, request and response, and an additional next param that is the one
// that determines the next element on chain to execute
export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        //will verify the token against our config secret key 
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            //Will verify token and if there is an error
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                User.query({
                    where: { id: decoded.id },
                    select: ['email', 'fname', 'id']
                }).fetch().then(user => {
                    if (!user) {
                        res.status(404).json({ error: 'No user found!' });
                    } else {
                        console.log(user);
                        req.currentUser = user;
                        next();
                    }
                })
            }
        })

    } else {
        res.status(403).json({ error: 'No token provided' })
    }
}