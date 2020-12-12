const xlsx = require('xlsx')
const fs = require('fs')
const tankMap = require('./tankMap')

const PARSES = [
    {
        keys: ['普通卡包','优秀卡包','金牌卡包','大师卡包','巅峰卡包'],
        func: parseChest
    },
    {
        keys: ['吸汗带'],
        func: parseStrings
    }
]

function execute (input) {
    let wb = xlsx.readFile(`./tennis/pass_card/${input}.xlsx`)
    let baseSheet = wb.Sheets[wb.SheetNames[0]]
    let extraSheet = wb.Sheets[wb.SheetNames[1]]
    let baseRows = xlsx.utils.sheet_to_json(baseSheet)
    let extraRows = xlsx.utils.sheet_to_json(extraSheet)
    let contents = [];
    for (let index = 0; index < baseRows.length; index++) {
        const baseElement = baseRows[index];
        const extraElement = extraRows[index];
        contents.push(createLevel(baseElement, extraElement));
    }
    fs.writeFileSync(`./tennis/pass_card/${input}_result.json`, JSON.stringify(contents, null, 4))
    console.log('SUCCESS')
}

function createLevel (baseData, extraData) {
    let obj = {
        target: baseData.level
    }

    let rewards = {}
    for (let k in baseData) {
        if (k === 'level') {
            continue
        }
        let parseFun = parseDefualt
        PARSES.forEach(kv => {
            if (kv.keys.indexOf(k) > -1) {
                parseFun = kv.func
            }  
        })
        parseFun(k, baseData[k], rewards)
    }
    obj.rewards = rewards;
    
    let extraRewards = {}
    for (let k in extraData) {
        if (k === 'level') {
            continue
        }
        let parseFun = parseDefualt
        PARSES.forEach(kv => {
            if (kv.keys.indexOf(k) > -1) {
                parseFun = kv.func
            }  
        })
        parseFun(k, extraData[k], extraRewards)
    }
    obj.extraRewards = extraRewards;

    return obj
}

function parseDefualt (key, value, data) {
    if (value === 0) {
        return
    }
    data[key] = value
}

function parseChest (key, value, data) {
    if (value === 0) {
        return
    }
    let chests = data['chests']
    if (!chests) {
        chests = {}
        data['chests'] = chests
    }
    chests[tankMap.chestsMap[key]] = value;
}

function parseStrings (key, value, data) {
    if (value === 0) {
        return
    }
    let strings = data['items']
    if (!strings) {
        strings = {}
        data['items'] = strings
    }
    
    item = value.split(',')[0];
    amount = value.split(',')[1];

    strings[tankMap.stringsMap[item]] = parseInt(amount);
}

execute('login')
execute('quest')
execute('quest1')
execute('quest2')