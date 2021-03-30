const View = require('./View');
const wdio = require('webdriverio');
const selectors = require('./selectors');

module.exports = class Authorize extends View {
  constructor(driver) {
    super(driver);
  }

  static async buildDriver(opts) {
    const driver = await wdio.remote(opts);
    return new Authorize(driver);
  }

  async register(username) {
    await this.waitForElementSetValue(selectors.usernameInput, username);
    await this.findElementClick(selectors.registerButton);
  }

  async registerFido2(username) {
    await this.waitForElementSetValue(selectors.usernameInput, username);
    await this.findElementClick(selectors.registerButton);
    await this.waitForElement(selectors.button('Cancel'));
    await this.pressFinger(1);
  }

  async login(username) {
    await this.waitForElementSetValue(selectors.usernameInput, username);
    await this.findElementClick(selectors.loginButton);
  }

  async loginFido2(username) {
    await this.waitForElementSetValue(selectors.usernameInput, username);
    await this.findElementClick(selectors.loginButton);
    await this.waitForElement(selectors.button('Cancel'));
    await this.pressFinger(1);
  }

  async loginWithoutUsernameFido2() {
    await this.waitForElementClick(selectors.loginButton);
    await this.waitForElement(selectors.button('Cancel'));
    await this.pressFinger(1);
  }

  async logout() {
    await this.findElementClick(selectors.logoutButton);
  }

  async getAlertText() {
    return await this.findElementText(selectors.alertText);
  }

  async closeAlert() {
    return await this.findElementClick(selectors.button('OK'));
  }
};
