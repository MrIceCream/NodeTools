const fs = require('fs')
const path = require('path')
const Excel = require('exceljs')
var workbook = new Excel.Workbook();

let _monthResult = {};
let _totalList = [];
let _filterItemId = [ //  过滤订阅
    "2da17cf9-7a03-d4dc-7976-aeeb973acd93",
    "aa9053a3-89ba-c4e7-baf0-14cfe63dd65a",
    "684b3e7f-2d0f-4411-8a33-f5f8aee50c8c",
    "2ed2bd1e-f43f-44ee-38aa-a8bcc0d142c1"
];
let _completeFiles = 0;

function handleData(country, month, userId, price) {
    let key = country + month;
    let result = {};
    if (_monthResult[key] == undefined) {
        result['country'] = country;
        result['month'] = month;
        result['price'] = 0;
        result['amount'] = 0;
        result['people'] = [];
        _monthResult[key] = result;
    } else {
        result = _monthResult[key];
    }

    if(result['people'].indexOf(userId) == -1){
        result['people'].push(userId);
    }

    result['price'] += price;
    result['amount'] = result['amount']+1;
    result['peopleLength'] = result['people'].length;
}

function dealFile(filePath, fileName, totalFiles) {
    var excelfile = path.join(filePath, fileName);  //这是要导入的.xlsx文件的路径
    let tempPayMonth = '';
    workbook.xlsx.readFile(excelfile).then(function () {
        var worksheet = workbook.getWorksheet(1); //获取第一个worksheet
        worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber > 1) { // 跳过标题
                values = row.values;
                let tempItemId = values[1];
                let tempCreateMonth = values[8].substr(0, 7);

                let tempUserId = values[2];
                tempPayMonth = values[3].substr(0, 7);
                let tempCountry = values[7];
                let tempPrice = values[10].result;
                if (tempCreateMonth == '2020-07' && _filterItemId.indexOf(tempItemId) == -1) { // 筛选注册玩家
                    handleData(tempCountry, tempPayMonth, tempUserId, tempPrice);
                }
            }
        });
    }).then(function () {
        for (const key in _monthResult) {
            if(tempPayMonth == _monthResult[key].month){
                _totalList.push(_monthResult[key]);
            }
        }
        _completeFiles++;

        if(_completeFiles == totalFiles){

            _totalList.forEach(element => {
                delete element['people']
            });

            fs.writeFile(path.resolve(__dirname + "/result/", 'result.json'), JSON.stringify(_totalList, null, 4), function (err) {
                err ? console.log(err) : console.log("成功");
            });
        }
    });
}

function main() {
    let filePath = __dirname + '/excel';
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename, index, array) {
                if(filename.indexOf('xlsx') != -1)
                    dealFile(filePath, filename, array.length-1);
            })
        }
    })
}

main();