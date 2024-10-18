import { faker } from '@faker-js/faker';

// export const userData = {
//   getEmail: () => faker.internet.email({ lastName: 'test', provider: 'example.com' }),
//   getUsername: () => faker.person.firstName(),
//   getPassword: () => faker.internet.password(),
// };


export const userData = {
  getEmail: () => faker.internet.email({ lastName: 'test', provider: 'example.com' }),
  getUsername: () => faker.person.firstName(),
  getPassword: () => faker.internet.password(),
};