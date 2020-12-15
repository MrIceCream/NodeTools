var fs = require('fs')
const moment = require('moment');
const uuidv1 = require('uuid').v4;
const path = require('path')

let retainOffers_1 = [
	'b99138c9-2360-4302-9d7e-f7405cdba926',
	'af340c15-bf17-4c39-8726-12f2cc0cc3fa',
	'642cfb18-4ba1-4188-b69c-1b60406deb9b',
	'f8145046-b5d6-4b30-bfb4-cb329510d9dd',
	'6f404cda-a311-43eb-888c-a02a5377f12f',
	'6e902c69-3650-4836-b92b-59ea14d6bce3',
	'031338a0-ab79-475e-8bd8-481e6d55c9a2',
	'f96dc131-4efe-4546-b302-1a38981b5a7f',
	'f42fb492-3551-453f-b2a6-51c9152f21f6',
	'8dd5cc87-a1ae-42c6-a89b-57ba9c9b2d71',
	'f53c25e9-eca9-44bc-b1a3-e7e827d906b8',
	'0c5b9727-5f3f-456f-803a-b53f3381c09f',
	'6db9dd8f-dc4a-44ed-95f9-494e69b513ac',
	'33592fdd-0583-48e8-80c4-50bad1ac338f',
	'2f4e96a3-9821-4d42-a95e-77ea3bd1e693',
	'796158f5-2e04-417d-a569-548dd69fab6a',
	'e9f2c02d-7dbe-4139-b677-45f044e0c533',
	'1c6c24eb-4b68-42ce-af8a-359b4d93a9b9',
	'664d71ae-9335-465c-bc0b-52fd60146d68',
	'd7b19b64-0791-42ec-af32-04f995512867',
	'4ca7ba80-3bdc-4253-a51f-56870f5e3195',
	'622ce558-5141-4411-a854-7cd23ebf4f02',
	'1a8782b9-2d2f-436c-8974-b7aa3ebf7b51',
	'b8684920-c990-40cb-858d-f5ba63e07bc8'
]

function delete_offer_config_1(){
	fs.readFile('tennis/remoteoffers/remoteoffers.json',function(err, data){
		data = JSON.parse(data)
		let segments = data.segments;
		let newSegments = []

		retainOffers_1.forEach(element1 => {
			segments.forEach(element2 => {
				if(element1 == element2.id){
					newSegments.push(element2)
				}
			});
		});

		console.log(newSegments.length);
		for (let index = 0; index < newSegments.length; index++) {
			const element = newSegments[index];
			let group = Math.floor(index/8)
			// console.log(group);
			switch (group) {
				case 0:
					element.minDaysSinceLastBuy = 7
					element.maxDaysSinceLastBuy = "inf"
					element.minTotalSpent30Days = 0
					element.maxTotalSpent30Days = "inf"
					break;
				case 1:
					element.minDaysSinceLastBuy = 0
					element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 0
					element.maxTotalSpent30Days = 5
					break;
				case 2:
					element.minDaysSinceLastBuy = 0
					element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 5
					element.maxTotalSpent30Days = "inf"
					break;
			}
		}
		data.segments = newSegments;

		fs.writeFile('tennis/remoteoffers/delete_result.json',JSON.stringify(data, null, 4),()=>{});
	})
}

