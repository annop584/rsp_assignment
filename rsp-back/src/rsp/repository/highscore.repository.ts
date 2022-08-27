import { Highscore } from '../entities/highscore.entity';
import { Repository, EntityRepository, createQueryBuilder } from 'typeorm';

@EntityRepository(Highscore)
export class HighscoreRepository extends Repository<Highscore> {
  async getHighscore() {
    const highscore = await this.findOne();
    return highscore;
  }

  async createHighscore() {
    const highscore = new Highscore();
    highscore.highscore = 0;
    await highscore.save();
    return highscore;
  }

  async updateHighscore(new_highscore: number) {
    const highscore = await this.findOne();
    highscore.highscore = new_highscore;
    await highscore.save();
    return highscore;
  }
}
