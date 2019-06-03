var express = require('express');
var router = express.Router();

var handleSQLError = function(err, req, res, next) {
	console.log(err);
	res.status(500).json({"Error": true, "message": "Error in MySQL query"});
};

// json list of offences
router.get('/offences', function(req, res, next) {
	req.db.from('offence_columns').select('pretty')
	.then((rows) => {
		res.json({"offences": rows.map((item) => (item.pretty))})
	})
	.catch((err) => {
		next(err);
	});
}, handleSQLError);

// json list of areas
router.get('/areas', function(req, res, next) {
	req.db.from('areas').select('area')
	.then((rows) => {
		res.json({"areas": rows.map((item) => (item.area))})
	})
	.catch((err) => {
		next(err);
	});
}, handleSQLError);

// json list of ages
router.get('/ages', function(req, res, next) {
	req.db.from('offences').distinct('age')
	.then((rows) => {
		res.json({"ages": rows.map((item) => (item.age))})
	})
	.catch((err) => {
		next(err);
	});
}, handleSQLError);

// json list of genders
router.get('/genders', function(req, res, next) {
	req.db.from('offences').distinct('gender')
	.then((rows) => {
		res.json({"genders": rows.map((item) => (item.gender))})
	})
	.catch((err) => {
		next(err);
	});
}, handleSQLError);

// json list of years
router.get('/years', function(req, res, next) {
	req.db.from('offences').distinct('year')
	.then((rows) => {
		res.json({"years": rows.map((item) => (item.year))})
	})
	.catch((err) => {
		next(err);
	});
}, handleSQLError);

router.get('/months', function(req, res, next) {
	req.db.from('offences').distinct('month')
	.then((rows) => {
		res.json({"months": rows.map((item) => (item.month))})
	})
	.catch((err) => {
		next(err);
	});
}, handleSQLError);

module.exports = router;

