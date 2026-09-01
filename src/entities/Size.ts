import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sizes")
export class Size {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 20 })
  nombre!: string;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;
}
