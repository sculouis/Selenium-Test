const {
    Builder,
    By,
    Key,
    until
} = require("selenium-webdriver");
const {
    of , merge, Observable
} = require('rxjs');

const {
    bufferTime
} = require('rxjs/operators');

var getTestData = require("./readData");
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

async function sleep() {
    await driver.sleep(3000);
}


async function example(data) {
    let situri = "https://sit-erp.hotains.com.tw/EISQuotation/QuotationEdit?test";
    let uri = "http://localhost:57987/EISQuotation/QuotationEdit?test";
    await driver.get(situri);
    console.log("等待8秒-等候代碼Binding")
    await driver.sleep(8000);
    var menuOff = await getWebElement("btn-menu");
    menuOff.click() //側邊收合
    //emit one item
    const observable = new Observable(items =>
        data.forEach(async item => {
            switch (item.type) {
                case 1: //設定一般值input(text),select
                    items.next({
                        item,
                        result: await getWebElement(item.id)
                    })
                    break;
                case 2: //設定點擊一般是按鈕
                    items.next({
                        item,
                        result: await getWebElement(item.id)
                    })
                    break;
                case 3: //設定radio button
                    items.next({
                        item,
                        result: await driver.findElement(By.css(`input[value='${item.id}']`))
                    })

                    break;
                case 4: //設定checkBox
                    items.next({
                        item,
                        result: await getWebElement(item.id)
                    })
                    break;
                case 5: //設定select
                    items.next({
                        item,
                        result: await driver.findElement(By.css(`select#${item.id} > option:nth-child(3)`))
                    });
                    break;
                default:
                    break;
            }
        })
    );
    const result = observable;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        while (1)
            if ((new Date().getTime() - start) > milliseconds)
                break;
    }

    observable.subscribe({
        next(x) {
            sleep(2000);
            var item = x.item;
            var result = x.result;
            console.log(`${item.remark}:${item.id}-${item.value}`);
            switch (item.type) {
                case 1: //設定一般值input(text),select
                    result.sendKeys(item.value);
                    break;
                case 2: //設定點擊一般是按鈕
                    result.click();
                    break;
                case 3: //設定radio button
                    result.click();
                    break;
                case 4: //設定checkBox
                    result.sendKeys(Key.SPACE);
                    break;
                case 5: //設定select
                    result.click();
                    break;
                default:
                    break;
            }

        },
        error(err) {
            console.error('something wrong occurred: ' + err);
        },
        complete() {
            console.log('done');
        }
    });


}

var config = require("./config.json")
var filename = `${__dirname}\\${config.fileName}`;
var sheetName = config.sheetName;
getTestData(filename, sheetName).then((data) => {
    console.log(data);
    example(data);
});