import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: null })
  email: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: null })
  password: string;

  @Column({ default: null })
  salt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date;

  async verifyPassword(password) {
    const hashPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashPassword;
  }
}
