import { Selector, ClientFunction } from 'testcafe';

const pageTitle = Selector('title')
const loginRegisterSelector = Selector('#customernav')
const loginNameInput = Selector('[name="loginname"]')
const passwordInput = Selector('[name="password"]')
const loginButton = Selector('[title="Login"]')
const getURL = ClientFunction(() => document.location.href);
const loginErrorMessage = Selector('.alert-danger')

fixture`Login Tests`
    .page`https://automationteststore.com/`

test('Login with valid creditentials', async t => {
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

test('Login with invalid creditentials', async t => {
    await t
    .maximizeWindow()
    .expect(pageTitle.innerText).eql('A place to practice your automation skills!')
    .expect((loginRegisterSelector).exists).ok("Cannot find login or register button")
    .click(loginRegisterSelector)
    .typeText(loginNameInput, "fail_user").expect(loginNameInput.value).contains('fail_user')
    .typeText(passwordInput, "fail_pass").expect(passwordInput.value).contains('fail_pass')
    .click(loginButton)
    .expect(loginErrorMessage.innerText).contains('Error: Incorrect login or password provided.')
});