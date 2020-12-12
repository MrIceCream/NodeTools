var fs = require('fs')

function find_store_HardCurrency(data){
	let pack = data.store.pack;
	var res = [];
	for (var key in pack){
		var item = pack[key]
		if(item.purchaseInfo['hard']){
			let attribute = [
				key,
				item.name,
				item.purchaseInfo['hard']
			]
			res.push(attribute.join('\t'));
		}
	}
	fs.writeFile('tank/metagame/find_store_HardCurrency.txt',res.join('\n'),()=>{});
}
let tierPrices = [
	55, 60, 65, 70, 75, 80, 85, 90, 95, 100
  ];

function find_store_iap(data){
	let pack = data.store.pack;
	var res = [];
	for (var key in pack){
		var item = pack[key]
		let tier = item.purchaseInfo['iapExpectedPriceTier'];
		let price = tier > 50 ? tierPrices[tier-51] : tier;
		if(item.purchaseInfo['iap']){
			let attribute = [
				key,
				item.purchaseInfo['iap'],
				item.name,
				price,
				item.hard,
				item.soft
			]
			res.push(attribute.join('\t'));
		}
	}
	fs.writeFile('tank/metagame/find_store_iap.txt',res.join('\n'),()=>{});
}

function find_battlePacks(data){
	let pack = data.battlePacks;
	var res = [];
	for (var key in pack){
		var item = pack[key]
		let attribute = [
			item.id,
			item.level,
			item.expirationTime,
			item.points,
			item.cost,
			item.prizes.hardCurrency,
			item.prizes.bronzeCrate,
			item.prizes.silverCrate,
			item.prizes.goldCrate,
			item.prizes.platinumCrate,
			item.prizes.diamondCrate,
			item.prizes.unlimitedEnergyTime,
		]
		res.push(attribute.join('\t'));
	}
	fs.writeFile('tank/metagame/find_battlePacks.txt',res.join('\n'),()=>{});
}

function find_vipLevels(data){
	let vipLevels = data.game.vipInfo.vipLevels;
	let pack = data.store.pack;
	let iapCoupon = data.store.iapCoupon;
	let hcVipReward = data.store.hcVipReward;


	var res = [];
	for (var key in vipLevels){
		var item = vipLevels[key]
		let attribute = [
			item.vipLevel,
			item.vipPointsNeeded,
			item.battleRewardMultiplier,
			item.upgradeSpeedMultiplier,
			item.customBonusTime,
			item.chestSpeedMultiplier,
			pack[item.packReward] ? pack[item.packReward]['coupons'] ? iapCoupon[pack[item.packReward]['coupons']].name : '' : '',
			pack[item.packReward] ? pack[item.packReward]['hcVipRewards'] ? hcVipReward[pack[item.packReward]['hcVipRewards']].hcReward : '' : '',
		]
		res.push(attribute.join('\t'));
	}
	fs.writeFile('tank/metagame/find_vipLevels.txt',res.join('\n'),()=>{});
}

function find_tournaments(data){
	let pack = data.game.tournaments;
	var res = [];
	for (var key in pack){
		var item = pack[key]
		let attribute = [
			key,
			item.tier,
			item.entryPrice,
			item.rewardSoft,
			item.rewardCards,
			item.minRewardSoft,
			item.minRewardCards,
			item.freeEntryInterval,
			item.winsNeeded,
			item.minWins,
			item.maxLoses,
		]
		res.push(attribute.join('\t'));
	}
	fs.writeFile('tank/metagame/find_tournaments.txt',res.join('\n'),()=>{});
}

fs.readFile('tank/metagame/metagame.json',function(err, data){
	data = JSON.parse(data)
	// find_store_HardCurrency(data);
	// find_battlePacks(data);
	// find_vipLevels(data);
	// find_tournaments(data);
	find_store_iap(data);
})