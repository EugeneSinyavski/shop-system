import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../apiClients/AuthAPI';
import { generateTestUser } from '../../utils/testData';
import { validateUserData } from '../../utils/userValidators';

test.describe('Register and Login User', () => {
  let authApi;
  let testUser;
  let createdUser;

  test.beforeEach(async ({ request }) => {
    authApi = new AuthAPI(request);
    testUser = generateTestUser();
  });

  test('TC-API-01: Register and Login User', async () => {
    await test.step('1: Register a new user', async () => {
      createdUser = await authApi.registerUser(testUser);
      validateUserData(testUser, createdUser);
    });

    await test.step('2: Login with the registered user', async () => {
      const loginResponse = await authApi.loginUser(testUser.email, testUser.password);
      validateUserData(testUser, loginResponse);

      expect(loginResponse.id).toBe(createdUser.id);
      expect(loginResponse.bucket_id).toBe(createdUser.bucket_id);
    });
  });

  test('TC-API-02: Registration with Existing Email but Different Data', async () => {
    await test.step('1: Register a new user', async () => {
      createdUser = await authApi.registerUser(testUser);
      validateUserData(testUser, createdUser);
    });

    await test.step('2: Attempt to register another user with the SAME email', async () => {
      const conflictingUser = generateTestUser({ email: testUser.email });

      const errorResponse = await authApi.registerUserExpectingError(conflictingUser, 409);
      expect(errorResponse.message).toBe(`Email "${conflictingUser.email}" already exists.`);
    });

    await test.step('3: Verify original user can still login', async () => {
      const loginResponse = await authApi.loginUser(testUser.email, testUser.password);
      validateUserData(testUser, loginResponse);

      expect(loginResponse.id).toBe(createdUser.id);
      expect(loginResponse.bucket_id).toBe(createdUser.bucket_id);
    });
  });

  test('TC-API-03: Registration with Existing Username but Different Data', async () => {
    await test.step('1: Register a new user', async () => {
      createdUser = await authApi.registerUser(testUser);
      validateUserData(testUser, createdUser);
    });

    await test.step('2: Attempt to register another user with the SAME username', async () => {
      const conflictingUser = generateTestUser({ username: testUser.username });

      const errorResponse = await authApi.registerUserExpectingError(conflictingUser, 409);
      expect(errorResponse.message).toBe(`Username "${conflictingUser.username}" already exists.`);
    });

    await test.step('3: Verify original user can still login', async () => {
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
