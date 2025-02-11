import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CrimeReport } from './crime-report.entity';
import { User } from './user.entity';

@Entity()
export class CrimeInvestigation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CrimeReport, (report) => report.investigation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: CrimeReport;

  @ManyToOne(() => User, (user) => user.investigations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'officer_id' })
  officer: User;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({
    type: 'enum',
    enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'],
    default: 'OPEN',
  })
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
