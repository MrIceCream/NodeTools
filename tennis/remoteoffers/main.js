var fs = require('fs')
const moment = require('moment');
const uuidv1 = require('uuid').v4;
const path = require('path')

function change_offer_config(){
	fs.readFile('tennis/remoteoffers/remoteoffers.json',function(err, data){
		data = JSON.parse(data)
		let segments = data.segments;
		for (var item of segments){

			if(item.reward.hardCurrency){
				item.reward.hardCurrency = Math.ceil(item.reward.hardCurrency * 1.5)
			}

			let rewardsItems = item.reward.items
			if(rewardsItems && Object.keys(rewardsItems).length > 0){
				let rewardsItemKey = Object.keys(rewardsItems)[0];
				rewardsItems[rewardsItemKey] = Math.ceil(rewardsItems[rewardsItemKey] * 1.4);
			}
			
			// let rewardsChests = item.reward.chests
			// for (const key in rewardsChests) {
			// 	rewardsChests[key] = Math.round(rewardsChests[key] * 1.4)
			// }
		}
		fs.writeFile('tennis/remoteoffers/remoteoffers_result.json',JSON.stringify(data, null, 4),()=>{});
	})
}

function change_repeat_uuid() {
	const DIR_PATH = '/Users/mac/GitProjects/tennis-server/apollo/tennis-backend/config/remoteoffers/files/'
	const CHECK_LIST = [
		'offer_instances_prod.json',
		'offer_instances.json'
	]
	let uuidSet = new Set()
    CHECK_LIST.forEach(file => {
        let url = path.join(DIR_PATH, file)
        console.log('开始检查配置: ', file)
        let data = fs.readFileSync(url)
        let offerData = JSON.parse(data)
        let needSave = false
        let instances = offerData.instances 
        instances.forEach(offer => {
            while(uuidSet.has(offer.id))
            { 
                console.log('有重复UUID', offer.id)
                offer.id = uuidv1()
                needSave = true
            }
            uuidSet.add(offer.id)
        })
        
        if (needSave) {
            fs.writeFileSync(url, JSON.stringify(offerData, null, 4))
            console.log('保存修改后文件', file)
        }
        console.log('文件检查完成: ', file)
    })
    console.log('SUCCESS')
}

// change_offer_config();
// change_repeat_uuid();

const uploadConfigJS = require('./scripts/uploadConfig')
uploadConfigJS.execute()