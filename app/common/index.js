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
        console.log("FROM WRITE")
            fs.writeFile(pathFile,data,(err)=>{
	            if (err) res.json({message:"error save data"});
	            res.json({message:"success save data"});
            });
        break
        case 'read' :
           
            fs.readFile(pathFile,(err,response)=>{
                if (err) console.log("error read data");
                if (response!=''){
                    var convertBuffer = response.toString('utf8');
                    console.log(convertBuffer);
                    switch(readType){
                        case 'FormDetails' :
                            if (Storage.DetailsForm.length==0){
                                Storage.DetailsForm = [];
                            }else {
                                Storage.DetailsForm = JSON.parse(response);
                            }
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