let retainOffers_2 = [
	'b99138c9-2360-4302-9d7e-f7405cdba926',
	'af340c15-bf17-4c39-8726-12f2cc0cc3fa',
	'642cfb18-4ba1-4188-b69c-1b60406deb9b',
	'f8145046-b5d6-4b30-bfb4-cb329510d9dd',
	'62c73e66-ad7a-4419-a2d1-c426e447d7fc',
	'acd5f9ae-6b4f-47c2-87f8-97668925532c',
	'b32fc3b7-4a38-4126-b12f-70a81ebb09b4',
	'0a98f0ab-d3fa-4f73-b211-c9271de755eb',
	'14aca0df-6303-4656-b416-9db7f33d3351',
	'd0ddaa88-de50-43d5-8391-c206d418e470',
	'7f9c8246-084f-48b2-8fe6-2e435da80357',
	'f6c734b9-7e7d-4155-9dc1-c226ba7ec75b',
	'6f404cda-a311-43eb-888c-a02a5377f12f',
	'6e902c69-3650-4836-b92b-59ea14d6bce3',
	'031338a0-ab79-475e-8bd8-481e6d55c9a2',
	'f96dc131-4efe-4546-b302-1a38981b5a7f',
	'f42fb492-3551-453f-b2a6-51c9152f21f6',
	'8dd5cc87-a1ae-42c6-a89b-57ba9c9b2d71',
	'f53c25e9-eca9-44bc-b1a3-e7e827d906b8',
	'0c5b9727-5f3f-456f-803a-b53f3381c09f',
	'6db9dd8f-dc4a-44ed-95f9-494e69b513ac',
	'33592fdd-0583-48e8-80c4-50bad1ac338f',
	'2f4e96a3-9821-4d42-a95e-77ea3bd1e693',
	'796158f5-2e04-417d-a569-548dd69fab6a',
	'6a3d1911-a75d-4cec-8b35-eee5e598343d',
	'd0f4c86f-9a9e-4cea-b68b-6445ae0eeba2',
	'8dc58527-95a3-40df-8b89-50c3cb7b7a15',
	'1290f184-40b0-44a2-9e20-bf46bb860f47',
	'1ea43087-68b4-4b9a-850b-db3278ed684a',
	'bbc17eff-5cad-4e97-8d5a-c93b7ddd7a58',
	'b27fdef2-fdcb-4911-8238-b3b1f814f2c5',
	'57d14c2a-86d3-4477-91df-fe8e366329ad',
	'eff2ae38-f5a3-4b3e-87ec-faa7e77ec86f',
	'96f276d5-61cc-469a-88b5-648d625fda0d',
	'b234e7f4-7a91-4640-8346-919ac14611ce',
	'21278a5a-ef6d-459b-b322-d1d6f2a1a842',
	'4ca7ba80-3bdc-4253-a51f-56870f5e3195',
	'622ce558-5141-4411-a854-7cd23ebf4f02',
	'1a8782b9-2d2f-436c-8974-b7aa3ebf7b51',
	'b8684920-c990-40cb-858d-f5ba63e07bc8',
	'fdd6a577-8788-4163-8b76-a097097dec0a',
	'34587ef8-29c4-42ae-ac64-393069c67ee3',
	'258d5202-8b5e-4d37-a80c-94608944ed2b',
	'fd39fe86-0df4-4f5f-aa3a-bc3b79f07d6e',
	'2dca7f40-aaca-42f1-ae16-6b383bc6fccb',
	'114aee52-1e1a-483a-873b-391a6a992d17',
	'a603f2fd-3cb5-47a5-b77f-12d4179b2cba',
	'9ee01e4e-ba8a-49df-bdd8-b55e388f2199',
	'0fe6f518-fa4b-4337-91d7-e815f6ca24f6',
	'66814843-1697-427c-9b57-e25eea44c50c',
	'2d31c3ab-d8a8-4c91-a999-57614ac872b6',
	'fd607c53-a2d0-497e-b99c-98a4e4246fb5',
	'b2592fa5-1028-4dd7-8540-57ca2d70ddf4',
	'32b6bfab-4d83-46bb-998d-9960094ad6c2',
	'7552c6c1-8bd4-4a2d-bb6c-abe2ef6d78de',
	'076b3ac4-06b2-462b-b884-35b0af6970ea'
]

function delete_offer_config_2(){
	fs.readFile('tennis/remoteoffers/remoteoffers.json',function(err, data){
		data = JSON.parse(data)
		let segments = data.segments;
		let newSegments = []

		retainOffers_2.forEach(element1 => {
			segments.forEach(element2 => {
				if(element1 == element2.id){
					newSegments.push(element2)
				}
			});
		});

		console.log(newSegments.length);
		for (let index = 0; index < newSegments.length; index++) {
			const element = newSegments[index];
			let group = Math.floor(index/8)
			// console.log(group);
			delete element.minDaysSinceLastBuy
			delete element.maxDaysSinceLastBuy
			switch (group) {
				case 0:
					// element.minDaysSinceLastBuy = 7
					// element.maxDaysSinceLastBuy = "inf"
					element.minTotalSpent30Days = 0
					element.maxTotalSpent30Days = 1
					break;
				case 1:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 1
					element.maxTotalSpent30Days = 10
					break;
				case 2:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 10
					element.maxTotalSpent30Days = 20
					break;
				case 3:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 20
					element.maxTotalSpent30Days = 50
					break;
				case 4:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 50
					element.maxTotalSpent30Days = 100
					break;
				case 5:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 100
					element.maxTotalSpent30Days = 300
					break;
				case 6:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 300
					element.maxTotalSpent30Days = "inf"
					break;
			}
		}
		data.segments = newSegments;

		fs.writeFile('tennis/remoteoffers/delete_result.json',JSON.stringify(data, null, 4),()=>{});
	})
}

