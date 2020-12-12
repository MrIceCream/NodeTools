var fs = require('fs')

function ConvertToTable(data, callBack) {
	data = data.toString();
	var table = new Array();
	var rows = new Array();
	rows = data.split("\n");
	for (var i = 0; i < rows.length; i++) {
		table.push(rows[i].split(","));
	}
	callBack(table);
}

function readFile(index, hashset, hashdict)
{
    console.log('readFile index '+index);
    if(index >= filePathList.length){
        fs.writeFile('city/result.txt',hashset.join('\n'),()=>{});
        console.log('success');
        return;
    }

    let filePath = 'city/csv/'+filePathList[index];
    console.log('filePath : '+filePath);
    let elementIndex = 0;
    if(filePath.indexOf('info') != -1){
        elementIndex = 63
    }else if(filePath.indexOf('level') != -1){
        elementIndex = 62
    }else if(filePath.indexOf('purchase') != -1){
        elementIndex = 64
    }else if(filePath.indexOf('show') != -1){
        elementIndex = 66
    }

    let limitDate = Date.parse("2020-04-01");
    fs.readFile(filePath, function (err, data) {
        console.log('readFile success');
        ConvertToTable(data, function (table) {
            let res = [];
            table.forEach(element => {
                let AppsFlyerID = element[elementIndex-4];
                // let IDFA = element[64];
                // let AndroidID = element[65];
                let time = Date.parse(element[3]);
                let CustomerUserID = element[elementIndex];
                if(!hashdict.hasOwnProperty(CustomerUserID)){
                    hashdict[CustomerUserID] = 1;
                    hashset.push(CustomerUserID+'\t'+AppsFlyerID);
                }
                // console.log(CustomerUserID);
            });
            index++;
            console.log(index);
            readFile(index, hashset, hashdict);
        })
    })
}

