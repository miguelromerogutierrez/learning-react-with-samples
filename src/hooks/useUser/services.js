const userObj = {
  name: 'Miguel',
  lastName: 'Romero',
  nickname: 'Mike Romero',
  email: 'miguel@mymail.com',
  id: 1,
  age: 27,
  genre: 'male',
  address: {
    address1: 'Av Norte 33',
    address2: 'San Andres Atenco',
    city: 'Tlalnepantla de baz',
    state: 'Mexico',
    country: 'Mexico'
  }
};
export const getUser = () => new Promise(resolve => setTimeout(() => resolve(userObj), 1000));
