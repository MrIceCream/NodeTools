var fs = require('fs')

fs.readFile('tank/luckdraw/luckdraw.json',function(err, data){
    data = JSON.parse(data)

	let res = [];
	res.push();
	for (var key in data){
		var item = data[key]

		let attribute = [
			item.count,
			item.weeksCount,
			item.resetTime,
			item.totalCount,
			item.total_gold,
			item.total_ticket,
			item.total_free
		]
		res.push(attribute.join('\t'));
	}
	let resultStr = res.join('\n');
	fs.writeFile('tank/luckdraw/luckdraw_result.txt',resultStr,()=>{});
})