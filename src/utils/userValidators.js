import { expect } from '@playwright/test';

export function validateUserData(user, response) {
  expect(response).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      username: user.username,
      role: 'USER',
      bucket_id: expect.any(Number),
    })
  );

  expect(response).not.toHaveProperty('password');
}