let hashset = [];
let hashdict = {};
let filePathList = [
'info/com.apollo.lilycity_non_organic_in_app_events_2020-04-01_2020-04-30_DVAFA_Asia_Shanghai.csv',
'info/com.apollo.lilycity_non_organic_in_app_events_2020-05-01_2020-05-08_DOYYJ_Asia_Shanghai.csv',
'info/com.apollo.lilycity_organic-in-app-events_2020-04-01_2020-04-30_GKBFH_Asia_Shanghai.csv',
'info/com.apollo.lilycity_organic-in-app-events_2020-05-01_2020-05-08_JQPTO_Asia_Shanghai.csv',
'info/id1488860782_non_organic_in_app_events_2020-04-01_2020-04-30_GKOIP_Asia_Shanghai.csv',
'info/id1488860782_non_organic_in_app_events_2020-05-01_2020-05-08_DECHX_Asia_Shanghai.csv',
'info/id1488860782_organic-in-app-events_2020-04-01_2020-04-30_HYFRW_Asia_Shanghai.csv',
'info/id1488860782_organic-in-app-events_2020-05-01_2020-05-08_NNZII_Asia_Shanghai.csv',
'level/com.apollo.lilycity_non_organic_in_app_events_2020-02-04_2020-02-29_IKZTF_Asia_Shanghai.csv',
'level/com.apollo.lilycity_non_organic_in_app_events_2020-03-01_2020-03-31_IAZLF_Asia_Shanghai.csv',
'level/com.apollo.lilycity_non_organic_in_app_events_2020-04-01_2020-04-30_LFVFE_Asia_Shanghai.csv',
'level/com.apollo.lilycity_non_organic_in_app_events_2020-05-01_2020-05-07_RJVWX_Asia_Shanghai.csv',
'level/com.apollo.lilycity_organic-in-app-events_2020-02-04_2020-02-29_OBXTL_Asia_Shanghai.csv',
'level/com.apollo.lilycity_organic-in-app-events_2020-03-01_2020-03-31_MECEA_Asia_Shanghai.csv',
'level/com.apollo.lilycity_organic-in-app-events_2020-04-01_2020-04-30_BEHYV_Asia_Shanghai.csv',
'level/com.apollo.lilycity_organic-in-app-events_2020-05-01_2020-05-07_ZRRKA_Asia_Shanghai.csv',
'level/id1488860782_non_organic_in_app_events_2020-02-04_2020-02-29_SLRTC_Asia_Shanghai.csv',
'level/id1488860782_non_organic_in_app_events_2020-03-01_2020-03-31_QYWKC_Asia_Shanghai.csv',
'level/id1488860782_non_organic_in_app_events_2020-04-01_2020-04-30_XWWNE_Asia_Shanghai.csv',
'level/id1488860782_non_organic_in_app_events_2020-05-01_2020-05-07_SZFHT_Asia_Shanghai.csv',
'level/id1488860782_organic-in-app-events_2020-02-04_2020-02-29_ZFRRO_Asia_Shanghai.csv',
'level/id1488860782_organic-in-app-events_2020-03-01_2020-03-31_TQLUZ_Asia_Shanghai.csv',
'level/id1488860782_organic-in-app-events_2020-04-01_2020-04-30_JQAUL_Asia_Shanghai.csv',
'level/id1488860782_organic-in-app-events_2020-05-01_2020-05-07_JGRSY_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_non_organic_in_app_events_2020-02-04_2020-02-06_IHDUN_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_non_organic_in_app_events_2020-02-07_2020-02-14_RWLOV_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_non_organic_in_app_events_2020-02-15_2020-02-29_SLYAM_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_non_organic_in_app_events_2020-03-01_2020-03-31_HMPMH_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_non_organic_in_app_events_2020-04-01_2020-04-30_ILQOL_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_non_organic_in_app_events_2020-05-01_2020-05-07_ALSVA_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_organic-in-app-events_2020-02-04_2020-02-06_XWDCN_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_organic-in-app-events_2020-02-07_2020-02-14_POMIW_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_organic-in-app-events_2020-02-15_2020-02-29_VJJWL_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_organic-in-app-events_2020-03-01_2020-03-31_HWQLY_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_organic-in-app-events_2020-04-01_2020-04-30_PEKNT_Asia_Shanghai.csv',
'purchase/com.apollo.lilycity_organic-in-app-events_2020-05-01_2020-05-07_SBOFS_Asia_Shanghai.csv',
'purchase/id1488860782_non_organic_in_app_events_2020-02-04_2020-02-29_JBWIP_Asia_Shanghai.csv',
'purchase/id1488860782_non_organic_in_app_events_2020-03-01_2020-03-31_ZJNEL_Asia_Shanghai.csv',
'purchase/id1488860782_non_organic_in_app_events_2020-04-01_2020-04-30_LUGOQ_Asia_Shanghai.csv',
'purchase/id1488860782_non_organic_in_app_events_2020-05-01_2020-05-07_CRGJG_Asia_Shanghai.csv',
'purchase/id1488860782_organic-in-app-events_2020-02-04_2020-02-29_EQBES_Asia_Shanghai.csv',
'purchase/id1488860782_organic-in-app-events_2020-03-01_2020-03-31_XSXGD_Asia_Shanghai.csv',
'purchase/id1488860782_organic-in-app-events_2020-04-01_2020-04-30_XJPNI_Asia_Shanghai.csv',
'purchase/id1488860782_organic-in-app-events_2020-05-01_2020-05-07_JUNDG_Asia_Shanghai.csv',
'show/com.apollo.lilycity_non_organic_in_app_events_2020-04-01_2020-04-22_VWWJV_Asia_Shanghai.csv',
'show/com.apollo.lilycity_non_organic_in_app_events_2020-04-01_2020-04-30_DJSMB_Asia_Shanghai.csv',
'show/com.apollo.lilycity_non_organic_in_app_events_2020-04-23_2020-04-25_OOLPH_Asia_Shanghai.csv',
'show/com.apollo.lilycity_non_organic_in_app_events_2020-04-26_2020-04-28_AUELY_Asia_Shanghai.csv',
'show/com.apollo.lilycity_non_organic_in_app_events_2020-04-29_2020-04-30_WKPWC_Asia_Shanghai.csv',
'show/com.apollo.lilycity_non_organic_in_app_events_2020-05-01_2020-05-08_XKFQH_Asia_Shanghai.csv',
'show/com.apollo.lilycity_organic-in-app-events_2020-04-01_2020-04-22_QVFGW_Asia_Shanghai.csv',
// 'show/com.apollo.lilycity_organic-in-app-events_2020-04-01_2020-04-30_AIKTC_Asia_Shanghai.csv',
// 'show/com.apollo.lilycity_organic-in-app-events_2020-04-23_2020-04-25_WHRFR_Asia_Shanghai.csv',
// 'show/com.apollo.lilycity_organic-in-app-events_2020-04-26_2020-04-28_GFWZH_Asia_Shanghai.csv',
// 'show/com.apollo.lilycity_organic-in-app-events_2020-04-29_2020-04-30_LAVGR_Asia_Shanghai.csv',
// 'show/com.apollo.lilycity_organic-in-app-events_2020-05-01_2020-05-08_JNBHS_Asia_Shanghai.csv',
// 'show/id1488860782_non_organic_in_app_events_2020-04-01_2020-04-30_CAYKL_Asia_Shanghai.csv',
// 'show/id1488860782_non_organic_in_app_events_2020-05-01_2020-05-08_NXWDY_Asia_Shanghai.csv',
// 'show/id1488860782_organic-in-app-events_2020-04-01_2020-04-22_THIYT_Asia_Shanghai.csv',
// 'show/id1488860782_organic-in-app-events_2020-04-01_2020-04-30_QHHNE_Asia_Shanghai.csv',
// 'show/id1488860782_organic-in-app-events_2020-04-23_2020-04-30_XFHNU_Asia_Shanghai.csv',
// 'show/id1488860782_organic-in-app-events_2020-05-01_2020-05-08_VDYGV_Asia_Shanghai.csv'
];
let index = 0;
readFile(index, hashset, hashdict);