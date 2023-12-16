let xlsx = require('xlsx')
let fs = require('fs')

function execute()
{
    let wb = xlsx.readFile('./未修改图片.xlsx')
    let sheets = wb.Sheets
    let rows = xlsx.utils.sheet_to_json(sheets[wb.SheetNames[0]])
    rows.forEach(r => {r
        let file = r.file
        fs.unlink(file, (err) => {
            if (err) {
              console.error('删除文件时出现错误:', err);
              return;
            }
            // console.log('文件删除成功');
          });
    })
    console.log('Success')
}

execute()