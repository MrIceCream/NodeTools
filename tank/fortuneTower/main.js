var fs = require('fs')

function ConvertToTable(data, callBack) {
	data = data.toString();
	var table = new Array();
	var rows = new Array();
	rows = data.split("\r\n");
	for (var i = 0; i < rows.length; i++) {
		table.push(rows[i].split(","));
	}
	callBack(table);
}

fs.readFile('fortuneTower/base.csv', function (err, data) {
	ConvertToTable(data, function (table) {
		let res = [];
		table.forEach(element => {
			let level = Number(element[0]);
			if(!level){
				return;
			}

			let single = [
				{"softCurrency":Number(element[1])},
				{"hardCurrency":Number(element[2])},
				{"techTreePoints":Number(element[3])}
			]
			let powerUp = {"powerUp": {
				"amount": 1,
				"rarity": element[5],
				"tier": Number(element[4])
			}}
			
			let bigLevel = [30, 60];
			if(bigLevel.indexOf(level) != -1){
				single = [];
			}
			single.push(powerUp)

			res.push(single);
		});
		fs.writeFile('fortuneTower/fortuneTower_result.json',JSON.stringify(res),()=>{});
	})
})
