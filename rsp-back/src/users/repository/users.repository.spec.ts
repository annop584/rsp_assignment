import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthDto } from '../dto/user-auth-dto';
import { User } from '../entities/users.entity';
import { UserRepository } from './users.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getUser', () => {
    it('should return found user', async () => {
      const email = 'annop584@gmail.com';
      const user = {
        email,
      };
      const findOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user as User);

      const foundUser = await userRepository.getUser(email);
      console.log('foundUser');
      console.log(foundUser);

      expect(foundUser).toEqual(user);
      expect(findOneSpy).toHaveBeenCalledWith(user);
    });
  });
});
