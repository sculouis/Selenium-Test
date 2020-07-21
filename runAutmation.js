var example = require("./webAutomation");
//定義測試資料
//type:1.一般資料,2.按鈕,3.radioButton,4.checkBox
var getTestData = require("./readData");
var filename = `${__dirname}\\Sample.xlsx`;

var sheetName = "法人";
getTestData(filename,sheetName).then((data)=>{
    console.log(data);
    example(data);    
});
