function concatArray() {
  let newArr = Array.prototype.concat.apply([], arguments); //没有去重复的新数组
  return Array.from(new Set(newArr));
}

function mergeAnnex(obj1, obj2){
  let result = {};
  let a = Object.assign({},obj1);
  let b = Object.assign({},obj2);

  if (!obj1) {
    return b;
  } else if (!obj2) {
    return a;
  }

  let keys = concatArray(Object.keys(a), Object.keys(b));
  for (var key of keys) 
  {
    if(a[key] && b[key])
    {
      if(a[key].constructor == Object)
      {
        result[key] = mergeAnnex(a[key], b[key])
      }
      else if(a[key].constructor == Array)
      {
        if (a[key][0].constructor == Object) 
        {
          let a_array = a[key];
          let b_array = b[key];

          let a_merge_obj = {}
          a_array.forEach(element => {
            a_merge_obj = mergeAnnex(a_merge_obj, element);
          });

          let b_merge_obj = {}
          b_array.forEach(element => {
            b_merge_obj = mergeAnnex(b_merge_obj, element);
          });

          result[key] = [mergeAnnex(a_merge_obj, b_merge_obj)];

        }
        else
        {
          result[key] = a[key].concat(b[key]);
        }
      }
      else
      {
        if(a[key].constructor == Number){
          result[key] = a[key] + b[key];
        }else{
          result[key] = a[key];
        }
      }

    }
    else if(!a[key])
    {
      result[key] = b[key]
    }
    else if(!b[key])
    {
      result[key] = a[key]
    }
  }

  return result;
}

let rewards = [
  {
    "militaryToken": 1
  },{
    "techTreePoints": 666
  },{
    "patterns": [
      "fa1597f1-a50d-a454-398d-c969f6002abd"
    ]
  },{
    "ammos": [{
      "id":"b61a30fd-c653-54cc-8bb9-862b0f9b3aa0",
      "amount": 100
    }]
  },{
    "powerUpCards": {
      "410fc342-5b85-94cd-fa0d-9c6fd2432a3e": {
        "id":"410fc342-5b85-94cd-fa0d-9c6fd2432a3e",
        "amount":6
      }
    }
  },{
    "decals": [
      "88a18c70-3230-3da4-0a00-f954b440e9f5"
    ]
  },{
    "unlimitedEnergies": [
      "2251c9f7-fcf6-c40c-ab03-78b7c6ba8092"
    ]
  },{
    "ammos": [{
      "id":"7f31d56c-1d11-1442-1a24-81f7e95223c0",
      "amount": 100
    }]
  },{
    "decals": [
      "7637437c-6527-b4d3-ea53-35e332ced994"
    ]
  },{
    "powerUpCards": {
      "399bb733-91a2-1414-1aab-e606aff19dc9": {
        "id":"399bb733-91a2-1414-1aab-e606aff19dc9",
        "amount":3
      }
    }
  },{
    "score": 300
  },{
    "score": 100
  },{
    "hardCurrency": 5
  },{
    "softCurrency": 4500
  }
]

let chance = [
  0.001,
  0.0145,
  0.0145,
  0.03,
  0.03,
  0.05,
  0.05,
  0.05,
  0.08,
  0.08,
  0.15,
  0.15,
  0.15,
  0.15
]

function singleDraw(){
  let result = Math.ceil(Math.random() * 10000)/10000;
  let sum=0;
  for (var index = 0; index < chance.length; index++) {
    sum += chance[index];
    if(result <= sum){
      break;
    }
  }
  // console.log(`reward index : ${JSON.stringify(rewards[index])}`);
  let reward = Object.assign({},rewards[index]);
  return reward
}

function tenTimesLuckDraw(){
  let totalRewards;
  for (let index = 0; index < 11; index++) {
    let reward = singleDraw();
    console.log(`reward index ${index}, ${JSON.stringify(reward)}`);
    totalRewards = mergeAnnex(totalRewards, reward);
  }
  console.log(`totalRewards , ${JSON.stringify(totalRewards)}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main(){
  let i=0;
  while(1){
    tenTimesLuckDraw();
    await sleep(3000);
    console.log(`\n============${i}============\n`)
    i++;
  }
}

function test(){
  let a = {
    "powerUpCards": {
      "410fc342-5b85-94cd-fa0d-9c6fd2432a3e": {
        "id":"410fc342-5b85-94cd-fa0d-9c6fd2432a3e",
        "amount":6
      }
    }};
  let b = {
    "ammos": [{
      "id":"b61a30fd-c653-54cc-8bb9-862b0f9b3aa0",
      "amount": 100
    }]
  };

  let totalRewards;
  for (let index = 0; index < 10; index++) {
    console.log(`========${index}========`);

    let reward = Object.assign({}, index%2==0? a:b);
    console.log(`add reward ,${JSON.stringify(reward)}`);

    totalRewards = mergeAnnex(totalRewards, reward);
    console.log(`total reward ,${JSON.stringify(totalRewards)}\n`);
  }

}

main()