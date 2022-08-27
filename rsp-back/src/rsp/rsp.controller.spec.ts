import { Test, TestingModule } from '@nestjs/testing';
import { RspController } from './rsp.controller';
import { UserRepository } from '../users/repository/users.repository';
import { HighscoreRepository } from './repository/highscore.repository';
import { RspService } from './rsp.service';
import { JwtService } from '@nestjs/jwt';

describe('RspController', () => {
  let controller: RspController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [RspService],
      controllers: [RspController],
      providers: [RspService, JwtService, HighscoreRepository, UserRepository],
    }).compile();

    controller = module.get<RspController>(RspController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
