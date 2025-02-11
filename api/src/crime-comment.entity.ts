import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CrimeReport } from './crime-report.entity';
import { User } from './user.entity';

@Entity()
export class CrimeComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CrimeReport, (report) => report.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: CrimeReport;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
