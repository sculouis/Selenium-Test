const {
    Builder,
    By,
    Key,
    until
} = require("selenium-webdriver");

let driver = new Builder().forBrowser("chrome").build();

// let driver = new Builder().forBrowser('internet explorer').build();
//var driver = new Builder().withCapabilities(browserForWebdriver).build();

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

async function getWebElementByXpathWithId(id) {
    try {
        return driver.findElement(By.xpath(`//select[@id='${id}']`));
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function sleep(){
    await driver.sleep(3000);
}

async function example(data) {
    let situri = "https://sit-erp.hotains.com.tw/EISQuotation/QuotationEdit?test";
    let uri = "http://localhost:57987/EISQuotation/QuotationEdit?test";
    await driver.get(uri);
    console.log("等待8秒-等候代碼Binding")
    await driver.sleep(8000);
    var menuOff = await getWebElement("btn-menu");
    menuOff.click() //側邊收合
    data.forEach(async item => {
        console.log(`${item.remark}:${item.id}-${item.value}`);
        switch (item.type) {
            case 1: //設定一般值input(text),select
                var result = await getWebElement(item.id);
                result.sendKeys(item.value);
                break;
            case 2: //設定點擊一般是按鈕
                await sleep();
                var result = await getWebElement(item.id);
                result.click();
                break;
            case 3: //設定radio button
                var result = await getWebElementByXpath(item.id);
                result.click();
                break;
            case 4: //設定checkBox
                var result = await getWebElement(item.id);
                result.sendKeys(Key.SPACE);
                break;
            case 5: //設定select
                var result = await driver.findElement(By.css(`#${item.id} > option:nth-child(3)`));
                // await driver.sleep(3000);
                result.click();
                break;
            default:
                break;
        }
    })

}
module.exports = example;
