import { BasePage } from './BasePage';
import { LoginForm } from '../components/LoginForm';
import { Notification } from '../components/Notification';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginForm = new LoginForm(page);
    this.notification = new Notification(page);
  }

  async open() {
    await super.open('/login');
  }

  async expectLoginFormVisible() {
    await this.expectVisible(this.loginForm.form);
  }

  async fillCredentials(email, password) {
    await this.loginForm.emailInput.fill(email);
    await this.loginForm.passwordInput.fill(password);
  }

  async submit() {
    await this.loginForm.submitButton.click();
  }
}
