import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../users/repository/users.repository';
import { HighscoreRepository } from './repository/highscore.repository';
import { RspService } from './rsp.service';

describe('RspService', () => {
  let service: RspService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RspService, HighscoreRepository, UserRepository],
    }).compile();

    service = module.get<RspService>(RspService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
