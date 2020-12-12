const xlsx = require('xlsx')
const fs = require('fs')
const tankMap = require('./tankMap')

const PARSES = [
    {
        keys: ['unlimitedEnergies'],
        func: parseEnergies
    },
    {
        keys: ['燃烧弹','破甲弹','榴弹'],
        func: parseAmor
    },
    {
        keys: ['铜宝箱','银宝箱','金宝箱','豪华宝箱','至尊宝箱'],
        func: parseChest
    },
    {
        keys: ['patterns'],
        func: parsePatterns
    },
    {
        keys: ['decals'],
        func: parseDecals
    }
]

function execute () {
    let wb = xlsx.readFile('./tank/accRechargeActivity/accRechargeActivity.xlsx')
    let baseSheet = wb.Sheets[wb.SheetNames[0]]
    let baseRows = xlsx.utils.sheet_to_json(baseSheet)

    let contents = [];
    for (let index = 0; index < baseRows.length; index++) {
        const baseElement = baseRows[index];
        contents.push(createLevel(baseElement));
    }
    fs.writeFileSync('./tank/accRechargeActivity/contents.json', JSON.stringify(contents, null, 2))
    console.log('SUCCESS')
}

function createLevel (baseData) {
    let obj = {
        target: baseData.level.toString()
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

    return obj
}

function parseDefualt (key, value, data) {
    if (value === 0) {
        return
    }
    data[key] = value
}

function parseEnergies (key, value, data) {
    if (value === 0) {
        return
    }
    if (!data['unlimitedEnergies']) {
        data['unlimitedEnergies'] = []
    }

    let type = value.split(',')[0];
    let amount = value.split(',')[1];

    for (let index = 0; index < amount; index++) {
        data['unlimitedEnergies'].push(tankMap.unlimitedEnergiesMap[type])
    }
}

function parseAmor (key, value, data) {
    if (value === 0) {
        return
    }
    let amors = data['ammos']
    if (!amors) {
        amors = []
        data['ammos'] = amors
    }
    amors.push(
        {
            id: tankMap.ammosMap[key],
            amount: value
        }
    )
}

function parseChest (key, value, data) {
    if (value === 0) {
        return
    }
    let chests = data['chests']
    if (!chests) {
        chests = []
        data['chests'] = chests
    }
    chests.push(tankMap.chestsMap[key])
}

function parseDecals (key, value, data) {
    if (value === 0) {
        return
    }
    let decals = data['decals']
    if (!decals) {
        decals = []
        data['decals'] = decals
    }
    
    let all = value.split(',');
    for (const iterator of all) {
        decals.push(tankMap.decalsMap[iterator])
    }
}

function parsePatterns (key, value, data) {
    if (value === 0) {
        return
    }
    let patterns = data['patterns']
    if (!patterns) {
        patterns = []
        data['patterns'] = patterns
    }
    
    let all = value.split(',');
    for (const iterator of all) {
        patterns.push(tankMap.patternsMap[iterator])
    }
}

execute()