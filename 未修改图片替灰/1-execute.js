let rd = require('rd')
let fs = require('fs')
let path = require('path')
let crypto = require('crypto')
dir1 = 'makerstory-client'
dir2 = 'makerstory-client-init'
let url1 = [
    '/Volumes/T7/makerstory/makerstory-client/Assets/Art',
    '/Volumes/T7/makerstory/makerstory-client/Assets/Data/Art',
]
let url1_exclude = [
]
let url2 = [
    '/Volumes/T7/makerstory/makerstory-client-init/Assets/Art',
    '/Volumes/T7/makerstory/makerstory-client-init/Assets/Data/Art',
]
let url2_exclude = [
]
let file1Url = './file_1.json'
let file2Url = './file_2.json'

async function execute(input, output, exclude) {

    let fileMd5Dict = {}
    
    for (let x = 0; x < input.length; x++) {
        let files = rd.readFileFilterSync(input[x], (f) => {
            return path.extname(f).toLocaleLowerCase() === '.png'
        })
        console.log(`find ${input[x]}`)
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            let containsElement = exclude.some(y => file.includes(y));
            if (containsElement) continue;
            let md5 = await getFileMd5(file)
            fileMd5Dict[file.replace(dir2, dir1)] = md5
        }
    }
    content = JSON.stringify(fileMd5Dict, null, 4)
    content = content.replaceAll('sunshine-init', 'sunshine')
    fs.writeFileSync(output, content, 'utf8')
    console.log('Success')
}

function getFileMd5(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) throw new Error('FUCKYOU');

            let hash = crypto.createHash('md5');
            hash.update(data, 'utf-8');
            let md5 = hash.digest('hex');
            // console.log(md5)
            resolve(md5)
        })
    })
}


execute(url1, file1Url, url1_exclude)
execute(url2, file2Url, url2_exclude)