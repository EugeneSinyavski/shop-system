import { expect } from '@playwright/test';
import { endpoints } from '../../config/endpoints.js';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export class AuthAPI {
  constructor(request) {
    this.request = request;
  }
  getUrl(endpoint) {
    return `${API_URL}${endpoint}`;
  }

  async registerUser(userData) {
    const response = await this.request.post(this.getUrl(endpoints.auth.register), {
      data: userData,
    });
    await expect(response).toBeOK();
    return await response.json();
  }

  async registerUserExpectingError(userData, expectedStatus = 409) {
    const response = await this.request.post(this.getUrl(endpoints.auth.register), {
      data: userData,
    });
    expect(response.status()).toBe(expectedStatus);
    const body = await response.json();
    return body;
  }

  async loginUser(email, password) {
    const response = await this.request.post(this.getUrl(endpoints.auth.login), {
      data: { email, password },
    });
    await expect(response).toBeOK();
    const body = await response.json();
    expect(body.email).toBe(email);
    expect(body).toHaveProperty('id');
    return body;
  }

  async deleteUser(userId) {
    console.log(`User ${userId} created. Cleanup skipped (API restriction).`);
    return true;
  }
}
