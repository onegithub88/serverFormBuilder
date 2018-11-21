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
	var ReadData=new Promise((resolve, reject)=>{
	JSON_OPERATION('initial_read',FormPath,'',Storage,'Form',res);
	JSON_OPERATION('initial_read',DetailFormPath,'',Storage,'FormDetails',res);
	setTimeout(()=>{
		resolve(true);
	},500)
	});
	ReadData.then((response)=>{
 		if (response){
			next()
		}else {
			res.send({message:'initial data error'});
		}
	})
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

//create workFlow
router.post('/create_workflow',function(req,res){
	var BodyPost = JSON.stringify(req.body.dataPost);
	JSON_OPERATION('write',WorkFlowPath,BodyPost,Storage,'',res);
});

router.get('/get_workflow',function(req,res){
	JSON_OPERATION('read',WorkFlowPath,'',Storage,'Form',res);
});

router.get('/get_form',function(req,res){
	JSON_OPERATION('read',FormPath,'',Storage,'Form',res);
});

router.get('/delete_form/:id_workflow/:id_form',function(req,res){
	var {Form} = Storage;
	Storage.Form.filter((obj,i)=>{
		if(obj.idWorkFlow==req.params.id_workflow && obj.idForm==req.params.id_form){
			Form.splice(i,1);
		}
	});
	JSON_OPERATION('rewrite',FormPath,JSON.stringify(Form),Storage,'',res);
	var {DetailsForm} = Storage;
	Storage.DetailsForm.filter((obj,i)=>{
		if(obj.idWorkFlow==req.params.id_workflow && obj.idForm==req.params.id_form){
			DetailsForm.splice(i,1);
		}
	});
	JSON_OPERATION('rewrite',DetailFormPath,JSON.stringify(DetailsForm),Storage,'',res);
	res.send({message:"delete success",data:[],status:true});
});

App.use('/api',router);
App.listen(port);
console.log("server running on port "+port);