let fs = require('fs')
let xlsx = require('xlsx')
let url_1 = './file_1.json'
let url_2 = './file_2.json'

function execute()
{
    let after = fs.readFileSync(url_1, 'utf8')
    after = JSON.parse(after)

    let before = fs.readFileSync(url_2, 'utf8')
    before = JSON.parse(before)

    let needReplaceFiles = []
    
    Object.keys(before).forEach(file => {
        if (!after[file])
        {
            // console.log(`${file} is not exist`)
            return
        }
        let md5Before = before[file]
        let md5After = after[file]
        if (md5Before === md5After)// || md5After === '7ed364c1d07f11fb6b2a6e40d30b1b7a') //灰图
        {
            needReplaceFiles.push(file)
        }
    })
    
    let rows = needReplaceFiles.map(r => { return {file: r} })

    let wb = {
        Sheets: {
            Sheet: xlsx.utils.json_to_sheet(rows)
        },
        SheetNames: ['Sheet']
    }
    xlsx.writeFile(wb, './未修改图片.xlsx')
    console.log('OK => 未修改图片')
    // needReplaceFiles.forEach(file => {
    //     fs.copyFileSync('./default.png', file)
    // })
    // console.log('FUCKYOU')
    // fs.writeFileSync('./needReplace.json', JSON.stringify({ needReplaceFiles }, null , 4))
}

execute()