import { User } from '../entities/users.entity';
import { Repository, EntityRepository, createQueryBuilder } from 'typeorm';
import { UserAuthDto } from '../dto/user-auth-dto';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: UserAuthDto): Promise<User> {
    const { email, password } = createUserDto;

    const salt = bcrypt.genSaltSync();
    const user = new User();
    user.email = email;
    user.salt = salt;
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return user;
  }

  async updateUser(email: string) {
    const user = await this.findOne({ email: email });
    let temp_score = user.score;
    temp_score++;
    user.score = temp_score;
    await user.save();
    return user;
  }

  async isAlreadyhasEmail(email: string) {
    const found = await this.findOne({ email: email });
    if (!found) {
      return false;
    }
    return true;
  }

  async verifyUserPassword(loginDto: UserAuthDto) {
    const { email, password } = loginDto;
    const user = await this.findOne({ email });
    if (user && (await user.verifyPassword(password))) {
      return { email: user.email, score: user.score };
    } else {
      return null;
    }
  }

  async getUser(email: string) {
    const user = await this.findOne({ email: email });

    return user;
  }
}
