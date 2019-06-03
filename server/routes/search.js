var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// base search query 
var testBody = function(req, res, next) {
	if(req.query.offence == undefined)
	{
		res.status(400).json({"message": "It looks like you're missing the offence query parameter"});
	} else if (req.headers.authorization === "" | req.headers.authorization === undefined) {
		res.status(401).json({"message": "It looks like your authorization token is missing"});		
	} else {
		next();
	}
};

var testAuthenticated = function(req, res, next) {
	const token = req.headers.authorization.split(' ').pop();

	jwt.verify(token, 'secret', function(err, decoded) {
		if (err) {
			console.log(err);
			res.status(400).json({"Error": true, "message": "Token Error"});
		} else {
			next(decoded);
		}
	});
};

var testUserExist = function(decoded, req, res, next) {
	req.db('users').select().where('email', decoded.email)
	.then((rows) => {
		if(rows.length === 0) {
			res.status(401).json({"Error": true, "message": "Please login or register"});
		} else {
			next();
		}
	});
};

router.get('/', testBody, testAuthenticated, testUserExist, function(req, res, next) {
	// find the offence and translate into col name
	req.db.from('offence_columns')
	.where({pretty: req.query.offence})
	.then((rows) => {

		let query = rows[0].column;
		let offence = rows[0].pretty;
		// set baseQuery 
		let baseQuery = req.db.select('offences.area as LGA', 'lat', 'lng').from('offences').sum(query + ' as total').join('areas', 'offences.area', '=', 'areas.area');
		// set where clauses if items exist in request query
		Object.keys(req.query).forEach((key) => {
			if(key != "offence") {
				if(key === "area"){
					baseQuery.whereIn("offences."+key, req.query[key].split(','));
				} else {
					baseQuery.whereIn(key, req.query[key].split(','));
				}
			}
		});
		// group by area and respond with json
		baseQuery.groupBy('offences.area')
		.then((rows) => {
			let query = {};

			Object.keys(req.query).forEach((key) => {
				query[key]=req.query[key]
			});

			res.status(200).json({ 
				"query": query,
				"result": rows.map((item) => (item))
			});
		}).catch((err) => {
			console.log(err);
			res.status(400).json({"Error": true, "message": "Error in MySQL query"});
		});

	}).catch((err) => {
		console.log(err);
		res.status(400).json({"Error": true, "message": "Error in MySQL query"});
	});
});


module.exports = router;
