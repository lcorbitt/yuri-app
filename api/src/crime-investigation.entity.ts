import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CrimeReport } from "./crime-report.entity";
import { User } from "./user.entity";

@Entity()
export class CrimeInvestigation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CrimeReport, (report) => report.investigation, { onDelete: 'CASCADE' })
  report: CrimeReport;

  @Column({ nullable: true })
  officer_id: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'enum', enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'], default: 'OPEN' })
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
