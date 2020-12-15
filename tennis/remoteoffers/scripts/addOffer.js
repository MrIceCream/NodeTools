var fs = require('fs')
const moment = require('moment');
const uuidv1 = require('uuid').v4;
const path = require('path')

function add_new_offer()
{
	let initialTime = "2020-10-31";
	fs.readFile('tennis/remoteoffers/offerTemplate.json',function(err, data){
		data = JSON.parse(data)
		let templates = data.template;
		let result = [];
		let day = 0
		for (let index = 0; index < 3*26; index += 3) {
			let templateIndex = index % templates.length
			let template = templates[templateIndex];
			let duration = templateIndex == 0 ? 2 : 1;

			let startDate = moment.utc(initialTime).add(day, 'days').format();
			let endDate = moment.utc(initialTime).add(day+duration, 'days').format();
			let temp = Object.assign({}, template);
			temp.start = startDate;
			temp.end = endDate;
			temp.id = uuidv1();
			result.push(temp);

			template = templates[templateIndex+1];
			startDate = moment.utc(initialTime).add(day, 'days').format();
			endDate = moment.utc(initialTime).add(day+duration, 'days').format();
			temp = Object.assign({}, template);
			temp.start = startDate;
			temp.end = endDate;
			temp.id = uuidv1();
			result.push(temp);

			template = templates[templateIndex+2];
			startDate = moment.utc(initialTime).add(day, 'days').format();
			endDate = moment.utc(initialTime).add(day+duration, 'days').format();
			temp = Object.assign({}, template);
			temp.start = startDate;
			temp.end = endDate;
			temp.id = uuidv1();
			result.push(temp);

			day += duration;
		}

		fs.writeFile('tennis/remoteoffers/addOfferResult.json',JSON.stringify(result, null, 4),()=>{});
	})
}

function add_new_offer_test()
{
	let initialTime = "2020-10-19";
	fs.readFile('tennis/remoteoffers/offerTemplate.json',function(err, data){
		data = JSON.parse(data)
		let templates = data.template;
		let result = [];
		let day = 0
		for (let index = 0; index < 8; index ++) {
			let templateIndex = index % templates.length
			let template = templates[templateIndex];
			let duration = 10+index;

			let startDate = moment.utc(initialTime).add(day, 'days').format();
			let endDate = moment.utc(initialTime).add(day+duration, 'days').format();
			let temp = Object.assign({}, template);
			temp.start = startDate;
			temp.end = endDate;
			temp.id = uuidv1();
			result.push(temp);

			// day += duration;
		}

		fs.writeFile('tennis/remoteoffers/addOfferResult.json',JSON.stringify(result, null, 4),()=>{});
	})
}