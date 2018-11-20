import fs from 'fs';
export  const JSON_OPERATION = (action,pathFile,data,Storage,readType,res) => {
    switch (action) {
        case 'open':
            fs.open(pathFile,'w',(err,response)=>{
                if (err) res.json({message:"error open data"});
	            res.json({message:"success open data"});
            });
        break;
        case 'write' :
            fs.writeFile(pathFile,data,(err)=>{
	            if (err) res.json({message:"error save data"});
	            res.json({message:"Form Builders Saved",status:true});
            });
        break
        case 'rewrite' :
            fs.writeFile(pathFile,data,(err)=>{
                if (err) console.log("error save data");
            });
        break
        case 'read' :
            fs.readFile(pathFile,(err,response)=>{
                if (err) console.log("error read data");
                if (response!=''){
                    var convertBuffer = response.toString('utf8');
                    switch(readType){
                        case 'FormDetails' :
                            Storage.DetailsForm = JSON.parse(response);
                            res.json({message:"Success Load data",data:JSON.parse(response),status:true});
                        break;
                        case 'Form' :
                            Storage.Form = JSON.parse(response);
                            res.json({message:"Success Load data",data:JSON.parse(response),status:true});
                        break;
                        case 'WorkFlow' :
                            Storage.WorkFlow = JSON.parse(response);
                            res.json({message:"Success Load data",data:JSON.parse(response),status:true});
                        break;
                        default : return 0;
                    }
                }else{
                    res.json({message:"data is empty",data:[],status:true});
                }
            });
        break;
        case 'initial_read' :
            fs.readFile(pathFile,(err,response)=>{
                if (err) console.log("error read data");
                if (response!=''){
                    var convertBuffer = response.toString('utf8');
                    switch(readType){
                        case 'FormDetails' :
                            Storage.DetailsForm = JSON.parse(response);
                        break;
                        case 'Form' :
                            Storage.Form = JSON.parse(response);
                        break;
                        case 'WorkFlow' :
                            Storage.WorkFlow = JSON.parse(response);
                        break;
                        default : return 0;
                    }
                }
               
            });
        break;
        case 'delete' :
            fs.readFile(pathFile,(err,response)=>{
                if (err) console.log("error read data");
                if (response!=''){
                    var convertBuffer = response.toString('utf8');
                    switch(readType){
                        case 'FormDetails' :
                            Storage.DetailsForm = JSON.parse(response);
                            res.json({message:"Success Load data",data:JSON.parse(response),status:true});
                        break;
                        case 'Form' :
                            Storage.Form = JSON.parse(response);
                            res.json({message:"Success Load data",data:JSON.parse(response),status:true});
                        break;
                        case 'WorkFlow' :
                            Storage.WorkFlow = JSON.parse(response);
                            res.json({message:"Success Load data",data:JSON.parse(response),status:true});
                        break;
                        default : return 0;
                    }
                }
               
            });
        break;
        default : return 0;
    }
}

export const CALLBACK_JSON = (callback,res) => {
    res.send({message:callback});
}