import User from '../src/controllers/user.controller';

describe('Example the test', () => {
  it('Should return ok', () => {
    const user = new User();
    expect('test').toEqual('test');   
  });
})