export class LoginForm {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'email' });
    this.form = page.getByText('Вход в систему');
    this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
    this.submitButton = page.getByRole('button', { name: 'Войти' });
  }
}
