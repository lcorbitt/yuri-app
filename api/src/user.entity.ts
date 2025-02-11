import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CrimeComment } from './crime-comment.entity';
import { CrimeInvestigation } from './crime-investigation.entity';
import { CrimeReport } from './crime-report.entity';
import { Notification } from './notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column({
    type: 'enum',
    enum: ['CITIZEN', 'OFFICER', 'ADMIN'],
    default: 'CITIZEN',
  })
  role: 'CITIZEN' | 'OFFICER' | 'ADMIN';

  @Column({ nullable: true })
  badge_number?: string; // Only for law enforcement officers

  @Column({ nullable: true })
  department?: string; // Only for law enforcement officers

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => CrimeComment, (comment) => comment.author)
  comments: CrimeComment[];

  @OneToMany(() => CrimeInvestigation, (investigation) => investigation.officer)
  investigations: CrimeInvestigation[];

  @OneToMany(() => CrimeReport, (report) => report.user)
  reports: CrimeReport[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