let retainOffers_3 = [
	'bb75b91f-2385-405b-91a8-8d5078cd00dd',
	'17be3c39-72f2-4604-b3f0-5b089a62afe5',
	'fc506dba-cfa6-4372-97f0-ba3227ea1aef',
	'3887ee62-f3eb-471a-8b28-7d772c4ddc86',
	'55c412be-e495-4e46-b58b-c89130f531c3',
	'815450f3-4ae4-48be-b08e-e4d49ea26542',
	'96474c5a-88ed-43a5-b18e-5524c2ec0930',
	'eacfa9c6-ed64-4314-b3f9-81d3e9024889',
	'42aeb95f-0c2c-4b0b-8077-96e1ae2701a7',
	'19cee074-a845-47ad-8b38-ef2fd8676610',
	'5364d477-4d3a-441e-b94e-ccd19b6f0d9d',
	'f1cb241c-2e27-4037-a1ae-6e0bef885ee1',
	'84928c1d-6215-4dbe-a330-8a980a2bebe0',
	'cba87588-a9c4-4a23-9827-8a9888a45f62',
	'e79c91a7-5524-4f9c-9d92-1c7b758dbcbe',
	'579c1e4d-a206-47da-b24a-8c5b78b27d98',
	'dde70f28-e297-41b9-9973-3488e7c74dee',
	'98f38aed-c8c2-4c3f-a072-2486466213a0',
	'8088e4e3-85cc-407b-a3b0-3fe35adac9ea',
	'd1b5261a-6e3b-450a-8056-050b1d07e23f',
	'94d06061-6f10-42d5-a9d2-58bc73276adf',
	'24882536-daa7-4199-a805-3ebbadcdbcbe',
	'16c1b9ec-075e-49f5-aa56-f3401ce8ea47',
	'40636c42-f906-4867-8af3-5403cb1b5ac7'
]

function delete_offer_config_3(){
	fs.readFile('tennis/remoteoffers/remoteoffers.json',function(err, data){
		data = JSON.parse(data)
		let segments = data.segments;
		let newSegments = []

		retainOffers_3.forEach(element1 => {
			segments.forEach(element2 => {
				if(element1 == element2.id){
					newSegments.push(element2)
				}
			});
		});

		console.log(newSegments.length);
		for (let index = 0; index < newSegments.length; index++) {
			const element = newSegments[index];
			let group = Math.floor(index/8)
			// console.log(group);
			switch (group) {
				case 0:
					element.minDaysSinceLastBuy = 7
					element.maxDaysSinceLastBuy = "inf"
					element.minTotalSpent30Days = 0
					element.maxTotalSpent30Days = "inf"
					break;
				case 1:
					element.minDaysSinceLastBuy = 0
					element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 0
					element.maxTotalSpent30Days = 5
					break;
				case 2:
					element.minDaysSinceLastBuy = 0
					element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 5
					element.maxTotalSpent30Days = "inf"
					break;
			}
		}
		data.segments = newSegments;

		fs.writeFile('tennis/remoteoffers/delete_result.json',JSON.stringify(data, null, 4),()=>{});
	})
}

