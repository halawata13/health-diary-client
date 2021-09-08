import 'jest';
import axios from 'axios';
import { UserService } from '../user.service';
import { User } from '../../types';

const data: User = {
  id: 1,
  name: 'test',
  accessToken: 'token',
};

jest.spyOn(axios, 'post').mockResolvedValue({ data });

describe('UserService', () => {
  it('should login user', async () => {
    const result = await UserService.login('username', 'password');
    expect(result).toStrictEqual(data);
  });
});
