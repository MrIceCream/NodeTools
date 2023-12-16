let fs = require('fs')
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
            console.log('file is not exist')
            return
        }
        let md5Before = before[file]
        let md5After = after[file]
        if (md5Before === md5After)
        {
            needReplaceFiles.push(file)
        }
    })
    
    needReplaceFiles.forEach(file => {
        fs.copyFileSync('./灰图.png', file)
    })
    console.log('FUCKYOU')
    // fs.writeFileSync('./needReplace.json', JSON.stringify({ needReplaceFiles }, null , 4))
}

execute()