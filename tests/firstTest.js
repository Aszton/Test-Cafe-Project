import { Selector, ClientFunction } from 'testcafe';

const pageTitle = Selector('title')
const loginRegisterSelector = Selector('#customernav')
const loginNameInput = Selector('[name="loginname"]')
const passwordInput = Selector('[name="password"]')
const loginButton = Selector('[title="Login"]')
const getURL = ClientFunction(() => document.location.href);

fixture`firstTest`
    .page`https://automationteststore.com/`

test('Login Test', async t => {
      await t
      .maximizeWindow()
      .expect(pageTitle.innerText).eql('A place to practice your automation skills!')
      .expect((loginRegisterSelector).exists).ok("Cannot find login or register button")
      .click(loginRegisterSelector)
      .typeText(loginNameInput, "test_user_wsb").expect(loginNameInput.value).contains('test_user_wsb')
      .typeText(passwordInput, "test_pass_wsb").expect(passwordInput.value).contains('test_pass_wsb')
      .click(loginButton)
      .expect(getURL()).contains('account/account');      
});