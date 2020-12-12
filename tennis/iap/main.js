var fs = require('fs')

function find_store_iap(data){
	let pack = data.productSkus;
	var res = [];
	for (var key in pack){
		var item = pack[key]
		let attribute = [
			key,
			item.price,
		]
		res.push(attribute.join('\t'));
	}
	fs.writeFile('tennis/iap/find_store_iap.txt',res.join('\n'),()=>{});
}

fs.readFile('tennis/iap/iaps.json',function(err, data){
	data = JSON.parse(data)
	find_store_iap(data);
})