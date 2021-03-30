const path = require('path');
const Jabber = require('jabber');
const Authorize = require('./page_objects/Authorize');
const messages = require('./page_objects/messages');

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    //deviceName: 'Android',
    app: path.join(
      __dirname,
      '../android/app/build/outputs/apk/debug/app-debug.apk',
    ),
    //appPackage: 'io.appium.android.apis',
    //appActivity: '.view.TextFields',
    automationName: 'UiAutomator2',
  },
};

const jabber = new Jabber();
const username = jabber.createWord(3);

let auth;

beforeAll(async () => {
  auth = await Authorize.buildDriver(opts);
});
/*
describe('Validation', () => {
  describe('Register', () => {
    it('Should not register an empty', async () => {
      await auth.register('');
      const result = await auth.getAlertText();
      expect(result).toEqual('ERROR: missing username');
    });

    it('Should not register a username 1 character long', async () => {
      await auth.register(jabber.createWord(1));
      const result = await auth.getAlertText();
      expect(result).toEqual(messages.CHARACTERS);
    });

    it('Should not register a username 2 characters long', async () => {
      await auth.register(jabber.createWord(2));
      const result = await auth.getAlertText();
      expect(result).toEqual(messages.CHARACTERS);
    });

    it('Should not register a username 129 characters long', async () => {
      await auth.register(jabber.createWord(129));
      const result = await auth.getAlertText();
      expect(result).toEqual(messages.CHARACTERS);
    });

    afterEach(async () => {
      await auth.closeAlert();
    });
  });
});
*/
describe('Register', () => {
  it('Should successfully register a username 3 characters long', async () => {
    await auth.registerFido2(username);
    const result = await auth.getAlertText();
    expect(result).toEqual(messages.SUCCESS_REGISTER(username));
  });

  it('Should successfully register a username 128 characters long', async () => {
    const username = jabber.createWord(128);
    await auth.registerFido2(username);
    const result = await auth.getAlertText();
    expect(result).toEqual(messages.SUCCESS_REGISTER(username));
  });

  afterEach(async () => {
    await auth.closeAlert();
    await auth.logout();
  });
});

describe('Login', () => {
  it('Should successfully login a registered username', async () => {
    await auth.loginFido2(username);
    const result = await auth.getAlertText();
    expect(result).toEqual(messages.SUCCESS_LOGIN(username));
  });

  afterEach(async () => {
    await auth.closeAlert();
    await auth.logout();
  });
});
