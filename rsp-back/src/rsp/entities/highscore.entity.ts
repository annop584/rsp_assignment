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

@Entity({ name: 'highscore' })
export class Highscore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  highscore: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date;
}
