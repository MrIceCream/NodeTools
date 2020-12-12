var fs = require('fs')

fs.readFile('tank/tankPart/tank.json',function(err, data){
    data = JSON.parse(data)

	let res = [];
	res.push();
	for (var key in data){
		var item = data[key]

		let attribute = [
			item.track,
			item.engine,
			item.muzzle,
			item.turret,
			item.chassis
		]
		res.push(attribute.join('\t'));
	}
	let resultStr = res.join('\n');
	fs.writeFile('tank/tankPart/tank_result.txt',resultStr,()=>{});
})