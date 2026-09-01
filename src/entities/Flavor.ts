import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("flavors")
export class Flavor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;
}
