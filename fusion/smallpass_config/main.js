const xlsx = require('xlsx')
const fs = require('fs')
const moment = require('moment');
const { LION, COW, COW_SCORES, LION_SCORES, REWARDS, BOOM_DAY } = require('./map');
const { O_NONBLOCK } = require('constants');

function execute() {
    let wb = xlsx.readFile(__dirname + '/config.xlsx')
    let sheet = wb.Sheets[wb.SheetNames[0]]
    let data = xlsx.utils.sheet_to_json(sheet)

    let smallpass = [];
    let crazyboom = [];
    let contents = {"smallpass":smallpass, "crazyboom":crazyboom};
    for (let row = 0; row < data.length; row++) {
        const rowData = data[row];

        if (rowData['活动'] == '小通行证')
        {
            smallpass.push(generateSmallPassConfig(rowData));
        }
        else if (rowData['活动'].indexOf("Boom日") != -1)
        {
            crazyboom.push(generateCrazyboomConfig(rowData));
        }

    }
    fs.writeFileSync(__dirname + '/result.json', JSON.stringify(contents, null, 2))
    console.log('SUCCESS')
}

function generateSmallPassConfig(row) {
    console.log(row);
    let content = row['内容'];
    let rewards = row['奖励配置'];
    let duration = row['活动时间（UTC+0）'];
    let settlement = row['结算时间（UTC+0）'];
    let change = false;

    var template;
    
    // 模板主内容
    if(content.indexOf("牛通") != -1)
    {
        template = Object.assign({}, COW);
        for (const key in COW_SCORES) {
            if (content.indexOf(key) != -1)
            {
                change = true;
                for (const overriteKey in COW_SCORES[key]) {
                    template[overriteKey] = COW_SCORES[key][overriteKey];
                }
                break;
            }
        }
    }
    else if(content.indexOf("狮通") != -1)
    {
        template = Object.assign({}, LION);
        for (const key in LION_SCORES) {
            if (content.indexOf(key) != -1)
            {
                change = true;
                for (const overriteKey in LION_SCORES[key]) {
                    template[overriteKey] = LION_SCORES[key][overriteKey];
                }
                break;
            }
        }
    }
    else
    {
        throw new Error("错误内容")
    }

    if(!change)
    {
        throw new Error("基础配置无改变")
    }
    change = false;
    // 奖励配置
    for (const key in REWARDS) {
        if(rewards == key)
        {
            change = true;
            for (const overriteKey in REWARDS[key]) {
                template[overriteKey] = REWARDS[key][overriteKey];
            }
            break;
        }
    }

    if(!change)
    {
        throw new Error("奖励配置无改变")
    }
    
    // 时间配置
    let startTimeStr = duration.split('-')[0]
    let endTimeStr = duration.split('-')[1]
    let settlementTimeStr = settlement.split('-')[1]

    let startTime = Math.floor(new Date(startTimeStr) / 1000);
    let endTime = Math.floor(new Date(endTimeStr) / 1000);
    let settlementTime = Math.floor(new Date(settlementTimeStr) / 1000);

    template['TeaserStartDateTimestamp'] = startTime;
    template['StartDateTimestamp'] = startTime;
    template['EndDateTimestamp'] = endTime;
    template['ExtraDateTimestamp'] = settlementTime;

    let id = `SmallPassCheck_V${moment(startTimeStr).format('MMDD')}_${moment(endTimeStr).format('MMDD')}`;
    template['ID'] = id;
    template['Name'] = id;

    return template
}

function generateCrazyboomConfig(row) {
    console.log(row);
    let content = row['内容'];
    let duration = row['活动时间（UTC+0）'];

    var template;
    
    // 模板主内容
    if(content.indexOf("钻石") != -1)
    {
        template = Object.assign({}, BOOM_DAY.DIAMONDS);
    }
    else if(content.indexOf("建筑") != -1)
    {
        template = Object.assign({}, BOOM_DAY.BUILD);
    }
    else if(content.indexOf("扭蛋") != -1)
    {
        template = Object.assign({}, BOOM_DAY.MONSTER);
    }
    else
    {
        throw new Error("错误内容")
    }

    // 时间配置
    let startTimeStr = duration.split('-')[0]
    let endTimeStr = duration.split('-')[1]

    let startTime = Math.floor(new Date(startTimeStr) / 1000);
    let endTime = Math.floor(new Date(endTimeStr) / 1000);

    template['StartTime'] = startTime;
    template['EndTime'] = endTime;

    let id = `CrazyBoom_${moment(startTimeStr).format('MMDD')}_${moment(endTimeStr).format('MMDD')}`;
    template['ID'] = id;

    return template
}

execute()