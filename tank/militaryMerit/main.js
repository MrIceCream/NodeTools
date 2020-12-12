const xlsx = require('xlsx')
const fs = require('fs')

const PARSES = [
    {
        keys: ['unlimitedEnergies'],
        func: parseEnergies
    },
    {
        keys: ['b61a30fd-c653-54cc-8bb9-862b0f9b3aa0', '7f31d56c-1d11-1442-1a24-81f7e95223c0', '92d7a0db-a272-c495-a9a9-68a669a36509'],
        func: parseAmor
    },
    {
        keys: ['a93ac7e4-ff61-7449-0b5e-696cdc121b83', 'e5bfef69-79c1-c434-fa01-d0b08f63a113', '7e858997-f68e-0425-6861-f65ecdc4e589', '6e11ba87-e1ff-e4b0-4a05-602e555a4226', 'c3c31946-53fc-e4bc-4b22-31ebd0532e52'],
        func: parseChest
    }
]

function execute () {
    let wb = xlsx.readFile('./tank/militaryMerit/militaryMerit.xlsx')
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
    fs.writeFileSync('./tank/militaryMerit/contents.json', JSON.stringify(contents, null, 2))
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

function parseEnergies (key, value, data) {
    if (value === 0) {
        return
    }
    let uuid = 'c745e05c-0440-642a-08e7-76c2db780236'
    if (!data['unlimitedEnergies']) {
        data['unlimitedEnergies'] = []
    }
    data['unlimitedEnergies'].push(uuid)
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
            id: key,
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
    chests.push(key)
}
execute()