const {
    Builder,
    By,
    Key,
    until
} = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();

async function getWebElement(id) {
    try {
        return driver.findElement(By.id(id));
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getWebElementByXpath(value) {
    try {
        return driver.findElement(By.xpath(`//input[@value='${value}']`));
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function example(data) {
    let situri = "https://sit-erp.hotains.com.tw/EISQuotation/QuotationEdit?test";
    await driver.get(situri);
    console.log("等待8秒-等候代碼Binding")
    await driver.sleep(8000);
    var menuOff = await getWebElement("btn-menu");
    menuOff.click() //側邊收合

    data.forEach(async item => {
        console.log(`${item.remark}:${item.id}-${item.value}`);
        switch (item.type) {
            case 1:
                //設定一般值input(text),select
                var result = await getWebElement(item.id);
                await result.sendKeys(item.value);
                break;
            case 2:
                //設定點擊一般是按鈕
                var result = await getWebElement(item.id);
                await result.click();
                break;
            case 3:
                //設定radio button
                var result = await getWebElementByXpath(item.id);
                await result.click();
                break;
            case 4:
                //設定checkBox
                var result = await getWebElement(item.id);
                await result.sendKeys(Key.SPACE);
                break;
            default:
                break;
        }
    })

}
module.exports = example;
