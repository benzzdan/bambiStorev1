const express = require('express');

const router = express.Router();

//define the route 


router.post('/api/users', (req, resp) => {
    //need to install body parser
    console.log(req.body);
});


module.exports = router;