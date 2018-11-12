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
var WorkFlowPath   = './app/model/WorkFlow.json';

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(function(req,res,next){
	next()
});

router.get('/get_detailform',function(req,res){
	JSON_OPERATION('read',DetailFormPath,'',Storage,'FormDetails',res);
});

router.post('/create_detailform',function(req,res){
	var BodyPost = JSON.stringify(req.body.dataPost);
	JSON_OPERATION('write',DetailFormPath,BodyPost,Storage,'',res);
});

//create Form
router.post('/create_form',function(req,res){
	var BodyPost = JSON.stringify(req.body.dataPost);
	JSON_OPERATION('write',FormPath,BodyPost,Storage,'',res);
});

router.get('/get_form',function(req,res){
	JSON_OPERATION('read',FormPath,'',Storage,'Form',res);
});

App.use('/api',router);
App.listen(port);
console.log("server running on port "+port);