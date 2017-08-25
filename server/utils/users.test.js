const {Users} = require('./users');
const expect = require('expect');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Mike',
        room: 'Programming'
      },
      {
        id: 2,
        name: 'Phil',
        room: 'Planes'
      },
      {
        id: 3,
        name: 'Laura',
        room: 'Planes'
      },
    ]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: 1,
      name: 'alex',
      room: 'football'
    };
    const res = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([ user ]);
  });

  it('should return names for Planes room', () => {
    const res = users.getUserList('Planes');
    expect(res).toInclude('Phil');
    expect(res).toInclude('Laura');
    expect(res).toExclude('Mike');
  });

  it('should remove a user', () => {
    const userToDel = users.users[ 0 ];
    const res = users.removeUser(userToDel.id);
    expect(res).toEqual(userToDel);
    expect(users.users).toExclude(userToDel);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const res = users.removeUser(123456);
    expect(res).toNotExist();
    expect(users.users.length).toEqual(3);
  });

  it('should find user', () => {
    const aUser = users.getUser(1);
    expect(aUser).toEqual(users.users[0]);
  });

  it('should not find user', () => {
    const aUser = users.getUser(1234);
    expect(aUser).toNotExist();
  });

});