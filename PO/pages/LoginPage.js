import { BasePage } from './BasePage';
import { LoginForm } from '../components/LoginForm';
import { Notification } from '../components/Notification';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.component = new LoginForm(page);
    this.notification = new Notification(page);
  }

  async open() {
    await super.open('/login');
  }

  async expectLoginFormVisible() {
    await this.expectVisible(this.component.form);
  }

  async fillCredentials(email, password) {
    await this.component.emailInput.fill(email);
    await this.component.passwordInput.fill(password);
  }

  async submit() {
    await this.component.submitButton.click();
  }
}
