var example = require("./webAutomation");
//定義測試資料
//type:1.一般資料,2.按鈕,3.radioButton,4.checkBox
var getTestData = require("./readData");
var config = require("./config.json")
var filename = `${__dirname}\\${config.fileName}`;

var sheetName = config.sheetName;
getTestData(filename,sheetName).then((data)=>{
    console.log(data);
    example(data);    
});

