const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path');
const async = require("async");

const stringMap = {
    'eventTime':'事件时间',
    'eventName':'事件名称',
    'ActivationDate':'注册时间',
    'AppVersion':'游戏版本',
    'HighestAvailableTour':'最高可用巡回赛',
    'HighestUnlockedTour':'最高解锁巡回赛',
    'InstallDays':'安装天数',
    'InstallTime':'安装时间',
    'Locale':'地区',
    'Platform':'平台',
    'PlayerHardCurrency':'玩家金条',
    'PlayerId':'玩家id',
    'PlayerLeague':'玩家排行',
    'PlayerLeagueId':'玩家排行',
    'PlayerLosses':'失败次数',
    'PlayerSoftCurrency':'玩家钞票',
    'PlayerWins':'胜利次数',
    'SystemLanguage':'系统语言',
    'intervalDays':'间隔天数',
    'localizedPrice':'商品价格',
    'payer':'是否付费玩家',
    'price':'商品价格',
    'productSku':'商品id',

    'GemsCost':'金条花费',
    'Kind':'类型',
    'Location':'购买入口',
    'OfferId':'礼包id',
    'OfferName':'礼包名称',
    'OfferPackId':'礼包子id',
    'PurchaseNumber':'购买次数',
    'SecondsRemaining':'礼包剩余秒数',
    'SkuCode':'商品id',
    'SoftCost':'花费银币',
    'Value':'折扣数',

    'BalanceAfter':'变化之后数量',
    'Delta':'变化数量',

    'PurchaseCompleted':'支付点',
    'OfferBuy':'礼包点',
    'HardCurrencyVar':'钞票记录',
    'SoftCurrencyVar':'银币记录'
}

const filterKey = [
    'PlayerCards'
]

function stringMapFunc(key)
{
    return stringMap.hasOwnProperty(key) ? stringMap[key] : key;
}

let _csvData;
let _dataKeysMap = {};
let _dataMap = {};

function dealFile(filePath, filename, result)
{
    var filedir = path.join(filePath, filename);
    let wb = xlsx.readFile(filedir)
    let sheet = wb.Sheets[wb.SheetNames[0]]
    let rows = xlsx.utils.sheet_to_json(sheet, { raw: false })
    rows.forEach(element => {

        let eventName = element['Event Name'];
        let eventValue = element['Event Value'];
        
        if(_dataKeysMap[eventName] == undefined){
            _dataKeysMap[eventName] = [];
        }

        try {
            let keys = Object.keys(JSON.parse(eventValue));
            keys.forEach(key => {
                if(_dataKeysMap[eventName].indexOf(key) == -1 && filterKey.indexOf(key) == -1)
                {
                    _dataKeysMap[eventName].push(key);
                    _dataKeysMap[eventName].sort();
                }
            });
            let tempElement = {
                'eventTime' : element['Event Time'],
                'eventName' : eventName,
                'eventValue': eventValue
            }
            result.push(tempElement);

        } catch (error) {}
    });
}

let mergeCSV = function (callback) {
    let result = [];
    let filePath = __dirname + '/csv'
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                dealFile(filePath, filename, result)
            })
            _csvData = result;
            callback(null, "function main")
        }
    })
}

function generateAnalyticsData()
{
    for (const key in _dataKeysMap) {
        _dataMap[key] = [];
    }

    _csvData.forEach(element => {
        let eventName = element.eventName
        let eventValue = JSON.parse(element.eventValue);
        let rowsData = [];
        let firstLine = [stringMapFunc('eventTime')];
        
        if(_dataMap[eventName].length == 0){
            _dataMap[eventName].push(firstLine);
        }

        rowsData.push(element.eventTime)
        _dataKeysMap[eventName].forEach(key => {

            if(_dataMap[eventName].length == 1){
                firstLine.push(stringMapFunc(key));
            }

            if(eventValue.hasOwnProperty(key)){
                rowsData.push(eventValue[key])
            }else{
                rowsData.push("")
            }
        });
        _dataMap[eventName].push(rowsData);
    });
}

function writeAnalyticsDataToFile()
{
    let wb = xlsx.utils.book_new();
    for (const key in _dataMap) {
        var ws = xlsx.utils.aoa_to_sheet(_dataMap[key]);
        ws['!cols'] = fitToColumn(_dataMap[key]);
        xlsx.utils.book_append_sheet(wb, ws, stringMapFunc(key));
    }
    xlsx.writeFile(wb, __dirname+'/网球数据分析.xlsx');
}

function fitToColumn(arrayOfArray) {
    // get maximum character of each column
    return arrayOfArray[0].map((a, i) => ({ wch: Math.max(...arrayOfArray.map(a2 => a2[i].toString().length)) }));
}

let main = function() {
    generateAnalyticsData()
    writeAnalyticsDataToFile()
}

async.series([mergeCSV, main], function (error, result) {
    console.log(result);
});