const {Builder, Browser, By, Key, until } = require('selenium-webdriver')

let driver;


beforeAll(async ()=> {
    driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterAll(async () => {
    await driver.quit();
});

describe('moobie tests', () => {

    test("Notifications are displayed upon deletion or check", async () => {
    
        await driver.get("http://localhost:3000/")

        await driver.findElement(By.id('add-movie-input')).sendKeys('Katanagatari\n')
    
        await driver.wait(
            until.elementIsVisible(
                driver.findElement(By.id("message")), 5000
            )
        );
    
    })

    test("deleteMovie deletes movie", async () => {

        await driver.get("http://localhost:3000/")

        await driver.findElement(By.id('add-movie-input')).sendKeys('Katanagatari\n')

        let deletedMovie = await driver.findElement(By.className('delete-btn'))

        await driver.sleep(2000)

        await deletedMovie.click()

        await driver.sleep(2000)

        let isDeleted = await driver.findElements(By.xpath('//ul/li'))

        expect(isDeleted.length === 0).toBe(true)

    })
})
