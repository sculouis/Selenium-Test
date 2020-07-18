var Excel = require('exceljs');
var workbook = new Excel.Workbook();
workbook.creator = "Naveen";
workbook.modified = "Kumar";
workbook.xlsx.readFile("sample.xlsx").then(function () {
    var workSheet = workbook.getWorksheet("工作表1");
    workSheet.eachRow({
        includeEmpty: true
    }, function (row, rowNumber) {
        currRow = workSheet.getRow(rowNumber);
        console.log("User Name :" + currRow.getCell(1).value + ", Password :" + currRow.getCell(2).value);
        console.log("User Name :" + row.values[1] + ", Password :" + row.values[2]);
    })
});