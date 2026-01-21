import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../apiClients/AuthAPI';
import { generateTestUser } from '../../utils/testData';
import { validateUserData } from '../../utils/userValidators';

test.describe('TC-API-01: Register and Login User', () => {
  let authApi;
  let testUser;
  let createdUser;

  test.beforeEach(async ({ request }) => {
    authApi = new AuthAPI(request);
    testUser = generateTestUser();
  });

  test('Verify new user registration and login flow', async () => {
    await test.step('1: Register a new user', async () => {
      const regResponse = await authApi.registerUser(testUser);

      validateUserData(testUser, regResponse);

      createdUser = regResponse;
    });

    await test.step('2: Login with the registered user', async () => {
      const loginResponse = await authApi.loginUser(testUser.email, testUser.password);

      validateUserData(testUser, loginResponse);

      expect(loginResponse.id).toBe(createdUser.id);
      expect(loginResponse.bucket_id).toBe(createdUser.bucket_id);
    });
  });

  test.afterEach(async () => {
    await test.step('Post-condition: simulate deletion of test user', async () => {
      // API does not support DELETE; simulation only
      if (testUser) {
        // placeholder for future cleanup if API adds DELETE endpoint
      }
    });
  });
});
