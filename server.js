import express from 'express';
import bodyParser from 'body-parser';
import {Storage}  from './app/model/Storage.js';
import {JSON_OPERATION, CALLBACK_JSON} from './app/common';

var App = express();
App.use(function(req, res, next) {
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Access-Control-Allow-Origin, Accept, x-requested-by");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,HEAD,DELETE,OPTIONS");
	var _origin = (req.headers.origin) ? req.headers.origin : '';
	res.setHeader('Access-Control-Allow-Origin', _origin);
	return next();
});

var port 		   = process.env.PORT || 8888;
var router 		   = express.Router();
var DetailFormPath = './app/model/DetailsForms.json';
var FormPath       = './app/model/Form.json';
var WorkFlow       = './app/model/WorkFlow.json';

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(function(req,res,next){
	next()
});

router.get('/get-form',function(req,res){
	res.json({data:Storage.formBuilder});
});

var DetailsForms = [];

router.post('/create_detailform',function(req,res){
	var BodyPost = JSON.stringify(req.body.dataPost);
	DetailsForms.push(BodyPost);
	JSON_OPERATION('write',DetailFormPath,DetailsForms,Storage,'',res);
});

App.use('/api',router);
App.listen(port);
console.log("server running on port "+port);