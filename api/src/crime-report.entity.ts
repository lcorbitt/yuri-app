import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CrimeComment } from './crime-comment.entity';
import { CrimeCategory } from './crime-category.entity';
import { CrimeInvestigation } from './crime-investigation.entity';

@Entity()
export class CrimeReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'INVESTIGATING', 'RESOLVED', 'CLOSED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED';

  @ManyToOne(() => CrimeCategory, (category) => category.reports)
  @JoinColumn({ name: 'category_id' })
  category: CrimeCategory;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CrimeComment, (comment) => comment.report)
  comments: CrimeComment[];

  @OneToMany(() => CrimeInvestigation, (investigation) => investigation.report)
  investigation: CrimeInvestigation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
