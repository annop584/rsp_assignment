import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HighscoreRepository } from './repository/highscore.repository';
import { UserRepository } from '../users/repository/users.repository';

@Injectable()
export class RspService {
  constructor(
    @InjectRepository(HighscoreRepository)
    private highscoreRepository: HighscoreRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  //random rsp
  getRandom_rsp() {
    return {
      success: true,
      data: { botrsp: Math.floor(Math.random() * 3) },
      message: 'success',
    };
  }

  async gethighscore() {
    const highscore = await this.highscoreRepository.getHighscore();
    if (highscore) {
      return {
        success: true,
        data: { highscore: highscore.highscore },
        message: 'success',
      };
    } else {
      await this.highscoreRepository.createHighscore();
      return {
        success: true,
        data: { highscore: 0 },
        message: 'success',
      };
    }
  }

  async save_rsp_stat(email) {
    const user = await this.userRepository.updateUser(email);
    const highscore = await this.highscoreRepository.getHighscore();
    let resp_highscore = highscore.highscore;
    let isnewhigh = false;
    if (user.score > highscore.highscore) {
      const newhighscore = await this.highscoreRepository.updateHighscore(
        user.score,
      );
      resp_highscore = newhighscore.highscore;
      isnewhigh = true;
    }

    return {
      success: true,
      data: {
        yourscore: user.score,
        highscore: resp_highscore,
        isnewhigh: isnewhigh,
      },
      message: 'success',
    };
  }

  async reset_rsp_stat(email) {
    const user = await this.userRepository.resetscoreUser(email);
    const highscore = await this.highscoreRepository.getHighscore();
    let resp_highscore = highscore.highscore;
    let isnewhigh = false;
    if (user.score > highscore.highscore) {
      const newhighscore = await this.highscoreRepository.updateHighscore(
        user.score,
      );
      resp_highscore = newhighscore.highscore;
      isnewhigh = true;
    }

    return {
      success: true,
      data: {
        yourscore: user.score,
        highscore: resp_highscore,
        isnewhigh: isnewhigh,
      },
      message: 'success',
    };
  }

  async getScores(email) {
    //get userscore
    const user = await this.userRepository.getUser(email);
    const highscore = await this.highscoreRepository.getHighscore();
    //get highscore
    if (highscore) {
      return {
        success: true,
        data: { yourscore: user.score, highscore: highscore.highscore },
        message: 'success',
      };
    } else {
      await this.highscoreRepository.createHighscore();
      return {
        success: true,
        data: { yourscore: user.score, highscore: 0 },
        message: 'success',
      };
    }
  }
}
