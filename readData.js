var Excel = require('exceljs');

async function getTestData(filename,sheetName) {
    //needed return Promise
    var workbook = new Excel.Workbook();
    var data = [];
    await workbook.xlsx.readFile(filename).then(async () => {
        var workSheet = workbook.getWorksheet(sheetName);
        workSheet.eachRow({
            includeEmpty: true
        }, function (row, rowNumber) {
            if (rowNumber != 1) {
                data.push({
                    id: row.values[1],
                    value: row.values[2],
                    type: row.values[3],
                    remark: row.values[4]
                })
            }
        })
    });
    return data;
}

module.exports = getTestData;