let retainOffers_4 = [
	'b1aa0bd9-a864-4ecf-86bb-95f88b50c985',
	'33cc8f8d-3c8d-494c-a91a-bae864ca3a43',
	'3922807d-804b-4bbd-bbdd-d15c046d4e42',
	'b34094d6-7163-4ae2-ad8f-66e1ba415cc9',
	'1a33753f-eabb-4b99-94c0-49da0d0a725d',
	'c9b8c012-2723-432e-a228-70f2204db6b0',
	'047d35d5-d0b9-4146-8475-163e04902d33',
	'eb2dba3f-290b-45b4-9de4-343522b3eb33',
	'bb75b91f-2385-405b-91a8-8d5078cd00dd',
	'17be3c39-72f2-4604-b3f0-5b089a62afe5',
	'fc506dba-cfa6-4372-97f0-ba3227ea1aef',
	'3887ee62-f3eb-471a-8b28-7d772c4ddc86',
	'b7c5321a-eab6-431d-9e6b-60b492146f9b',
	'48f354ea-a3c7-4434-9711-eba9bbf211c3',
	'349675ed-134d-4919-a16c-3bbc382432e8',
	'9d436ae6-cc59-4505-9ed0-ee646053b573',
	'5e41a47f-b74a-4444-b4d3-ccd89449a085',
	'9b3f4b00-9dda-4256-a31a-c54653410fcd',
	'569e0406-9ac1-490c-b54a-eb02058a0fee',
	'9c65c126-45f6-40c1-8e0d-d2cca32f881a',
	'55c412be-e495-4e46-b58b-c89130f531c3',
	'815450f3-4ae4-48be-b08e-e4d49ea26542',
	'96474c5a-88ed-43a5-b18e-5524c2ec0930',
	'eacfa9c6-ed64-4314-b3f9-81d3e9024889',
	'3200a4a2-bfc2-4779-bafe-4a6d9cf1a020',
	'2f4577f9-54e0-4a4d-bd55-2f5799f20520',
	'689b98c1-882b-47bd-810c-6d2bc679e73e',
	'a5740177-1118-4511-88ab-16b56ac57f31',
	'867b400f-3c52-4764-9881-75a3852debe5',
	'1099492b-b99d-461f-bf5c-4f3f38fbf7e8',
	'996a49c3-dba6-4e06-aa93-59e03407c8ba',
	'453283de-03e4-42d6-a554-374afdf639b0',
	'620d6ea1-8db2-400f-a49f-d666ba83380a',
	'4bb951d6-1f19-4778-bc81-acd329f1bfaf',
	'e01c0101-7427-49bc-8127-601f6921efc7',
	'5d433b37-9174-409c-bb99-938328707fdd',
	'5985effe-8513-4ea9-b9f9-bb7097db050e',
	'79b8b078-ac4a-40ec-b608-08f9dc533556',
	'ad4947f9-b35d-47fc-b765-4ce0893ab6f3',
	'55c8af96-e1f4-404f-8de4-fdb925d1f522',
	'b1e1b7ab-ef0e-4051-9585-efd45c49fdd7',
	'65462169-8490-4f76-869b-02e97cac8b8b',
	'61023c15-dac2-4d2e-ae34-283dd9ba91fd',
	'c3ad48f9-a05d-43da-9838-f23f86889d51',
	'61337661-74d6-4670-85ae-a17df0564a6f',
	'85716851-c83f-482f-b96e-698bbce64b83',
	'5a766416-2f85-45c8-9a16-e345beab0862',
	'09069f37-9131-4a8b-a5ab-78e4207ca47e',
	'd7233abd-3599-475d-868f-5f9781338b49',
	'fce240e6-56fa-48d0-81e3-7c047f5074ef',
	'931c05d5-46ca-481d-9ad1-c1520323eee6',
	'e5d18ccb-50c8-4dc3-b1a2-80393c1fd0b0',
	'4777545f-1c1e-43dc-839a-04d8c046dea3',
	'77bfc69b-2bef-4cfc-9da6-e6731e02af6e',
	'6f1ae3ac-3c10-431f-98e6-9a5ba338dc4d',
	'fde7acad-df1d-4668-9d07-35a138496214'
]

function delete_offer_config_4(){
	fs.readFile('tennis/remoteoffers/remoteoffers.json',function(err, data){
		data = JSON.parse(data)
		let segments = data.segments;
		let newSegments = []

		retainOffers_4.forEach(element1 => {
			segments.forEach(element2 => {
				if(element1 == element2.id){
					newSegments.push(element2)
				}
			});
		});

		console.log(newSegments.length);
		for (let index = 0; index < newSegments.length; index++) {
			const element = newSegments[index];
			let group = Math.floor(index/8)
			// console.log(group);
			delete element.minDaysSinceLastBuy
			delete element.maxDaysSinceLastBuy
			switch (group) {
				case 0:
					// element.minDaysSinceLastBuy = 7
					// element.maxDaysSinceLastBuy = "inf"
					element.minTotalSpent30Days = 0
					element.maxTotalSpent30Days = 1
					break;
				case 1:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 1
					element.maxTotalSpent30Days = 10
					break;
				case 2:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 10
					element.maxTotalSpent30Days = 20
					break;
				case 3:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 20
					element.maxTotalSpent30Days = 50
					break;
				case 4:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 50
					element.maxTotalSpent30Days = 100
					break;
				case 5:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 100
					element.maxTotalSpent30Days = 300
					break;
				case 6:
					// element.minDaysSinceLastBuy = 0
					// element.maxDaysSinceLastBuy = 7
					element.minTotalSpent30Days = 300
					element.maxTotalSpent30Days = "inf"
					break;
			}
		}
		data.segments = newSegments;

		fs.writeFile('tennis/remoteoffers/delete_result.json',JSON.stringify(data, null, 4),()=>{});
	})
}

function delete_offer_and_iap(){

	fs.readFile('tennis/remoteoffers/remoteoffers.json',function(err, data){
		data = JSON.parse(data)
		let segments = data.segments;
		let newSegments = []
	
	});
}