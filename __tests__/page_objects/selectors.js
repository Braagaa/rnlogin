module.exports = {
  usernameInput: '~username',
  loginButton: '~login',
  registerButton: '~register',
  logoutButton: '~logout',
  alertText: '*//android.widget.TextView[@resource-id="android:id/message"]',
  fingerprintSettings: 'android=new UiSelector().text("Fingerprint")',
  button: (text) => `*//android.widget.Button[@text="${text}"]`,
};
