var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
const jwt = require('jsonwebtoken');

const testBody = function (req, res, next) {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({ 'message': "Error in authentication: please ensure both email and password are supplied"});
		console.log("Error on user request body:", JSON.stringify(req.body));
	} else {
		next();
	}
};

const testUserExists = function(req, res, next) {
	req.db('users').select().where('email', req.body.email)
	.then((rows) => {
		next(rows);
	}).catch((err) => {
		console.log(err);
		res.status(500).json({"Error": true, "Message": "Error in MySQL query"});
	});
};

/* register a user */
router.post('/register', testBody, testUserExists, function(rows, req, res, next) {
	if (rows.length === 0) {
		bcrypt.hash(req.body.password, 8, function(err, hash) {
			if(err) {
				res.json({"Error": true, "message":"Error in Token Creation"})
			}
			req.db('users').insert({'email': req.body.email, 
	    			'password': hash, 
	    			'created_at': new Date()
	    		}).then(() => {
				res.status(201).json({"message": "yay! you've successfully registered your user account :)"});
			}).catch((err) => {
				console.log(err);
				res.status(500).json({"Error": true, "message": "oh no! It looks like there was a database error while creating your user, give it another try..."});
			});		
		});	    
	} else {
		res.status(400).json({"message": "oops! It looks like that user already exists :("});
	};
});

router.post("/login", testBody, testUserExists, function(rows, req, res, next) {
	if (rows.length === 0) {
		res.status(401).json({"message": "Invalid Login"});
	} else if (bcrypt.compareSync(req.body.password, rows[0].password)) { 
		const expiration = 86400;
		// create a token
    	jwt.sign({ id: rows[0].id, email: rows[0].email }, 'secret', {
      		expiresIn: expiration // expires in 24 hours
    	}, function(err, token) {
    		if (err || !token) {
    			console.log(err);
    			res.status(500).json({"message": "oh no! Error when creating your login token. Please try again..."});
    		} else {
    			res.status(200).json({"token" : token, "expires_in": expiration});
    		}
    	});
	} else {
		res.status(401).json({"message": "Invalid Login"});
	}
});

module.exports = router;

