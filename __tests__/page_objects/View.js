const wdio = require('webdriverio');
const selectors = require('./selectors');

module.exports = class View {
  driver = wdio.remote;
  constructor(driver) {
    this.driver = driver;
  }

  async waitForElement(selector, timeout = 10000) {
    await this.driver.waitUntil(
      async () => {
        return (await this.driver.$$(selector)).length === 1;
      },
      {timeout},
    );
    return await this.driver.$(selector);
  }

  async waitForElementSetValue(selector, value) {
    const elm = await this.waitForElement(selector);
    await elm.setValue(value);
  }

  async waitForElementClick(selector) {
    const elm = await this.waitForElement(selector);
    await elm.click();
  }

  async findElements(selector) {
    return await this.driver.$$(selector);
  }

  async findElementClick(selector) {
    await this.driver.$(selector).then((elm) => elm.click());
  }

  async findElementText(selector) {
    return await this.driver.$(selector).then((elm) => elm.getText());
  }

  async pressFinger(index) {
    await this.driver.fingerPrint(index);
  }

  async androidRegisterFingerprint() {
    await this.driver.execute('mobile: shell', {
      command:
        'am start -a android.settings.SECURITY_SETTINGS && locksettings set-pin 1234',
    });
    await this.driver.pause(1500);
    await this.findElementClick(selectors.fingerprintSettings);
    await this.driver.pause(1500);
    await this.driver.execute('mobile: shell', {
      command: 'input text 1234 && input keyevent 66',
    });
    await this.driver.pause(1500);
    await this.findElementClick(selectors.button('NEXT'));
    for (let i = 0; i < 3; i++) {
      await this.driver.pause(1500);
      await this.pressFinger(1);
    }
    await this.driver.pause(1500);
    await this.findElementClick(selectors.button('DONE'));
  }
};
