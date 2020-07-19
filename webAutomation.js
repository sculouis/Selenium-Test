const {
    Builder,
    By,
    Key,
    until
} = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();

async function GetWebElement(id){
    try {
        return driver.findElement(By.id(id));
    }catch (error) {
        console.log(error);
     return null;   
    }
}
 

async function example() {
    let situri = "https://sit-erp.hotains.com.tw/EISQuotation/QuotationEdit?test";
    await driver.get(situri);
    await driver.sleep(5000);
    var result = await GetWebElement('selMANMVPZMTYPE') 
    await result.sendKeys('03');

}
module.exports = example;