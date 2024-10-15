import { faker } from '@faker-js/faker';

export const userData = {
  email: faker.internet.email(),
  username: faker.person.firstName(),
  password: faker.internet.password(),
};
