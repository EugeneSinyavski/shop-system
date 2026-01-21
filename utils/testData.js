import { faker } from '@faker-js/faker';

export function generateTestUser(overrides = {}) {
  const uniqueId = faker.string.uuid();

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    phoneNumber: '+1' + faker.string.numeric(10),
    email: `user-${uniqueId}@example.com`,
    username: `user-${uniqueId}`,
    password: 'Password123!',
    role: 'USER',
    ...overrides,
  };
}
