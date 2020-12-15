const fs = require('fs')
const path = require('path')
const TARGE = 'Tennis'
const OFFER_TARGE = 'Tennis/remoteoffers'

const UPLOAD_FILES = [
    '/Users/mac/Project/tennis-go/apollo/tennis-backend/config/metagame/prod/iaps.json',
    '/Users/mac/Project/tennis-client/Trunk/.localization.lock',
    '/Users/mac/Project/tennis-go/apollo/tennis-backend/config/metagame/prod/purchase_packs.json',
    '/Users/mac/Project/tennis-go/apollo/tennis-backend/config/metagame/prod/player_items_store.json',
]

const OFFER_DIR = '/Users/mac/Project/tennis-go/apollo/tennis-backend/config/remoteoffers'
const OFFER_INSTANCE = '/files/offer_instances.json'
const OFFER_INSTANCE_PROD = '/files/offer_instances_prod.json'

function cleanDirOrCreate (root) {
    if (fs.existsSync(root)) {
        clearDir(root)
    }
    fs.mkdirSync(root)
    console.log('创建目录', root)
}

function clearDir (url) {
    let files = fs.readdirSync(url)
    files.forEach(file => {
        let fileUrl = path.join(url, file)
        let stat = fs.statSync(fileUrl)
        if (stat.isDirectory()) {
            clearDir(fileUrl)
        } else {
            fs.unlinkSync(fileUrl)
            console.log('删除文件', fileUrl)
        }
    })
    fs.rmdirSync(url)
    console.log('删除目录', url)
}
async function execute () {
    // 清理目录
    console.log('清理生成目录')
    cleanDirOrCreate(TARGE)
    cleanDirOrCreate(OFFER_TARGE)

    // 复制配置
    console.log('==========================================')
    console.log('复制基本配置')
    for (let i = 0; i < UPLOAD_FILES.length; i++) {
        let source = UPLOAD_FILES[i]
        let basename = path.basename(source)
        let target = path.join(TARGE, basename)
        await copyFile(source, target)
    }
    console.log('复制基本配置完成  SUCCESS')   

    console.log('==========================================')
    console.log('复制特惠配置目录')
    await copyDir(OFFER_DIR, OFFER_TARGE)
    console.log('复制特惠配置目录  SUCCESS')

    // 找到offer_instance.json 用 offer_instance_prod.json替换
    let offerInstanceUrl = path.join(OFFER_TARGE, OFFER_INSTANCE)
    let offerInstanceProdUrl = path.join(OFFER_TARGE, OFFER_INSTANCE_PROD)
    if (fs.existsSync(offerInstanceUrl)) {
        fs.unlinkSync(offerInstanceUrl)
        console.log('删除 offer_instances.json')
    }
    copyFile(offerInstanceProdUrl, offerInstanceUrl)
    
    console.log('SUCCESS')
}

function copyFile (source, target) {
    return new Promise((resolve, reject) => {
        fs.copyFile(source, target, (err) => {
            if (err) {
                console.error(`复制失败: ${target}`)
                reject(err)
            } else {
                console.log(`复制成功: ${target}`)
                resolve(true)
            }
        })
    })
} 

function copyDir (source, target) {
    // 判断是否已经有创建过目录
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target)
    }
    let files = fs.readdirSync(source)
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            let fileUrl = path.join(source, file)
            let targetUrl = path.join(target, file)
            let stat = fs.statSync(fileUrl)
            if (stat.isDirectory()) {
                await copyDir(fileUrl, targetUrl)
            } else {
                await copyFile(fileUrl, targetUrl)
            }
        }
        resolve(true)
    })
}

// execute()


module.exports = {
    execute
}