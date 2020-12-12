let fs = require('fs')
let path = require('path');

function main(dirs){
    let eventList = [];
    let count=0;
    dirs.forEach(element => {
        fs.readFile(filePath+'/'+element,function(err, data){
            // console.log(filePath+element);
            count++;
            data = JSON.parse(data.toString());
            array.forEach(element => {
                
            });
            let eventName = result[0].replace('objectName: ','');
            if(eventName.indexOf('Stop') == -1){
                eventList.push(eventName);
            }

            if(count==dirs.length){
                console.log(eventList);
            }
        });
    });
}

let filePath = path.resolve('tennis/config/source/');
fs.readdir(filePath, function(err, files){
    var dirs = [];
    (function iterator(i){
      if(i == files.length) {
        main(dirs);
        return ;
      }
      fs.stat(path.join(filePath, files[i]), function(err, data){     
        if(data.isFile()){               
            dirs.push(files[i]);
        }
        iterator(i+1);
       });   
    })(0);
});
