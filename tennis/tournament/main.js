var fs = require('fs')
const moment = require('moment');
const uuidv1 = require('uuid').v4;

function add_fast_tournament()
{
	let initialTime = "2020-11-18T02:20:00";
	fs.readFile(__dirname + '/template.json',function(err, data){
		data = JSON.parse(data)
		let template = data.template[0];
		let resultData = {"instances":[]};
		let result = [];
		for (let index = 0; index < 1*25; index += 25) {
			let teaserDate = moment.utc(initialTime).add(index-10, 'minute').format();
			let removalDate = moment.utc(initialTime).add(index+25, 'minute').format();

			let startDate1 = moment.utc(initialTime).add(index, 'minute').format();
			let endDate1 = moment.utc(initialTime).add(index+8, 'minute').format();
			let limitDate1 = moment.utc(initialTime).add(index+9, 'minute').format();

			let startDate2 = moment.utc(initialTime).add(index+10, 'minute').format();
			let endDate2 = moment.utc(initialTime).add(index+18, 'minute').format();
			let limitDate2 = moment.utc(initialTime).add(index+19, 'minute').format();

			let temp = JSON.parse(JSON.stringify(template))
			temp.teaserDate = teaserDate;
			temp.removalDate = removalDate;
			temp.rounds[0].startDate = startDate1;
			temp.rounds[0].endDate = endDate1;
			temp.rounds[0].limitDate = limitDate1;
			temp.rounds[1].startDate = startDate2;
			temp.rounds[1].endDate = endDate2;
			temp.rounds[1].limitDate = limitDate2;
			temp.id = uuidv1();
			result.push(temp);
		}
		resultData.instances = result

		fs.writeFile(__dirname + '/result.json',JSON.stringify(resultData, null, 4),()=>{});
	})
}

function add_slow_tournament()
{
	let initialTime = "2020-11-28T06:10:00";
	fs.readFile(__dirname + '/template.json',function(err, data){
		data = JSON.parse(data)
		let template = data.template[0];
		let resultData = {"instances":[]};
		let result = [];
		for (let index = 0; index < 3*51; index += 51) {
			let teaserDate = moment.utc(initialTime).add(index-60, 'minute').format();
			let removalDate = moment.utc(initialTime).add(index+51, 'minute').format();

			let startDate1 = moment.utc(initialTime).add(index, 'minute').format();
			let endDate1 = moment.utc(initialTime).add(index+20, 'minute').format();
			let limitDate1 = moment.utc(initialTime).add(index+21, 'minute').format();

			let startDate2 = moment.utc(initialTime).add(index+24, 'minute').format();
			let endDate2 = moment.utc(initialTime).add(index+50, 'minute').format();
			let limitDate2 = moment.utc(initialTime).add(index+51, 'minute').format();

			let temp = JSON.parse(JSON.stringify(template))
			temp.teaserDate = teaserDate;
			temp.removalDate = removalDate;
			temp.rounds[0].startDate = startDate1;
			temp.rounds[0].endDate = endDate1;
			temp.rounds[0].limitDate = limitDate1;
			temp.rounds[1].startDate = startDate2;
			temp.rounds[1].endDate = endDate2;
			temp.rounds[1].limitDate = limitDate2;
			temp.id = uuidv1();
			result.push(temp);
		}
		resultData.instances = result

		fs.writeFile(__dirname + '/result.json',JSON.stringify(resultData, null, 4),()=>{});
	})
}

function change_tournament_config()
{
	fs.readFile(__dirname + '/RookieJuniorTournament.json',function(err, data){
		data = JSON.parse(data)
		let leagues = data.leagues;

		leagues.forEach(league => {
			league.entryCost *= 0.95;
			league.matchRegistrationFee *= 0.95;
			league.matchReward *= 0.95;
			league.reward.forEach(reward => {
				
				if(reward.maxReward){
					let maxReward = reward.maxReward
					maxReward.softCurrency *= 1.05;
					maxReward.hardCurrency *= 1.05;
					maxReward.items.common = Math.ceil(maxReward.items.common * 1.05);
					maxReward.items.rare = Math.ceil(maxReward.items.rare * 1.05);
					maxReward.items.epic = Math.ceil(maxReward.items.epic * 1.05);
					maxReward.items.unique = Math.ceil(maxReward.items.unique * 1.05);
					let rewardsItems = maxReward.fixedItems
					for (const key in rewardsItems) {
						if (rewardsItems.hasOwnProperty(key)) {
							rewardsItems[key] = Math.ceil(rewardsItems[key] * 1.05);
						}
					}
				}

				if(reward.minReward){
					let minReward = reward.minReward
					minReward.softCurrency *= 1.05;
					minReward.hardCurrency *= 1.05;
					minReward.items.common = Math.ceil(minReward.items.common * 1.05);
					minReward.items.rare = Math.ceil(minReward.items.rare * 1.05);
					minReward.items.epic = Math.ceil(minReward.items.epic * 1.05);
					minReward.items.unique = Math.ceil(minReward.items.unique * 1.05);
					let rewardsItems = minReward.fixedItems
					for (const key in rewardsItems) {
						if (rewardsItems.hasOwnProperty(key)) {
							rewardsItems[key] = Math.ceil(rewardsItems[key] * 1.05);
						}
					}
				}
				
				

			});
		});

		fs.writeFile(__dirname + '/RookieJuniorTournament_result.json',JSON.stringify(data, null, 2),()=>{});
	})
}

// add_fast_tournament();
add_slow_tournament();
// change_tournament_config();