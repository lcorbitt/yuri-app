import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CrimeReport } from './crime-report.entity';

@Entity()
export class CrimeCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => CrimeReport, (report) => report.category)
  reports: CrimeReport[];
}
